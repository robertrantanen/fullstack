 
import React from 'react'

import { create } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(
      create(content)
    )
    props.store.dispatch(
      setMessage("Added '" + content + "'")
    )
    setTimeout(() => {
      props.store.dispatch(setMessage(''))
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default NewAnecdote