import { DATA_SEARCH, HOMEPAGE } from './selectors'
import { SEARCH } from './selectorsNew'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      checkAutoSuggestFirstOfAll(searchTerm: string, result: string): void
      checkAutoSuggestFirstofCategory(searchTerm: string, category: string, result: string): void
      checkFirstInSearchResults(category: string, result: string, selector: string): void
      checkFirstParagraphLinkInSearchResults(searchResult: string): void
      searchAndCheck(searchTerm: string, result: string, result2?: string): void
      searchInCategoryAndCheckFirst(
        searchTerm: string,
        category: string,
        result: string,
        result2?: string,
      ): void
      searchWithFilter(category: string, searchTerm: string): void
    }
  }
}

Cypress.Commands.add('checkAutoSuggestFirstOfAll', (searchTerm: string, result: string) => {
  cy.intercept('POST', '/cms_search/graphql/').as('postGraphql')
  cy.intercept(`**/typeahead?q=${searchTerm.replace(/\s+/g, '+').toLowerCase()}*`).as(
    'getTypeAhead',
  )
  cy.get(SEARCH.searchBarFilter).select('Alle zoekresultaten')
  cy.get(SEARCH.searchInput).type(searchTerm, { delay: 80 })

  cy.wait('@getTypeAhead')
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
  cy.get(SEARCH.autoSuggestDropDownItem).first().should('have.text', result)
  cy.get(HOMEPAGE.buttonSearch).click()
  cy.wait('@postGraphql')
})

Cypress.Commands.add(
  'checkAutoSuggestFirstofCategory',
  (searchTerm: string, category: string, result: string) => {
    cy.intercept('POST', '/cms_search/graphql/').as('postGraphql')
    cy.intercept(`**/typeahead?q=${searchTerm.replace(/\s+/g, '+').toLowerCase()}*`).as(
      'getTypeAhead',
    )
    cy.get(SEARCH.searchBarFilter).select('Alle zoekresultaten')
    cy.get(SEARCH.searchInput).type(searchTerm, { delay: 80 })
    cy.wait('@getTypeAhead')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get(SEARCH.autoSuggestCategory)
      .contains(category)
      .siblings('ul')
      .children('li')
      .first()
      .should('have.text', result)
    cy.get(HOMEPAGE.buttonSearch).click()
    cy.wait('@postGraphql')
  },
)

Cypress.Commands.add(
  'checkFirstInSearchResults',
  (category: string, result: string, selector: string) => {
    cy.get(SEARCH.buttonFilteren).should('be.visible')
    cy.contains('resultaten)').should('be.visible')
    cy.get(DATA_SEARCH.searchResultsCategory).first().should('contain', category)
    cy.get(selector).first().should('have.text', result)
  },
)

Cypress.Commands.add('checkFirstParagraphLinkInSearchResults', (searchResult: string) => {
  cy.get(DATA_SEARCH.searchResultsParagraphLink).first().should('have.text', searchResult)
})

Cypress.Commands.add('searchAndCheck', (searchTerm: string, result: string, result2?: string) => {
  cy.checkAutoSuggestFirstOfAll(searchTerm, result)
  cy.checkFirstParagraphLinkInSearchResults(result2 || result)
})

Cypress.Commands.add(
  'searchInCategoryAndCheckFirst',
  (searchTerm: string, category: string, result: string, result2?: string) => {
    cy.checkAutoSuggestFirstofCategory(searchTerm, category, result)
    cy.checkFirstParagraphLinkInSearchResults(result2 || result)
  },
)

Cypress.Commands.add('searchWithFilter', (category: string, searchTerm: string) => {
  cy.get(DATA_SEARCH.searchBarFilter).select(category)
  cy.get(DATA_SEARCH.input).type(searchTerm)
  cy.get(DATA_SEARCH.form).submit()
  cy.wait(['@graphql', '@graphql'])
  cy.wait('@jsonapi')
  cy.contains(`${category} met '${searchTerm}' (`)
})
