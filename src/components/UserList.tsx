import React from 'react'
import '../css/UserList.css'

// Define props and types
interface User {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

interface UserListProps {
  users: User[]
}

function UserList({
  users,
}: UserListProps) {
  return (
    <div className="user-list">
      {users.map(
        user => (
          <div
            key={
              user.id
            }
            className="user-card"
          >
            <img
              src={
                user.avatar
              }
              alt={`${user.first_name} ${user.last_name}`}
            />
            <p>
              {
                user.first_name
              }{' '}
              {
                user.last_name
              }
            </p>
          </div>
        ),
      )}
    </div>
  )
}

export default UserList
