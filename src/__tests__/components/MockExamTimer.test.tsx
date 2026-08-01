import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockExamTimer, { formatTime } from "../../components/Quiz/MockExamTimer";

describe("MockExamTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("formatTime formats seconds into MM:SS or HH:MM:SS correctly", () => {
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(3600)).toBe("01:00:00");
    expect(formatTime(3665)).toBe("01:01:05");
  });

  test("renders countdown timer and updates on tick", () => {
    const onTimeExpired = jest.fn();
    render(
      <MockExamTimer
        timeLimitSeconds={10}
        onTimeExpired={onTimeExpired}
        isSubmitted={false}
      />
    );

    expect(screen.getByRole("timer")).toHaveTextContent("00:10");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByRole("timer")).toHaveTextContent("00:07");
  });

  test("calls onTimeExpired when time runs out", () => {
    const onTimeExpired = jest.fn();
    render(
      <MockExamTimer
        timeLimitSeconds={2}
        onTimeExpired={onTimeExpired}
        isSubmitted={false}
      />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(onTimeExpired).toHaveBeenCalled();
  });
});
