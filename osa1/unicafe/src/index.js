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
        <h1>Statistics</h1>
        <h3>No feedback given</h3>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <Statistic text="good" value = {props.good} />
      <Statistic text="neutral" value = {props.neutral} />
      <Statistic text="bad" value = {props.bad} />
      <Statistic text="all" value = {t} />
      <Statistic text="average" value = {a} />
      <Statistic text="positive" value = {p} />
    </div>
  )
}

const Statistic = (props) => {
  if (props.text === "positive") {
    return (
      <div>
        <p>{props.text} {props.value} %</p>
      </div>
    )
  }
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
        <Button
        handleClick={() => setGood(good + 1)}
        text="good"
        />
        <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral"
        />
        <Button
        handleClick={() => setBad(bad + 1)}
        text="bad"
        />
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


