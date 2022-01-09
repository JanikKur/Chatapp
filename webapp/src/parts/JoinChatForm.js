import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom';
import '../assets/styles/joinChatForm.css';
import checkUsername from '../utils/checkUsername';

export default function JoinChatForm() {

    const history = useHistory();
    const usernameRef = useRef();
    const roomRef = useRef();
    
    let joinRoom = e => {
        e.preventDefault();
        if(!checkUsername(usernameRef.current.value)){
            alert('Username must contain at least 3 Characters!')
            return; 
        }
        history.push(`/chatroom?username=${usernameRef.current.value}&room=${roomRef.current.value}`);
    }

    return (
        <form className="join-chat" onSubmit={joinRoom}>
            <h1 className='title'>Join Chat</h1>
            <div className='form-group'>
                <label>Username</label>
                <input type="text" ref={usernameRef} placeholder="Enter Username..." required/>
            </div>
            <div className='form-group'>
                <label>Room</label>
                <select ref={roomRef} required>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Meetings">Meetings</option>
                </select>
            </div>
            <button type="submit" className='submit-button'>Join Room</button>
        </form>
    )
}
