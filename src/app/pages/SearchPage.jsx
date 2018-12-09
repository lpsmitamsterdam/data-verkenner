import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearch from '../components/QuerySearch';
import { getSearchQuery } from '../../shared/ducks/data-search/selectors';
import { toMapAndPreserveQuery as toMapActionCreator } from '../../store/redux-first-router';
import SplitScreen from '../components/SplitScreen/SplitScreen';
import LocationSearchContainer from '../containers/LocationSearchContainer';

const SearchPage = ({ query, toMap }) => {
  if (query) {
    return <QuerySearch />;
  }
  return (
    <SplitScreen
      leftComponent={(
        <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
      )}
      rightComponent={(
        <LocationSearchContainer />
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  query: getSearchQuery(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toMap: toMapActionCreator
}, dispatch);

SearchPage.defaultProps = {
  query: undefined
};

SearchPage.propTypes = {
  query: PropTypes.string,
  toMap: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
