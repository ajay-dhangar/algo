import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../../pages/dashboard";

// Mock Docusaurus Layout and Link
jest.mock("@theme/Layout", () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="docusaurus-layout">{children}</div>;
  };
});

jest.mock("@docusaurus/Link", () => {
  return function MockLink({ to, children, className, onClick }: any) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  };
});

jest.mock("@docusaurus/BrowserOnly", () => {
  return function MockBrowserOnly({ children }: { children: () => React.ReactNode }) {
    return <>{children()}</>;
  };
});

describe("DashboardPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders learning dashboard with overview metrics and spaced repetition review section", () => {
    render(<DashboardPage />);

    expect(screen.getByText(/DSA Learning Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Weak Topics Analysis/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Spaced Repetition Review/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Start Spaced Review/i)).toBeInTheDocument();
  });
});
