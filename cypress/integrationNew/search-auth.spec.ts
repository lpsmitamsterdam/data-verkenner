// import { SEARCH } from '../support/selectorsNew'

// describe('search, authenticated', () => {
//   describe('Search results all categories, authenticated as employee', () => {
//     beforeEach(() => {
//       cy.visit('/')
//     })
//
//     before(() => {
//       cy.login('EMPLOYEE')
//     })
//
//     after(() => {
//       cy.logout()
//     })
//
//     it("Should search: '34712526' and first autosuggestitem and searchresult are: 'Café Ouwe Garde - Buitenveldertselaan 28'", () => {
//       cy.searchAndCheck('34712526', 'Café Ouwe Garde - Buitenveldertselaan 28\n1081AA Amsterdam')
//     })
//     it("Should search: 'Centraal stomerij' and first autosuggestitem and searchresult are: 'Centraal Stomerij - Overtoom 79 H'", () => {
//       cy.searchAndCheck('Centraal stomerij', 'Centraal Stomerij - Overtoom 79 H')
//     })
//     it("Should search: '67743293' and first autosuggestitem and searchresult are: 'Vlaamsche Friethuis'", () => {
//       cy.searchAndCheck('67743293', 'Vlaamsche Friethuis')
//     })
//   })

// describe('Search results specific category, authenticated', () => {
//   beforeEach(() => {
//     cy.hidePopup()
//     cy.visit('/')
//   })
//
//   before(() => {
//     cy.login('EMPLOYEE')
//   })
//
//   after(() => {
//     cy.logout()
//   })
//   it("Should search: 'Centraal stomerij' in category 'Maatschappelijke activiteit' and check autosuggest: 'Centraal Stomerij' and search result: 'Centraal Stomerij - Overtoom 79 H'", () => {
//     cy.searchInCategoryAndCheckFirst(
//       'Centraal stomerij',
//       'Maatschappelijke activiteit',
//       'Centraal Stomerij',
//       'Centraal Stomerij - Overtoom 79 H',
//     )
//   })
// })
// })
