import joinUrl from '../../../shared/utils/joinUrl'
import environment from '../../../environment'
import { fetchProxy } from '../../../shared/utils/api/api'
import type { DcatDataset } from './types'

/**
 * Get a data catalogue entry by its identifier.
 *
 * API documentation: https://api.data.amsterdam.nl/api/swagger/?url=/dcatd/openapi#/default/get_datasets__id_
 */
// eslint-disable-next-line import/prefer-default-export
export async function getDatasetById(id: string) {
  return fetchProxy<DcatDataset>(joinUrl([environment.API_ROOT, 'dcatd/datasets', id]))
}
