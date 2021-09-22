import styled from 'styled-components'
import { Link, themeSpacing } from '@amsterdam/asc-ui'

const ListLink = styled(Link)`
  width: 100%;
  margin: ${themeSpacing(1)} 0;
  /* TODO: Remove this once this issue has been resolved: https://github.com/Amsterdam/amsterdam-styled-components/issues/727 */
  font-size: 16px;
  line-height: 20px;
`

export default ListLink
