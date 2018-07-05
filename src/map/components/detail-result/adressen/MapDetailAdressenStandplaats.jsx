import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenStandplaats = ({
  panoUrl,
  standplaats,
  onMaximize,
  onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={standplaats.label}
    title="Standplaats"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultStatusItem
        label="Indicatie geconstateerd"
        value={standplaats.indicatieGeconstateerd ? 'Ja' : 'Nee'}
        status={standplaats.indicatieGeconstateerd ? 'alert' : ''}
      />
      <MapDetailResultItem
        label="Status"
        value={standplaats.status.description}
      />
      <MapDetailResultStatusItem
        label="Aanduiding in onderzoek"
        value={standplaats.aanduidingInOnderzoek ? 'Ja' : 'Nee'}
        status={standplaats.aanduidingInOnderzoek ? 'alert' : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenStandplaats.propTypes = {
  standplaats: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    indicatieGeconstateerd: PropTypes.boolean,
    label: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }).isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenStandplaats;
