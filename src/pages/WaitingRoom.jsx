import React from 'react';

const WaitingRoom = () => {
  const lobby = { name: 'Sample Lobby', maxPlayers: 5 }; // Hardcoded lobby data
  const players = [ // Hardcoded player data
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' }
  ];

  return (
    <div className="waiting-room">
      <h2>Waiting Room - {lobby.name}</h2>
      <p>Players: {players.length}/{lobby.maxPlayers}</p>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WaitingRoom;
