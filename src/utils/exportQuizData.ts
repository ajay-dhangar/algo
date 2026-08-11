import type { QuizStat } from "../hooks/useQuizProgress";

/**
 * Escapes a single string field for CSV compliance RFC 4180.
 */
function escapeCsvField(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "number") return String(val);

  const str = String(val);
  const needsFormulaEscape = /^[=+\-@]/.test(str);
  const safeValue = needsFormulaEscape ? `\t${str}` : str;

  if (safeValue.includes(",") || safeValue.includes('"') || safeValue.includes("\n") || safeValue.includes("\r")) {
    return `"${safeValue.replace(/"/g, '""')}"`;
  }
  return safeValue;
}

/**
 * Serializes a record of QuizStat objects into a CSV string.
 */
export function serializeQuizStatsToCsv(stats: Record<string, QuizStat>): string {
  const headers = [
    "Quiz ID",
    "Best Score",
    "Best Percent (%)",
    "Average Percent (%)",
    "Total Attempts",
    "Total Questions",
    "Status",
    "Latest Attempt Date",
    "Attempts History",
  ];

  const rows = Object.values(stats).map((stat) => {
    const attemptsHistoryStr = stat.attempts
      .map((att) => {
        const date = att.completedAt ? att.completedAt : "N/A";
        const total = att.totalQuestions ?? stat.totalQuestions;
        return `${date} (Score: ${att.score}/${total}, Time: ${att.timeSpent}s)`;
      })
      .join("; ");

    return [
      stat.quizId,
      stat.bestScore,
      stat.bestPercent,
      stat.averagePercent,
      stat.totalAttempts,
      stat.totalQuestions,
      stat.status,
      stat.latestAttemptAt ?? "",
      attemptsHistoryStr,
    ]
      .map(escapeCsvField)
      .join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Serializes a record of QuizStat objects into a JSON string.
 */
export function serializeQuizStatsToJson(stats: Record<string, QuizStat>): string {
  return JSON.stringify(stats, null, 2);
}

/**
 * Triggers a browser file download using Blob and a dynamic <a download> element.
 * Safe for SSG / client environments.
 */
export function downloadBlob(content: string, filename: string, mimeType: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Helper to serialize quiz stats and trigger client-side download in CSV or JSON format.
 */
export function downloadQuizData(
  stats: Record<string, QuizStat>,
  format: "csv" | "json" = "csv",
  filename?: string
): void {
  const dateStr = new Date().toISOString().split("T")[0];

  if (format === "csv") {
    const csvData = serializeQuizStatsToCsv(stats);
    const fname = filename ?? `quiz_history_${dateStr}.csv`;
    downloadBlob(csvData, fname, "text/csv;charset=utf-8;");
  } else {
    const jsonData = serializeQuizStatsToJson(stats);
    const fname = filename ?? `quiz_history_${dateStr}.json`;
    downloadBlob(jsonData, fname, "application/json;charset=utf-8;");
  }
}
