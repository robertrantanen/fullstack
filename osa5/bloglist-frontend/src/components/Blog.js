import React, { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}> 
      <div style={hideWhenVisible} onClick={() => setBlogVisible(true)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} onClick={() => setBlogVisible(false)}>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => console.log("click")}>like</button></p>
        <p>added by {blog.user.name}</p>
      </div>
    </div>
)}

export default Blog