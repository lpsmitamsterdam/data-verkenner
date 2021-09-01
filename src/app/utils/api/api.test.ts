import type { MockedRequest } from '../../../../test/server'
import { server, rest } from '../../../../test/server'
import * as auth from '../auth/auth'
import { createUrlWithToken, fetchProxy, fetchWithToken } from './api'
import { AuthError, ForbiddenError, NotFoundError } from './customError'

jest.mock('../../../app/utils/auth/auth', () => jest.requireActual('../../../app/utils/auth/auth'))

const getAuthHeadersSpy = jest.spyOn(auth, 'getAuthHeaders').mockImplementation(() => ({}))

const mockResponse = {
  data: 'hello',
}

let request: MockedRequest

describe('Api service', () => {
  beforeEach(() => {
    server.use(
      rest.get(/localhost/, async (req, res, ctx) => {
        request = req
        return res(ctx.status(200), ctx.json(mockResponse))
      }),
    )
  })

  afterEach(() => {
    getAuthHeadersSpy.mockReset()
  })

  describe('fetchWithToken', () => {
    it('should return the response from fetch', async () => {
      const result = await fetchWithToken(
        'http://localhost/',
        {
          entryOne: 'foo',
          entryTwo: 'bar',
        },
        undefined,
        undefined,
        undefined,
        '',
      )

      expect(result).toEqual(mockResponse)
    })

    it('should not return the response from fetch when service is unavailable', async () => {
      server.use(
        rest.get(/localhost/, async (req, res, ctx) => {
          return res(ctx.status(503))
        }),
      )

      return expect(
        fetchWithToken(
          'http://localhost/',
          {
            entryOne: 'foo',
            entryTwo: 'bar',
          },
          undefined,
          undefined,
          undefined,
          '',
        ),
      ).rejects.toThrow('Service Unavailable')
    })

    it('should pass a signal: true to fetch options and add the token to the header', async () => {
      const controller = new AbortController()
      const { signal } = controller

      await fetchWithToken(
        'http://localhost/',
        {
          entryOne: 'foo',
          entryTwo: 'bar',
        },
        signal,
        undefined,
        undefined,
        'token12345',
      )

      expect(request.headers.get('authorization')).toEqual('Bearer token12345')
    })

    it('should pass custom headers along', async () => {
      const headers = new Headers({
        Test: 'foo',
      })

      await fetchWithToken(
        'http://localhost/',
        undefined,
        undefined,
        undefined,
        headers,
        'token12345',
      )

      expect(request.headers.get('test')).toEqual('foo')
    })
  })

  describe('createUrlWithToken', () => {
    it('should create an url with authorization token', () => {
      const result = createUrlWithToken('http://localhost?foo=data', 'token1234')

      expect(result).toEqual('http://localhost/?foo=data&access_token=token1234')
    })

    it('should create an url without authorization token', () => {
      const result = createUrlWithToken('http://localhost?foo=data', '')

      expect(result).toEqual('http://localhost/?foo=data')
    })
  })

  describe('fetchProxy', () => {
    const mockedProxyResponse = { foo: 'bar' }
    let proxyRequest: MockedRequest

    beforeEach(() => {
      server.use(
        rest.get(/404/, async (req, res, ctx) => {
          return res(ctx.status(404))
        }),

        rest.get(/403/, async (req, res, ctx) => {
          return res(ctx.status(403))
        }),

        rest.get(/401/, async (req, res, ctx) => {
          return res(ctx.status(401))
        }),

        rest.get(/domain/, async (req, res, ctx) => {
          proxyRequest = req
          return res(ctx.status(200), ctx.json(mockedProxyResponse))
        }),
      )
      getAuthHeadersSpy.mockImplementation(() => ({ Authorization: 'Bearer something' }))
    })

    it('should perform request', async () => {
      const url = 'https://www.domain.com/'
      const response = await fetchProxy(url)

      expect(proxyRequest.url.toString()).toEqual(url)
      expect(response).toEqual(mockedProxyResponse)
    })

    it('should append query string to request URL', async () => {
      const searchParams = {
        foo: 'bar',
        qux: 'zork',
      }
      const url = 'https://www.domain2.com/'
      await fetchProxy(url, { searchParams })

      expect(proxyRequest.url.toString()).toEqual(expect.stringContaining('foo=bar&qux=zork'))
    })

    it('should append query string to request URL with search params', async () => {
      const searchParams = {
        foo: 'bar',
        qux: 'zork',
      }
      const url = 'https://www.domain2.com?filter=a&page=1'
      await fetchProxy(url, { searchParams })

      expect(proxyRequest.url.toString()).toEqual(
        expect.stringContaining('filter=a&page=1&foo=bar&qux=zork'),
      )
    })

    it('should append auth headers to request', async () => {
      const url = 'https://www.domain3.com/'
      const rawHeaders = {
        'Content-Type': 'application/json',
      }
      await fetchProxy(url, { headers: rawHeaders })

      expect(proxyRequest.headers.get('Content-Type')).toEqual('application/json')
      expect(proxyRequest.headers.has('authorization')).toBeTruthy()
    })

    it('should throw a ForbiddenError if response has status 403', () => {
      const url = 'https://www.domain.com/403'

      expect(async () => {
        await fetchProxy(url)
      }).rejects.toThrow(ForbiddenError)
    })
    it('should throw a AuthError if response has status 401', () => {
      const url = 'https://www.domain.com/401'

      expect(async () => {
        await fetchProxy(url)
      }).rejects.toThrow(AuthError)
    })

    it('should throw a NotFoundError if response has status 404', () => {
      const url = 'https://www.domain.com/404'

      expect(async () => {
        await fetchProxy(url)
      }).rejects.toThrow(NotFoundError)
    })
  })
})
