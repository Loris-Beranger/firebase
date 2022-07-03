import React, { useEffect, useState } from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, setDoc, doc, query, where, onSnapshot } from "firebase/firestore"; 
import UsersList from '../../../components/UsersList/UsersList';


export default function PrivateHome() {
  const [users, setUsers] = useState([]);

  const user1 = auth.currentUser.uid;

  const navigate = useNavigate();
  console.log(auth)
  
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch {
      alert("Erreur lors de la déconnexion");
    }
  }

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
      <UsersList users={users} />
      <div className='section-chat'>
        <h1>CHAT DIPSY</h1>
        <button className='btn-logout' onClick={logOut}>Se déconnecter</button>
        <form>
          <input type="text"/>
          <input type="submit" value="envoyer"/>
        </form>
      </div>
    </div>
  )
}
