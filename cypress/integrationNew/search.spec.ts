import { SEARCH } from '../support/selectorsNew'

describe('search', () => {
  describe('user should be able to use the searchbar', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should render the search form', () => {
      cy.get(SEARCH.searchInput).should('be.visible')
    })
  })

  describe('Search results all categories, not authenticated', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it("Should search: '363010000546374' and first autosuggestitem and searchresult are: 'Eerste Jan van der Heijdenstraat 2'", () => {
      cy.searchAndCheck('363010000546374', 'Eerste Jan van der Heijdenstraat 2')
    })
    it("Should search: '1072' and first autosuggestitem and searchresult are: 'Albert Cuypstraat'", () => {
      cy.searchAndCheck('1072', 'Albert Cuypstraat')
    })
    it("Should search: '1072 TT' and first autosuggestitem and searchresult are: 'Eerste Jan van der Heijdenstraat'", () => {
      cy.searchAndCheck('1072 TT', 'Eerste Jan van der Heijdenstraat')
    })
    it("Should search: '1072TT' and first autosuggestitem and searchresult are: 'Eerste Jan van der Heijdenstraat'", () => {
      cy.searchAndCheck('1072TT', 'Eerste Jan van der Heijdenstraat')
    })
    it("Should search: 'Westerdok' and first autosuggestitem and searchresult are: 'Westerdok'", () => {
      cy.searchAndCheck('Westerdok', 'Westerdok')
    })
    it("Should search: 'Bijenkorf' and first autosuggestitem and searchresult are: 'De Bijenkorf'", () => {
      cy.searchAndCheck('Bijenkorf', 'De Bijenkorf')
    })
    it("Should search: '363200003761447' and first autosuggestitem and searchresult are: 'Dam 1'", () => {
      cy.searchAndCheck('363200003761447', 'Dam 1')
    })
    it("Should search: '363010000545372' and first autosuggestitem and searchresult are: 'Eerste Hugo de Grootstraat 7-3'", () => {
      cy.searchAndCheck('363010000545372', 'Eerste Hugo de Grootstraat 7-3')
    })
    it("Should search: '363020001988063' and first autosuggestitem and searchresult are: 'Singel 622'", () => {
      cy.searchAndCheck('363020001988063', 'Singel 622', 'Singel 622 (plaats aangewezen)')
    })
    it("Should search: '363030000927437' and first autosuggestitem and searchresult are: 'Ma Braunpad 2 (plaats aangewezen)'", () => {
      cy.searchAndCheck('363030000927437', 'Ma Braunpad 2', 'Ma Braunpad 2 (plaats aangewezen)')
    })
    it("Should search: '363200003761450' and first autosuggestitem and searchresult are: 'Groenburgwal 25'", () => {
      cy.searchAndCheck('363200003761450', 'Groenburgwal 25', 'Groenburgwal 25')
    })
    it("Should search: 'ASD23 AB 02208 A 0001' and first autosuggestitem and searchresult are: 'ASD23 AB 02208 A 0001'", () => {
      cy.searchAndCheck('ASD23 AB 02208 A 0001', 'ASD23 AB 02208 A 0001')
    })
    it("Should search: 'Aalsmeer B47' and first autosuggestitem and searchresult are: 'AMR03 B 04705 G 0000'", () => {
      cy.searchAndCheck('Aalsmeer B47', 'AMR03 B 04705 G 0000')
    })
    it("Should search: 'Jordaan' and first autosuggestitem and searchresult are: 'Jordaan (wijk)'", () => {
      cy.searchAndCheck('Jordaan', 'Jordaan (wijk)')
    })
    it("Should search: 'Kernzone ' and first autosuggestitem and searchresult are: 'Kernzone (unesco)'", () => {
      cy.searchAndCheck('Kernzone ', 'Kernzone (unesco)')
    })
    it("Should search: '10381' and first autosuggestitem and searchresult are: '10381000'", () => {
      cy.searchAndCheck('10381', '10381000')
    })
    it("Should search: 'yd21' and first autosuggestitem and searchresult are: 'YD21 (bouwblok)'", () => {
      cy.searchAndCheck('yd21', 'YD21 (bouwblok)')
    })
    it("Should search: 'Rijksmuseum' and first autosuggestitem and searchresult are: 'Het Rijksmuseum'", () => {
      cy.searchAndCheck('Rijksmuseum', 'Het Rijksmuseum')
    })
  })
})
