import { renderHook } from '@testing-library/react-hooks'
import paramsRegistry from '../../store/params-registry'
import watchForChanges, { getFromURL } from './watchForChanges'
import * as usePrevious from './usePrevious'

const MOCK_PARAM_VALUE = 'result for param'

beforeEach(() => {
  paramsRegistry.getParam = jest.fn(() => MOCK_PARAM_VALUE)
  paramsRegistry.setParam = jest.fn()

  jest.spyOn(paramsRegistry, 'getParam')
})

describe('getFromURL', () => {
  it('should return all the params that are requested', () => {
    const output = getFromURL(['PARAM'])

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(output[0]).toBe(MOCK_PARAM_VALUE)
  })
})

describe('watchForChanges', () => {
  const dispatchMock = jest.fn()
  const PREVIOUS_STATE_VALUE = 'abc'
  usePrevious.default = jest.fn(() => PREVIOUS_STATE_VALUE)

  afterEach(() => {
    dispatchMock.mockReset()
    usePrevious.default.mockReset()
  })

  it('should update the url when the state changes', () => {
    renderHook(() => watchForChanges('PARAM', null, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(paramsRegistry.setParam).toBeCalledWith('PARAM', null, false)
    // expect(dispatchMock).toBeCalledWith(MOCK_PARAM_VALUE) // If the param shouldn't be updated, the state must as the value for the URL and the state are different
  })

  it('but not when the state is equal to the previous state', () => {
    renderHook(() => watchForChanges('PARAM', PREVIOUS_STATE_VALUE, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(paramsRegistry.setParam).not.toBeCalledWith('PARAM', null, false)
  })

  it('or the state is equal to the param value', () => {
    renderHook(() => watchForChanges('PARAM', MOCK_PARAM_VALUE, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(paramsRegistry.setParam).not.toBeCalledWith('PARAM', null, false)
  })

  it('should update the state when the url changes', () => {
    renderHook(() => watchForChanges('PARAM', null, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(dispatchMock).toBeCalledWith(MOCK_PARAM_VALUE)
  })

  it('but not when the param value is equal to the state', () => {
    renderHook(() => watchForChanges('PARAM', MOCK_PARAM_VALUE, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(dispatchMock).not.toBeCalled()
  })

  it('or the param value is equal to the previous state', () => {
    usePrevious.default = jest.fn(() => MOCK_PARAM_VALUE)

    renderHook(() => watchForChanges('PARAM', null, dispatchMock))

    expect(paramsRegistry.getParam).toBeCalledWith('PARAM')
    expect(dispatchMock).not.toBeCalled()
  })
})
