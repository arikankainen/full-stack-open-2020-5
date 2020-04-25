import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, removeBlog, loggedUser }) => {
  const compareLikes = (a, b) => {
    const likesA = a.likes
    const likesB = b.likes
    let comparison = 0

    if (likesA > likesB) comparison = -1
    else if (likesA < likesB) comparison = 1

    return comparison
  }
  
  const sortedBlogs = [...blogs].sort(compareLikes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          loggedUser={loggedUser}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
}

export default BlogList