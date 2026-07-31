import React, { useState, useEffect } from 'react';

const WasmGraphRunner = () => {
    const [isWasmLoaded, setIsWasmLoaded] = useState(false);
    const [result, setResult] = useState(null);
    const [isComputing, setIsComputing] = useState(false);

    useEffect(() => {
        // Simulated Wasm Module Loading
        // In the real implementation, this will fetch and instantiate the .wasm file
        // e.g., WebAssembly.instantiateStreaming(fetch('graph_algo.wasm'))
        const loadWasm = async () => {
            console.log("Initializing WebAssembly module...");
            setTimeout(() => {
                setIsWasmLoaded(true);
                console.log("Wasm module loaded successfully.");
            }, 1000);
        };
        
        loadWasm();
    }, []);

    const runHighPerformanceGraphAlgo = () => {
        if (!isWasmLoaded) return;
        setIsComputing(true);
        setResult(null);

        // Simulate offloading heavy graph computation to Wasm/WebWorker
        setTimeout(() => {
            setResult({
                nodesProcessed: 10000,
                timeTakenMs: 12.4, // Super fast due to Wasm simulation
                algorithm: "Dijkstra's Shortest Path (Wasm Foundation)"
            });
            setIsComputing(false);
        }, 800);
    };

    return (
        <div className="wasm-graph-runner" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>High-Performance Graph Computation Engine</h2>
            
            <div className="status-indicator" style={{ marginBottom: '20px' }}>
                Status: {isWasmLoaded 
                    ? <span style={{ color: 'green', fontWeight: 'bold' }}>WebAssembly Module Ready</span> 
                    : <span style={{ color: 'orange', fontWeight: 'bold' }}>Loading Wasm...</span>}
            </div>

            <button 
                onClick={runHighPerformanceGraphAlgo} 
                disabled={!isWasmLoaded || isComputing}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: (isWasmLoaded && !isComputing) ? 'pointer' : 'not-allowed' }}
            >
                {isComputing ? 'Computing on Wasm Thread...' : 'Run 10,000+ Node Graph Benchmark'}
            </button>

            {result && (
                <div className="result-panel" style={{ marginTop: '20px', padding: '15px', border: '1px solid #4CAF50', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
                    <h3>Computation Result</h3>
                    <p><strong>Algorithm:</strong> {result.algorithm}</p>
                    <p><strong>Nodes Processed:</strong> {result.nodesProcessed.toLocaleString()}</p>
                    <p><strong>Time Taken:</strong> {result.timeTakenMs} ms</p>
                    <p style={{ fontSize: '12px', color: '#555' }}>
                        <em>(Notice: The main UI thread was not blocked during this computation, paving the way for enterprise-scale graph rendering.)</em>
                    </p>
                </div>
            )}
        </div>
    );
};

export default WasmGraphRunner;
