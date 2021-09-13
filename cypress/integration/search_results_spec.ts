import { DATA_SEARCH } from '../support/selectors'

describe('Search results', () => {
  describe('Search results multiple', () => {
    beforeEach(() => {
      cy.hidePopup()
      cy.visit('/')
    })
    it("Should search: 'Toerisme' in category 'Datasets' and check autosuggest: 'Toerisme in Amsterdam' and search result: 'Toerisme'", () => {
      cy.checkAutoSuggestFirstofCategory('Toerisme', 'Datasets', 'Toerisme in Amsterdam')
      cy.checkFirstInSearchResults('Dossiers', 'Toerisme', DATA_SEARCH.searchResultsEditorialCard)
    })
    // Skipped becasue we need to improve autosuggest and search options first.
    it.skip("Should search: 'Factsheet' and check if first autosuggestitem and searchresult are: 'Factsheet: Amsterdam fietsstad'", () => {
      cy.checkAutoSuggestFirstOfAll('Factsheet', 'Factsheet: Amsterdam fietsstad')
      cy.checkFirstInSearchResults(
        'Publicaties',
        'Factsheet: Amsterdam fietsstad',
        DATA_SEARCH.searchResultsEditorialCard,
      )
    })
    it("Should search: 'Toerisme' in category 'Artikel' and check if first autosuggestitem and searchresult are: 'Dossier: Toerisme'", () => {
      cy.checkAutoSuggestFirstofCategory('Toerisme', 'Artikelen', 'Toerisme onder druk?')
      cy.checkFirstInSearchResults('Dossiers', 'Toerisme', DATA_SEARCH.searchResultsEditorialCard)
    })
    it("Should search: 'Drugs' in category 'Artikelen' and check autosuggest: 'Drugsoverlast Zuidoost daalt' and search result: 'Gezondheid Amsterdam' ", () => {
      cy.checkAutoSuggestFirstofCategory('Drugs', 'Artikelen', 'Drugsoverlast Zuidoost daalt')
      cy.checkFirstInSearchResults(
        'Datasets',
        'Gezondheid Amsterdam',
        DATA_SEARCH.searchResultsDatasetCard,
      )
    })
    it("Should search: 'Staat van de stad' in category 'Artikelen' and check autosuggest: 'Staat van de Stad' and search result: 'Dossier: corona en de economie'", () => {
      cy.checkAutoSuggestFirstofCategory(
        'Staat van de stad',
        'Artikelen',
        'De Staat van de Stad Amsterdam V verschenen; 10 jaar Staat van de Stad',
      )
      cy.checkFirstInSearchResults(
        'Dossiers',
        'Corona en de economie',
        DATA_SEARCH.searchResultsEditorialCard,
      )
    })
    it("Should search: 'Toerisme' in category 'Dossiers' and check if first autosuggestitem and searchresult are: 'Dossier: Toerisme'", () => {
      cy.checkAutoSuggestFirstofCategory('Toerisme', 'Dossiers', 'Toerisme')
      cy.checkFirstInSearchResults('Dossiers', 'Toerisme', DATA_SEARCH.searchResultsEditorialCard)
    })
    it("Should search: 'Veiligheidsindex' in category 'Specials' and check if first autosuggestitem and searchresult are: 'Dashboard veiligheid'", () => {
      cy.checkAutoSuggestFirstofCategory(
        'Veiligheidsindex',
        'Specials',
        'Dashboard Veiligheid (dashboard)',
      )
      cy.checkFirstInSearchResults(
        'Specials',
        'Dashboard Veiligheid',
        DATA_SEARCH.searchResultsEditorialCard,
      )
    })
    it("Should search: 'Verzinkbare palen' in category 'Kaartlagen' and check if first autosuggestitem and searchresult are: 'Kaartlaag: Verzinkbare palen'", () => {
      cy.checkAutoSuggestFirstofCategory('Verzinkbare palen', 'Kaartlagen', 'Verzinkbare palen')
      cy.checkFirstInSearchResults('Kaartlagen', 'Verzinkbare palen', DATA_SEARCH.searchResultsLink)
    })
  })
})
