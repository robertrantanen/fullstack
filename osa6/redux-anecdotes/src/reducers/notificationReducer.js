const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.message
      case 'CLEAR':
        return ''
      default:
        return state
    }
  }

export const setMessage = (message, time) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch ({
        type: 'CLEAR'
      })
    }, time * 1000)
    dispatch ({
      type: 'SET_MESSAGE',
      message,
    })
  }
}


export default notificationReducer