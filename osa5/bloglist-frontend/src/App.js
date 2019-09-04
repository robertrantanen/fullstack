import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'


function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )


  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App;
