import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs)
  )}, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleBlogChange = async (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = async (event) => {
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
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
      <div>
        <h2>add new blog</h2>
        <form onSubmit={addBlog}>
          <input
            value={newBlog}
            onChange={handleBlogChange}
          />
          <button type="submit">save</button>
        </form>
      </div>
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default App