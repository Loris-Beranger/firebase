import React from 'react'
import './Message.scss'

export default function Message({msg, user1}) {
    console.log(msg)
  return (
    <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}>
        <p className={`message ${msg.from === user1 ? "me" : "friend"}`}>{msg.text}</p>
    </div>
  )
}
