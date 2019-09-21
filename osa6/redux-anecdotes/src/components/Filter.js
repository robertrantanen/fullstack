import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()
    const filter = event.target.value
    props.store.dispatch(
      setFilter(filter)
    )
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter