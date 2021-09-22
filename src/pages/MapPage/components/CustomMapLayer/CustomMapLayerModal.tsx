import {
  Button,
  Divider,
  Heading,
  Modal,
  Row,
  Select,
  TextField,
  themeSpacing,
  TopBar,
} from '@amsterdam/asc-ui'
import type { ChangeEvent, FormEvent, FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'
import { Close } from '@amsterdam/asc-assets'
import usePromise, { isFulfilled, isPending } from '@amsterdam/use-promise'
import { fetchProxy } from '../../../../shared/utils/api/api'
import useParam from '../../../../shared/hooks/useParam'
import { customMapLayer } from '../../query-params'
import ModalBlock from '../../../../shared/components/Modal/ModalBlock'
import getMapConfigData from '../../utils/getMapConfigData'
import LoadingSpinner from '../../../../shared/components/LoadingSpinner/LoadingSpinner'
import GeneralErrorAlert from '../../../../shared/components/Alerts/GeneralErrorAlert'

const StyledDivider = styled(Divider)`
  margin: ${themeSpacing(2, 0)};
`

const StyledRow = styled(Row)`
  justify-content: center;
  margin: ${themeSpacing(5)};
`

const Footer = styled.footer`
  margin-top: ${themeSpacing(5)};
`

const generateIconUrl = (layer: string, imageRule: string, url: string) => {
  const searchParams = new URLSearchParams({
    version: '1.3.0',
    service: 'WMS',
    request: 'GetLegendGraphic',
    sld_version: '1.1.0',
    layer,
    format: 'image/svg+xml',
    rule: imageRule,
  })
  return `https://map.data.amsterdam.nl${url}?${searchParams.toString()}`
}

const generateLayerParameters = (layers: string[], url: string) => {
  const options = {
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    layers: layers.join(','),
  }
  return {
    url,
    options,
  }
}

interface MapConfigLayerItem {
  name: string
}

interface MapConfigLayer {
  classes: MapConfigLayerItem[]
  maxZoom: number
  minZoom: number
  name: string
}

interface MapConfigCollection {
  file_name: string
  layers: MapConfigLayer[]
}

const CustomMapLayerModal: FunctionComponent<{
  open: boolean
  onClose: () => void
  editId?: string
}> = ({ open, onClose, editId }) => {
  const [, setError] = useState<string[]>()
  const [customMapLayers, setCustomMapLayer] = useParam(customMapLayer)

  const prefillData = customMapLayers?.find(({ id }) => id === editId)

  const [currentEndpointIndex, setCurrentEndpointIndex] = useState<number>(0)
  const [currentLayerIndex, setCurrentLayerIndex] = useState<number>(-1)
  const [currentLayerValue, setCurrentLayerValue] = useState<string>('')
  const [currentIconValue, setCurrentIconValue] = useState<string>('')
  const mapConfigData = usePromise(() => getMapConfigData())

  useEffect(() => {
    if (isFulfilled(mapConfigData) && mapConfigData.value) {
      // If the user has already set data then set the initial form values accordingly
      if (prefillData) {
        // Get the endpoint index from the API data - if it exists
        const endpointUrl = prefillData.url.replace('/maps/', '')
        const endpointIndex = mapConfigData.value.mapfiles.findIndex(
          (endpoint: MapConfigCollection) => endpoint.file_name === endpointUrl,
        )

        if (endpointIndex > -1) {
          setCurrentEndpointIndex(endpointIndex)

          if (prefillData.layers.length) {
            const layerIndex = mapConfigData.value.mapfiles[endpointIndex].layers.findIndex(
              (layer: MapConfigLayer) => layer.name === prefillData.layers[0],
            )

            setCurrentLayerIndex(layerIndex)
            setCurrentLayerValue(prefillData.layers[0])

            // Parse icon from URL
            const iconUrlParams = new URLSearchParams(prefillData.iconUrl)
            setCurrentIconValue(iconUrlParams.get('rule') ?? '')
          } else {
            setCurrentLayerValue(mapConfigData.value.mapfiles[endpointIndex].layers[0].name)
            setCurrentLayerIndex(0)
            setCurrentIconValue('')
          }

          return
        }
      }

      setCurrentLayerValue(mapConfigData.value.mapfiles[currentEndpointIndex].layers[0].name)
      setCurrentLayerIndex(0)

      if (mapConfigData.value.mapfiles[currentEndpointIndex].layers[0].classes.length) {
        setCurrentIconValue(
          mapConfigData.value.mapfiles[currentEndpointIndex].layers[0].classes[0].name,
        )
      } else {
        setCurrentIconValue('')
      }
    }
  }, [mapConfigData, currentEndpointIndex, prefillData])

  if (isPending(mapConfigData)) {
    return (
      <StyledRow>
        <LoadingSpinner data-testid="loadingSpinner" />
      </StyledRow>
    )
  }

  if (isFulfilled(mapConfigData)) {
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)

      const imageRule =
        currentIconValue !== null ? currentIconValue : (formData.get('title') as string)
      const title = formData.get('title') as string
      const url = `/maps/${mapConfigData.value.mapfiles[currentEndpointIndex].file_name as string}`
      const image = generateIconUrl(currentLayerValue, imageRule, url)
      const mapLayerOptions = generateLayerParameters([currentLayerValue], url)

      try {
        await Promise.all([fetchProxy(image), fetchProxy(mapLayerOptions.url)])
      } catch (e) {
        setError(['Er is iets mis'])
      }

      const newCustomLayer = {
        title,
        url,
        options: mapLayerOptions.options,
        iconUrl: image,
        layers: [mapConfigData.value.mapfiles[currentEndpointIndex].layers[currentLayerIndex].name],
        imageRule: formData.get('imageRule') as string,
        notSelectable: true,
      }

      if (image && mapLayerOptions) {
        const updatedMapLayers = customMapLayers?.map((mapLayer) =>
          mapLayer.id === editId
            ? {
                ...mapLayer,
                ...newCustomLayer,
              }
            : mapLayer,
        )

        if (updatedMapLayers && editId) {
          // Update
          setCustomMapLayer(updatedMapLayers)
        } else {
          //  Create
          setCustomMapLayer([
            ...(customMapLayers?.length ? customMapLayers : []),
            {
              id: v4(),
              ...newCustomLayer,
            },
          ])
        }
      }

      onClose()

      // Todo: make it possible to download the json files:
      //
      // console.log({
      //   id: title?.toLocaleLowerCase()?.replaceAll(' ', '_'),
      //   title,
      //   type: 'wms',
      //   layers,
      //   notSelectable: formData.get('hasMultipleLegends') ?? false,
      //   url,
      //   ...(imageRule
      //     ? {
      //         imageRule,
      //       }
      //     : {}),
      //   ...(geosearchUrl
      //     ? {
      //         geosearchUrl,
      //       }
      //     : {}),
      //   ...(detailParams
      //     ? {
      //         detailParams: JSON.parse(detailParams),
      //       }
      //     : {}),
      //   meta: {
      //     themes: ['ruimte-en-topografie'],
      //   },
      // })
    }

    const onRemove = (id: string) => {
      if (customMapLayers?.length) {
        setCustomMapLayer(customMapLayers?.filter((layer) => layer.id !== id))
      }
    }

    const onEndpointSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const index = parseInt(event.target.value, 10)
      setCurrentEndpointIndex(index)
      setCurrentLayerIndex(0)

      if (mapConfigData.value.mapfiles[index].layers[0].classes.length) {
        // Sometimes layers with no icons have an empty object
        setCurrentIconValue(
          Object.keys(mapConfigData.value.mapfiles[index].layers[0].classes[0]).length
            ? mapConfigData.value.mapfiles[index].layers[0].classes[0].name
            : '',
        )
      } else {
        setCurrentIconValue('')
      }
    }

    const onLayerSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const layerIndex = mapConfigData.value.mapfiles[currentEndpointIndex].layers.findIndex(
        (layer: MapConfigLayerItem) => layer.name === event.target.value,
      )

      // Ideally we would only need to save the index value but then the Select component value won't always update
      // when changing endpoints because the index value can remain the same
      setCurrentLayerIndex(layerIndex)
      setCurrentLayerValue(event.target.value)
      setCurrentIconValue(
        mapConfigData.value.mapfiles[currentEndpointIndex].layers[layerIndex].classes.length
          ? mapConfigData.value.mapfiles[currentEndpointIndex].layers[layerIndex].classes[0].name
          : '',
      )
    }

    const buildEndpointOptions = () => {
      // Sort endpoints alphabetically
      const sortedData = mapConfigData.value.mapfiles.sort(
        (a: MapConfigCollection, b: MapConfigCollection) => a.file_name.localeCompare(b.file_name),
      )

      return sortedData.map((endpoint: MapConfigCollection, index: number) => (
        <option value={index} key={endpoint.file_name}>
          /maps/{endpoint.file_name}
        </option>
      ))
    }

    const buildLayerOptions = () => {
      return mapConfigData.value.mapfiles[currentEndpointIndex].layers.map(
        (layer: MapConfigLayerItem) => (
          <option value={layer.name} key={layer.name}>
            {layer.name}
          </option>
        ),
      )
    }

    const buildIconOptions = () => {
      if (currentLayerIndex > -1) {
        // Layers without icons have no classes, as expected
        if (
          mapConfigData.value.mapfiles[currentEndpointIndex].layers[currentLayerIndex].classes
            .length
        ) {
          // However, sometimes layers without icons have an empty object
          if (
            Object.keys(
              mapConfigData.value.mapfiles[currentEndpointIndex].layers[currentLayerIndex]
                .classes[0],
            ).length
          ) {
            return mapConfigData.value.mapfiles[currentEndpointIndex].layers[
              currentLayerIndex
            ].classes.map((layerClass: MapConfigLayerItem) => (
              <option value={layerClass.name} key={layerClass.name}>
                {layerClass.name}
              </option>
            ))
          }
        }
      }

      return null
    }

    const endpointOptions = buildEndpointOptions()
    const layerOptions = buildLayerOptions()
    const iconOptions = buildIconOptions()

    return (
      <Modal open={open} onClose={onClose}>
        <TopBar>
          <Heading as="h4">
            Tijdelijk kaartlaag toevoegen om te testen
            <Button
              variant="blank"
              title="Sluit"
              type="button"
              size={30}
              onClick={onClose}
              icon={<Close />}
            />
          </Heading>
        </TopBar>
        <Divider />
        <ModalBlock>
          <form onSubmit={onSubmit}>
            <TextField name="title" label="Titel" defaultValue={prefillData?.title} required />
            <StyledDivider />
            <Select
              id="endpoint"
              label="Endpoint van de mapserver"
              value={currentEndpointIndex.toString()}
              onChange={onEndpointSelectChange}
            >
              {endpointOptions}
            </Select>
            <StyledDivider />
            <Select
              id="layers"
              label="Mapserver Lagen"
              value={currentLayerValue}
              onChange={onLayerSelectChange}
            >
              {layerOptions}
            </Select>
            <StyledDivider />

            <Select
              id="icon"
              label="Bestandsnaam legenda icon"
              value={currentIconValue}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                setCurrentIconValue(event.target.value)
              }}
              disabled={iconOptions === null}
            >
              {iconOptions ?? <option>Geen iconen beschikbaar</option>}
            </Select>

            <Footer>
              <Button variant="primary" type="submit">
                Opslaan
              </Button>
              {editId && <Button onClick={() => onRemove(editId)}>Verwijder</Button>}
            </Footer>
          </form>
        </ModalBlock>
      </Modal>
    )
  }

  return <GeneralErrorAlert />
}

export default CustomMapLayerModal
