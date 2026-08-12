import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const SECURITY_QUESTIONS = [
  "What is your pet's name?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favorite movie?",
  "What is your favorite book?",
  "What is the name of your first employer?",
  "What is your favorite food?",
] as const;

export type AuthMode = "login" | "register" | "resetPassword";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface StoredAccount extends AuthUser {
  passwordHash: string;
  salt: string;
  updatedAt: string;
  securityQuestion?: string;
  securityAnswerHash?: string;
}

interface AuthSession {
  accountId: string;
  email: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ResetPasswordInput {
  email: string;
  securityAnswer: string;
  newPassword: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<AuthUser>;
  login: (input: LoginInput) => Promise<AuthUser>;
  logout: () => void;
  getSecurityQuestion: (email: string) => string | null;
  resetPassword: (input: ResetPasswordInput) => Promise<void>;
}

const ACCOUNTS_KEY = "algo.auth.accounts.v1";
const SESSION_KEY = "algo.auth.session.v1";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function safeWindow() {
  return typeof window !== "undefined" ? window : undefined;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateId() {
  const scope = safeWindow();
  if (scope?.crypto?.randomUUID) {
    return scope.crypto.randomUUID();
  }
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function randomSalt() {
  const scope = safeWindow();
  if (!scope?.crypto?.getRandomValues) {
    return Math.random().toString(36).slice(2);
  }

  const bytes = new Uint8Array(16);
  scope.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string) {
  const scope = safeWindow();
  if (!scope?.crypto?.subtle) {
    throw new Error(
      "Secure crypto is unavailable. Please use the site over HTTPS (or localhost) to authenticate."
    );
  }
  const encoded = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await scope.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readAccounts(): StoredAccount[] {
  const scope = safeWindow();
  if (!scope) {
    return [];
  }

  try {
    const raw = scope.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  const scope = safeWindow();
  if (!scope) {
    return;
  }

  scope.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function readSession(): AuthSession | null {
  const scope = safeWindow();
  if (!scope) {
    return null;
  }

  try {
    const raw = scope.localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.accountId !== "string" || typeof parsed.email !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  const scope = safeWindow();
  if (!scope) {
    return;
  }

  if (!session) {
    scope.localStorage.removeItem(SESSION_KEY);
    return;
  }

  scope.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = readSession();
    const accounts = readAccounts();

    if (!session) {
      setIsLoading(false);
      return;
    }

    const account = accounts.find((entry) => entry.id === session.accountId && entry.email === session.email);
    if (!account) {
      writeSession(null);
      setIsLoading(false);
      return;
    }

    setUser({
      id: account.id,
      name: account.name,
      email: account.email,
      createdAt: account.createdAt,
    });
    setIsLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      register: async ({ name, email, password, securityQuestion, securityAnswer }) => {
        const cleanName = name.trim();
        const cleanEmail = normalizeEmail(email);
        const cleanPassword = password.trim();
        const cleanAnswer = securityAnswer.trim();

        if (!cleanName) {
          throw new Error("Please enter your name.");
        }

        if (!cleanEmail) {
          throw new Error("Please enter your email address.");
        }

        if (cleanPassword.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }

        if (!securityQuestion) {
          throw new Error("Please select a security question.");
        }

        if (!cleanAnswer) {
          throw new Error("Please provide an answer to the security question.");
        }

        const accounts = readAccounts();
        const existing = accounts.find((entry) => entry.email === cleanEmail);
        if (existing) {
          throw new Error("An account already exists for this email.");
        }

        const salt = randomSalt();
        const passwordHash = await hashPassword(cleanPassword, salt);
        const securityAnswerHash = await hashPassword(cleanAnswer, salt);
        const now = new Date().toISOString();
        const account: StoredAccount = {
          id: generateId(),
          name: cleanName,
          email: cleanEmail,
          createdAt: now,
          updatedAt: now,
          salt,
          passwordHash,
          securityQuestion,
          securityAnswerHash,
        };

        const nextAccounts = [...accounts, account];
        writeAccounts(nextAccounts);
        writeSession({ accountId: account.id, email: account.email });

        const nextUser: AuthUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          createdAt: account.createdAt,
        };

        setUser(nextUser);
        return nextUser;
      },
      login: async ({ email, password }) => {
        const cleanEmail = normalizeEmail(email);
        const cleanPassword = password.trim();

        if (!cleanEmail) {
          throw new Error("Please enter your email address.");
        }

        if (!cleanPassword) {
          throw new Error("Please enter your password.");
        }

        const accounts = readAccounts();
        const account = accounts.find((entry) => entry.email === cleanEmail);
        if (!account) {
          throw new Error("No account found for that email. Please register first.");
        }

        const passwordHash = await hashPassword(cleanPassword, account.salt);
        if (passwordHash !== account.passwordHash) {
          throw new Error("Incorrect password. Please try again.");
        }

        writeSession({ accountId: account.id, email: account.email });

        const nextUser: AuthUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          createdAt: account.createdAt,
        };

        setUser(nextUser);
        return nextUser;
      },
      logout: () => {
        writeSession(null);
        setUser(null);
      },
      getSecurityQuestion: (email) => {
        const cleanEmail = normalizeEmail(email);
        const accounts = readAccounts();
        const account = accounts.find((entry) => entry.email === cleanEmail);
        if (!account?.securityQuestion) {
          return null;
        }
        return account.securityQuestion;
      },
      resetPassword: async ({ email, securityAnswer, newPassword }) => {
        const cleanEmail = normalizeEmail(email);
        const cleanAnswer = securityAnswer.trim();
        const cleanPassword = newPassword.trim();

        if (!cleanEmail) {
          throw new Error("Please enter your email address.");
        }

        if (!cleanAnswer) {
          throw new Error("Please answer the security question.");
        }

        if (cleanPassword.length < 8) {
          throw new Error("New password must be at least 8 characters long.");
        }

        const accounts = readAccounts();
        const idx = accounts.findIndex((entry) => entry.email === cleanEmail);
        if (idx === -1) {
          throw new Error("No account found for that email.");
        }

        const account = accounts[idx];
        if (!account.securityAnswerHash) {
          throw new Error(
            "No security question is set for this account. Please register a new account."
          );
        }

        const answerHash = await hashPassword(cleanAnswer, account.salt);
        if (answerHash !== account.securityAnswerHash) {
          throw new Error("Incorrect answer to the security question.");
        }

        const newSalt = randomSalt();
        const newPasswordHash = await hashPassword(cleanPassword, newSalt);
        const now = new Date().toISOString();

        accounts[idx] = {
          ...account,
          salt: newSalt,
          passwordHash: newPasswordHash,
          updatedAt: now,
        };

        writeAccounts(accounts);
      },
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
