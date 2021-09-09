import { renderHook } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'
import AuthScope from '../../utils/api/authScope'
import { getScopes } from '../../utils/auth/auth'
import useAuthScope from './useAuthScope'

jest.mock('../../../shared/utils/auth/auth')

const mockedGetScopes = mocked(getScopes)

describe('useAuthScope', () => {
  it('isUserAuthorized should return a boolean whether user is authorized or not', () => {
    mockedGetScopes.mockReturnValue([AuthScope.HrR, AuthScope.BrkRs, AuthScope.BdR])

    const { result } = renderHook(() => useAuthScope())
    expect(result.current.isUserAuthorized([AuthScope.BrkRs])).toBe(true)
    expect(result.current.isUserAuthorized([AuthScope.BrkRs, AuthScope.HrR])).toBe(true)

    // Not in scope
    expect(result.current.isUserAuthorized([AuthScope.BrkRo])).toBe(false)
    expect(result.current.isUserAuthorized([AuthScope.CatR, AuthScope.BdX])).toBe(false)
  })
})
