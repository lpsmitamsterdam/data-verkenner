import type { PartialLocation } from 'history'
import type { DataDetailParams } from '../../../../links'
import { toDataDetail } from '../../../../links'

export default function buildDetailUrl({ type, subtype, id }: DataDetailParams): PartialLocation {
  return {
    ...toDataDetail({ type, subtype, id }),
    search: window.location.search,
  }
}
