import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <div key={course.name}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => {
  return <h1>{course}</h1> 
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <b>total of {total} exercises</b>
}
  

const Part = ({part}) =>
  <p key={part.id}> {part.name} {part.exercises}</p>

const Content = ({parts}) => (
  parts.map(part => Part(part={part}))
)

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    
      return (
        courses.map(course => Course(course={course}))
      )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
