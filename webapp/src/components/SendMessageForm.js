import React from 'react'

export default function SendMessageForm({sendMessage, messageRef}) {
    return (
        <form onSubmit={sendMessage}>
            <input type="text" ref={messageRef} placeholder='Type Message...'/>
            <button type="submit" className='submit-button'>Send</button>
        </form>
    )
}
