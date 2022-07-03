import React from 'react'
import './UsersList.scss'
export default function UsersList({users}) {
    console.log(users)

  return (
    <ul className='users-list'>
        {users.map((user) => (
            <li className='user' key={user.uid}>
              <img src={user.avatarPath} alt='avatar' className='avatar'/>
              <p className='user-name'>{user.name}</p>
            </li>
        ))}
    </ul>
  )
}
