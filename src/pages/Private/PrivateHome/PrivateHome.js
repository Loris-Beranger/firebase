import React, { useEffect, useState } from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, setDoc, doc, query, where, onSnapshot } from "firebase/firestore"; 
import UsersList from '../../../components/UsersList/UsersList';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { BsFillCursorFill } from "react-icons/bs";


export default function PrivateHome() {
  const [users, setUsers] = useState([]);

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

  console.log(users);
  

  return (
    <div className='private-home'>
      <SideMenu users={users}/>
      <div className='section-chat'>
        <div className='chatroom-infos'>
          <p>Interlocuteur</p>
        </div>
        <ul className='messages-box'>
          <li>message</li>
        </ul>
        <form className='inputs-box'>
          <input type="text" className='input-message' placeholder='Ecrivez votre message'/>
          <button type="submit" className='input-send'><BsFillCursorFill className='icon-send'/></button>
        </form>
      </div>
    </div>
  )
}
