import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowAll(!showAll)}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button>like</button><br/>
        {blog.author}
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
