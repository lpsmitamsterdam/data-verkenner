import { fetchWithToken } from '../../../../../shared/utils/api/api'
import environment from '../../../../../environment'
import { adressenVerblijfsobject } from '../normalize/normalize'
import type {
  List as NummeraanduidingList,
  Single as Nummeraanduiding,
} from '../../../../../api/bag/v1.1/nummeraanduiding'

const normalize = async (result: Nummeraanduiding) => {
  let verblijfsobjectData
  if (result.verblijfsobject) {
    verblijfsobjectData = adressenVerblijfsobject(await fetchWithToken(result.verblijfsobject))
  }
  const additionalFields = {
    isNevenadres: result.type_adres === 'Nevenadres',
    // eslint-disable-next-line no-underscore-dangle
    geometry: result._geometrie,
  }

  return { ...result, ...additionalFields, verblijfsobjectData }
}

export function fetchByPandId(pandId: string) {
  const searchParams = {
    pand: pandId,
  }

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return fetchWithToken<NummeraanduidingList>(
    `${environment.API_ROOT}bag/v1.1/nummeraanduiding/?${queryString}`,
  ).then((data) => data.results)
}

export function fetchByLigplaatsId(ligplaatsId: string) {
  const searchParams = {
    ligplaats: ligplaatsId,
  }

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return fetchWithToken<NummeraanduidingList>(
    `${environment.API_ROOT}bag/v1.1/nummeraanduiding/?${queryString}`,
  ).then((data) =>
    data.results.map((result) => ({
      ...result,
      id: result.landelijk_id,
    })),
  ) as Promise<Array<NummeraanduidingList['results'] & { id: Nummeraanduiding['landelijk_id'] }>>
}

export function fetchHoofdadresByLigplaatsId(ligplaatsId: string) {
  return fetchByLigplaatsId(ligplaatsId).then((results) =>
    // @ts-ignore
    results.find((result) => result.hoofdadres),
  )
}

export function fetchByStandplaatsId(standplaatsId: string) {
  const searchParams = {
    standplaats: standplaatsId,
  }

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return fetchWithToken<NummeraanduidingList>(
    `${environment.API_ROOT}bag/v1.1/nummeraanduiding/?${queryString}`,
  ).then((data) =>
    data.results.map((result) => ({
      ...result,
      id: result.landelijk_id,
    })),
  )
}

export function fetchHoofdadresByStandplaatsId(standplaatsId: string) {
  return fetchByStandplaatsId(standplaatsId).then((results) =>
    results.find((result) => result.hoofdadres),
  )
}

export default normalize
