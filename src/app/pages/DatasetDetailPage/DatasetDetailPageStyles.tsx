import styled from 'styled-components'
import { themeColor, themeSpacing } from '@amsterdam/asc-ui'

export const DatasetDetailPageHeader = styled.div`
  position: relative;
`

export const DatasetDetailPageTitle = styled.h1`
  font-size: 26px; // was $xl-header-font (scaled)
  margin-top: 0;
  margin-bottom: 10px; // was base-whitespace-1
`

export const DatasetDetailPageSubtitle = styled.h2`
  font-size: 20px; // was font-size-responsive($l-header-font);
  color: ${themeColor('secondary')}; // was $primary-contrast;
  display: block;
  margin-bottom: 0.4 * 10px;
`

export const TagListItem = styled.li`
  display: inline;
`

export const Content = styled.div`
  width: 100%;
`
export const DatasetDetailPageButtonGroup = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const DatasetDetailPageBlock = styled.div`
  border-bottom: 1px solid #ccc; // was $secondary-gray20;
  margin-bottom: ${themeSpacing(10)};
  margin-top: ${themeSpacing(8)};
  padding-bottom: ${themeSpacing(2)};
`
