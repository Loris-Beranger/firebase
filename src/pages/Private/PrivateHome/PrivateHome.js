import React, { useEffect, useRef, useState } from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, setDoc, doc, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import UsersList from './SideMenu/FriendsList/FriendsList';

import { BsFillCursorFill, BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import ChatRoom from './ChatRoom/ChatRoom';
import SideMenu from './SideMenu/SideMenu'


export default function PrivateHome() {
  const scrollRef = useRef();


  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {

      setSideMenuIsOpen(false);
    }
    if (isRightSwipe) {

      setSideMenuIsOpen(true);
    }

  }


  window.scrollTo(0, 0);
  const [currentUserInfos, setCurrentUserInfos] = useState([]);
  const [chat, setChat] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState([]);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);


  const user1 = auth.currentUser.uid;


  const navigate = useNavigate();


  useEffect(() => {

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setCurrentUserInfos(users[0]);
    });
    return () => unsub();


  }, [])



  const selectUser = async (user) => {
    setChat(user);
    setSideMenuIsOpen(false);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];

      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setText("");

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
      unread: true,
    });

  }



  return (
    <div
      className={`private-home ${sideMenuIsOpen ? "open" : ""}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={scrollRef}
    >
      {sideMenuIsOpen ? <BsChevronCompactLeft className='btn-open-sidemenu' onClick={() => setSideMenuIsOpen(!sideMenuIsOpen)} /> : <BsChevronCompactRight className='btn-open-sidemenu' onClick={() => setSideMenuIsOpen(!sideMenuIsOpen)} />}
      <SideMenu currentUserInfos={currentUserInfos} selectUser={selectUser} />
      <ChatRoom chat={chat} msgs={msgs} user1={user1} text={text} setText={setText} handleSubmit={handleSubmit} />
    </div>
  )
}
