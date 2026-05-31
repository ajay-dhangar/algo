import React, { useState } from "react";

const DEFAULT_ARRAY = [1, 3, 5, 7, 9, 11, 13, 15];

export default function BinarySearchVisualizer() {
    const [target, setTarget] = useState(7);
    const [low, setLow] = useState(null);
    const [high, setHigh] = useState(null);
    const [mid, setMid] = useState(null);
    const [foundIndex, setFoundIndex] = useState(null);
    const [status, setStatus] = useState("Enter a target and start visualization.");
    const [running, setRunning] = useState(false);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startVisualization = async () => {
        if (running) return;

        setRunning(true);
        setFoundIndex(null);

        let l = 0;
        let h = DEFAULT_ARRAY.length - 1;

        while (l <= h) {
            const m = Math.floor((l + h) / 2);

            setLow(l);
            setHigh(h);
            setMid(m);

            setStatus(
                `Checking middle element: ${DEFAULT_ARRAY[m]} (index ${m})`
            );

            await sleep(1200);

            if (DEFAULT_ARRAY[m] === Number(target)) {
                setFoundIndex(m);
                setStatus(`🎉 Target found at index ${m}`);
                setRunning(false);
                return;
            }

            if (DEFAULT_ARRAY[m] < Number(target)) {
                setStatus(
                    `${DEFAULT_ARRAY[m]} < ${target}, searching right half`
                );
                l = m + 1;
            } else {
                setStatus(
                    `${DEFAULT_ARRAY[m]} > ${target}, searching left half`
                );
                h = m - 1;
            }

            await sleep(1200);
        }

        setStatus("❌ Target not found in array");
        setLow(null);
        setHigh(null);
        setMid(null);
        setRunning(false);
    };

    const reset = () => {
        setLow(null);
        setHigh(null);
        setMid(null);
        setFoundIndex(null);
        setStatus("Enter a target and start visualization.");
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
                Binary Search Visualizer
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                }}
            >
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Target"
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #475569",
                    }}
                />

                <button
                    onClick={startVisualization}
                    disabled={running}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
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
                        cursor: "pointer",
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
                    let bg = "var(--ifm-color-emphasis-200)";

                    if (index === foundIndex) bg = "#16a34a";
                    else if (index === mid) bg = "#eab308";
                    else if (index === low) bg = "#2563eb";
                    else if (index === high) bg = "#dc2626";

                    return (
                        <div
                            key={index}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "10px",
                                color: "var(--ifm-font-color-base)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "18px",
                                background: bg,
                                transition: "all 0.6s ease",
                                position: "relative",
                            }}
                        >
                            {value}

                            <span
                                style={{
                                    position: "absolute",
                                    bottom: "-22px",
                                    fontSize: "12px",
                                }}
                            >
                                {index === low && "L"}
                                {index === mid && "M"}
                                {index === high && "H"}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                }}
            >
                <p>
                    <strong>Low:</strong> {low ?? "-"} |{" "}
                    <strong>Mid:</strong> {mid ?? "-"} |{" "}
                    <strong>High:</strong> {high ?? "-"}
                </p>

                <p>{status}</p>
            </div>
        </div>
    );
}