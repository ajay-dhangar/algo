import React, { useState } from 'react';

const StateReplayVisualizer = () => {
    // Mock algorithm states for demonstration
    const mockStates = [
        { step: 0, description: "Initial State", array: [5, 3, 8, 4, 2] },
        { step: 1, description: "Comparing 5 and 3", array: [5, 3, 8, 4, 2] },
        { step: 2, description: "Swapped 5 and 3", array: [3, 5, 8, 4, 2] },
        { step: 3, description: "Comparing 5 and 8", array: [3, 5, 8, 4, 2] },
        { step: 4, description: "Comparing 8 and 4", array: [3, 5, 8, 4, 2] },
        { step: 5, description: "Swapped 8 and 4", array: [3, 5, 4, 8, 2] }
    ];

    const [currentStateIndex, setCurrentStateIndex] = useState(0);

    const handleNext = () => {
        if (currentStateIndex < mockStates.length - 1) {
            setCurrentStateIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStateIndex > 0) {
            setCurrentStateIndex(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentStateIndex(0);
    };

    const currentState = mockStates[currentStateIndex];

    return (
        <div className="state-replay-visualizer">
            <h2>Algorithm State Replay Debugger</h2>
            
            <div className="visualization-frame" style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
                <h3>Step {currentState.step}: {currentState.description}</h3>
                <div style={{ display: 'flex', gap: '10px', fontSize: '24px' }}>
                    {currentState.array.map((num, idx) => (
                        <div key={idx} style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                            {num}
                        </div>
                    ))}
                </div>
            </div>

            <div className="controls">
                <button onClick={handlePrev} disabled={currentStateIndex === 0}>
                    &larr; Previous Step
                </button>
                <button onClick={handleReset} style={{ margin: '0 10px' }}>
                    Reset
                </button>
                <button onClick={handleNext} disabled={currentStateIndex === mockStates.length - 1}>
                    Next Step &rarr;
                </button>
            </div>
            
            <div className="timeline-slider" style={{ marginTop: '20px' }}>
                <input 
                    type="range" 
                    min="0" 
                    max={mockStates.length - 1} 
                    value={currentStateIndex} 
                    onChange={(e) => setCurrentStateIndex(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    );
};

export default StateReplayVisualizer;
