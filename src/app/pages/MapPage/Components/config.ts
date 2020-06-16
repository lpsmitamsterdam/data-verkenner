import {
  toAdresses,
  toCadastralObjects,
  toDetailFromEndpoint,
  toEstablishments,
} from '../../../../store/redux-first-router/actions'

// Because we use these types as id's in option values (select), we need to convert them to strings
export enum DataSelectionType {
  BAG = 'BAG',
  BRK = 'BRK',
  HR = 'HR',
}

export enum DataSelectionMapVisualizationType {
  GeoJSON,
  Markers,
}

export enum AuthScope {
  BRK = 'BRK/RSN',
  HR = 'HR/R',
  None = 'None',
}

export default {
  [DataSelectionType.BAG]: {
    authScope: AuthScope.None,
    title: 'Adressen',
    toTableAction: toAdresses(),
    toDetailAction: (id) =>
      toDetailFromEndpoint(`${process.env.API_ROOT}bag/nummeraanduiding/${id}`),
    endpointData: `${process.env.API_ROOT}dataselectie/bag/`,
    endpointMapVisualization: `${process.env.API_ROOT}dataselectie/bag/geolocation/`,
  },
  [DataSelectionType.HR]: {
    authScope: AuthScope.HR,
    title: 'Vestigingen',
    toTableAction: toEstablishments(),
    toDetailAction: (id) =>
      toDetailFromEndpoint(`${process.env.API_ROOT}handelsregister/vestiging/${id}`),
    endpointData: `${process.env.API_ROOT}dataselectie/hr/`,
    endpointMapVisualization: `${process.env.API_ROOT}dataselectie/hr/geolocation/`,
  },
  [DataSelectionType.BRK]: {
    authScope: AuthScope.BRK,
    title: 'Kadastrale objecten',
    toTableAction: toCadastralObjects(),
    toDetailAction: (id) => toDetailFromEndpoint(`${process.env.API_ROOT}brk/object/${id}`),
    endpointData: `${process.env.API_ROOT}dataselectie/brk/kot/`,
    endpointMapVisualization: `${process.env.API_ROOT}dataselectie/brk/geolocation/`,
  },
}
