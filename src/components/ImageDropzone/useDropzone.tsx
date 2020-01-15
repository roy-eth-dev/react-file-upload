import {
  DragEvent as ReactDragEvent,
  DragEventHandler as ReactDragEventHandler,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react'

type useDropzone = {
  onDrop?: (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => void
}

const useDropzone = ({ onDrop }: useDropzone) => {
  const isIE = () =>
    window &&
    (window.navigator.userAgent.indexOf('MSIE') !== -1 ||
      window.navigator.appVersion.indexOf('Trident/') > 0)

  const [draggingOverTarget, setDraggingOverTarget] = useState(false)

  const resetDragging = () => {
    setDraggingOverTarget(false)
  }

  const eventHasFiles = (event: DragEvent | ReactDragEvent<HTMLElement>) => {
    let hasFiles = false
    if (event.dataTransfer) {
      const types = event.dataTransfer.types
      for (const keyOrIndex in types) {
        if (types[keyOrIndex] === 'Files') {
          hasFiles = true
          break
        }
      }
    }
    return hasFiles
  }

  const handleWindowDragOverOrDrop = (event: DragEvent) => {
    event.preventDefault()
  }

  const handleDrop: ReactDragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (onDrop && eventHasFiles(event)) {
        const files = event.dataTransfer ? event.dataTransfer.files : null
        console.log(files)
        onDrop(files, event)
      }
      resetDragging()
    },
    [onDrop]
  )

  const handleDragLeave: ReactDragEventHandler<HTMLDivElement> = () => {
    setDraggingOverTarget(false)
  }

  const handleDragOver: ReactDragEventHandler<HTMLDivElement> = useCallback(
    (event: DragEvent | ReactDragEvent<HTMLElement>) => {
      if (eventHasFiles(event)) {
        setDraggingOverTarget(true)
        if (!isIE() && event.dataTransfer)
          event.dataTransfer.dropEffect = 'move'
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('dragover', handleWindowDragOverOrDrop)
    window.addEventListener('drop', handleWindowDragOverOrDrop)
    return () => {
      window.removeEventListener('dragover', handleWindowDragOverOrDrop)
      window.removeEventListener('drop', handleWindowDragOverOrDrop)
    }
  })

  const dropzoneProps = useMemo(() => {
    return {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  }, [handleDragOver, handleDrop])

  return {
    dropzoneProps,
    isDragging: draggingOverTarget
  }
}

export default useDropzone
