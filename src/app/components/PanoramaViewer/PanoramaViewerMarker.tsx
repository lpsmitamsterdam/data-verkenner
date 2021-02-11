import { Marker } from '@amsterdam/arm-core'
import { useMapEvents } from '@amsterdam/react-maps'
import { Icon, Marker as LeafletMarker } from 'leaflet'
import 'leaflet-rotatedmarker'
import { FunctionComponent, useEffect, useState } from 'react'
import { MarkerProps } from '../../pages/MapPage/MapMarkers'
import { panoHeadingParam } from '../../pages/MapPage/query-params'
import useMapCenterToMarker from '../../utils/useMapCenterToMarker'
import useParam from '../../utils/useParam'

const orientationIcon = new Icon({
  iconUrl: '/assets/images/map/panorama-orientation.svg',
  iconSize: [70, 70],
  iconAnchor: [35, 35],
})

const pawnIcon = new Icon({
  iconUrl: '/assets/images/map/panorama-person.svg',
  iconSize: [18, 31],
  iconAnchor: [9, 22],
})

const PanoramaViewerMarker: FunctionComponent<MarkerProps> = ({ location, setLocation }) => {
  const [orientationMarker, setOrientationMarker] = useState<LeafletMarker>()
  const [panoHeading] = useParam(panoHeadingParam)

  // TODO: be able to give a x & y offset (when MapPanel is open)
  useMapCenterToMarker(location)

  useMapEvents({
    click: ({ latlng }) => setLocation && setLocation(latlng),
  })

  useEffect(() => {
    if (orientationMarker && panoHeading) {
      orientationMarker.setRotationAngle(panoHeading)
    }
  }, [orientationMarker, panoHeading])

  return location ? (
    <>
      <Marker
        setInstance={setOrientationMarker}
        latLng={location}
        options={{ icon: orientationIcon }}
      />
      <Marker latLng={location} options={{ icon: pawnIcon }} />
    </>
  ) : null
}

export default PanoramaViewerMarker
