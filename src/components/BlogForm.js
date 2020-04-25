import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    if (name === 'title') setNewTitle(value)
    else if (name === 'author') setNewAuthor(value)
    else if (name === 'url') setNewUrl(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form id='form' onSubmit={handleSubmit}>
        <p>
          title:
          <input
            name="title"
            value={newTitle}
            onChange={handleInputChange}
          />
        </p>
        <p>
          author:
          <input
            name="author"
            value={newAuthor}
            onChange={handleInputChange}
          />
        </p>
        <p>
          url:
          <input
            name="url"
            value={newUrl}
            onChange={handleInputChange}
          />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm