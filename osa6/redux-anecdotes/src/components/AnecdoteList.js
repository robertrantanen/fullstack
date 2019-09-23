 
import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

  const dispatchFunction = (anecdote) => {
    props.vote(anecdote)
    props.setMessage("Voted '" + anecdote.content + "'", 5)

  }

  return (
    <ul>
      {props.visibleAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatchFunction(anecdote)
          }
        />
      )}
    </ul>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const byVotes = (b1, b2) => b2.votes - b1.votes
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort(byVotes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote,
  setMessage
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes