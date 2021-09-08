import * as fileSaver from 'file-saver'
import { act, renderHook } from '@testing-library/react-hooks'
import useDownload from './useDownload'

jest.useFakeTimers()

jest.mock('file-saver')

describe('useDownload', () => {
  it('should have correct initial values', () => {
    const { result } = renderHook(() => useDownload())

    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBeInstanceOf(Function)
  })

  it('should call fileSaver with right arguments', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        blob: () => 'blob',
        status: 200,
      }),
    )

    // @ts-ignore
    const mockFileSaver = jest.spyOn(fileSaver, 'default')
    const { result, waitForNextUpdate } = renderHook(() => useDownload())

    const downloadError = result.current[0]
    const loading = result.current[1]
    const downloadFn = result.current[2]
    act(() => {
      downloadFn('url', {}, 'filename.ext')
    })
    await waitForNextUpdate()
    expect(mockFileSaver).toHaveBeenCalledWith('blob', 'filename.ext')
    jest.runAllTimers()
    expect(downloadError).toBe(false)
    expect(loading).toBe(false)
  })

  it('should throw an error if the response status is not 200', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        blob: () => 'blob',
        status: 400,
      }),
    )

    const { result, waitForNextUpdate } = renderHook(() => useDownload())
    const downloadFn = result.current[2]

    act(() => {
      downloadFn('url', {}, 'filename.ext')
    })

    await act(async () => {
      await waitForNextUpdate()
      jest.runAllTimers()
    })

    const downloadError = result.current[0]
    const loading = result.current[1]

    expect(downloadError).toBe(true)
    expect(loading).toBe(true)
  })
})
