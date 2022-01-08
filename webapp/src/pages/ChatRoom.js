import React, {useEffect, useState, useRef} from 'react'
import {io} from '../../node_modules/socket.io/client-dist/socket.io';
import Message from '../components/Message';
import { useHistory } from 'react-router-dom';
import SendMessageForm from '../components/SendMessageForm';
import Chat from '../parts/Chat';
import RoomInfo from '../parts/RoomInfo';
export default function ChatRoom() {

    const socket = io('ws://192.168.2.103:5000');
    const [room, setRoom] = useState(null);
    const [users, setUsers] = useState(null);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const [username, setUsername] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        setUsername(username);
        const room = urlParams.get('room');

        socket.emit('joinRoom', { username, room });

        socket.on('roomUsers', ({ room, users }) => {
            setUsers(users)
            setRoom(room)
        });

        socket.on('message', (message) => {
            setMessages(prev => [...prev, message])
        });

        socket.on('disconnect', () => {
            alert("Username already in Use!")
            history.push('/');
        })

    },[]);


    let sendMessage = e => {
        e.preventDefault();
        // Get message text
        let msg = messageRef.current.value;

        msg = msg.trim();

        if (!msg) {
            return false;
        }

        // Emit message to server
        socket.emit('chatMessage', msg, username);

        // Clear input
        messageRef.current.value = '';
        messageRef.current.focus();
    }

    if(!users || !room) return null;

    return (
        <div className="chat-room">
            <header>
                <a href="/"><h3>ChatRoom</h3></a>
                <a href="/" className="leave-room">Leave Room</a>
            </header>
            <main>
                <RoomInfo room={room} users={users} username={username}/>
                <Chat username={username} messages={messages}/>
            </main>
            <footer>
                <SendMessageForm sendMessage={sendMessage} messageRef={messageRef}/>
            </footer>
        </div>
    )
}
