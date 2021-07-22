import { useState } from 'react'
import fileSaver from 'file-saver'

function useDownload(): [
  boolean,
  boolean,
  (url: string, options?: RequestInit, fileName?: string) => void,
] {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  function downloadFile(url: string, options = {}, fileName = '') {
    setLoading(true)
    setError(false)

    return fetch(url, options)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Cannot download')
        }

        return response.blob()
      })
      .then((blob) => {
        // @ts-ignore
        fileSaver(blob, fileName || url.split('/').pop())
        setLoading(false)
      })
      .catch((err: string) => {
        // eslint-disable-next-line no-console
        console.error(`Failed to download file: ${err}`)
        setError(true)
      })
  }

  return [error, loading, downloadFile]
}

export default useDownload
