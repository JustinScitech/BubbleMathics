import React from 'react';
import LobbyButton from '../Components/Lobbybutton'; // Make sure to adjust the path based on your project structure

const Serverlist = () => {
  // Array to hold the information of each lobby
  const lobbies = [
    { id: 1, name: 'Lobby 1', players: 10, maxPlayers: 20 },
    { id: 2, name: 'Lobby 2', players: 8, maxPlayers: 20 },
    { id: 3, name: 'Lobby 3', players: 15, maxPlayers: 20 },
    { id: 4, name: 'Lobby 4', players: 5, maxPlayers: 20 },
    { id: 5, name: 'Lobby 5', players: 12, maxPlayers: 20 },
  ];

  const handleJoinLobby = (lobbyId) => {
    // Implement your logic to join the lobby here
    console.log(`Joining lobby ${lobbyId}`);
  };

  return (
    <div className="server-list">
      <h2>Server List</h2>
      <ul>
        {lobbies.map(lobby => (
          <li key={lobby.id}>
            <div className="lobby-info">
              <h3>{lobby.name}</h3>
              <p>Players: {lobby.players}/{lobby.maxPlayers}</p>
            </div>
            <LobbyButton lobby={lobby} onClick={handleJoinLobby} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Serverlist;
