/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import React from 'react'
import useSlug from '../../../app/utils/useSlug'
import { VIEW_MODE } from '../../../shared/ducks/ui/ui'
import PARAMETERS from '../../../store/parameters'
import { decodeLayers } from '../../../store/queryParameters'
import { extractIdEndpoint } from '../../../store/redux-first-router/actions'
import AutoSuggest from '../../components/auto-suggest/AutoSuggest'
import { LABELS } from '../../services/auto-suggest/auto-suggest'

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this)
    this.onUserInput = this.onUserInput.bind(this)
  }

  componentDidMount() {
    const { onGetSuggestions, prefillQuery } = this.props

    if (prefillQuery) {
      onGetSuggestions(prefillQuery)
    }
  }

  componentDidUpdate(prevProps) {
    const { isMapActive, onGetSuggestions, pageName, prefillQuery } = this.props

    const doResetQuery = prevProps.isMapActive !== isMapActive || prevProps.pageName !== pageName

    // on navigation, clear auto-suggest
    if (doResetQuery && !prefillQuery) {
      onGetSuggestions()
    }
  }

  // Opens suggestion on mouseclick or enter
  onSuggestionSelection(suggestion) {
    const {
      openDataSuggestion,
      openDatasetSuggestion,
      openEditorialSuggestion,
      openMapSuggestion,
      typedQuery,
      view,
    } = this.props

    // Suggestion of type dataset, formerly known as "catalog"
    if (suggestion.uri.match(/^dcatd\//)) {
      const [, , id] = extractIdEndpoint(suggestion.uri)
      const slug = useSlug(suggestion.label)

      openDatasetSuggestion({ id, slug, typedQuery })

      // Suggestion of type article or publication
    } else if (suggestion.uri.match(/jsonapi\/node\//)) {
      const [, type, id] = extractIdEndpoint(suggestion.uri)
      const slug = useSlug(suggestion.label)

      openEditorialSuggestion({ id, slug }, type)
    } else if (suggestion.type === 'map-layer' || suggestion.type === 'map-collection') {
      const { searchParams } = new URL(suggestion.uri, window.location.origin)

      openMapSuggestion({
        view: searchParams.get(PARAMETERS.VIEW),
        legend: searchParams.get(PARAMETERS.LEGEND) === 'true',
        layers: decodeLayers(searchParams.get(PARAMETERS.LAYERS)),
      })
    } else {
      openDataSuggestion(
        {
          endpoint: suggestion.uri,
          category: suggestion.category,
          typedQuery,
        },
        view === VIEW_MODE.FULL ? VIEW_MODE.SPLIT : view,
      )
    }
  }

  onFormSubmit(label) {
    const {
      activeSuggestion,
      isDatasetPage,
      isDataPage,
      isArticlePage,
      isPublicationPage,
      isSpecialsPage,
      typedQuery,
      onCleanDatasetOverview,
      onDatasetSearch,
      onDataSearch,
      onSearch,
      onArticleSearch,
      onPublicationSearch,
      onSpecialsSearch,
    } = this.props

    const { ARTICLES, DATASETS, PUBLICATIONS, DATA, SPECIALS } = LABELS

    const searchAction = {
      [DATASETS]: onDatasetSearch,
      [ARTICLES]: onArticleSearch,
      [PUBLICATIONS]: onPublicationSearch,
      [DATA]: onDataSearch,
      [SPECIALS]: onSpecialsSearch,
    }

    if (activeSuggestion.index === -1) {
      // Load the search results
      onCleanDatasetOverview() // TODO, refactor: don't clean dataset on search

      const searchType =
        label ||
        (isDatasetPage
          ? DATASETS
          : isDataPage
          ? DATA
          : isArticlePage
          ? ARTICLES
          : isPublicationPage
          ? PUBLICATIONS
          : isSpecialsPage
          ? SPECIALS
          : null)

      const actionFn = searchAction[searchType]

      if (actionFn) {
        actionFn(typedQuery)
      } else {
        onSearch(typedQuery)
      }
    }
  }

  onUserInput(query) {
    const { onGetSuggestions } = this.props

    onGetSuggestions(query)
  }

  render() {
    const {
      activeSuggestion,
      displayQuery,
      numberOfSuggestions,
      onGetSuggestions,
      onSuggestionActivate,
      suggestions,
      typedQuery,
    } = this.props

    return (
      <AutoSuggest
        activeSuggestion={activeSuggestion}
        highlightQuery={typedQuery}
        legendTitle="Data zoeken"
        numberOfSuggestions={numberOfSuggestions}
        onSubmit={this.onFormSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={this.onSuggestionSelection}
        onTextInput={onGetSuggestions}
        placeHolder="Zoek in datasets, artikelen en publicaties"
        query={displayQuery || typedQuery}
        suggestions={suggestions}
      />
    )
  }
}

HeaderSearch.defaultProps = {
  activeSuggestion: {
    index: -1,
  },
  displayQuery: '',
  numberOfSuggestions: 0,
  pageName: '',
  prefillQuery: '',
  suggestions: [],
  typedQuery: '',
  isDataPage: false,
  isDatasetPage: false,
  isArticlePage: false,
  isPublicationPage: false,
  isSpecialsPage: false,
}

HeaderSearch.propTypes = {
  activeSuggestion: PropTypes.shape({
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string,
  }),
  displayQuery: PropTypes.string,
  view: PropTypes.string.isRequired,
  isDataPage: PropTypes.bool,
  isDatasetPage: PropTypes.bool,
  isArticlePage: PropTypes.bool,
  isPublicationPage: PropTypes.bool,
  isSpecialsPage: PropTypes.bool,
  isMapActive: PropTypes.bool.isRequired,
  numberOfSuggestions: PropTypes.number,
  onCleanDatasetOverview: PropTypes.func.isRequired,
  onDatasetSearch: PropTypes.func.isRequired,
  onDataSearch: PropTypes.func.isRequired,
  onArticleSearch: PropTypes.func.isRequired,
  onPublicationSearch: PropTypes.func.isRequired,
  onSpecialsSearch: PropTypes.func.isRequired,
  openDataSuggestion: PropTypes.func.isRequired,
  openDatasetSuggestion: PropTypes.func.isRequired,
  openEditorialSuggestion: PropTypes.func.isRequired,
  openMapSuggestion: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  pageName: PropTypes.string,
  prefillQuery: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  typedQuery: PropTypes.string,
}

export default HeaderSearch
