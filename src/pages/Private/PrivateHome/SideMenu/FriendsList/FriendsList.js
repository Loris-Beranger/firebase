import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import './FriendsList.scss'
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from '../../../../../firebase-config'
export default function FriendsList({ currentUserInfos, selectUser }) {
  const [friendsListInfos, setFriendsListInfos] = useState([])
  const currentUserFriends = currentUserInfos.friends
  console.log(currentUserFriends)


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

  getFriendsList(currentUserFriends)

  /* currentUserFriends.forEach((friendId) => {
    getFriendsList(friendId)
  }) */

  return (
    <ul className='users-list'>
      {friendsListInfos.map((friend) => (
        <li className='user' key={friend.uid} onClick={() => selectUser(friend)}>
          <img src={friend.avatarPath} alt='avatar' className='avatar' />
          <p className='user-name'>{friend.name}</p>
        </li>
      ))}
    </ul>
  )
}
