import React from "react";
import { render, screen } from "../testUtils";
import userEvent from "@testing-library/user-event";
import KeyboardShortcutsButton from "../../components/KeyboardShortcutsButton";

describe("KeyboardShortcutsButton", () => {
  test("renders a labeled, clickable help button", () => {
    render(<KeyboardShortcutsButton onClick={jest.fn()} />);

    const button = screen.getByRole("button", { name: /keyboard shortcuts \(press shift \+ \?\)/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("?");
  });

  test("calls onClick when pressed", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<KeyboardShortcutsButton onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: /keyboard shortcuts/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
