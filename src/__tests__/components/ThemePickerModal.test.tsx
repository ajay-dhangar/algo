import React from "react";
import { render, screen, fireEvent } from "../testUtils";
import ThemePickerModal from "../../components/ThemePickerModal";
import * as accentUtils from "../../utils/accentTheme";
import * as codeUtils from "../../utils/codeTheme";

describe("ThemePickerModal", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("does not render when isOpen is false", () => {
    render(<ThemePickerModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renders dialog with accent and code theme options when isOpen is true", () => {
    render(<ThemePickerModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Theme Picker")).toBeInTheDocument();

    expect(screen.getByRole("radio", { name: /high contrast/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /neon/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /midnight/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /solarized/i })).toBeInTheDocument();
  });

  test("calls applyAccentTheme and storeAccentTheme when an accent option is selected", () => {
    const applySpy = jest.spyOn(accentUtils, "applyAccentTheme").mockImplementation();
    const storeSpy = jest.spyOn(accentUtils, "storeAccentTheme").mockImplementation();

    render(<ThemePickerModal isOpen={true} onClose={jest.fn()} />);

    const neonBtn = screen.getByRole("radio", { name: /neon/i });
    fireEvent.click(neonBtn);

    expect(applySpy).toHaveBeenCalledWith("neon");
    expect(storeSpy).toHaveBeenCalledWith("neon");
  });

  test("calls applyCodeTheme and storeCodeTheme when a code theme option is selected", () => {
    const applySpy = jest.spyOn(codeUtils, "applyCodeTheme").mockImplementation();
    const storeSpy = jest.spyOn(codeUtils, "storeCodeTheme").mockImplementation();

    render(<ThemePickerModal isOpen={true} onClose={jest.fn()} />);

    const midnightBtn = screen.getByRole("radio", { name: /midnight/i });
    fireEvent.click(midnightBtn);

    expect(applySpy).toHaveBeenCalledWith("midnight");
    expect(storeSpy).toHaveBeenCalledWith("midnight");
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<ThemePickerModal isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole("button", { name: /close theme picker/i });
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
