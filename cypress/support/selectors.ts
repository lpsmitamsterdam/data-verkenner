export const ALERTS = {
  COMPLEXEN:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: beschrijving.',
  GENERAL:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden.',
  KADASTRAAL_OBJECT:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: Kadastrale objecten.',
  KADASTRAAL_OBJECT_ITEMS:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: koopsom, koopjaar en cultuur (on)bebouwd; zakelijke rechten en aantekeningen.',
  KADASTRAAL_SUBJECT:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: kadastrale subjecten. Om ook zakelijke rechten van natuurlijke personen te bekijken, moet je als medewerker bovendien speciale bevoegdheden hebben.',
  MONUMENTEN:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: type, architect en opdrachtgever, bouwjaar, oorspronkelijke functie, beschrijving en redengevende omschrijving.',
  VESTIGINGEN:
    'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om meer te informatie te vinden over: Vestigingen.',
}

export const ADDRESS_PAGE = {
  buttonMaximizeMap: '[aria-label="Kaart vergroten"]',
  buttonShowMore: '.map-search-results__button',
  dataSelection: '.c-data-selection',
  iconCluster: '.o-highlight-cluster',
  iconMapMarker: '.leaflet-marker-icon',
  linkTable: '[class*="DetailLinkList__LinkList"]',
  mapContainer: '.qa-map-container',
  resultsList: 'ul.o-list',
  resultsPanel: '.qa-dashboard__column--right',
  tabKadastraleObjecten: '#tab-brk',
}

export const COMPONENTS = {
  panoramaPreview: '[data-testid="panoramaPreview"]',
  shareBar: '[data-testid="sharebar"]',
}

export const DATA_SEARCH = {
  autoSuggest: '.auto-suggest',
  autoSuggestCategory: '.auto-suggest__dropdown-category__heading',
  autoSuggestDropdown: '.auto-suggest__dropdown',
  autoSuggestDropDownItem: '.auto-suggest__dropdown-item',
  autosuggestDropdownItemActive: '.auto-suggest__dropdown-item--active',
  autoSuggestDropdownMoreResults: '[class*=auto-suggest__dropdown-item--more-results]',
  autoSuggestInput: '#auto-suggest__input',
  autoSuggestHeader: 'h4.qa-auto-suggest-header',
  autoSuggestTip: '.auto-suggest__tip',
  buttonFilteren: '[class*=SearchPageResults__FilterButton]',
  form: '[data-test=search-form]',
  headerSubTitle: '.o-header__subtitle',
  infoNotification: '.notification--info',
  input: '[data-test=search-input]',
  linklogin: '[data-testid="link"]',
  mapDetailResultHeaderSubTitle: '.map-detail-result__header-subtitle',
  scrollWrapper: '.scroll-wrapper',
  searchBarFilter: '[data-testid="SearchBarFilter"]',
  searchResultsGrid: '[data-testid="geosearch-page"]',
  searchResultsCategory: '[class*=SearchHeading__StyledHeading]',
  searchResultsDatasetCard: '[class*=DatasetCard__StyledHeading]',
  searchResultsEditorialCard: '[class*=EditorialCard__StyledHeading]',
  searchResultsLink: '[class*=LinkStyle__LinkContent]',
  searchResultsParagraphLink: '[class*="StyledParagraphLink"]',
  sortDropdown: '[data-testid="sort-select"]',
}

export const DATA_SELECTION_TABLE = {
  table: '.c-ds-table',
  head: '.c-ds-table__head',
  body: '.c-ds-table__body',
  row: '.c-ds-table__row',
  cell: '.c-ds-table__cell',
  content: '.c-data-selection-content',
}

export const DATA_SETS = {
  datasetItem: '.resources-type__content-item',
  dataSetLink: '[data-testid=datasetCard]',
}

export const DETAIL_PANEL = {
  buttonClose: '[aria-label="Sluiten"]',
  buttonInfo: '[data-testid="detail-infobox"]',
  constructionFileAddresses: '[data-testid="constructionFileAddresses"]',
  constructionFileSubheading: '[class*=FileDetail__SubHeading]',
  definitionList: '[data-testid="detail-definition-list"]',
  definitionListDescription: '[class*="DefinitionListDescription"]',
  definitionListTerm: '[class*="DefinitionListTerm"]',
  documentsHeader: '[data-testid="DocumentsHeading"]',
  heading: '[data-testid="data-detail-heading"]',
  linkList: '[data-testid="detail-linklist"]',
  main: '[data-testid="data-detail"]',
  panelTypeTitle: '[class*=DataDetailPage__DetailType]',
  panelSubject: '[class*="DetailPanel__Heading"] h1',
  panoramaPreview: '[data-testid="panoramaPreview"]',
  subHeader: '[data-testid="data-detail-subheading"]',
  table: '[data-testid="detailTable"]',
}

export const DRAWING = {
  buttonDraw: '[class*="DrawToolControls__DrawToolPanel"] > [class*="DrawToolButton"]',
  buttonDrawTool: '[data-testid="drawtoolOpenButton"]',
  buttonCloseDrawTool: '[class*="DrawToolControls__ToolButton"]',
  buttonRemove: '[class*="DrawToolControls__RemoveButton"]',
  clusterIcon: '.o-highlight-cluster',
  clusterSymbol: '[class*="clustergroup"]',
  dropdownResults: '[data-testid="sort-select"]',
  dropdownResultsSelectedValue: '[data-testid="selectedValue"]',
  labelDrawing: '.toggle-drawing__label',
  linkDrawresult: '[class*="DrawResults__ResultLink"]',
  mapPolygon: '.c-map__leaflet-drawn-polygon',
  panelDrawTool: '[class*="DrawToolBare__DrawToolPanel"]',
  polygon: '[class="leaflet-interactive"]',
  tooltip: '[class*=leaflet-tooltip-bottom]',
}

export const GEO_SEARCH = {
  listItem: '[data-testid="geosearch-listitem"]',
}

export const HEADER = {
  headerTitle: '[class*= HeaderTitleStyle]',
  logoAmsterdamShort: '[class*=AmsterdamLogoStyle__LogoShortStyle]',
  logoAmsterdamTall: '[class*=AmsterdamLogoStyle__LogoTallStyle]',
  logoAmsterdamTitle: '[class*=AmsterdamLogoStyle__LogoTitle]',
  root: '[data-test=header]',
}

export const HEADER_MENU = {
  buttonMenu: '[aria-label=Menu]',
  rootMobile: '[data-test=header-menu-mobile]',
  rootDefault: '[data-test=header-menu-default]',
  login: '[data-test=login]',
}

export const HEADINGS = {
  dataSelectionHeading: '[data-test=data-selection-heading]',
}

export const HOMEPAGE = {
  aboutBlock: '[data-test=about-block]',
  aboutCard: '[class*=AboutBlock__StyledCardColumn]',
  buttonSearch: '[data-testid="StyledSearchBar"] [aria-label="Search..."]',
  buttonSearchMobile: '[class*=SearchBarToggleStyle] [class*=ToggleButtonStyle]',
  buttonSearchMobileClose: '[class*=SearchBarToggleStyle]  [class*= ToggleButtonStyle]',
  footerBlock: '[class*=FooterTop]',
  highlightBlock: '[data-test=highlight-block]',
  highlightCard: '[class*=HighlightCard__StyledImageCard]',
  link: '[data-test=themes-block-link]',
  menuDefault: '[data-test="header-menu-default"]',
  menuItemOnderdelen: '[data-test=header-menu-default] > :nth-child(1) > [class*=ButtonStyle]',
  menuItemOverOIS: '[data-test=header-menu-default] > :nth-child(2) > [class*=ButtonStyle]',
  menuItemFeedback: '[data-test=header-menu-default] > :nth-child(3) > [class*=ButtonStyle]',
  menuItemHelp: '[data-test=header-menu-default] > :nth-child(4) > [class*=ButtonStyle]',
  menuItemInloggen: '[data-test=header-menu-default] > :nth-child(5) > [class*=ButtonStyle]',
  menuMobile: '[data-test="header-menu-mobile"]',
  navigationBlock: '[data-test=navigation-block]',
  navigationBlockDataservices:
    '[data-test=navigation-block] > [href*="/artikelen/artikel/services/"]',
  navigationBlockDatasets: '[data-test=navigation-block] > [href*="/datasets/zoek/"]',
  navigationBlockKaart:
    '[data-test=navigation-block] > [href="/data/?modus=kaart&legenda=true&lagen="]',
  navigationBlockPanorama: '[data-test=navigation-block] > [href*="/data/panorama/"]',
  navigationBlockPublicaties: '[data-test=navigation-block] > [href*="/publicaties/zoek"]',
  navigationBlockTabellen: '[data-test=navigation-block] > [href*="/artikelen/artikel/tabellen/"]',
  organizationBlock: '[data-test=organization-block]',
  organizationCardHeading: '[class*=OrganizationCard__StyledHeading]',
  shareBar: '[class*="ShareBar__ShareBarContainer"]',
  shareButton: '[data-testid="share-button"]',
  shareButtonFacebook: '[title="Deel op Facebook"]',
  shareButtonLinkedIn: '[title="Deel op LinkedIn"]',
  shareButtonMail: '[title="Deel via email"]',
  shareButtonTwitter: '[title="Deel op Twitter"]',
  specialBlock: '[data-test=special-block]',
  themeLink: '[class*=ThemesBlock] > [class*=LinkContent]',
  themesBlock: '[class*=ThemesBlock]',
}

export const LINKS = {
  kadastraleObjecten: 'data/brk/kadastrale-objecten/',
}

export const MAP = {
  buttonEnlarge: '[data-testid="showFullDetails"]',
  contextMenu: '[data-test=context-menu]',
  contextMenuItemEmbed: '[data-test=context-menu-embed]',
  buttonDropDownLuchtfoto: '.map-type__select--aerial > .select-button__icon-wrapper',
  buttondropDownTopografie: '.map-type__select--topography > .select-button__icon-wrapper',
  dropDownItem: '.select-button__drop-down-button',
  dropDownLuchtfoto: '.map-type__select--aerial > .select-button__drop-down',
  dropDownTopografie: '.map-type__select--topography > .select-button__drop-down',
  embedButton: '[data-test=embed-button]',
  iconMapMarker: '.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive',
  imageLayer: '.leaflet-overlay-pane > .leaflet-image-layer',
  legendNotification: '[class*=MapLegend__StyledAlert]',
  mapContainer: '.leaflet-container',
  mapDetailPanoramaHeader: '.map-detail-result__header-pano',
  mapDetailPanoramaHeaderImage: 'img.map-detail-result__header-pano',
  mapDetailResultPanel: '.map-detail-result',
  mapLegend: '.map-legend',
  mapLegendCheckbox: '[class*=MapLegend__StyledCheckbox]',
  mapLegendLabel: '[class*=LabelStyle__LabelTextStyle]',
  mapLegendLayer: '.map-legend__map-layer',
  mapLegendItemButton: '[class*=MapLegend__LayerButton]',
  mapLegendItems: '.map-legend__items',
  mapMaximize: '.rc-icon-button',
  mapOverlayPane: '.leaflet-overlay-pane',
  mapPanel: '.map-panel',
  mapPanelHandle: '[data-testid="mapPanel"]',
  mapPanelBackground: '.map-type',
  mapPanelBackgroundLabel: '.map-type [class*=HeadingStyle]',
  mapPreviewPanel: '.map-preview-panel',
  mapPreviewPanelVisible: '.map-preview-panel.map-preview-panel--visible',
  mapSearchResultsCategoryHeader: '.map-search-results-category__header',
  mapSearchResultsItem: '.map-search-results-item__name',
  mapSearchResultsPanel: '.map-search-results',
  mapSelectedObject: '.leaflet-interactive',
  mapZoomIn: '.leaflet-control-zoom-in',
  toggleMapPanel: '.map-panel__toggle',
  toggleFullScreen: '.qa-toggle-fullscreen',
  zoomInAlert: '[class*=ZoomInAlertContent]',
}

export const MAP_LAYERS = {
  checkboxAfvalcontainers: '[aria-label="Afvalcontainers"]',
  checkboxAfvalRestafval: '#afvlc-wlorst',
  checkboxAfvalPapier: '#afvlc-wloppr',
  checkboxAfvalGlas: '#afvlc-wlogls',
  checkboxAfvalPlastic: '#afvlc-wlopls',
  checkboxAfvalTextiel: '#afvlc-wlotxtl',
  checkboxAfvalGFE: '#afvlc-wlokca',
  checkboxAfvalBrood: '#afvlc-wlobrood',
  checkboxAfvalPMD: '#afvlc-wlopmd',
  checkboxAfvalGrof: '#afvlc-wlogrof',
  checkboxBelastingen: '[aria-label="Belastingen"]',
  checkboxBelastingenPrecWoonschepen: '#bel-precarw',
  checkboxBelastingenPrecBedrijfsvaartuigen: '#bel-precarbv',
  checkboxBelastingenPrecPassagiersvaartuigen: '#bel-precarpv',
  checkboxBelastingenPrecTerrassen: '#bel-precart',
  checkboxBelastingenReclamebelastingtarieven: '#bel-recbel',
  checkboxBodemkwaliteit: '[aria-label="Bodemkwaliteit"]',
  checkboxBKGrondmonsters: '#bdmkw-mbgm',
  checkboxBKGrondwatermonsters: '#bdmkw-mbgwm',
  checkboxBKGrondmonstersAsbest: '#bdmkw-mbaig',
  checkboxBKGeotechnischeSonderingen: '#bdmkw-bros',
  checkboxCovid: '[aria-label="COVID-19 maatregelen"]',
  checkboxCovidAlcohol: '#cov19-cov19alcvrkp',
  checkboxCovidStraatartiest: '#cov19-cov19strtart',
  checkboxCovidGebied: '#cov19-cov19gebver',
  checkboxCultureelErfgoed: '[aria-label="Cultureel erfgoed"]',
  checkboxCEMonumenten: '#culterf-mnmtn',
  checkboxCEUnesco: '#culterf-unesco',
  checkboxEnergie: '[aria-label="Energie"]',
  checkboxEnergieAardgasvrij: '#energie-aardgasvrij',
  checkboxEnergieBouwstroompunten: '#energie-bouwstrm',
  checkboxEvenementen: '[aria-label="Evenementen"]',
  checkboxEvenementenEvenementen: '#evnmt-tcevt',
  checkboxExplosieven: '[aria-label="Explosieven"]',
  checkboxEInslagen: '#explsvn-exin',
  checkboxEVerdachteGeb: '#explsvn-exvg',
  checkboxEGevrijwaardeGeb: '#explsvn-exgg',
  checkboxECEOnderzoeken: '#explsvn-exuo',
  checkboxGemeentelijkeBekendmakingen: '[aria-label="Gemeentelijke bekendmakingen"]',
  checkboxGBBestemmingsplan: '#gembek-bespla',
  checkboxGBDrankHorecaVergunning: '#gembek-drahor',
  checkboxGBEvenementenvergunning: '#gembek-evever',
  checkboxGBExploitatievergunning: '#gembek-exploi',
  checkboxGBInspraak: '#gembek-inspra',
  checkboxGBKapvergunning: '#gembek-kapver',
  checkboxGBLigplaatsvergunning: '#gembek-ligpla',
  checkboxGBMededelingen: '#gembek-medede',
  checkboxGBMeldingen: '#gembek-meldin',
  checkboxGBOmgevingsvergunning: '#gembek-omgver',
  checkboxGBOnttrekkingsvergunning: '#gembek-onttre',
  checkboxGBOpeningstijden: '#gembek-optijd',
  checkboxGBRectificatie: '#gembek-rectif',
  checkboxGBSpeelautomatenvergunning: '#gembek-speela',
  checkboxGBSplitsingsvergunning: '#gembek-splits',
  checkboxGBTerrasvergunning: '#gembek-terras',
  checkboxGBVerkeersbesluit: '#gembek-verbes',
  checkboxGBVerordeingenReglementen: '#gembek-verreg',
  checkboxGBOverig: '#gembek-overig',
  checkboxGebiedsindeling: '[aria-label="Gebiedsindeling"]',
  checkboxGIBouwblokken: '#gebind-bbn',
  checkboxGIBuurt: '#gebind-buurt',
  checkboxGIStadsdeel: '#gebind-sd',
  checkboxGIWijk: '#gebind-bc',
  checkboxGIGebiedsgerichtWerken: '#gebind-ggw',
  checkboxGIGebiedsgerichtWerkenGebied: '#gebind-ggwg',
  checkboxGIGebiedsgerichtWerkenPraktijkgebied: '#gebind-ggwpg',
  checkboxGIGrootstedelijkeGebieden: '#gebind-ggr',
  checkboxGIRegieGemeenteAmsterdam: '#gebind-ggra',
  checkboxGIRegieOmgevingsdienst: '#gebind-ggro',
  checkboxGeluidszones: '[aria-label="Geluidszones"]',
  checkBoxGZIndustrie: '#geldzn-gelind',
  checkBoxGZSpoorwegen: '#geldzn-mgsw',
  checkBoxGZMetro: '#geldzn-mgpm',
  checkBoxGZSchiphol: '#geldzn-mgpsh',
  checkboxGrondexploitaties: '[aria-label="Grondexploitaties"]',
  checkboxGrondEProjecten: '#grex-grex',
  checkboxHistorischeKaarten: '[aria-label="Historische kaarten"]',
  checkboxHK1909: '#hist-pw1909',
  checkboxHK19431000: '#hist-pw1943',
  checkboxHK194325000: '#hist-pw1943-2500',
  checkboxHK1985: '#hist-pw1985',
  checkboxHoogte: '[aria-label="Hoogte"]',
  checkboxHoogteTerreinmodel: '#hgte-dtm',
  checkboxHoogteOppervlaktemodel: '#hgte-dsm',
  checkboxHoogteNAP: '#hgte-nap',
  checkboxHoogteMeetboutenStatus: '#hgte-mbs',
  checkboxHoogteMeetboutenZaksnelheid: '#hgte-mbz',
  checkboxHoogteReferentiepunten: '#hgte-mbr',
  checkboxLogistiek: '[aria-label="Logistiek"]',
  checkboxLRoutesVrachtauto: '#logistk-rtsvr',
  checkboxLLadenLossen: '#logistk-pvrll',
  checkboxLMilieuzonesBestelauto: '#logistk-mzb',
  checkboxLWegenRisicozones: '#logistk-mvw',
  checkboxLMilieuzonesVrachtauto: '#logistk-mzva',
  checkboxLParkeervakkenVrachtwagens: '#logistk-pvrvw',
  checkboxMilieuZonesVerkeer: '[aria-label="Milieuzones verkeer"]',
  checkboxMVBestelauto: '#milvk-mzb',
  checkboxMVBromSnorfiets: '#milvk-mzbs',
  checkboxMVTaxi: '#milvk-mzt',
  checkboxMVTouringcar: '#milvk-mztc',
  checkboxMVVrachtauto: '#milvk-mzva',
  checkboxOndergrond: '[aria-label="Ondergrond"]',
  checkboxOAardgasbuisleidingen: '#ondrgd-mvabl',
  checkboxOExplosievenCE: '#ondrgd-exuo',
  checkboxOExplosievenGG: '#ondrgd-exgg',
  checkboxOExplosievenVG: '#ondrgd-exvg',
  checkboxOWKPB: '#ondrgd-gembep',
  checkboxOLPGStations: '#ondrgd-lpgstat',
  checkboxOLPGTanks: '#ondrgd-lpgtank',
  checkboxOLPGVulpunten: '#ondrgd-lpgris',
  checkboxOLPGAfleverzuilen: '#ondrgd-lpgaf',
  checkboxOExplosieven: '#ondrgd-exin',
  checkboxOGrondmonsters: '#ondrgd-mbgm',
  checkboxOGrondmonstersA: '#ondrgd-mbaig',
  checkboxOGrondwatermonsters: '#ondrgd-mbgwm',
  checkboxOMeetboutenZaksnelheid: '#ondrgd-mbz',
  checkboxOMeetboutenStatus: '#ondrgd-mbs',
  checkboxOMeetboutenReferentiepunten: '#ondrgd-mbr',
  checkboxOVerzinkbarePalen: '#ondrgd-vezips',
  checkboxOplaadpunten: '[aria-label="Oplaadpunten"]',
  checkboxOplaadpuntenSnelLaden: '#opldp-oplsnl',
  checkboxOplaadpuntenGewoonLaden: '#opldp-oplgwn',
  checkboxOnroerendeZaken: '[aria-label="Onroerende zaken"]',
  checkboxOZKadastralePerceelsgrenzen: '#onrzk-kdstrl',
  checkboxOZKKPBurgerlijkeGemeente: '#onrzk-bgem',
  checkboxOZKKPKadastraleGemeente: '#onrzk-kgem',
  checkboxOZKKPKadastraleSectie: '#onrzk-ksec',
  checkboxOZKKPKadastraalObject: '#onrzk-kot',
  checkboxOZKadastraleEigenaren: '#onrzk-kdsteg',
  checkboxOZKadastraleErfpachtuitgevers: '#onrzk-kdsterf',
  checkboxOZGemeentelijkEigendom: '#onrzk-gemeig',
  checkboxOZGemeentelijkeBeperkingen: '#onrzk-gembep',
  checkboxOZPandenOuderDan1960: '#onrzk-lood',
  checkboxOZPandenNaarBouwjaar: '#onrzk-bwjr',
  checkboxOVNet: '[aria-label="OV-net"]',
  checkboxOVNetSpoorlijnen: '#ov-sprln',
  checkBoxPanoramabeelden: '[aria-label="Panoramabeelden"]',
  checkBoxPanoramabeeldenBeeldenPano: '#pano-panobi',
  checkBoxPanoramabeeldenBeeldenWOZ: '#pano-panowoz',
  checkboxParkeren: '[aria-label="Parkeren"]',
  checkboxParkerenFiscaleIndelingen: '#parkrn-pv',
  checkboxParkerenSpecialeBestemmingen: '#parkrn-pvb',
  checkboxParkerenTaxistandplaats: '#parkrn-pvrts',
  checkboxParkerenLadenEnLossen: '#parkrn-pvrll',
  checkboxParkerenKissAndRide: '#parkrn-pvrpr',
  checkboxParkerenParkerenFiscaal: '#parkrn-pvrf',
  checkboxParkerenParkeerverbod: '#parkrn-pvrpv',
  checkboxParkerenGehandicaptenAlgemeen: '#parkrn-pvrga',
  checkboxParkerenGehandicaptenplaatsKenteken: '#parkrn-pvrgk',
  checkboxParkerenSpecifiekeVoertuigcategorie: '#parkrn-pvrsv',
  checkboxParkerenVergunninghouders: '#parkrn-pvrvh',
  checkboxParkerenBlauweZone: '#parkrn-pvrbz',
  checkboxParkerenParkeervergunninggebieden: '#parkrn-pvrgeb',
  checkboxParkerenVrachtwagens: '#parkrn-pvrvw',
  checkboxRisicoZones: '[aria-label="Risicozones"]',
  checkboxRZLPGVulpunten: '#riscz-lpgris',
  checkboxRZLPGAfleverzuilen: '#riscz-lpgaf',
  checkboxRZLPGTanks: '#riscz-lpgtank',
  checkboxRZLPGStations: '#riscz-lpgstat',
  checkboxRZSpoorwegen: '#riscz-mvsw',
  checkboxRZVaarwegen: '#riscz-mvvw',
  checkboxRZWegen: '#riscz-mvw',
  checkboxRZVeiligheidsafstanden: '#riscz-veilafs',
  checkboxRZBedrijvenBronnen: '#riscz-bedrris',
  checkboxRZBedrijvenInvloedsgebieden: '#riscz-mvi',
  checkboxRZBedrijvenTerreingrenzen: '#riscz-bedrter',
  checkboxRZAardgasbuisleidingen: '#riscz-mvabl',
  checkboxRZRoutesGS: '#riscz-rtsgs',
  checkboxRZTunnelsGS: '#riscz-rtstgs',
  checkboxRZURoutes: '#riscz-rtsur',
  checkboxSchiphol: '[aria-label="Schiphol"]',
  checkboxSchipholRB: '#schphl-mgpsh',
  checkboxSchipholMT: '#schphl-mgth',
  checkboxSchipholTR: '#schphl-mthr',
  checkboxSchipholVG: '#schphl-mgvvgsh',
  checkboxTaxi: '[aria-label="Taxi"]',
  checkboxTaxiVerbodLijnbusbaan: '#themtaxi-bgt',
  checkboxTaxiHoofdroutes: '#themtaxi-tar',
  checkboxTaxiTaxistandplaats: '#themtaxi-pvrts',
  checkboxTaxiMilieuzones: '#themtaxi-mzt',
  checkboxTaxiOmgevingSP: '#themtaxi-oovtig',
  checkboxTaxiVerzinkbarePalen: '#themtaxi-vezips',
  checkboxTaxiSnelLaden: '#themtaxi-oplsnl',
  checkboxTaxiGewoonLaden: '#themtaxi-oplgwn',
  checkboxVeiligheidEnOverlast: '[aria-label="Veiligheid en overlast"]',
  checkboxVenOAlgemeen: '#veilov-oovoalg',
  checkboxVenODealer: '#veilov-oovodlrs',
  checkboxVenOCamera: '#veilov-oovctg',
  checkboxVenOAlcohol: '#veilov-oovoalco',
  checkboxVenORondleiding: '#veilov-oovorlv',
  checkboxVenOTaxiStandplaats: '#veilov-oovtig',
  checkboxVenOVuurwerkvrij: '#veilov-vwrk',
  checkboxVergunningen: '[aria-label="Vergunningen"]',
  checkboxVergunningenKamerverhuur: '#vrgngn-vergkvh',
  checkboxVergunningenBedBreakfast: '#vrgngn-vergbnb',
  checkboxVerkeerRoutes: '[aria-label="Verkeer - Routes"]',
  checkboxVRTaxi: '#vrkr-rtstx',
  checkboxVRVrachtauto: '#vrkr-rtsvr',
  checkboxVRVerzinkbarePalen: '#vrkr-vezips',
  checkboxVRFietspaaltjes: '#vrkr-fiets',
  checkboxVRRisicozones: '#vrkr-mvw',
  checkboxVestigingen: '[aria-label="Vestigingen"]',
  checkboxVestigingBouw: '#vstgn-bouw',
  checkboxVestigingCultuur: '#vstgn-csr',
  checkboxVestigingFinance: '#vstgn-fdvrog',
  checkboxVestigingHandel: '#vstgn-hvo',
  checkboxVestigingHoreca: '#vstgn-hrc',
  checkboxVestigingIt: '#vstgn-itc',
  checkboxVestigingLandbouw: '#vstgn-lb',
  checkboxVestigingOverheid: '#vstgn-ooz',
  checkboxVestigingPersDiensverlening: '#vstgn-pd',
  checkboxVestigingProductie: '#vstgn-pir',
  checkboxVestigingZakDienstverlening: '#vstgn-zd',
  checkboxVestigingOverige: '#vstgn-ovrg',
  checkboxWinkelgebieden: '[aria-label="Winkelgebieden"]',
  checkboxWGReclamebelastingtarieven: '#wnklgeb-recbel',
  checkboxWGWinkelgebieden: '#wnklgeb-winkgeb',
  checkboxWGBedrijfsinvesteringszones: '#wnklgeb-biz',
}

export const PANORAMA = {
  buttonClosePanorama: '.c-panorama > .icon-button__right > .rc-icon-button',
  homepage: '.c-homepage',
  markerPane: '.leaflet-marker-pane',
  statusBarCoordinates: '.c-panorama-status-bar__coordinates',
  panorama: '[data-testid="panoramaContainer"]',
  panoramaMenu: '.panorama-menu',
  panoramaToggle: '[data-testid="toggle"]',
}

export const PRINT = {
  buttonClosePrint: '[data-testid="printHeaderClose"]',
  headerTitle: '[data-testid="printHeaderTitle"]',
}

export const TABLES = {
  activeFilters: '[data-testid="activeFilters"]',
  filterCategories: '.c-data-selection-available-filters__category',
  filterItem: '.c-data-selection-available-filters__item',
  filterLabel: '.qa-option-label',
  filterPanel: '.qa-available-filters',
  tableValue: '.qa-table-value',
  warningPanel: '.c-panel__paragraph',
}
