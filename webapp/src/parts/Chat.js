import React from 'react'
import Message from '../components/Message'

export default function Chat({username, messages}) {
    return (
        <section className="chat">
                <div className="chat-messages">
                    {
                        messages.map(message => {
                            return (<Message username={username} data={message}/>)
                        })
                    }
                </div>
            </section>
    )
}
