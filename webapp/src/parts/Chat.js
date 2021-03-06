import React from 'react'
import Message from '../components/Message'
import '../assets/styles/chat.css';

export default function Chat({username, messages}) {
    return (
        <section className="chat">
                <div className="chat-messages">
                    {
                        messages.map(message => {
                            return (<Message key={message.id} username={username} data={message}/>)
                        })
                    }
                </div>
            </section>
    )
}
