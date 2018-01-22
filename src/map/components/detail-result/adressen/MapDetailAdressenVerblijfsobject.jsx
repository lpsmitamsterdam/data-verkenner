import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailAdressenVerblijfsobjectGebruiksdoelenItem from './MapDetailAdressenVerblijfsobjectGebruiksdoelenItem';

const MapDetailAdressenVerblijfsobject = ({ panoUrl, verblijfsobject, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={verblijfsobject.label}
    title="Adres"
  >
    <ul className="map-detail-result__list">
      <MapDetailAdressenVerblijfsobjectGebruiksdoelenItem
        gebruiksdoelen={verblijfsobject.gebruiksdoelen}
      />
      <MapDetailResultItem
        label="Oppervlakte"
        value={verblijfsobject.size ? `${verblijfsobject.size} m²` : 'onbekend'}
      />
      <MapDetailResultItem
        label="Type woonobject"
        value={verblijfsobject.type}
      />
      <MapDetailResultItem
        label="Eigendomsverhouding"
        value={verblijfsobject.eigendomsverhouding}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenVerblijfsobject.propTypes = {
  verblijfsobject: PropTypes.shape({
    eigendomsverhouding: PropTypes.string,
    gebruiksdoelen: PropTypes.array,
    label: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailAdressenVerblijfsobject;
