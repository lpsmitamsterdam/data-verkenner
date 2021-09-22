import { fetchWithoutToken } from '../../../../shared/utils/api/api'

const getMapConfigData = () => fetchWithoutToken('https://map.data.amsterdam.nl/sld/config.json')

export default getMapConfigData
