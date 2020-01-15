import React, { useCallback, useState, useRef, FormEvent } from 'react'
import styled from 'styled-components'
import { Colors } from '../../lib/style-guide'
import ProgressPreviewRing from './ProgressImageRing'
import defaultImage from './default-image.svg'
import useDropzone from './useDropzone'

const ACCEPTED_FILES = 'image/png,image/jpeg'
const MAX_SIZE = 100000

const ERROR_MESSAGE = {
  NO_ERROR: '',
  NOT_SINGLE: 'Select a single file',
  INVALID_FORMAT: 'Select an image file',
  SIZE_TOO_BIG: 'File is too big'
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

  const onFileChoose = useCallback((files) => {
    validateFile(files)
  }, [])

  const handleDrop = useCallback(
    (files) => {
      onFileChoose(files)
    },
    [onFileChoose]
  )

  const { dropzoneProps, isDragging } = useDropzone({
    onDrop: handleDrop
  })

  const handleOpen = () => {
    inputFile.current.click()
  }

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files
    onFileChoose(files)
  }

  return (
    <Dropzone {...dropzoneProps} className={className} isDragging={isDragging}>
      <ProgressPreviewRing
        size={80}
        value={0}
        stroke={1}
        color={Colors.DarkBlue}
      >
        <img src={defaultImage} />
      </ProgressPreviewRing>
      <DragText>Drag & drop here</DragText>
      <OrText>- or -</OrText>
      <SelectFile onClick={handleOpen}>Select file to upload</SelectFile>
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
