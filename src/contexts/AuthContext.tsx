import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthMode = "login" | "register";

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
}

interface AuthSession {
  accountId: string;
  email: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<AuthUser>;
  login: (input: LoginInput) => Promise<AuthUser>;
  logout: () => void;
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
    return `${salt}:${password}`;
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
      register: async ({ name, email, password }) => {
        const cleanName = name.trim();
        const cleanEmail = normalizeEmail(email);
        const cleanPassword = password.trim();

        if (!cleanName) {
          throw new Error("Please enter your name.");
        }

        if (!cleanEmail) {
          throw new Error("Please enter your email address.");
        }

        if (cleanPassword.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }

        const accounts = readAccounts();
        const existing = accounts.find((entry) => entry.email === cleanEmail);
        if (existing) {
          throw new Error("An account already exists for this email.");
        }

        const salt = randomSalt();
        const passwordHash = await hashPassword(cleanPassword, salt);
        const now = new Date().toISOString();
        const account: StoredAccount = {
          id: generateId(),
          name: cleanName,
          email: cleanEmail,
          createdAt: now,
          updatedAt: now,
          salt,
          passwordHash,
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
