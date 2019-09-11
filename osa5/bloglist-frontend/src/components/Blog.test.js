import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe("Blog tests", () => {
  afterEach(cleanup)
  let mockHandler
  let blog
  let component

  beforeEach(() => {
    mockHandler = jest.fn()

    const user = {
      username: "testi",
      name: "testi"
    }

    blog = {
      title: 'Component testing',
      author: 'Alice and Bob',
      url: 'www.abc.com',
      likes: '999',
      user: [{ username: "testi2", name: "testi2" }]
    }

    component = render(
      <Blog blog={blog} onClick={mockHandler} user={user} />
    )

  })

  test("at start only title and author are shown", () => {
    const titleAndAuthor = component.container.querySelector('.titleAndAuthor')
    const allInfo = component.container.querySelector('.allInfo')

    expect(titleAndAuthor).toHaveStyle('display: ')
    expect(allInfo).toHaveStyle('display:none')
  })

  test("after clicking shows all info", () => {
    const titleAndAuthor = component.container.querySelector('.titleAndAuthor')
    const allInfo = component.container.querySelector('.allInfo')

    fireEvent.click(titleAndAuthor)

    expect(allInfo).toHaveStyle('display: ')
    expect(titleAndAuthor).toHaveStyle('display:none')
  })


})