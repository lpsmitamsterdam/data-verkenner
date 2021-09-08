import type { FunctionComponent } from 'react'
import IconBuilding from '../../assets/icons/data/IconBuilding.svg'
import IconChurch from '../../assets/icons/data/IconChurch.svg'
import IconConstruction from '../../assets/icons/data/IconConstruction.svg'
import IconFactory from '../../assets/icons/data/IconFactory.svg'
import IconHandshake from '../../assets/icons/data/IconHandshake.svg'
import IconHouse from '../../assets/icons/data/IconHouse.svg'
import IconMap from '../../assets/icons/data/IconMap.svg'
import IconMarker from '../../assets/icons/data/IconMarker.svg'
import IconMarkerMap from '../../assets/icons/data/IconMarkerMap.svg'
import IconOffice from '../../assets/icons/data/IconOffice.svg'
import IconPark from '../../assets/icons/data/IconPark.svg'
import IconSkyscraper from '../../assets/icons/data/IconSkyscraper.svg'

const ICONS = {
  adressen: <IconMarker />,
  gebieden: <IconMap />,
  kadastrale_objecten: <IconBuilding />,
  kadastrale_subjecten: <IconOffice />,
  maatschappelijkeactiviteit: <IconHandshake />,
  meetbouten: <IconHouse />,
  monumenten: <IconChurch />,
  openbareruimte: <IconPark />,
  panden: <IconSkyscraper />,
  straatnamen: <IconMarkerMap />,
  vestigingen: <IconFactory />,
  bouwdossiers: <IconConstruction />,
}

export type DataIconType = keyof typeof ICONS

export interface DataIconProps {
  type: DataIconType
}

const DataIcon: FunctionComponent<DataIconProps> = ({ type }) => ICONS[type]

export default DataIcon
