import { Button, Divider, Heading, Modal, TextField, themeSpacing, TopBar } from '@amsterdam/asc-ui'
import type { FormEvent, FunctionComponent } from 'react'
import { useState } from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'
import { Close } from '@amsterdam/asc-assets'
import { fetchProxy } from '../../../../shared/utils/api/api'
import useParam from '../../../../shared/hooks/useParam'
import { customMapLayer } from '../../query-params'
import ModalBlock from '../../../../shared/components/Modal/ModalBlock'

const StyledDivider = styled(Divider)`
  margin: ${themeSpacing(2, 0)};
`

const Footer = styled.footer`
  margin-top: ${themeSpacing(5)};
`

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

const CustomMapLayerModal: FunctionComponent<{
  open: boolean
  onClose: () => void
  editId?: string
}> = ({ open, onClose, editId }) => {
  const [, setError] = useState<string[]>()
  const [customMapLayers, setCustomMapLayer] = useParam(customMapLayer)
  const prefillData = customMapLayers?.find(({ id }) => id === editId)

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)

    const layers = (formData.get('layers') as string)?.split(',')?.map((item) => item.trim())
    const imageRule =
      formData.get('imageRule') !== null
        ? (formData.get('imageRule') as string)
        : (formData.get('title') as string)
    const title = formData.get('title') as string
    const url = formData.get('url') as string
    const image = generateIconUrl(layers[0], imageRule, url)
    const mapLayerOptions = generateLayerParameters(layers, url)

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
      layers,
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
          <TextField name="title" label="Titel" defaultValue={prefillData?.title} />
          <StyledDivider />
          <TextField
            name="url"
            label="Endpoint van de mapserver"
            placeholder="bijv. /maps/varen"
            defaultValue={prefillData?.url}
          />
          <StyledDivider />
          <TextField
            name="layers"
            label="Mapserver Lagen"
            placeholder="Indien meerdere lagen, scheiden met komma"
            defaultValue={prefillData?.layers}
          />
          <StyledDivider />
          <TextField
            defaultValue={prefillData?.imageRule}
            name="imageRule"
            label="Bestandsnaam legenda icon"
            placeholder={`De "rule" parameter om de legenda img op te vragen`}
          />
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

export default CustomMapLayerModal
