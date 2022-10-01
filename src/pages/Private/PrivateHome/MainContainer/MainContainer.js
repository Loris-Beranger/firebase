import React from 'react'
import ChatRoom from './ChatRoom/ChatRoom'

const MainContainer = ({ chat, msgs, user1, text, setText, handleSubmit }) => {
    console.log(msgs);
    return (
        <ChatRoom chat={chat} msgs={msgs} user1={user1} text={text} setText={setText} handleSubmit={handleSubmit} />
    )
}

export default MainContainer