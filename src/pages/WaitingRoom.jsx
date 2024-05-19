import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { withAuthInfo } from '@propelauth/react';
import { useNavigate } from 'react-router-dom';

const WaitingRoom = withAuthInfo(({ user }) => {
  const [lobby, setLobby] = useState({ name: 'Sample Lobby', maxPlayers: 5 });
  const [players, setPlayers] = useState([]); // Track the list of players
  const [playerCount, setPlayerCount] = useState(0); // Track the player count
  const [hasJoined, setHasJoined] = useState(false); // Track if the user has already joined
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinRoom = () => {
    if (!hasJoined) {
      console.log(`${user.email} has joined`);
      setPlayers((prevPlayers) => [...prevPlayers, user.email]); // Add the current user
      setPlayerCount((prevCount) => prevCount + 1); // Increase the player count by 1
      setHasJoined(true); // Set the flag to true once the user joins

      // Simulate waiting for 2 seconds and then adding 2 other user emails
      setTimeout(() => {
        setPlayers((prevPlayers) => [...prevPlayers, 'user1@example.com', 'user2@example.com']);
        setPlayerCount((prevCount) => prevCount + 2); // Increase the player count by 2
      }, 2000);
    }
  };

  const startGame = () => {
    navigate('/compete');
  }

  return (
    <div className="waiting-room">
      <h2>Waiting Room - {lobby.name}</h2>
      <p>Players: {playerCount}/{lobby.maxPlayers}</p>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <div className="justify-items-center">

      <button
        onClick={handleJoinRoom}
        className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        disabled={hasJoined} // Disable the button if the user has already joined
        >
        {hasJoined ? 'Joined' : 'Join Waiting Room'}
      </button>
      <button
        onClick={startGame}
        className="mt-6 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
        {hasJoined ? 'Start game' : 'Waiting for players'}
      </button>
        </div>
    </div>
  );
});

export default WaitingRoom;
