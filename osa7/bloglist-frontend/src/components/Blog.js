import React from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  if ( blog === undefined) {
    return null
  }

  const deleteButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={deleteBlog}>delete</button>
    }
  }

  return (
    <div >
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={likeBlog}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>{deleteButton()}</div>
    </div>
  )}

export default Blog