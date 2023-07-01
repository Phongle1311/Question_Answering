import React from 'react'
import { Button } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import useAppSnackbar from '../../hooks/useAppSnackBar'

const UploadFileButton = ({ onLoad }: { onLoad: (arg: string) => void }) => {
  const { showSnackbarError } = useAppSnackbar()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    // Check if file size exceeds the limit (e.g., 5MB)
    const fileSizeLimit = 5 * 1024 * 1024
    if (file.size > fileSizeLimit) {
      showSnackbarError('File size exceeds the limit.')
      return
    }

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      onLoad(reader.result.toString())
    }
    reader.onerror = () => {
      showSnackbarError('Error on reading file: ' + reader.error.toString())
    }
  }

  return (
    <Button
      variant='contained'
      component='label'
      sx={{ marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
    >
      <UploadFileIcon />
      <input type='file' hidden onChange={handleFileUpload} accept='.txt' />
    </Button>
  )
}

export default UploadFileButton
