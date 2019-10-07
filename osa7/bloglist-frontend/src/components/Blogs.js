import React from 'react'
import {Link} from 'react-router-dom'

const Blogs = ({ blogs, blogForm }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div>
      <h2>blogs</h2>
      {blogForm()}
      {blogs.map(blog => <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>)}
    </div>
  )
}

export default Blogs