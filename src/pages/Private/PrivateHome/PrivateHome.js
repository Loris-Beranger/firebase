import React from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 


export default function PrivateHome() {
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

  const testdb = async () => {
    try {
      const docRef = await setDoc(doc(db, "cities", "LA"), {
        id: 1,
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  testdb()

  

  



  return (
    <div className='private-home'>
        <h1>PRIVATE HOME</h1>
        <button className='btn-logout' onClick={logOut}>Se déconnecter</button>
        <form>
          <input type="text"/>
          <input type="submit" value="envoyer"/>
        </form>
    </div>
  )
}
