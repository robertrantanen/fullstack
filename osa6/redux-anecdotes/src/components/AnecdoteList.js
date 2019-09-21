 
import React from 'react'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const Anecdotes = ({ store }) => {

  const dispatchFunction = (id, content) => {
    store.dispatch(vote(id))
    store.dispatch(setMessage("Voted '" + content + "'"))
    setTimeout(() => {
      store.dispatch(setMessage(''))
    }, 5000)
  }
  const byVotes = (b1, b2) => b2.votes - b1.votes
  const filteredAnecdotes = store.getState().anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.getState().filter.toLowerCase()))
  return (
    <ul>
      {filteredAnecdotes.sort(byVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatchFunction(anecdote.id, anecdote.content)
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes