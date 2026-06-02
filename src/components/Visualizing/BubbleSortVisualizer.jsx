import React, { useState } from "react";

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];

export default function BubbleSortVisualizer() {
    const [array, setArray] = useState([...DEFAULT_ARRAY]);
    const [current, setCurrent] = useState(null);
    const [next, setNext] = useState(null);
    const [sortedIndex, setSortedIndex] = useState(DEFAULT_ARRAY.length);
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(
        "Click Start to visualize Bubble Sort."
    );

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const startVisualization = async () => {
        if (running) return;

        setRunning(true);

        let arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                setCurrent(j);
                setNext(j + 1);

                setStatus(
                    `Comparing ${arr[j]} and ${arr[j + 1]}`
                );

                await sleep(1000);

                if (arr[j] > arr[j + 1]) {
                    setStatus(
                        `Swapping ${arr[j]} and ${arr[j + 1]}`
                    );

                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                    setArray([...arr]);
                    swapped = true;

                    await sleep(1000);
                }
            }

            setSortedIndex(n - i - 1);

            if (!swapped) {
                setStatus(
                    "Array already sorted. Stopping early."
                );
                break;
            }
        }

        setCurrent(null);
        setNext(null);
        setSortedIndex(0);

        setStatus("🎉 Sorting Complete!");

        setRunning(false);
    };

    const reset = () => {
        setArray([...DEFAULT_ARRAY]);
        setCurrent(null);
        setNext(null);
        setSortedIndex(DEFAULT_ARRAY.length);
        setRunning(false);

        setStatus(
            "Click Start to visualize Bubble Sort."
        );
    };

    return (
        <div
            style={{
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                padding: "24px",
                margin: "24px 0",
                background: "var(--ifm-card-background-color)",
                color: "var(--ifm-font-color-base)",
            }}
        >
            <h3 style={{ marginBottom: "16px" }}>
                Bubble Sort Visualizer
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={startVisualization}
                    disabled={running}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: running
                            ? "not-allowed"
                            : "pointer",
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
                        cursor: running
                            ? "not-allowed"
                            : "pointer",
                    }}
                >
                    Reset
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "10px",
                    margin: "30px 0",
                    flexWrap: "wrap",
                }}
            >
                {array.map((value, index) => {
                    let bg = "#cbd5e1";
                    let textColor = "#111827";

                    if (index === current || index === next) {
                        bg = "#facc15";
                        textColor = "#111827";
                    }

                    if (index >= sortedIndex) {
                        bg = "#22c55e";
                        textColor = "#ffffff";
                    }

                    return (
                        <div
                            key={index}
                            style={{
                                width: "60px",
                                height: `${value * 2}px`,
                                minHeight: "50px",
                                borderRadius: "8px",
                                background: bg,
                                color: textColor,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                fontSize: "18px",
                                border: "1px solid rgba(0,0,0,0.15)",
                                transition: "all 0.8s ease",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                            }}
                        >
                            {value}
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
                <p>{status}</p>
            </div>
        </div>
    );
}