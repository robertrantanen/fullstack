import React from 'react'

const User = ({ user, blogs }) => {
  if (user === undefined) { 
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => <li>{blog.title}</li>)}
      </ul>    
    </div>
  )
}

export default User