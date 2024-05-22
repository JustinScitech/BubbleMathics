import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './WaitingRoom.css';

const socket = io('https://bubblemathics.study');

const WaitingRoom = () => {
    const [waitingUsers, setWaitingUsers] = useState([[], [], []]);
    const [selectedLobby, setSelectedLobby] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });

        socket.on('waitingUsersUpdate', (lobbies) => {
            setWaitingUsers(lobbies);
            lobbies.forEach((lobby, index) => {
                if ((index === 0 && lobby.length === 2) || (index !== 0 && lobby.length >= 3 && selectedLobby === index)) {
                    navigate('/compete');
                }
            });
        });

        return () => {
            socket.off('waitingUsersUpdate');
        };
    }, [navigate, selectedLobby]);

    const joinLobby = (lobbyIndex) => {
        setSelectedLobby(lobbyIndex);
        socket.emit('joinRoom', lobbyIndex);
    };

    return (
        <div className="waiting-room">
            <h1>Choose Your Adventure</h1>
            {waitingUsers.map((lobby, index) => (
                <div key={index} className="lobby">
                    <h2>Lobby {index + 1}</h2>
                    <p>
                        Users: {lobby?.length ?? 0} / {index === 0 ? 2 : 3}
                    </p>
                    <button onClick={() => joinLobby(index)} disabled={lobby?.length >= (index === 0 ? 2 : 3)}>
                        {lobby?.length >= (index === 0 ? 2 : 3) ? 'Lobby Full' : 'Join Lobby'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default WaitingRoom;
