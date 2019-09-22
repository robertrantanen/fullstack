 
import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

  const dispatchFunction = (id, content) => {
    props.vote(id)
    props.setMessage("Voted '" + content + "'")
    setTimeout(() => {
      props.setMessage('')
    }, 5000)
  }
  const byVotes = (b1, b2) => b2.votes - b1.votes
  const filteredAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    message: state.message,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setMessage
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes