import React from "react";
import { render, screen } from "../testUtils";
import userEvent from "@testing-library/user-event";

jest.mock("../../utils/supabaseClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: [], error: null }),
      insert: jest.fn().mockReturnThis(),
    })),
  },
}));

import BinaryTreeQuiz from "../../pages/quizzes/binary-tree";

function loginAsTestUser() {
  window.localStorage.setItem("quiz_userId", "test-user-id");
  window.localStorage.setItem("quiz_username", "TestUser");
}

describe("BinaryTreeQuiz page — smart quiz mode integration", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders the login gate when no session is stored", () => {
    render(<BinaryTreeQuiz />);
    expect(screen.getByText(/tree space initialize/i)).toBeInTheDocument();
  });

  test("renders standard mode by default once logged in, with a mode toggle", () => {
    loginAsTestUser();
    render(<BinaryTreeQuiz />);
    expect(screen.getByRole("button", { name: /^standard$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /smart quiz/i })).toBeInTheDocument();
    // Standard mode shows the fixed-progress question index (Evaluation Node Index).
    expect(screen.getByText(/evaluation node index/i)).toBeInTheDocument();
  });

  test("switching to Smart Quiz mode renders the adaptive runner instead of the fixed question flow", async () => {
    loginAsTestUser();
    const user = userEvent.setup();
    render(<BinaryTreeQuiz />);

    await user.click(screen.getByRole("button", { name: /smart quiz/i }));

    expect(screen.getByText(/smart quiz · question 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/evaluation node index/i)).not.toBeInTheDocument();
  });

  test("switching back to Standard mode restores the fixed question flow", async () => {
    loginAsTestUser();
    const user = userEvent.setup();
    render(<BinaryTreeQuiz />);

    await user.click(screen.getByRole("button", { name: /smart quiz/i }));
    await user.click(screen.getByRole("button", { name: /^standard$/i }));

    expect(screen.getByText(/evaluation node index/i)).toBeInTheDocument();
  });
});
