import React, {useEffect, useRef} from 'react'
import '../assets/styles/message.css';

export default function Message({username, data}) {

    const messageRef = useRef();

    useEffect(() => {
        messageRef.current.scrollIntoView();
    },[]);

    return (
        <div ref={messageRef} class={`message ${username === data.username && 'own-message'}`}>
            <header>
                <label className='message-username'>{data.username}</label>
                <label className='message-time'>{data.time}</label>
            </header>
            <label className={`text ${data.type === 'system' && 'system-message'}`}>
                {data.text}
            </label>
        </div>
    )
}
