import type { InfoBoxProps } from '../types/details'

const getInfoBox = ({ description, url, plural }: Omit<InfoBoxProps, 'meta'>): InfoBoxProps => ({
  description,
  url,
  plural,
})

export default getInfoBox
