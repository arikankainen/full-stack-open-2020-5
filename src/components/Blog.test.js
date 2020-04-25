import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'TestiBlog',
  author: 'TestiAuthor',
  url: 'https://test.blog.fi',
  likes: 10,
  id: '5e9de90faee9b0246c20c2d3',
  user: {
    username: 'admin',
    name: 'Administrator',
    id: '5e9de80baee9b0246c20c2d0',
  },
}

const loggedUser = {
  username: 'admin',
  name: 'Administrator',
  id: '5e9de80baee9b0246c20c2d0',
  blogs: [
    {
      likes: 2,
      title: 'TestiBlog',
      author: 'TestiAuthor',
      url: 'https://test.blog.fi',
      id: '5e9de90faee9b0246c20c2d3',
    }
  ],
}

test('Renders title and author, but not url and likes', () => {
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      removeBlog={removeBlog}
      loggedUser={loggedUser}
    />
  )

  const title = component.container.querySelector('.blog-title')
  const author = component.container.querySelector('.blog-author')
  const url = component.container.querySelector('.blog-url')
  const likes = component.container.querySelector('.blog-likes')

  expect(title).toContainHTML('blog-title')
  expect(author).toContainHTML('blog-author')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('Renders also url and likes when view-button clicked', () => {
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      removeBlog={removeBlog}
      loggedUser={loggedUser}
    />
  )

  const buttonView = component.container.querySelector('.blog-view')
  fireEvent.click(buttonView)

  const title = component.container.querySelector('.blog-title')
  const author = component.container.querySelector('.blog-author')
  const url = component.container.querySelector('.blog-url')
  const likes = component.container.querySelector('.blog-likes')

  expect(title).toContainHTML('blog-title')
  expect(author).toContainHTML('blog-author')
  expect(url).toContainHTML('blog-url')
  expect(likes).toContainHTML('blog-likes')
})

test('Clicking like-button twice also calls event handler twice', () => {
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      removeBlog={removeBlog}
      loggedUser={loggedUser}
    />
  )

  const buttonView = component.container.querySelector('.blog-view')
  fireEvent.click(buttonView)

  const buttonLike = component.container.querySelector('.blog-like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(updateBlog.mock.calls).toHaveLength(2)
})