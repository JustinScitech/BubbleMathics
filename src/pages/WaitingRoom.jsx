import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WaitingRoom = () => {
  const [lobby, setLobby] = useState({ name: 'Sample Lobby', maxPlayers: 5 });
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const socket = io('http://localhost:5050');

  useEffect(() => {
    socket.on('waitingUsersUpdate', (users) => {
      setPlayers(users);
      setIsLoading(false);
    });

    return () => {
      socket.off('waitingUsersUpdate');
    };
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit('joinRoom');
  };

  return (
    <div className="waiting-room">
      <h2>Waiting Room - {lobby.name}</h2>
      <p>Players: {players.length}/{lobby.maxPlayers}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      )}
      <button
        onClick={handleJoinRoom}
        className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Join Waiting Room
      </button>
    </div>
  );
};

export default WaitingRoom;
