import React, { useState } from "react";

const DEFAULT_ARRAY = [2, 1, 5, 1, 3, 2];
const WINDOW_SIZE = 3;

export default function SlidingWindowVisualizer() {
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [currentSum, setCurrentSum] = useState(0);
    const [maxSum, setMaxSum] = useState(0);
    const [status, setStatus] = useState(
        "Click Start to visualize Sliding Window."
    );
    const [running, setRunning] = useState(false);

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const startVisualization = async () => {
        if (running) return;

        setRunning(true);

        let windowSum = 0;

        for (let i = 0; i < WINDOW_SIZE; i++) {
            windowSum += DEFAULT_ARRAY[i];
        }

        let best = windowSum;

        setLeft(0);
        setRight(WINDOW_SIZE - 1);
        setCurrentSum(windowSum);
        setMaxSum(best);

        setStatus(
            `Initial window sum = ${windowSum}`
        );

        await sleep(1500);

        for (
            let end = WINDOW_SIZE;
            end < DEFAULT_ARRAY.length;
            end++
        ) {
            const start = end - WINDOW_SIZE + 1;

            windowSum =
                windowSum -
                DEFAULT_ARRAY[start - 1] +
                DEFAULT_ARRAY[end];

            best = Math.max(best, windowSum);

            setLeft(start);
            setRight(end);
            setCurrentSum(windowSum);
            setMaxSum(best);

            setStatus(
                `Window [${start}-${end}] → Sum = ${windowSum}`
            );

            await sleep(1500);
        }

        setStatus(
            `🎉 Maximum window sum found = ${best}`
        );

        setRunning(false);
    };

    const reset = () => {
        setLeft(null);
        setRight(null);
        setCurrentSum(0);
        setMaxSum(0);
        setStatus(
            "Click Start to visualize Sliding Window."
        );
    };

    return (
        <div
            style={{
                border:
                    "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                padding: "24px",
                margin: "24px 0",
                background:
                    "var(--ifm-card-background-color)",
                color: "var(--ifm-font-color-base)",
            }}
        >
            <h3 style={{ marginBottom: "16px" }}>
                Sliding Window Visualizer
            </h3>

            <p style={{ marginBottom: "16px" }}>
                Window Size: <strong>{WINDOW_SIZE}</strong>
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                }}
            >
                <button
                    onClick={startVisualization}
                    disabled={running}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: running
                            ? "var(--ifm-color-emphasis-300)"
                            : "var(--ifm-color-primary)",
                        color: "#fff",
                        cursor: running ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Start
                </button>

                <button
                    onClick={reset}
                    disabled={running}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: running
                            ? "var(--ifm-color-emphasis-300)"
                            : "var(--ifm-color-primary)",
                        color: "#fff",
                        cursor: running ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Reset
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: "24px 0",
                }}
            >
                {DEFAULT_ARRAY.map((value, index) => {
                    const inWindow =
                        left !== null &&
                        right !== null &&
                        index >= left &&
                        index <= right;

                    return (
                        <div
                            key={index}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "10px",
                                background: inWindow
                                    ? "#2563eb"
                                    : "var(--ifm-color-emphasis-200)",
                                color: inWindow
                                    ? "#ffffff"
                                    : "var(--ifm-font-color-base)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "18px",
                                transition: "all 0.6s ease",
                                position: "relative",
                            }}
                        >
                            {value}

                            {inWindow && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "-20px",
                                        fontSize: "12px",
                                        color: "var(--ifm-color-primary)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    W
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div
                style={{
                    textAlign: "center",
                    marginTop: "20px",
                }}
            >
                <p>
                    <strong>Current Sum:</strong>{" "}
                    {currentSum}
                </p>

                <p>
                    <strong>Maximum Sum:</strong>{" "}
                    {maxSum}
                </p>

                <p>{status}</p>
            </div>
        </div>
    );
}