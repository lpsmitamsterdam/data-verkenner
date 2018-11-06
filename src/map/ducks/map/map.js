import { routing } from '../../../app/routes';

export const MAP_BOUNDING_BOX = 'MAP_BOUNDING_BOX';
export const MAP_BOUNDING_BOX_SILENT = 'MAP_BOUNDING_BOX_SILENT';
export const MAP_CLEAR_DRAWING = 'MAP_CLEAR_DRAWING';
export const MAP_EMPTY_GEOMETRY = 'MAP_EMPTY_GEOMETRY';
export const MAP_END_DRAWING = 'MAP_END_DRAWING';
export const MAP_PAN = 'MAP_PAN';
export const MAP_PAN_SILENT = 'MAP_PAN_SILENT';
export const MAP_START_DRAWING = 'MAP_START_DRAWING';
export const MAP_UPDATE_SHAPE = 'MAP_UPDATE_SHAPE';
export const MAP_ZOOM = 'MAP_ZOOM';
export const MAP_CLEAR = 'MAP_CLEAR';
export const SET_MAP_BASE_LAYER = 'SET_MAP_BASE_LAYER';
export const TOGGLE_MAP_OVERLAY = 'TOGGLE_MAP_OVERLAY';
export const TOGGLE_MAP_OVERLAY_VISIBILITY = 'TOGGLE_MAP_OVERLAY_VISIBILITY';
export const SET_MAP_CLICK_LOCATION = 'SET_MAP_CLICK_LOCATION';
export const TOGGLE_MAP_PANEL = 'TOGGLE_MAP_PANEL';
export const MAP_CLICK = 'MAP_CLICK';

export const DEFAULT_LAT = 52.3731081;
export const DEFAULT_LNG = 4.8932945;

export const initialState = {
  viewCenter: [DEFAULT_LAT, DEFAULT_LNG],
  baseLayer: 'topografie',
  zoom: 11,
  overlays: [],
  isLoading: false,
  drawingMode: 'none',
  shapeMarkers: 0,
  shapeDistanceTxt: '',
  shapeAreaTxt: '',
  selectedLocation: null,
  mapPanelActive: true
};

let polygon = {};
let has2Markers;
let moreThan2Markers;

export default function MapReducer(state = initialState, action) {
  switch (action.type) {
    case routing.panorama.type: {
      return {
        ...state,
        mapPanelActive: false
      };
    }
    case routing.mapSearch.type:
    case routing.detail.type:
    case routing.map.type: {
      const { lat, lng, zoom, detailEndpoint } = action.meta.query || {};
      return {
        ...state,
        viewCenter: [
          parseFloat(lat) || initialState.viewCenter[0],
          parseFloat(lng) || initialState.viewCenter[1]
        ],
        zoom: parseFloat(zoom) || initialState.zoom,
        // selectedLocation,
        detailEndpoint,
        overlays: state.overlays
      };
    }

    case MAP_PAN:
      return {
        ...state,
        viewCenter: [
          action.payload.latitude,
          action.payload.longitude
        ]
      };
    case MAP_ZOOM:
      return {
        ...state,
        zoom: action.payload
      };

    case MAP_BOUNDING_BOX:
    case MAP_BOUNDING_BOX_SILENT:
      return {
        ...state,
        boundingBox: action.payload.boundingBox
      };

    case MAP_CLEAR_DRAWING:
      return {
        ...state,
        geometry: []
      };

    case MAP_EMPTY_GEOMETRY:
      return {
        ...state,
        geometry: []
      };

    case MAP_UPDATE_SHAPE:
      return {
        ...state,
        shapeMarkers: action.payload.shapeMarkers,
        shapeDistanceTxt: action.payload.shapeDistanceTxt,
        shapeAreaTxt: action.payload.shapeAreaTxt
      };

    case MAP_START_DRAWING:
      return {
        ...state,
        drawingMode: action.payload.drawingMode
      };

    case MAP_END_DRAWING:
      polygon = action.payload && action.payload.polygon;
      has2Markers = polygon && polygon.markers && polygon.markers.length === 2;
      moreThan2Markers = polygon && polygon.markers && polygon.markers.length > 2;

      return {
        ...state,
        drawingMode: 'none',
        geometry: has2Markers ? polygon.markers : moreThan2Markers ? [] : state.geometry,
        isLoading: moreThan2Markers ? true : state.isLoading
      };

    case SET_MAP_BASE_LAYER:
      return {
        ...state,
        baseLayer: action.payload
      };

    case TOGGLE_MAP_PANEL:
      return {
        ...state,
        mapPanelActive: !state.mapPanelActive
      };

    case TOGGLE_MAP_OVERLAY:
      return {
        ...state,
        overlays: state.overlays.some((overlay) => action.payload.mapLayers.includes(overlay.id)) ?
          [...state.overlays.filter((overlay) => !action.payload.mapLayers.includes(overlay.id))] :
        [...state.overlays,
          ...action.payload.mapLayers.map((mapLayerId) => ({ id: mapLayerId, isVisible: true }))]
      };

    case TOGGLE_MAP_OVERLAY_VISIBILITY:
      return {
        ...state,
        overlays: state.overlays.map((overlay) => ({
          ...overlay,
          isVisible: overlay.id !== action.mapLayerId ? overlay.isVisible :
            (action.show !== undefined ? action.show : !overlay.isVisible)
        }))
      };

    case MAP_CLEAR:
      return initialState;

    default:
      return state;
  }
}

// Actions
export const mapClearDrawing = () => ({ type: MAP_CLEAR_DRAWING });
export const mapEmptyGeometry = () => ({ type: MAP_EMPTY_GEOMETRY });
export const mapUpdateShape = (payload) => ({ type: MAP_UPDATE_SHAPE, payload });
export const mapStartDrawing = (payload) => ({ type: MAP_START_DRAWING, payload });
export const mapEndDrawing = (payload) => ({ type: MAP_END_DRAWING, payload });
export const mapClear = () => ({ type: MAP_CLEAR });
export const updateZoom = (payload) => ({ type: MAP_ZOOM, payload });
export const toggleMapPanel = () => ({ type: TOGGLE_MAP_PANEL });
export const setMapBaseLayer = (payload) => ({
  type: SET_MAP_BASE_LAYER,
  payload,
  meta: {
    piwikPayload: {
      event: payload,
      value: payload
    }
  }
});
export const toggleMapOverlay = (payload) => ({
  type: TOGGLE_MAP_OVERLAY,
  payload: {
    mapLayers: (payload.id) ? [payload.id] : payload.legendItems.map((overlay) => overlay.id)
  },
  meta: {
    piwikPayload: {
      event: payload.category,
      value: payload.title
    }
  }
});
export const toggleMapOverlayVisibility = (mapLayerId, show) => ({
  type: TOGGLE_MAP_OVERLAY_VISIBILITY,
  mapLayerId,
  show
});
export const updatePan = (payload) => ({
  type: MAP_PAN,
  payload: {
    latitude: payload.lat,
    longitude: payload.lng
  }
});
export const setSelectedLocation = (payload) => ({
  type: SET_MAP_CLICK_LOCATION,
  payload: {
    location: {
      latitude: payload.latlng.lat,
      longitude: payload.latlng.lng
    }
  }
});
export const updateBoundingBox = (payload, isDrawingActive) => ({
  type: isDrawingActive ? MAP_BOUNDING_BOX_SILENT : MAP_BOUNDING_BOX,
  payload
});
