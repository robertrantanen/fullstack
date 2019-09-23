import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const anecdote = action.data.anecdote
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(n =>
        n.id !== anecdote.id ? n : changed
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

export const vote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { anecdote },
    })
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