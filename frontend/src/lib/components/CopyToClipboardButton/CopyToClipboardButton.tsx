import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Button, ButtonProps, SxProps, Theme } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import copy from 'clipboard-copy'
import useAppSnackbar from '../../hooks/useAppSnackBar'

const CopyToClipboardButton = ({
  text,
  sx,
  ...buttonProps
}: {
  text: string
  sx: SxProps<Theme>
} & ButtonProps) => {
  const { showSnackbarSuccess } = useAppSnackbar()

  const handleCopy = () => {
    copy(text)
    showSnackbarSuccess('Copied to clipboard!')
  }

  return (
    <Tooltip title='Copy' arrow enterDelay={300} leaveDelay={100}>
      <Button {...buttonProps} variant='contained' sx={sx} onClick={handleCopy}>
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  )
}

export default CopyToClipboardButton
