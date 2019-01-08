import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import get from 'lodash.get';
import {
  fetchDataSelection,
  receiveDataSelectionFailure,
  receiveDataSelectionSuccess,
  setMarkers,
  removeGeometryFilter
} from '../../ducks/data-selection/actions';
import { routing } from '../../../app/routes';
import dataselectionConfig from '../../services/data-selection/data-selection-config';
import { getMarkers, query } from '../../services/data-selection/data-selection-api';
import { getMapBoundingBox, getMapZoom } from '../../../map/ducks/map/map-selectors';
import {
  ADD_FILTER,
  EMPTY_FILTERS,
  getFilters,
  REMOVE_FILTER,
  setShapeFilter
} from '../../ducks/filters/filters';
import {
  isDataSelectionPage,
  preserveQuery,
  toDatasetPage
} from '../../../store/redux-first-router';
import {
  FETCH_DATA_SELECTION_REQUEST,
  SET_DATASET,
  SET_GEOMETRY_FILTER,
  SET_PAGE,
  SET_VIEW,
  VIEWS
} from '../../ducks/data-selection/constants';
import {
  getDataSelection,
  getGeomarkersShape,
  getGeometryFilters
} from '../../ducks/data-selection/selectors';
import { waitForAuthentication } from '../user/user';
import { MAP_BOUNDING_BOX } from '../../../map/ducks/map/map';
import PARAMETERS from '../../../store/parameters';

export const createShapeFilter = (geometryFilter) =>
  (geometryFilter.markers === undefined
    ? {}
    : {
      slug: 'shape',
      label: 'Locatie',
      option: `ingetekend (${geometryFilter.description})`
    });

function* getMapMarkers(dataset, activeFilters) {
  // Since bounding box can be set later, we check if we have to wait for the boundingbox to get set
  let boundingBox = yield select(getMapBoundingBox);
  if (!boundingBox) {
    yield take(MAP_BOUNDING_BOX);
    boundingBox = yield select(getMapBoundingBox);
  }
  const mapZoom = yield select(getMapZoom);
  const markerData = yield call(getMarkers,
    dataset, activeFilters, mapZoom, boundingBox);
  yield put(setMarkers(markerData));
}

function* retrieveDataSelection(action) {
  const {
    dataset,
    view,
    activeFilters,
    page,
    searchText,
    shape,
    catalogFilters
  } = action.payload;
  try {
    yield call(waitForAuthentication);

    // exclude the geometryFilter from the attribute filters
    // TODO DP-6442 improve the geometryFilter handling
    const activeAttributeFilters = Object.keys(activeFilters)
                                         .filter((key) => key !== 'shape')
                                         .reduce((result, key) => ({
                                           ...result,
                                           [key]: activeFilters[key]
                                         }), {});
    const result = yield call(query,
      dataset, view, activeAttributeFilters, page, searchText, shape, catalogFilters);

    // Put the results in the reducer
    yield put(receiveDataSelectionSuccess({
      dataset, view, activeFilters, page, shape, result
    }));

    // Check if markers need to be fetched
    const { MAX_NUMBER_OF_CLUSTERED_MARKERS } = dataselectionConfig.datasets[dataset];
    const markersShouldBeFetched = (
      view !== VIEWS.TABLE && result.numberOfRecords <= MAX_NUMBER_OF_CLUSTERED_MARKERS
    );

    if (markersShouldBeFetched) {
      yield call(getMapMarkers, dataset, { ...activeFilters, shape });
    }
  } catch (e) {
    yield put(receiveDataSelectionFailure({
      error: e.message,
      dataset
    }));
  }
}

function* fireRequest(action) {
  const state = yield select();

  // Always ensure we are on the right page, otherwise this can be called unintentionally
  if (isDataSelectionPage(state) && !get(action, 'meta.skipFetch')) {
    const dataSelection = getDataSelection(state);
    const activeFilters = getFilters(state);
    const shape = getGeomarkersShape(state);

    yield put(
      fetchDataSelection({
        ...dataSelection,
        activeFilters,
        shape
      })
    );
  }
}

function* clearShapeFilter(action) {
  if (action.payload === 'shape') {
    yield put(removeGeometryFilter());
  }
}

function* switchPage(additionalParams = {}) {
  const state = yield select();
  const dataSelection = getDataSelection(state);
  yield put(preserveQuery(toDatasetPage(dataSelection.dataset), additionalParams));
}

function* setGeometryFilters(action) {
  console.log(action.payload);
  if (action.payload) {
    yield put(setShapeFilter(createShapeFilter(action.payload)));
  }

  const geometryFilters = yield select(getGeometryFilters);

  yield call(switchPage, {
    [PARAMETERS.GEO]: geometryFilters,
    [PARAMETERS.VIEW]: VIEWS.LIST
  });
}

export default function* watchFetchDataSelection() {
  yield takeLatest(REMOVE_FILTER, clearShapeFilter);
  yield takeLatest(SET_GEOMETRY_FILTER, setGeometryFilters);
  yield takeLatest(
    [SET_VIEW, ADD_FILTER, REMOVE_FILTER, EMPTY_FILTERS,
      routing.addresses.type, routing.establishments.type, routing.cadastralObjects.type
    ],
    fireRequest
  );

  // Actions
  yield takeLatest(FETCH_DATA_SELECTION_REQUEST, retrieveDataSelection);
  yield takeLatest([SET_DATASET, SET_PAGE], switchPage);
}
