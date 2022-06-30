import React from 'react'
import './PrivateHome.scss'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase-config';
import { getMessaging, getToken } from "firebase/messaging";


export default function PrivateHome() {
  const navigate = useNavigate();
  
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch {
      alert("Erreur lors de la déconnexion");
    }
  }

  const messaging = getMessaging();

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
  }

  

  getToken(messaging, { vapidKey: 'BGMpR1jychcszWBNMouqj-1bnJKq67T6v9idzYbTaFxB0lxuLLU6afYWpQHcrUpDWdXhLuDbO3eZsGSWy7-Y5Ds' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log(currentToken)
      localStorage.setItem('messagingToken', currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });


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
