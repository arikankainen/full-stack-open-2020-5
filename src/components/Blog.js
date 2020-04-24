import React, {useState} from 'react'

const Blog = ({ blog, updateBlog, removeBlog, loggedUser }) => {
  const [showAll, setShowAll] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlog(updatedBlog)
  }

  const handleDelete = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) removeBlog(blog)
  }

  const loggedUsername = loggedUser.username
  const blogUsername = blog.user.username

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowAll(!showAll)}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={handleLike}>like</button><br/>
        {blog.author}<br />
        {loggedUsername === blogUsername && <button onClick={handleDelete}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShowAll(!showAll)}>view</button>
    </div>
  )
}

export default Blog