import React, { useState, useEffect } from 'react';

const CollabWhiteboard = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    
    useEffect(() => {
        // Simulated WebSocket connection for collaboration
        const connectToCollaborationServer = () => {
            console.log("Connecting to collaborative whiteboard server via WebSocket...");
            setTimeout(() => {
                setIsConnected(true);
                setActiveUsers(["You", "User404", "AlgoEnthusiast"]);
            }, 1500);
        };

        connectToCollaborationServer();

        // Cleanup simulation
        return () => {
            setIsConnected(false);
            setActiveUsers([]);
        };
    }, []);

    const handleDrawMock = () => {
        if (isConnected) {
            console.log("Broadcasting draw event to connected peers...");
            alert("Draw event broadcasted! In the final implementation, this will sync Excalidraw/Fabric.js canvas coordinates via Socket.io.");
        }
    };

    return (
        <div className="collab-whiteboard" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Real-Time Collaborative Algorithm Whiteboard</h2>
            
            <div className="connection-status" style={{ marginBottom: '15px' }}>
                Status: {isConnected 
                    ? <span style={{ color: 'green', fontWeight: 'bold' }}>Connected (Live)</span> 
                    : <span style={{ color: 'orange', fontWeight: 'bold' }}>Connecting...</span>}
            </div>

            {isConnected && (
                <div className="active-users" style={{ marginBottom: '20px' }}>
                    <strong>Active Participants: </strong>
                    {activeUsers.map((user, idx) => (
                        <span key={idx} style={{ 
                            background: '#e0e0e0', 
                            padding: '4px 8px', 
                            borderRadius: '12px', 
                            marginRight: '8px',
                            fontSize: '14px' 
                        }}>
                            {user}
                        </span>
                    ))}
                </div>
            )}

            <div 
                className="whiteboard-canvas-mock" 
                style={{
                    width: '100%',
                    height: '400px',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    cursor: 'crosshair',
                    marginBottom: '20px'
                }}
                onClick={handleDrawMock}
            >
                {isConnected ? (
                    <p style={{ color: '#888' }}>Interactive Canvas Area (Click to simulate broadcast)</p>
                ) : (
                    <p style={{ color: '#888' }}>Waiting for connection...</p>
                )}
            </div>
            
            <div className="tools">
                <button disabled={!isConnected} style={{ marginRight: '10px', padding: '8px 16px' }}>Pencil</button>
                <button disabled={!isConnected} style={{ marginRight: '10px', padding: '8px 16px' }}>Eraser</button>
                <button disabled={!isConnected} style={{ padding: '8px 16px' }}>Clear Board</button>
            </div>
        </div>
    );
};

export default CollabWhiteboard;
