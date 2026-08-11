import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

// Mock @docusaurus/router
const mockPush = jest.fn();
jest.mock("@docusaurus/router", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe("useKeyboardShortcuts hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("triggers onOpenThemePicker when bare 't' key is pressed", async () => {
    const onOpenThemePicker = jest.fn();
    const user = userEvent.setup();

    renderHook(() =>
      useKeyboardShortcuts({
        onOpenHelp: jest.fn(),
        onCloseHelp: jest.fn(),
        onOpenThemePicker,
      })
    );

    await user.keyboard("t");
    expect(onOpenThemePicker).toHaveBeenCalledTimes(1);
  });

  test("triggers onOpenThemePicker when Ctrl+Shift+T key combination is pressed", async () => {
    const onOpenThemePicker = jest.fn();
    const user = userEvent.setup();

    renderHook(() =>
      useKeyboardShortcuts({
        onOpenHelp: jest.fn(),
        onCloseHelp: jest.fn(),
        onOpenThemePicker,
      })
    );

    await user.keyboard("{Control>}{Shift>}t{/Shift}{/Control}");
    expect(onOpenThemePicker).toHaveBeenCalledTimes(1);
  });

  test("does not trigger bare 't' shortcut when user is typing in an input element", async () => {
    const onOpenThemePicker = jest.fn();
    const user = userEvent.setup();

    renderHook(() =>
      useKeyboardShortcuts({
        onOpenHelp: jest.fn(),
        onCloseHelp: jest.fn(),
        onOpenThemePicker,
      })
    );

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    await user.keyboard("t");
    expect(onOpenThemePicker).not.toHaveBeenCalled();

    document.body.removeChild(input);
  });

  test("does not navigate to a missing /settings route on gs sequential shortcut", async () => {
    const user = userEvent.setup();

    renderHook(() =>
      useKeyboardShortcuts({
        onOpenHelp: jest.fn(),
        onCloseHelp: jest.fn(),
      })
    );

    await user.keyboard("g");
    await user.keyboard("s");

    expect(mockPush).not.toHaveBeenCalledWith("/settings");
  });
});
