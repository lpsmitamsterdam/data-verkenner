import { useEffect } from 'react'
import paramsRegistry from '../../store/params-registry'
import usePrevious from './usePrevious'

export function getFromURL(params: string[]) {
  return params.map((param) => paramsRegistry.getParam(param))
}

export default function watchForChanges(
  param: string,
  state: any,
  dispatchAction: Function,
  replace: boolean = false,
) {
  const paramValue = paramsRegistry.getParam(param)
  const previousState = usePrevious(state)

  useEffect(() => {
    // Update the url if the state differs from the previous state and the current URL param value
    if (
      JSON.stringify(state) !== JSON.stringify(previousState) &&
      JSON.stringify(state) !== JSON.stringify(paramValue)
    ) {
      paramsRegistry.setParam(param, state, replace)
    }
  }, [state])

  useEffect(() => {
    // Update the state if the URL does not match the current or previous state
    if (
      paramValue &&
      JSON.stringify(paramValue) !== JSON.stringify(state) &&
      JSON.stringify(paramValue) !== JSON.stringify(previousState)
    ) {
      dispatchAction(paramValue)
    }
  }, [paramValue])
}
