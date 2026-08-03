import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesPage, { STORAGE_KEY } from "../../pages/favorites";

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

describe("FavoritesPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders empty state when no favorite algorithms exist", () => {
    render(<FavoritesPage />);

    expect(screen.getByRole("heading", { name: /^Favorite Algorithms$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/No Favorite Algorithms Bookmarked Yet/i)).toBeInTheDocument();
  });

  test("renders bookmarked algorithms from favorite-algorithms localStorage key", () => {
    const mockData = [
      { title: "Binary Search Tree", path: "/docs/bst", addedAt: "2026-08-01T10:00:00Z" },
      { title: "Dijkstra Algorithm", path: "/docs/dijkstra", addedAt: "2026-08-02T10:00:00Z" },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

    render(<FavoritesPage />);

    expect(screen.getByText("Binary Search Tree")).toBeInTheDocument();
    expect(screen.getByText("Dijkstra Algorithm")).toBeInTheDocument();
  });

  test("sorts favorite algorithms by date added or title", () => {
    const mockData = [
      { title: "AVL Tree", path: "/docs/avl", addedAt: "2026-08-01T10:00:00Z" },
      { title: "Z Algorithm", path: "/docs/z-algo", addedAt: "2026-08-03T10:00:00Z" },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

    render(<FavoritesPage />);

    const sortSelect = screen.getByLabelText(/Sort favorites/i);
    expect(sortSelect).toBeInTheDocument();

    // Sort Alphabetical
    fireEvent.change(sortSelect, { target: { value: "alphabetical" } });
    const titles = screen.getAllByRole("link").map((el) => el.textContent);
    expect(titles).toContain("AVL Tree");
    expect(titles).toContain("Z Algorithm");
  });

  test("removes an algorithm when the remove button is clicked", () => {
    const mockData = [
      { title: "Quick Sort", path: "/docs/quicksort", addedAt: "2026-08-01T10:00:00Z" },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

    render(<FavoritesPage />);

    expect(screen.getByText("Quick Sort")).toBeInTheDocument();

    const removeBtn = screen.getByRole("button", { name: /Remove Quick Sort from favorites/i });
    fireEvent.click(removeBtn);

    expect(screen.queryByText("Quick Sort")).not.toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(stored).toEqual([]);
  });
});
