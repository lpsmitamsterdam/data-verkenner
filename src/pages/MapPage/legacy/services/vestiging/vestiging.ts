import { fetchWithToken } from '../../../../../app/utils/api/api'
import environment from '../../../../../environment'
import type { PotentialApiResult } from '../../types/details'

const normalize = async (result: PotentialApiResult) => {
  let societalActivities

  if (result.maatschappelijke_activiteit) {
    societalActivities = await fetchWithToken(result.maatschappelijke_activiteit)
  }

  const additionalFields = {
    ...(societalActivities ? { kvkNumber: societalActivities.kvk_nummer } : {}),
    activities: (result.activiteiten || [])
      .map(
        (item) =>
          `${item.sbi_code ?? ''}${item.sbi_omschrijving ? `: ${item.sbi_omschrijving}` : ''}`,
      )
      .join('\n'),
    type: result.hoofdvestiging ? 'Hoofdvestiging' : 'Nevenvestiging',
    // eslint-disable-next-line no-underscore-dangle
    ...(result._bijzondere_rechts_toestand?.faillissement ||
    // eslint-disable-next-line no-underscore-dangle
    result._bijzondere_rechts_toestand?.status
      ? {
          bijzondereRechtstoestand: {
            // eslint-disable-next-line no-underscore-dangle
            label: result._bijzondere_rechts_toestand.faillissement
              ? 'Faillissement'
              : 'Surseance van betaling',
          },
        }
      : {}),
    geometry: result.bezoekadres?.geometrie || result.geometrie,
  }

  return { ...result, ...additionalFields }
}

export function fetchByPandId(pandId: string) {
  const searchParams = {
    pand: pandId,
  }

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return fetchWithToken(`${environment.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    (data) => data.results,
  )
}

export function fetchByAddressId(addressId: string) {
  const searchParams = {
    nummeraanduiding: addressId,
  }

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return fetchWithToken(`${environment.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    (data) => data.results,
  )
}

export default normalize
