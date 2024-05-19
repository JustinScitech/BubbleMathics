import React from 'react';

const LobbyButton = ({ lobby, onClick }) => {
  return (
    <button onClick={() => onClick(lobby.id)}>
      Join {lobby.name} ({lobby.players}/{lobby.maxPlayers})
    </button>
  );
};

export default LobbyButton;
