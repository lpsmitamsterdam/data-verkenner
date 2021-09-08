import { Alert, Paragraph } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usePromise, { isFulfilled, isPending, isRejected } from '@amsterdam/use-promise'
import { fetchDetailData, getServiceDefinition, toMapDetails } from '../../legacy/services/map'
import { AuthError, ForbiddenError } from '../../../../shared/utils/api/customError'
import type { DataDetailParams } from '../../../../links'
import useAuthScope from '../../../../shared/hooks/useAuthScope'
import { useMapContext } from '../../../../shared/contexts/map/MapContext'
import LoadingSpinner from '../../../../shared/components/LoadingSpinner/LoadingSpinner'
import useAsyncMapPanelHeader from '../../utils/useAsyncMapPanelHeader'
import GeneralErrorAlert from '../../../../shared/components/Alerts/GeneralErrorAlert'
import AuthScope from '../../../../shared/utils/api/authScope'
import LoginLink from '../../../../shared/components/Links/LoginLink/LoginLink'
import useLegacyDataselectionConfig from '../../../../shared/components/DataSelection/useLegacyDataselectionConfig'
import RenderDetails from './RenderDetails'

const DetailPanel: FunctionComponent = () => {
  const { setDetailFeature, detailFeature } = useMapContext()
  const { isUserAuthorized } = useAuthScope()
  const { type, subtype: subType, id: rawId } = useParams<DataDetailParams>()
  const { currentDatasetConfig } = useLegacyDataselectionConfig()
  const id = rawId.includes('id') ? rawId.substr(2) : rawId

  async function getDetailData() {
    if (!type) {
      return Promise.reject()
    }
    const serviceDefinition = getServiceDefinition(`${type}/${subType}`)
    // Todo: Redirect to 404?
    if (!serviceDefinition) {
      return Promise.resolve(null)
    }

    const userIsAuthorized = isUserAuthorized(serviceDefinition.authScopes)

    if (!userIsAuthorized && serviceDefinition.authScopeRequired) {
      const error = new AuthError(401, serviceDefinition.authExcludedInfo || '')
      return Promise.reject(error)
    }

    const data = await fetchDetailData(serviceDefinition, id)
    const details = await toMapDetails(serviceDefinition, data, { id, type, subType })

    if (details.geometry) {
      setDetailFeature({
        id,
        type: 'Feature',
        geometry: details.geometry,
        properties: null,
      })
    } else {
      setDetailFeature(null)
    }

    return {
      ...details,
      showAuthAlert: !userIsAuthorized,
      authExcludedInfo: serviceDefinition.authExcludedInfo,
    }
  }

  useEffect(() => {
    return () => {
      setDetailFeature(null)
    }
  }, [])

  const results = usePromise(() => getDetailData(), [type, subType, id])
  useAsyncMapPanelHeader(
    results,
    isFulfilled(results) ? results.value?.data?.subTitle : null,
    isFulfilled(results) ? results.value?.data.title : null,
  )

  if (isRejected(results)) {
    if (results.reason instanceof AuthError || results.reason instanceof ForbiddenError) {
      return (
        <Alert level="info" dismissible>
          <Paragraph>
            {currentDatasetConfig?.AUTH_SCOPE === AuthScope.BrkRsn
              ? `Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale objecten met
            zakelijk rechthebbenden te bekijken.`
              : `Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om maatschappelijke activiteiten en vestigingen te bekijken. `}
          </Paragraph>
          <LoginLink />
        </Alert>
      )
    }
    return <GeneralErrorAlert />
  }

  if (isPending(results)) {
    return <LoadingSpinner />
  }

  return <RenderDetails showNoMapObjectsAlert={!detailFeature} details={results.value} />
}

export default DetailPanel
