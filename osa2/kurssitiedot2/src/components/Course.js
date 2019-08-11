import React from 'react'

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
  return <h2>{course}</h2> 
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <b>total of {total} exercises</b>
}
  
const Part = ({part}) => (
  <p key={part.id}> {part.name} {part.exercises}</p>
)

const Content = ({parts}) => (
  parts.map(part => Part(part={part}))
)

export default Course