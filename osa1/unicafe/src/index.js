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

const Statistics = (props) => {
  const t = Total(props)
  const a = Average(props)
  const p = Positive(props)
  if (t === 0) {
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {t}</p>
      <p>average {a}</p>
      <p>positive {p} %</p>
    </div>
  )
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
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


