import { Download } from '@amsterdam/asc-assets'
import type { FunctionComponent } from 'react'
import ErrorMessage from '../../../../shared/components/ErrorMessage/ErrorMessage'

interface ImageViewerErrorProps {
  downloadError: boolean
  isImage: boolean
  onDownload: () => void
}

const ImageViewerError: FunctionComponent<ImageViewerErrorProps> = ({
  downloadError,
  isImage,
  onDownload,
}) => {
  if (downloadError) {
    return (
      <ErrorMessage
        data-testid="errorMessage"
        absolute
        message="Er is een fout opgetreden bij het laden van dit bestand."
        buttonLabel="Probeer opnieuw"
        buttonOnClick={() => window.location.reload()}
      />
    )
  }

  return (
    <ErrorMessage
      data-testid="errorMessage"
      absolute
      message={
        isImage
          ? 'Er is een fout opgetreden bij het laden van dit bestand.'
          : 'Dit bestandsformaat kan niet worden weergegeven op deze pagina.'
      }
      buttonLabel={isImage ? 'Probeer opnieuw' : `Download bronbestand`}
      buttonIcon={!isImage && <Download />}
      buttonOnClick={isImage ? () => window.location.reload() : () => onDownload()}
    />
  )
}

export default ImageViewerError
