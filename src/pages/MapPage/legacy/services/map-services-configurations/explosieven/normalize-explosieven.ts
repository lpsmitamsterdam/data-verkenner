import formatDate from '../../../../../../app/utils/formatDate'
import type {
  Explosievenbominslag,
  Explosievengevrijwaardgebied,
  Explosievenuitgevoerdonderzoek,
} from '../../../../../../api/explosieven/generated'

export interface NormalizedInslagen extends Explosievenbominslag {
  datum: string | null
  datumInslag: string | null
}

export interface NormalizedUitgevoerdOnderzoek extends Explosievenuitgevoerdonderzoek {
  datum: string | null
  datumInslag: null
}

export interface NormalizedGevrijwaardGebied extends Explosievengevrijwaardgebied {
  datum: string | null
  datumInslag: null
}

function normalizeExplosieven(result: Explosievenuitgevoerdonderzoek): NormalizedUitgevoerdOnderzoek
function normalizeExplosieven(result: Explosievenbominslag): NormalizedInslagen
function normalizeExplosieven(result: Explosievengevrijwaardgebied): NormalizedGevrijwaardGebied
function normalizeExplosieven(
  result: Explosievenuitgevoerdonderzoek | Explosievenbominslag | Explosievengevrijwaardgebied,
) {
  const additionalFields = {
    datum: result.datum ? formatDate(new Date(result.datum)) : null,
    datumInslag:
      'datumInslag' in result && result.datumInslag
        ? formatDate(new Date(result.datumInslag ?? ''))
        : null,
  }

  return { ...result, ...additionalFields }
}

export default normalizeExplosieven
