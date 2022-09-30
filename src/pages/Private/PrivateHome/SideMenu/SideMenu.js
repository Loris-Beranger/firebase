import React from 'react'

import './SideMenu.scss'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import FriendsList from './FriendsList/FriendsList';
import { auth } from '../../../../firebase-config';

export default function SideMenu({ currentUserInfos, selectUser }) {
  const navigate = useNavigate();
  console.log(currentUserInfos)

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch {
      alert("Erreur lors de la déconnexion");
    }
  }
  return (
    <div className='side-menu'>
      <div className='wrapper-searchbar'>
        <input type="text" className="search-bar" placeholder='Recherchez' />
      </div>
      <FriendsList currentUserInfos={currentUserInfos} selectUser={selectUser} />
      <button className='btn-logout' onClick={logOut}>Se déconnecter</button>
    </div>
  )
}
