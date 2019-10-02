import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import  { useField } from './hooks'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}



function App() {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const usernameField = useField('text')
  const passwordField = useField('password')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort(function(a, b) {
          return b.likes - a.likes
        }))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
      })

    setMessage(
      `a new blog '${blogObject.title}' by '${blogObject.author}' added`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    const username = usernameField.value
    const password = passwordField.value    
    
    try {

      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      usernameField.reset()
      passwordField.reset()
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create a new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={(event) => addBlog(event)}
            title={withoutReset(title)}
            author={withoutReset(author)}
            url={withoutReset(url)}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const likeBlog = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort(function(a, b) {
          return b.likes - a.likes
        }))
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Delete ${blog.title} by ${blog.author}`)
    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
    }
  }


  const logoutFunction = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const withoutReset = (hook) => {
    const {reset, ...restOfHook} = hook
    return restOfHook
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={Message}/>
        <LoginForm handleLogin={handleLogin} username={withoutReset(usernameField)} password={withoutReset(passwordField)}/>
      </div>
    )
  }



  const padding = { padding: 5 }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />
        )}
      </div>
    )
  }

  const users = () => {
    return(
    <div>
      <h2>users</h2>
    </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/blogs">blogs</Link> 
            <Link style={padding} to="/users">users</Link> 
            {user.name} logged in <button onClick={() => logoutFunction()}>logout</button>
          </div>

          <Notification message={Message}/>

          <Route exact path="/blogs" render={() => blogList()} />
          <Route exact path="/users" render={() => users()} />

          
        </div>
      </Router>

    </div>
  )
/*
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message}/>
      <p>{user.name} logged in <button onClick={() => logoutFunction()}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />
      )}
    </div>
  )
  */

  
}

export default App
