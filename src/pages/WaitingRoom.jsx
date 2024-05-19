import React, { useState, useEffect } from 'react';

const WaitingRoom = ({ lobby }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="waiting-room">
      {loading ? (
        <div className="loading-screen">
          <p>Waiting for Players to Join...</p>
        </div>
      ) : (
        <>
          <h2>Waiting Room - {lobby.name}</h2>
          <p>Players: {lobby.players}/{lobby.maxPlayers}</p>
          <ul>
            {lobby.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
