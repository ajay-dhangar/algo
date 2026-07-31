import React, { useState, useEffect } from 'react';

const SpaceComplexityHeatmap = () => {
    // Mock data representing memory usage over algorithm steps
    const mockMemoryData = [
        { step: 1, stack: 10, heap: 20 },
        { step: 2, stack: 25, heap: 35 },
        { step: 3, stack: 45, heap: 50 },
        { step: 4, stack: 80, heap: 75 }, // High recursion depth
        { step: 5, stack: 30, heap: 90 },
        { step: 6, stack: 10, heap: 100 }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % mockMemoryData.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [mockMemoryData.length]);

    const getHeatColor = (value) => {
        // Simple color scale from green (low) to red (high)
        if (value < 30) return '#4caf50'; // Green
        if (value < 70) return '#ff9800'; // Orange
        return '#f44336'; // Red
    };

    const currentData = mockMemoryData[currentStep];

    return (
        <div className="space-complexity-heatmap" style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
            <h2>Advanced Space Complexity Heatmap</h2>
            <p>Visualizing Call Stack and Heap Memory usage dynamically.</p>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div className="memory-block" style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <h3>Call Stack Depth</h3>
                    <div 
                        style={{ 
                            height: '100px', 
                            backgroundColor: getHeatColor(currentData.stack),
                            transition: 'background-color 0.5s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: currentData.stack > 50 ? '#fff' : '#000',
                            borderRadius: '4px'
                        }}
                    >
                        {currentData.stack}%
                    </div>
                </div>

                <div className="memory-block" style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <h3>Heap Allocation</h3>
                    <div 
                        style={{ 
                            height: '100px', 
                            backgroundColor: getHeatColor(currentData.heap),
                            transition: 'background-color 0.5s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: currentData.heap > 50 ? '#fff' : '#000',
                            borderRadius: '4px'
                        }}
                    >
                        {currentData.heap}%
                    </div>
                </div>
            </div>

            <div className="timeline-info" style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
                Currently displaying step {currentData.step} of {mockMemoryData.length}.
                <br/>
                <br/>
                <em>(Notice: In future iterations, this foundational UI will be connected directly to the algorithm runner state to reflect real-time allocations, leveraging D3.js or Chart.js.)</em>
            </div>
        </div>
    );
};

export default SpaceComplexityHeatmap;
