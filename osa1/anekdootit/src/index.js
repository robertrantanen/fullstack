import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const points = new Array(anecdotes.length)
points.fill(0)

const Random = (props) => {
    return Math.floor(Math.random() * props)
  }

const App = (props) => { 
  const [selected, setSelected] = useState(0)
  const [p, setP] = useState(0)

  const generateRandom = () => {
    const random = Random(props.anecdotes.length)
    setSelected(random)
    setP(points[random])
  }

  const voteUp = () => {
    points[selected] += 1
    setP(points[selected])
  }

  return (
    <div>
      <h3>{props.anecdotes[selected]}</h3>
      <h4>has {p} votes</h4>
      <button onClick={() => generateRandom()}>
        next anecdote
      </button>
      <button onClick={() => voteUp()}>
        vote
      </button>
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
