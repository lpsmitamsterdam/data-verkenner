import type { ElementType, FunctionComponent } from 'react'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Button, Checkbox, Label, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import MAP_CONFIG from '../../legacy/services/map.config'
import type { ExtendedMapGroup } from '../../legacy/services'
import { isAuthorised } from '../../legacy/utils/map-layer'
import LayerLegendZoomButton from './LayerLegendZoomButton'
import type AuthScope from '../../../../shared/utils/api/authScope'

const MapLayerWithLegendStyle = styled.li<{ notSelectable: boolean; disabled?: boolean }>`
  align-items: center;
  display: flex;
  padding: ${themeSpacing(0, 3, 0, 2)};
  ${({ notSelectable }) =>
    notSelectable
      ? css`
          margin-left: 23px;
        `
      : css`
          border-bottom: 1px solid ${themeColor('tint', 'level4')};
        `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.9;

      img {
        opacity: 0.4;
      }
    `}
`

const StyledLabel = styled(Label)<{ disabled?: boolean }>`
  width: 100%;
  margin-right: auto !important;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`

const StyledCheckbox = styled(Checkbox)`
  padding-right: 0;
  margin-left: ${themeSpacing(-1)};
`

const NonSelectableLegendParagraph = styled.p<{ disabled?: boolean }>`
  margin-bottom: ${themeSpacing(2)};
  margin-right: auto !important;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`

const MapLegendImage = styled.div`
  box-sizing: content-box;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  width: 16px;
  margin-left: ${themeSpacing(3)};

  & + * {
    margin-left: ${themeSpacing(2)} !important;
  }

  & > img {
    height: auto;
    width: inherit;
  }
`

interface MapLayerWithLegendItemProps {
  layerIsRestricted?: boolean
  legendItem: Pick<
    ExtendedMapGroup,
    | 'id'
    | 'isVisible'
    | 'title'
    | 'legendIconURI'
    | 'notSelectable'
    | 'iconUrl'
    | 'minZoom'
    | 'authScope'
  >
  onAddLayers: (id: string[]) => void
  onRemoveLayers: (id: string[]) => void
  onEdit?: (id: string) => void
}

const LayerLegend: FunctionComponent<MapLayerWithLegendItemProps & Partial<HTMLLIElement>> = ({
  layerIsRestricted,
  legendItem,
  onAddLayers,
  onRemoveLayers,
  onEdit,
  className,
}) => {
  const LegendLabel = useMemo(
    () =>
      !legendItem.notSelectable
        ? (StyledLabel as ElementType)
        : (NonSelectableLegendParagraph as ElementType),
    [legendItem],
  )

  const icon = legendItem.iconUrl
    ? legendItem.iconUrl
    : new URL(`${MAP_CONFIG.OVERLAY_ROOT}${legendItem.legendIconURI as string}`).toString()

  if (layerIsRestricted) {
    return (
      <MapLayerWithLegendStyle
        notSelectable={legendItem.notSelectable}
        className={className}
        disabled
        data-testid={`mapLayerLegend${legendItem.title}`}
      >
        <LegendLabel htmlFor={legendItem.id} label={legendItem.title} disabled>
          {!legendItem.notSelectable ? (
            <StyledCheckbox
              id={legendItem.id ?? '1'}
              className="checkbox"
              // @ts-ignore
              variant="tertiary"
              checked={legendItem.isVisible ?? false}
              name={legendItem.title}
              disabled
            />
          ) : (
            legendItem.title
          )}
        </LegendLabel>
        <MapLegendImage>
          <img alt={legendItem.title} src={icon} />
        </MapLegendImage>
      </MapLayerWithLegendStyle>
    )
  }

  return (
    <MapLayerWithLegendStyle
      notSelectable={legendItem.notSelectable}
      className={className}
      data-testid={`mapLayerLegend${legendItem.title}`}
    >
      <LegendLabel htmlFor={legendItem.id} label={legendItem.title}>
        {!legendItem.notSelectable ? (
          <StyledCheckbox
            id={legendItem.id ?? '1'}
            className="checkbox"
            // @ts-ignore
            variant="tertiary"
            checked={legendItem.isVisible ?? false}
            name={legendItem.title}
            onChange={() => {
              if (!legendItem.isVisible) {
                onAddLayers([legendItem.id ?? '1'])
              } else {
                onRemoveLayers([legendItem.id ?? '1'])
              }
            }}
          />
        ) : (
          legendItem.title
        )}
      </LegendLabel>
      {isAuthorised(legendItem.authScope as AuthScope) && legendItem.isVisible && (
        <LayerLegendZoomButton minZoom={legendItem.minZoom} />
      )}
      {onEdit && <Button onClick={() => onEdit(legendItem.id)}>Edit</Button>}
      <MapLegendImage>
        <img alt={legendItem.title} src={icon} />
      </MapLegendImage>
    </MapLayerWithLegendStyle>
  )
}

export default LayerLegend
