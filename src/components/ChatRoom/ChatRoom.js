import React from 'react'
import './ChatRoom.scss'
import { BsFillCursorFill, BsThreeDotsVertical } from "react-icons/bs";
import Message from '../Message/Message';

export default function ChatRoom({ chat, msgs, user1, text, setText, handleSubmit }) {
  return (
    <div className="section-chat">

      <div className="chatroom-infos">
        <div className='chat-user-infos'>
          <img src={chat.avatarPath} alt='avatar' className='avatar' />
          <p className='chat-name'>{chat.name}</p>
        </div>
        <button className='btn-chat-options'><BsThreeDotsVertical className='icon-btn-options' /></button>
      </div>

      <div className="messages-box">
        {msgs.map((msg, i) => (
          <Message key={i} msg={msg} user1={user1} />
        ))}
      </div>

      <form className="inputs-box" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-message"
          placeholder="Ecrivez votre message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="input-send">
          <BsFillCursorFill className="icon-send" />
        </button>
      </form>

    </div>
  );
}
