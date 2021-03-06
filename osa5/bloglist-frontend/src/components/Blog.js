import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const deleteButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={deleteBlog}>delete</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div className='titleAndAuthor' style={hideWhenVisible} onClick={() => setBlogVisible(true)}>
        {blog.title} {blog.author}
      </div>
      <div className='allInfo' style={showWhenVisible} onClick={() => setBlogVisible(false)}>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={likeBlog}>like</button></p>
        <p>added by {blog.user.name}</p>
        <p>{deleteButton()}</p>
      </div>
    </div>
  )}

export default Blog