import React, { useEffect, useRef } from 'react'
import './Message.scss'

export default function Message({ msg, user1 }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div 
      className={`message_wrapper ${msg.from === user1 ? "me" : "friend"}`}
      ref={scrollRef}
    >
      <p className={`message ${msg.from === user1 ? "me" : "friend"}`}>{msg.text}</p>
    </div>
  )
}
