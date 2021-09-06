import { themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { DefinitionListItem } from '../../../../app/components/DefinitionList'

const StyledDefinitionListItem = styled(DefinitionListItem)`
  padding-left: ${themeSpacing(5)}; // Align the terms on the left with the page content
`
export default StyledDefinitionListItem
