import React from 'react'
import './UsersList.scss'
export default function UsersList({users}) {
    console.log(users)

  return (
    <ul className='users-list'>
        {users.map((user) => (
            <li className='user'>{user.name}</li>
        ))}
    </ul>
  )
}
