import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Alice and Bob',
    likes: '999',
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Alice and Bob'
  )
  expect(component.container).toHaveTextContent(
    '999'
  )
    
})