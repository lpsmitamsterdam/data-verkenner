import joinUrl from '../../../shared/utils/joinUrl'
import environment from '../../../environment'
import { fetchWithToken } from '../../../shared/utils/api/api'
import type { Single as Bouwdossier } from './types'

/**
 * Retrieve iiif-metadata about bouwdossiers
 *
 * API documentation: https://api.data.amsterdam.nl/iiif-metadata/bouwdossier
 */
// eslint-disable-next-line import/prefer-default-export
export const getBouwdossierById = (id: string) =>
  fetchWithToken<Bouwdossier>(
    joinUrl([environment.API_ROOT, 'iiif-metadata', 'bouwdossier', id], true),
  )
