import React, { useCallback, useState, useRef, FormEvent } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Colors } from '../../lib/style-guide'
import ProgressPreviewRing from './ProgressImageRing'
import defaultImage from './default-image.svg'
import useDropzone from './useDropzone'
import service from '../../service'

const ACCEPTED_FILES = 'image/png,image/jpeg'
const MAX_SIZE = 1000000

const ERROR_MESSAGE = {
  NO_ERROR: '',
  NOT_SINGLE: 'Select a single file',
  INVALID_FORMAT: 'Select an image file',
  SIZE_TOO_BIG: 'File is too big'
}

const Status = {
  INITIAL: {
    DragText: 'Drag & drop here',
    SelectFile: 'Select file to upload'
  },
  UPLOADING: {
    DragText: 'Uploading',
    SelectFile: 'Cancel'
  },
  UPLOADED: {
    DragText: 'Drag & drop here to replace',
    SelectFile: 'Select file to replace'
  }
}

type ImageDropZone = {
  value?: string
  onChange?: (url: string) => void
}

const Text = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: normal;
`

const DragText = styled(Text)`
  color: ${Colors.TX2};
  margin-top: 9px;
`

const OrText = styled(Text)`
  color: ${Colors.TX3};
  margin-top: 8px;
`

const SelectFile = styled.button`
  font-size: 12px;
  line-height: 12px;
  font-weight: normal;
  color: ${Colors.DarkBlue};
  margin-top: 8px;
  cursor: pointer;
`

const ErrorText = styled(Text)`
  color: ${Colors.Error};
  margin-top: 8px;
`

type Dropzone = {
  isDragging: boolean
}

const Dropzone = styled.div<Dropzone>`
  border: 1px dashed
    ${({ isDragging }) => (isDragging ? Colors.DarkBlue : 'transparent')};
  padding-top: 146px;
  background: ${({ isDragging }) =>
    isDragging ? Colors.BG3 : Colors.PureWhite};
  text-align: center;
`

const ImageDropZone: FC<ImageDropZone> = ({ className }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const inputFile = useRef<HTMLInputElement>(document.createElement('input'))
  const [progressValue, setProgressValue] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [curStatus, setCurStatus] = useState('INITIAL')
  const [signal, setSignal] = useState(axios.CancelToken.source())

  const validateFile = (files: FileList) => {
    if (!files || files.length !== 1 || !files[0]) {
      setErrorMessage(ERROR_MESSAGE.NOT_SINGLE)
    } else if (!ACCEPTED_FILES.includes(files[0].type)) {
      setErrorMessage(ERROR_MESSAGE.INVALID_FORMAT)
    } else if (files[0].size > MAX_SIZE) {
      setErrorMessage(ERROR_MESSAGE.SIZE_TOO_BIG)
    } else {
      return true
    }
    return false
  }

  const onProgress = (progress: ProgressEvent) => {
    setProgressValue((100 * progress.loaded) / progress.total)
    console.log(progress)
  }

  const onFileChoose = useCallback(
    (files) => {
      console.log('jey')
      setProgressValue(0)
      if (validateFile(files)) {
        setCurStatus('UPLOADING')
        service.cloudStorage
          .uploadFile(files[0], onProgress, signal.token)
          .then(() => {
            setImageUrl(service.cloudStorage.getFile())
            setCurStatus('UPLOADED')
            setProgressValue(0)
            setSignal(axios.CancelToken.source())
          })
          .catch(() => {
            setCurStatus('INITIAL')
            setProgressValue(0)
            setSignal(axios.CancelToken.source())
          })
      }
    },
    [signal.token]
  )

  const handleDrop = useCallback(
    (files) => {
      onFileChoose(files)
    },
    [onFileChoose]
  )

  const { dropzoneProps, isDragging } = useDropzone({
    onDrop: handleDrop
  })

  const handleOpenOrCancel = () => {
    if (curStatus === 'UPLOADING') {
      signal.cancel('Cancelled by user')
      inputFile.current.value = ''
    } else {
      inputFile.current.click()
    }
  }

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files
    onFileChoose(files)
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (
    <Dropzone {...dropzoneProps} className={className} isDragging={isDragging}>
      <ProgressPreviewRing
        size={80}
        value={progressValue}
        stroke={1}
        color={Colors.DarkBlue}
        image={curStatus === 'UPLOADED' ? imageUrl : defaultImage}
      />
      <DragText>{(Status as any)[curStatus].DragText}</DragText>
      <OrText>- or -</OrText>
      <SelectFile onClick={handleOpenOrCancel}>
        {(Status as any)[curStatus].SelectFile}
      </SelectFile>
      <ErrorText>{errorMessage}</ErrorText>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputFile}
        onChange={handleFileChange}
      />
    </Dropzone>
  )
}

export default ImageDropZone
