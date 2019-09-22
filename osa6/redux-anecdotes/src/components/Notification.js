import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.message !== '') {
    return (
      <div style={style}>
        {props.message}
      </div>
    )
  }
  return (
    <div></div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    message: state.message,
    filter: state.filter,
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification