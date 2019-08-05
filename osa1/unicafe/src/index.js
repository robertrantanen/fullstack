import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Total = (props) => {
    return props.good + props.neutral + props.bad
}

const Average = (props) => {
    const t = Total(props)
    return ((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / t
}

const Positive = (props) => {
    const t = Total(props)
    return (props.good / t) * 100
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all <Total good = {good} neutral = {neutral} bad = {bad}/></p>
        <p>average <Average good = {good} neutral = {neutral} bad = {bad}/></p>
        <p>positive <Positive good = {good} neutral = {neutral} bad = {bad}/> %</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


