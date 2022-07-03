import React from 'react'
import UsersList from '../UsersList/UsersList'
import './SideMenu.scss'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';

export default function SideMenu({users}) {
    const navigate = useNavigate();

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
            <input type="text" className="search-bar" placeholder='Recherchez'/>
        </div>
        <UsersList users={users} />
        <button className='btn-logout' onClick={logOut}>Se déconnecter</button>
    </div>
  )
}
