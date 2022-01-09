import React from 'react'
import '../assets/styles/roomInfo.css';

export default function RoomInfo({room, users, username}) {
    return (
        <aside className="room-infos">
                    <label>Room Name:</label>
                    <label className='room-name'>{room}</label>
                    <label>Users:</label>
                    {
                        users.map(user => {
                            return (<label key={user.id} className="user">{user.username} {user.username === username && <label className='batch'>YOU</label>}</label>)
                        })
                    }
        </aside>
    )
}
