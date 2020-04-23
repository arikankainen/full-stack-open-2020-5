import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showErrorMessage('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleTitleChange = async (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = async (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = async (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService.setToken(user.token)

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      showSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    } catch (exception) {
      showErrorMessage('failed to add blog')
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} messageStyle="error" />
        <Notification message={successMessage} messageStyle="success" />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          author:
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>
          url:
          <input
            value={newUrl}
            onChange={handleUrlChange}
          />
        </p>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

const Notification = ({message, messageStyle}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageStyle}>
      {message}
    </div>
  )
}

export default App