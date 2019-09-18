import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes store={props.store} />
      <NewAnecdote store={props.store} />
    </div>
  )
}

export default App