import React, { useState } from 'react';

const TimeComplexityAnalyzer = () => {
    const [code, setCode] = useState('');
    const [complexity, setComplexity] = useState('O(1)');

    // Placeholder for future AST parsing logic
    const analyzeComplexity = (inputCode) => {
        if (inputCode.includes('for') && inputCode.includes('for (')) {
            setComplexity('O(N^2)');
        } else if (inputCode.includes('for') || inputCode.includes('while')) {
            setComplexity('O(N)');
        } else {
            setComplexity('O(1)');
        }
    };

    const handleAnalyze = () => {
        analyzeComplexity(code);
    };

    return (
        <div className="time-complexity-analyzer">
            <h2>Interactive Time Complexity Analyzer</h2>
            <textarea
                rows="10"
                cols="50"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your algorithm here..."
            />
            <br />
            <button onClick={handleAnalyze}>Analyze Time Complexity</button>
            <div className="result">
                <h3>Estimated Complexity: {complexity}</h3>
                <p>Note: This is a basic analysis. Advanced AST parsing will be integrated in future iterations.</p>
            </div>
        </div>
    );
};

export default TimeComplexityAnalyzer;
