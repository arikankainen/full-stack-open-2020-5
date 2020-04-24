import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs)
  )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      showErrorMessage('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogService.setToken(user.token)
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      showSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      showErrorMessage('failed to add blog')
    }
  }

  const updateBlog = async (blogObject) => {
    blogService.setToken(user.token)

    try {
      const returnedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      
      showSuccessMessage(`blog ${blogObject.title} by ${blogObject.author} updated`)
    } catch (exception) {
      showErrorMessage('failed to update blog')
    }
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} messageStyle="error" />
        <Notification message={successMessage} messageStyle="success" />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} messageStyle="error" />
      <Notification message={successMessage} messageStyle="success" />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}
      <BlogList blogs={blogs} updateBlog={updateBlog} />
    </div>
  )
}

export default App