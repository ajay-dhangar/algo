import React, { useState } from "react";

const NODES = ["A", "B", "C", "D", "E"];

const EDGES = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 2, weight: -1 },
    { from: 1, to: 3, weight: 2 },
    { from: 2, to: 3, weight: 3 },
    { from: 3, to: 4, weight: 2 },
];
const INITIAL_DISTANCES = NODES.map((_, i) => (i === 0 ? 0 : Infinity));

export default function BellmanFordVisualizer() {
    const [distances, setDistances] = useState(INITIAL_DISTANCES);
    const [currentEdge, setCurrentEdge] = useState(null);
    const [updatedNode, setUpdatedNode] = useState(null);
    const [pass, setPass] = useState(0);
    const [status, setStatus] = useState(
        "Click Start to visualize Bellman-Ford."
    );
    const [running, setRunning] = useState(false);

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const startVisualization = async () => {
        if (running) return;

        setRunning(true);

        let dist = [0, Infinity, Infinity, Infinity, Infinity];

        setDistances([...dist]);
        setPass(0);

        for (let i = 0; i < NODES.length - 1; i++) {
            setPass(i + 1);

            for (let j = 0; j < EDGES.length; j++) {
                const edge = EDGES[j];

                setCurrentEdge(j);

                setStatus(
                    `Pass ${i + 1}: Checking ${NODES[edge.from]} → ${NODES[edge.to]} (weight ${edge.weight})`
                );

                await sleep(1200);

                if (
                    dist[edge.from] !== Infinity &&
                    dist[edge.from] + edge.weight < dist[edge.to]
                ) {
                    dist[edge.to] =
                        dist[edge.from] + edge.weight;

                    setUpdatedNode(edge.to);
                    setDistances([...dist]);

                    setStatus(
                        `Updated distance of ${NODES[edge.to]} to ${dist[edge.to]}`
                    );

                    await sleep(1200);
                }

                setUpdatedNode(null);
            }
        }

        let negativeCycle = false;

        for (const edge of EDGES) {
            if (
                dist[edge.from] !== Infinity &&
                dist[edge.from] + edge.weight < dist[edge.to]
            ) {
                negativeCycle = true;
                break;
            }
        }

        if (negativeCycle) {
            setStatus("Negative cycle detected!");
        } else {
            setStatus("Bellman-Ford completed successfully.");
        }

        setCurrentEdge(null);
        setRunning(false);
    };

    const reset = () => {
        setDistances([0, Infinity, Infinity, Infinity, Infinity]);
        setCurrentEdge(null);
        setUpdatedNode(null);
        setPass(0);
        setStatus(
            "Click Start to visualize Bellman-Ford."
        );
    };

    return (
        <div
            style={{
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                padding: "24px",
                margin: "24px 0",
                background:
                    "var(--ifm-card-background-color)",
                color: "var(--ifm-font-color-base)",
            }}
        >
            <h3>Bellman-Ford Algorithm Visualizer</h3>

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
                    justifyContent: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                }}
            >
                {NODES.map((node, index) => (
                    <div
                        key={index}
                        style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            background:
                                updatedNode === index
                                    ? "#16a34a"
                                    : "var(--ifm-color-emphasis-200)",
                            color:
                                "var(--ifm-font-color-base)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            transition: "all 0.5s ease",
                        }}
                    >
                        <div>{node}</div>

                        <div
                            style={{
                                fontSize: "12px",
                                marginTop: "4px",
                            }}
                        >
                            {distances[index] === Infinity
                                ? "∞"
                                : distances[index]}
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "20px",
                }}
            >
                <strong>Edges:</strong>

                {EDGES.map((edge, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "6px",
                            borderRadius: "6px",
                            marginTop: "4px",
                            background:
                                currentEdge === index
                                    ? "#facc15"
                                    : "transparent",
                            color:
                                currentEdge === index
                                    ? "#000"
                                    : "inherit",
                            transition: "all 0.4s ease",
                        }}
                    >
                        {NODES[edge.from]} → {NODES[edge.to]}
                        {" "}
                        (w = {edge.weight})
                    </div>
                ))}
            </div>

            <div
                style={{
                    textAlign: "center",
                }}
            >
                <p>
                    <strong>Current Pass:</strong> {pass}
                </p>

                <p>{status}</p>
            </div>
        </div>
    );
}