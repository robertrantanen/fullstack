import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.store.getState().message !== '') {
    return (
      <div style={style}>
        {props.store.getState().message}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification