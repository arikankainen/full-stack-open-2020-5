import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {
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
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />)}
    </div>
  )
}

export default BlogList