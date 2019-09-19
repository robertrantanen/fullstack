 
import React from 'react'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = ({ store }) => {
  const byVotes = (b1, b2) => b2.votes - b1.votes
  return (
    <ul>
      {store.getState().anecdotes.sort(byVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            store.dispatch(vote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes