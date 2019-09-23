import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(n =>
        n.id !== id ? n : changed
      )
    default:
      return state
  }
}

export const create = (content) => {
  return async dispatch => {
    const newA = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newA,
    })
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default reducer