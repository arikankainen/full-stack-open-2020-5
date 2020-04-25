import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const testBlog = {
  title: 'TestBlog',
  author: 'TestAuthor',
  url: 'https://testurl.com',
}

test('Adding new blog with valid callback', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm
      createBlog={createBlog}
    />
  )

  const title = component.container.querySelector('input[name="title"]')
  const author = component.container.querySelector('input[name="author"]')
  const url = component.container.querySelector('input[name="url"]')
  const form = component.container.querySelector('#form')

  fireEvent.change(title, {
    target: {
      value: testBlog.title
    }
  })

  fireEvent.change(author, {
    target: {
      value: testBlog.author
    }
  })

  fireEvent.change(url, {
    target: {
      value: testBlog.url
    }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toMatchObject(testBlog)
})