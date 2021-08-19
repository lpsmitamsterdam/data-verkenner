import styled from 'styled-components'

import { Button, Heading, Link, themeColor, themeSpacing } from '@amsterdam/asc-ui'

export const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: space-between;
  color: ${themeColor('tint', 'level7')};
  margin-bottom: ${themeSpacing(2)};
`

export const InfoButton = styled(Button)`
  border: 1px solid ${themeColor('tint', 'level4')};
`

export const StyledLink = styled(Link)`
  background-color: transparent;
  text-align: left;
`
export const ShowMoreButton = styled(Button)`
  margin-top: ${themeSpacing(2)};
`

export const DataSelectionFiltersContainer = styled.div`
  background-color: ${themeColor('tint', 'level2')};
`

export const DataSelectionFiltersCategory = styled.div`
  padding: ${themeSpacing(5)} ${themeSpacing(5)} ${themeSpacing(1)} ${themeSpacing(5)};
  border-bottom: 1px solid #ccc;

  &:last-child {
    padding-bottom: 0;
  }
`
export const DataSelectionFiltersItem = styled.li`
  line-height: ${themeSpacing(8)};
  overflow: hidden;
`

export const DataSelectionFiltersShowMore = styled.div`
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
`

export const DataSelectionFiltersHiddenOptions = styled.div`
  margin-top: ${themeSpacing(1)};
  margin-bottom: ${themeSpacing(1)};
  color: ${themeColor('tint', 'level5')};
`
export const DataSelectionFiltersItemLabel = styled.div`
  margin-bottom: ${themeSpacing(2)};
`
export const DataSelectionFiltersItemLabelEmpty = styled(DataSelectionFiltersItemLabel)`
  font-style: italic;
`
