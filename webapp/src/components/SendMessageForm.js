import React, {useRef} from 'react'
import '../assets/styles/SendMessageForm.css';

export default function SendMessageForm({sendMessage}) {

    const messageRef = useRef()

    let handleSubmit = e => {
        e.preventDefault();
        sendMessage(messageRef.current.value);
        messageRef.current.value = '';
        messageRef.current.focus();
    }

    return (
        <form className="send-message" onSubmit={handleSubmit}>
            <input type="text" ref={messageRef} placeholder='Type Message...'/>
            <button type="submit" className='submit-button'>Send</button>
        </form>
    )
}
