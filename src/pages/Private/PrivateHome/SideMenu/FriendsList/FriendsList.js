import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import './FriendsList.scss'
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from '../../../../../firebase-config'
import { FaUserPlus, FaUserAlt } from "react-icons/fa";
export default function FriendsList({ currentUserInfos, selectUser }) {
  const [friendsListInfos, setFriendsListInfos] = useState([])
  const [usersList, setUsersList] = useState([])
  const [isFriendList, setIsFriendList] = useState(true)
  const currentUserFriends = currentUserInfos.friends
  console.log(usersList)


  const getFriendsList = async (friendList) => {
    let friendsTab = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      friendList.forEach((element) => {
        if (element === doc.id) {
          friendsTab.push(doc.data())
        }
      })
    });
    setFriendsListInfos(friendsTab)
  }
  const getUsersList = async () => {
    let usersTab = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      usersTab.push(doc.data())
    });
    setUsersList(usersTab);
  }


  useEffect(() => {
    getFriendsList(currentUserFriends)
  }, [currentUserFriends])

  return (
    <div className='users-container'>
      {isFriendList ? (<ul className='users-list'>
        {friendsListInfos.map((friend) => (
          <li className='user' key={friend.uid} onClick={() => selectUser(friend)}>
            <img src={friend.avatarPath} alt='avatar' className='avatar' />
            <p className='user-name'>{friend.name}</p>
          </li>
        ))}
        <button className='button-add-friend' onClick={() => {
          setIsFriendList(false)
          getUsersList()
        }}><FaUserPlus size={20} /></button>
      </ul>) : (<ul className='users-list'>
        {usersList.map((user) => (
          <li className='user' key={user.uid}>
            <img src={user.avatarPath} alt='avatar' className='avatar' />
            <p className='user-name'>{user.name}</p>
          </li>
        ))}
        <button className='button-add-friend' onClick={() => {
          setIsFriendList(true)

        }}><FaUserAlt size={20} /></button>
      </ul>)}
    </div>
  )
}
