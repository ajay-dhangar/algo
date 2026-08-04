import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MonacoSandbox, { DEFAULT_TEMPLATES } from "../../components/CodeEditor/MonacoSandbox";

// Mock @monaco-editor/react to prevent canvas/DOM errors in jsdom
jest.mock("@monaco-editor/react", () => {
  return function MockEditor({ value, onChange, language }: any) {
    return (
      <textarea
        data-testid="mock-monaco-editor"
        data-language={language}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    );
  };
});

describe("MonacoSandbox Component", () => {
  test("renders Monaco Sandbox controls and initial elements", () => {
    render(<MonacoSandbox />);

    expect(screen.getByText("Monaco Sandbox")).toBeInTheDocument();
    expect(screen.getByText("Console Output")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /run code/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("switches programming languages correctly", () => {
    render(<MonacoSandbox initialLanguage="javascript" />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("javascript");

    fireEvent.change(select, { target: { value: "python" } });
    expect(select.value).toBe("python");

    fireEvent.change(select, { target: { value: "cpp" } });
    expect(select.value).toBe("cpp");
  });

  test("executes JavaScript code and displays output console logs", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);

    const runBtn = screen.getByRole("button", { name: /run code/i });
    fireEvent.click(runBtn);

    await waitFor(
      () => {
        expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'span' && content.includes('Passed'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'div' && content.includes('Input Array'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'div' && content.includes('Target Value'))).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test("resets code to default template on reset button click", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);

    const editor = screen.getByTestId("mock-monaco-editor");
    fireEvent.change(editor, { target: { value: "console.log('Modified');" } });
    expect(editor).toHaveValue("console.log('Modified');");

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetBtn);

    await waitFor(() => {
      expect(editor).toHaveValue(DEFAULT_TEMPLATES.javascript);
    });
  });

  test("clears console output when Clear button is clicked", async () => {
    render(<MonacoSandbox initialLanguage="javascript" />);

    const runBtn = screen.getByRole("button", { name: /run code/i });
    fireEvent.click(runBtn);

    await waitFor(
      () => {
        expect(screen.getByText(/Console Output/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const clearBtn = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearBtn);

    expect(screen.getByText(/Click "Run Code" to execute algorithm/i)).toBeInTheDocument();
  });
});
