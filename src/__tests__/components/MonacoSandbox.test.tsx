import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MonacoSandbox, { DEFAULT_TEMPLATES } from "../../components/CodeEditor/MonacoSandbox";

// MonacoSandbox uses a plain <textarea> — no monaco-editor mock needed.

describe("MonacoSandbox Component", () => {
  test("renders title, language selector, run and reset buttons", () => {
    render(<MonacoSandbox />);

    // Default title
    expect(screen.getByText("Interactive Algorithm Sandbox")).toBeInTheDocument();
    // Language selector
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    // Run button
    expect(screen.getByRole("button", { name: /run code/i })).toBeInTheDocument();
    // Reset button
    expect(screen.getByRole("button", { name: /reset code/i })).toBeInTheDocument();
  });

  test("accepts a custom title", () => {
    render(<MonacoSandbox title="My Custom Sandbox" />);
    expect(screen.getByText("My Custom Sandbox")).toBeInTheDocument();
  });

  test("switches programming languages via the selector", () => {
    render(<MonacoSandbox initialLanguage="javascript" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("javascript");

    fireEvent.change(select, { target: { value: "python" } });
    expect(select.value).toBe("python");

    fireEvent.change(select, { target: { value: "cpp" } });
    expect(select.value).toBe("cpp");
  });

  test("executes JavaScript code and shows output", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);
    fireEvent.click(screen.getByRole("button", { name: /run code/i }));

    // The binary search template should log "Found 23 at index: 5"
    await waitFor(
      () => {
        expect(screen.getByText(/Found 23 at index/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("resets code to default template when Reset Code is clicked", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);

    const editor = screen.getByRole("textbox", { name: /code editor/i });
    fireEvent.change(editor, { target: { value: "console.log('modified');" } });
    expect(editor).toHaveValue("console.log('modified');");

    fireEvent.click(screen.getByRole("button", { name: /reset code/i }));

    await waitFor(() => {
      expect(editor).toHaveValue(DEFAULT_TEMPLATES.javascript);
    });
  });

  test("shows the output section after running code", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);
    fireEvent.click(screen.getByRole("button", { name: /run code/i }));

    await waitFor(() => {
      // Output section renders with an "Output" header label
      expect(screen.getByLabelText(/output console/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
