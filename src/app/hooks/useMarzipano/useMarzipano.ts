import { useStateRef } from '@amsterdam/arm-core'
import debounce from 'lodash.debounce'
import Marzipano from 'marzipano'
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'
import { getOrientation } from '../../pages/MapPage/components/PanoramaViewer/marzipano/marzipano'
import type { Pano } from '../../pages/MapPage/query-params'

const useMarzipano = (
  ref: RefObject<HTMLElement>,
): {
  marzipanoViewer: any
  marzipanoViewerRef: RefObject<HTMLElement>
  currentMarzipanoView: Pano | null
} => {
  const [marzipanoViewer, setMarzipanoInstance, marzipanoViewerRef] = useStateRef<any>(null)
  const [currentMarzipanoView, setCurrentMarzipanoView] = useState<Pano | null>(null)

  const updateOrientation = () => {
    if (!marzipanoViewerRef.current) {
      return
    }

    const { heading, pitch, fov } = getOrientation(marzipanoViewerRef.current)

    if (heading && pitch && fov) {
      setCurrentMarzipanoView({ heading, pitch, fov })
    }
  }

  const updateOrientationDebounced = debounce(updateOrientation, 300, {
    leading: true,
    trailing: true,
  })

  useEffect(() => {
    if (!ref.current) {
      return undefined
    }

    const viewer = new Marzipano.Viewer(ref.current, {
      stage: {
        preserveDrawingBuffer: true,
        width: 960,
      },
    })

    setMarzipanoInstance(viewer)

    viewer.addEventListener('viewChange', updateOrientationDebounced)

    return () => {
      if (marzipanoViewerRef.current) {
        setMarzipanoInstance(null)
      }
    }
  }, [ref])

  return {
    marzipanoViewer,
    marzipanoViewerRef,
    currentMarzipanoView,
  }
}

export default useMarzipano
