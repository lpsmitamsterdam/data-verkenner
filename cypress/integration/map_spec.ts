import { centerParam, viewParam } from '../../src/pages/MapPage/query-params'
import { routing } from '../../src/routes'
import {
  ADDRESS_PAGE,
  COMPONENTS,
  DATA_SEARCH,
  DETAIL_PANEL,
  HOMEPAGE,
  MAP,
  MAP_LAYERS,
} from '../support/selectors'

describe('map module', () => {
  describe('user should be able to navigate to the map from the homepage', () => {
    it('should open the map', () => {
      cy.intercept('**/jsonapi/node/list/**').as('jsonapi')
      cy.intercept('POST', '/cms_search/graphql/').as('graphql')
      cy.hidePopup()
      cy.visit('/')

      cy.wait('@jsonapi')
      cy.get(HOMEPAGE.navigationBlockKaart).should('be.visible')
      cy.get(MAP.mapContainer).should('not.exist')
      cy.get(HOMEPAGE.navigationBlockKaart).click()
      cy.wait('@graphql')
      cy.wait('@graphql')
      cy.url().should('include', '/data/?modus=kaart&legenda=true')
      cy.get(MAP.mapContainer).should('be.visible')
      cy.get(MAP.mapPanelBackgroundLabel).should('be.visible').and('have.text', 'Achtergrond')

      cy.checkTopography()
      cy.get(MAP.buttondropDownTopografie).click()
      cy.get(MAP.dropDownItem).contains('Topografie grijs').click()
      cy.url().should('include', 'data/?modus=kaart&achtergrond=topo_rd_zw&legenda=true')

      cy.checkAerialPhotos()
      cy.get(MAP.buttonDropDownLuchtfoto).click()
      cy.get(MAP.dropDownItem).contains('Luchtfoto 2018').click()
      cy.url().should('include', 'data/?modus=kaart&achtergrond=lf2018&legenda=true')
    })
  })

  describe('user should be able to interact with the map', () => {
    it('should show results based on the interaction with the map', () => {
      cy.intercept('**/panorama/thumbnail?*').as('getPanorama')
      const svgMapPath = '/assets/images/map/'
      cy.defineGeoSearchRoutes()
      cy.defineAddressDetailRoutes()

      // Use regular expression to match spaces
      cy.intercept('**/typeahead?q=dam+1*').as('getTypeaheadResults')

      // ensure the viewport is always the same in this test, so the clicks can be aligned properly
      cy.viewport(1000, 660)
      cy.hidePopup()
      cy.visit('/')

      cy.get(HOMEPAGE.navigationBlockKaart).click()
      cy.get(DATA_SEARCH.autoSuggestInput).focus().type('dam 1')

      cy.wait('@getTypeaheadResults')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.get(DATA_SEARCH.autoSuggest).contains('Dam 1').click()

      cy.wait('@getVerblijfsobject')
      // check that the circle icon is drawed on the map
      cy.get(MAP.iconMapMarker)
        .should('be.visible')
        .and('have.attr', 'src', `${svgMapPath}detail.svg`)
      cy.checkPreviewPanel(['Dam 1', 'winkelfunctie'])

      // click somewhere in the map (not on a marker)
      cy.get(ADDRESS_PAGE.mapContainer).click(560, 293)

      cy.waitForGeoSearch()
      cy.get(MAP.iconMapMarker)
        .should('be.visible')
        .and('have.attr', 'src', `${svgMapPath}search.svg`)

      cy.get(MAP.mapPreviewPanelVisible).contains('Beursplein 15').click()

      cy.get(MAP.iconMapMarker)
        .should('be.visible')
        .and('have.attr', 'src', `${svgMapPath}detail.svg`)
      cy.get(MAP.mapPreviewPanelVisible).get(MAP.mapDetailPanoramaHeaderImage).should('be.visible')
      cy.checkPreviewPanel(['Type adres', 'Hoofdadres'])

      // click on the button inside the panel balloon thingy, and expect the large right column to
      // become visible
      cy.get(MAP.buttonEnlarge).should('exist').click()

      cy.get(ADDRESS_PAGE.resultsPanel).should('be.visible')

      cy.waitForAdressDetail()

      cy.get(DETAIL_PANEL.heading).contains('Beursplein 15')
      cy.get(DETAIL_PANEL.main).get('dl').contains('1012JW')
      cy.wait('@getPanorama')
      cy.get(COMPONENTS.panoramaPreview).should('be.visible')
    })
  })

  describe('user should be able to use the map', () => {
    it('should render the leaflet map', () => {
      cy.hidePopup()
      cy.visit(`/${routing.data.path}?${viewParam.name}=kaart`)
      cy.get(ADDRESS_PAGE.mapContainer).should('be.visible')
      cy.get(MAP.mapContainer).should('be.visible')
      cy.get('.leaflet-tile-container').should('be.visible')
    })

    it('should add a map-layer to the leaflet map', () => {
      cy.hidePopup()
      cy.visit(
        `/${routing.data.path}?${centerParam.name}=52.3731081%2C4.8932945&${viewParam.name}=kaart`,
      )
      // the map-panel should have the class collapsed by default
      cy.get(MAP.mapPanel).should('have.class', 'map-panel--collapsed')
      cy.get(MAP.toggleMapPanel).click()
      // the map panel should have the class expanded
      cy.get(MAP.mapPanel).should('have.class', 'map-panel--expanded')
      // the scroll wrapper should be visible when map panel is expanded
      cy.get(DATA_SEARCH.scrollWrapper).should('exist').and('be.visible')
      cy.get(MAP_LAYERS.checkboxGebiedsindeling).check({ force: true })
      cy.get(MAP.mapOverlayPane).children().should('exist')
      cy.get(MAP.mapOverlayPane).find('canvas').should('exist')
    })

    it('should add a layer to the map', () => {
      cy.intercept('**/typeahead?q=spuistraat+59a*').as('getTypeaheadResults')
      cy.intercept('**/panorama/thumbnail?*').as('getPanorama')
      cy.intercept('**/bag/v1.1/verblijfsobject/*').as('getVerblijfsobject')
      cy.hidePopup()
      cy.visit(`/`)
      cy.get(HOMEPAGE.navigationBlockKaart).click()
      cy.url().should('include', '/data/?modus=kaart&legenda=true')
      cy.get(MAP.mapContainer).should('be.visible')

      // Legend and checkboxes are not visible
      cy.get(MAP.mapLegend).should('not.exist')
      cy.contains('Kadastrale perceelsgrenzen').should('not.exist')
      cy.contains('Kadastrale eigenaren').should('not.exist')
      cy.contains('Kadastrale erfpachtuitgevers').should('not.exist')
      cy.contains('Gemeentelijk eigendom').should('not.exist')
      cy.get(MAP.zoomInAlert).should('not.exist')
      cy.contains('Panden ouder dan 1960').should('not.exist')
      cy.contains('Panden naar bouwjaar').should('not.exist')

      cy.get('[data-testid="mapLegendLayerButtonOnroerendeZaken"]')
        .contains('Onroerende zaken')
        .parents(MAP.mapLegendItemButton)
        .click('right')

      // Legend and checkboxes are visible
      cy.get(MAP.mapLegend).should('be.visible')
      cy.contains('Kadastrale perceelsgrenzen').should('be.visible')
      cy.contains('Kadastrale eigenaren').should('be.visible')
      cy.contains('Kadastrale erfpachtuitgevers').should('be.visible')
      cy.contains('Gemeentelijk eigendom').should('be.visible')
      cy.contains('Panden ouder dan 1960').should('be.visible')
      cy.contains('Panden naar bouwjaar').should('be.visible')

      // Checkboxes related to Kadastrale perceelsgrenzen are not visible
      cy.get(MAP_LAYERS.checkboxOZKKPBurgerlijkeGemeente).should('not.exist')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleGemeente).should('not.exist')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleSectie).should('not.exist')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraalObject).should('not.exist')

      cy.get(MAP.mapZoomIn).click()
      cy.get(MAP.mapOverlayPane).children().should('not.exist')
      cy.get(MAP.imageLayer).should('not.exist')
      cy.get(MAP_LAYERS.checkboxOZKadastralePerceelsgrenzen).click({ force: true })

      // Checkboxes related to Kadastrale perceelsgrenzen are visible
      cy.get(MAP_LAYERS.checkboxOZKKPBurgerlijkeGemeente).should('be.visible').and('be.checked')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleGemeente).should('be.visible').and('be.checked')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleSectie).should('be.visible').and('be.checked')
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraalObject).should('be.visible').and('be.checked')

      // Check if layers exists
      cy.get(MAP.imageLayer).should('have.length', 4)

      cy.get(MAP_LAYERS.checkboxOZKadastralePerceelsgrenzen).uncheck({ force: true })
      cy.get(MAP.mapOverlayPane).children().should('not.exist')
      cy.get(MAP_LAYERS.checkboxOZKadastralePerceelsgrenzen).click({ force: true })

      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleGemeente).uncheck({ force: true })
      cy.get(MAP_LAYERS.checkboxOZKKPKadastraleSectie).uncheck({ force: true })

      // Check if 2 layers are visible and 2 are not visible, based on opacity
      cy.get(MAP.imageLayer)
        .eq(0)
        .should('have.attr', 'style', 'opacity: 100; visibility: visible;')
      cy.get(MAP.imageLayer)
        .eq(3)
        .should('have.attr', 'style', 'opacity: 100; visibility: visible;')
      cy.get(MAP.imageLayer).eq(1).should('have.attr', 'style', 'opacity: 0; visibility: visible;')
      cy.get(MAP.imageLayer).eq(2).should('have.attr', 'style', 'opacity: 0; visibility: visible;')

      cy.get(MAP.iconMapMarker).should('not.exist')

      cy.get(DATA_SEARCH.autoSuggestInput).focus().type('Spuistraat 59A')

      cy.wait('@getTypeaheadResults')
      cy.get(DATA_SEARCH.autoSuggest).contains('Spuistraat 59A').click()
      cy.wait('@getVerblijfsobject')
      cy.wait('@getPanorama')
      cy.get(MAP.mapZoomIn).click({ force: true })
      cy.get(MAP.mapDetailResultPanel).should('be.visible')
      cy.get(MAP.iconMapMarker).should('be.visible')

      cy.get(MAP_LAYERS.checkboxOnroerendeZaken).click({ force: true })
      cy.get(MAP_LAYERS.checkboxOnroerendeZaken).click({ force: true })
      cy.get(MAP.imageLayer).should('not.exist')
    })
  })

  describe('user should be able to open the map panel when collapsed', () => {
    it('should open the map panel component', () => {
      cy.hidePopup()
      cy.visit(`/${routing.data.path}?${viewParam.name}=kaart`)

      cy.get(MAP.mapPanel).should('have.class', 'map-panel--collapsed')
      cy.get(DATA_SEARCH.scrollWrapper).should('not.be.visible')
      cy.get(MAP.toggleMapPanel).click()
      cy.get(MAP.mapPanel).should('have.class', 'map-panel--expanded')
      cy.get(DATA_SEARCH.scrollWrapper).should('be.visible')
    })
  })

  describe('Should see less when not logged in', () => {
    it('should see no layers vestigingen on the map if not logged in', () => {
      cy.hidePopup()
      cy.visit(`/`)
      cy.get(HOMEPAGE.navigationBlockKaart).click()
      cy.url().should('include', '/data/?modus=kaart&legenda=true')
      cy.get(MAP.mapContainer).should('be.visible')

      cy.get(MAP.mapPanelHandle)
        .find(MAP.mapLegendLabel)
        .contains('Vestigingen')
        .parents(MAP.mapLegendItemButton)
        .click('right')

      cy.get(MAP_LAYERS.checkboxVestigingBouw).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingCultuur).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingFinance).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingHandel).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingHoreca).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingIt).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingLandbouw).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingOverheid).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingPersDiensverlening)
        .check({ force: true })
        .should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingProductie).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingZakDienstverlening)
        .check({ force: true })
        .should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingOverige).check({ force: true }).should('be.checked')

      // All 12 layers are visible after login
      cy.get(MAP.legendNotification)
        .should('contain', 'Zichtbaar na inloggen')
        .and('have.length', 12)
    })
  })

  describe('Should see more when logged in', () => {
    before(() => {
      cy.login()
    })

    after(() => {
      cy.logout()
    })

    it('Should see vestigingen on the map', () => {
      cy.intercept('POST', '/cms_search/graphql/').as('graphql')
      cy.hidePopup()
      cy.visit(`/`)
      cy.get(HOMEPAGE.navigationBlockKaart).click()
      cy.wait('@graphql')
      cy.wait('@graphql')
      cy.url().should('include', '/data/?modus=kaart&legenda=true')
      cy.get(MAP.mapContainer).should('be.visible')

      cy.get(MAP.mapPanelHandle)
        .find(MAP.mapLegendLabel)
        .contains('Vestigingen')
        .parents(MAP.mapLegendItemButton)
        .click('right')
      cy.get(MAP.imageLayer).should('not.exist')

      cy.get(MAP_LAYERS.checkboxVestigingBouw).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingCultuur).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingFinance).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingHandel).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingHoreca).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingIt).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingLandbouw).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingOverheid).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingPersDiensverlening)
        .check({ force: true })
        .should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingProductie).check({ force: true }).should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingZakDienstverlening)
        .check({ force: true })
        .should('be.checked')
      cy.get(MAP_LAYERS.checkboxVestigingOverige).check({ force: true }).should('be.checked')

      // Selection of layers results in 12
      cy.get(MAP.imageLayer).should('exist').and('have.length', 12)

      // All 12 layers are visible after login
      cy.get(MAP.mapLegendItems).should('have.length', 12)

      // No message to first login
      cy.get(MAP.legendNotification).should('not.exist')
    })
  })
})
