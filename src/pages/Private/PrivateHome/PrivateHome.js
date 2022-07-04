import React, { useEffect, useState } from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, setDoc, doc, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore"; 
import UsersList from '../../../components/UsersList/UsersList';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { BsFillCursorFill, BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import ChatRoom from '../../../components/ChatRoom/ChatRoom';


export default function PrivateHome() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState([]);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  const user1 = auth.currentUser.uid;

  const navigate = useNavigate();
  console.log(auth)

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, [user1])

  console.log(chat);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    console.log(id)
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  }

  const handleSubmit = async (e) => {
    console.log('submit')
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

  console.log(msgs);

  return (
    <div className={`private-home ${sideMenuIsOpen ? "open" : ""}`}>
      {sideMenuIsOpen ? <BsChevronCompactLeft className='btn-open-sidemenu' onClick={() => setSideMenuIsOpen(!sideMenuIsOpen)}/> : <BsChevronCompactRight className='btn-open-sidemenu' onClick={() => setSideMenuIsOpen(!sideMenuIsOpen)}/>}
      <SideMenu users={users} selectUser={selectUser} />
      <ChatRoom chat={chat} msgs={msgs} user1={user1} text={text} setText={setText} handleSubmit={handleSubmit}/>
    </div>
  )
}
