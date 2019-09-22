 
import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.create(content)
    props.setMessage("Added '" + content + "'")
    setTimeout(() => {
      props.setMessage('')
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default connect(
  null,
  { create, setMessage }
)(NewAnecdote)