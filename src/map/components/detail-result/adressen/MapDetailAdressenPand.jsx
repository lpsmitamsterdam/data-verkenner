import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenPand = ({ panoUrl, pand, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={pand.label}
    title="Pand"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Oorspronkelijk bouwjaar"
        value={pand.year || 'onbekend'}
      />
      <MapDetailResultItem
        label="Status"
        value={pand.status}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenPand.propTypes = {
  pand: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.string,
    year: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailAdressenPand;
