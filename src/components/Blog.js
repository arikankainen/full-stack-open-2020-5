import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

        <div className="blog-title">
          {blog.title} <button className="blog-hide" onClick={() => setShowAll(!showAll)}>hide</button>
        </div>

        <div className="blog-url">
          {blog.url}
        </div>

        <div className="blog-likes">
          likes {blog.likes} <button className="blog-like" onClick={handleLike}>like</button>
        </div>

        <div className="blog-author">
          {blog.author}
        </div>

        {loggedUsername === blogUsername && <button className="blog-delete" onClick={handleDelete}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <span className="blog-title">{blog.title}</span> <span className="blog-author">{blog.author}</span> <button className="blog-view" onClick={() => setShowAll(!showAll)}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
}

export default Blog