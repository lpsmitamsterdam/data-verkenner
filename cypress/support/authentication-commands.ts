import { v4 as uuidv4 } from 'uuid'
import { HEADER_MENU } from './selectors'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(type?: string): void
      logout(): void
    }
  }
}

const USER_TOKENS = {}


Cypress.Commands.add('login', ({ realm, username, password, client_id, redirect_uri }) =>
  cy
    .request({
      url: `https://iam.amsterdam.nl/auth/realms/${realm}/protocol/openid-connect/auth`,
      qs: {
        client_id,
        redirect_uri,
        scope: 'openid',
        state: uuidv4(),
        nonce: uuidv4(),
        response_type: 'code',
        response_mode: 'fragment',
        code_challenge: 'yourcodechallengestring',
        code_challenge_method: 'S256',
      },
    })
    .then((response) => {
      const html = document.createElement('html')
      html.innerHTML = response.body

      const form = html.getElementsByTagName('form')
      const isAuthorized = !form.length

      if (!isAuthorized)
        return cy.request({
          form: true,
          method: 'POST',
          url: form[0].action,
          followRedirect: false,
          body: {
            username,
            password,
          },
        })
    }),
)

Cypress.Commands.add('loginOLD', (type = 'EMPLOYEE_PLUS') => {
  const baseUrl = Cypress.config('baseUrl') as string

  if (USER_TOKENS[type]) {
    cy.log('access token available, using that one')
    return cy
      .window()
      .its('sessionStorage')
      .invoke('setItem', 'accessToken', USER_TOKENS[type])
      .then(() => cy.visit(baseUrl))
  }

  const stateToken = uuid()

  cy.window().its('sessionStorage').invoke('setItem', 'returnPath', '#')
  cy.window().its('sessionStorage').invoke('setItem', 'stateToken', stateToken)

  const redirectUri = 'http://localhost:3000/'
  const url = [
    Cypress.env('API_ROOT'),
    '/oauth2/authorize?',
    'idp_id=datapunt&',
    'response_type=token&',
    'client_id=citydata&',
    'scope=BRK%2FRS%20BRK%2FRSN%20BRK%2FRO%20WKPB%2FRBDU%20MON%2FRBC%20MON%2FRDM%20HR%2FR%20CAT%2FW&',
    `state=${encodeURIComponent(stateToken)}&`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
  ].join('')

  // Open IDP (SSO)
  // TODO: Replace URL with `${API_ROOT}${AUTH_PATH}...` as soon as Cypress
  // supports the spread operator
  return (
    cy
      .request({
        url,
        followRedirect: false,
      })

      // Follow redirect to login page manually
      .then((response) =>
        cy.request({
          url: response.headers.location,
          followRedirect: false,
        }),
      )

      // Post credentials and account type
      // extracts url from form
      .then((response) =>
        cy.request({
          method: 'POST',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          url: `${Cypress.env('API_ROOT')}/auth/idp/${response.body.match(/action="(.*?)"/).pop()}`,
          form: true,
          body: {
            email: Cypress.env(`USERNAME_${type}`),
            password: Cypress.env(`PASSWORD_${type}`),
            type: type.toLowerCase(),
          },
          followRedirect: false,
          failOnStatusCode: false,
        }),
      )

      // Follow redirect manually
      .then((response) =>
        cy.request({
          url: response.headers.location,
          followRedirect: false,
        }),
      )

      // Return to the application
      .then((response) => {
        // Replace redirect URI from earlier (localhost:3000) with baseUrl
        const originalUrl = response.headers.location
        const returnUrl = originalUrl.replace(redirectUri, baseUrl)
        cy.hidePopup()
        return cy.visit(returnUrl)
      })

      .then(() => {
        cy.window().then(() => {
          cy.window()
            .its('sessionStorage')
            .invoke('getItem', 'accessToken')
            .then((value) => {
              USER_TOKENS[type] = value
            })
        })
      })
  )
})

Cypress.Commands.add('logoutOLD', () => {
  const loginMenuItem = `${HEADER_MENU.rootMobile} ${HEADER_MENU.login}`
  cy.get(loginMenuItem)
    .then((element) => {
      if (!element.is(':visible')) {
        cy.get(`${HEADER_MENU.rootMobile}`).click({ force: true })
      }
    })
    .get(loginMenuItem)
    .click({ force: true })
    .find('ul')
    .find('button')
    .click({ force: true })
})
