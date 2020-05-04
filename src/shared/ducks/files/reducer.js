import paramsRegistry from '../../../store/params-registry'
import { initialState, REDUCER_KEY, RESET_FILE } from './constants'

export { REDUCER_KEY as FILES_REDUCER }

const reducer = (state = initialState, action) => {
  const enrichedState = {
    ...state,
    ...paramsRegistry.getStateFromQueries(REDUCER_KEY, action),
  }
  switch (action.type) {
    case RESET_FILE:
      return {
        ...initialState,
      }

    default:
      return enrichedState
  }
}

export default reducer
