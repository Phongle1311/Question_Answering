import { Box, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'
import useAppSnackbar from '../../lib/hooks/useAppSnackBar'

const HomePage = () => {
  const [summarizing, setSummarizing] = useState(false)
  const [text, setText] = useState('')
  const { showSnackbarError } = useAppSnackbar()
  const [summary, setSummary] = useState('')

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const handleSummarize = async () => {
    try {
      setSummarizing(true)
      const response = await axios.post(
        'http://127.0.0.1:5000/api/summarize',
        {
          content: text
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setSummary(response.data.summary_text)
    } catch (error) {
      showSnackbarError(error)
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <Box sx={{ padding: '1rem' }}>
      <header>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <Typography variant='h4'>WebApp Demo</Typography>
          {/* Add navigation buttons or components here */}
        </Box>
      </header>

      <main>
        <section>
          <Typography variant='h6'>Summarization</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}
          >
            <TextField
              fullWidth
              multiline
              value={text}
              onChange={handleInputChange}
              placeholder='Nhập đoạn văn...'
              variant='outlined'
              sx={{
                marginRight: '1rem'
              }}
            />
            <LoadingButton loading={summarizing} color='primary' variant='contained' onClick={handleSummarize}>
              Gửi
            </LoadingButton>
          </Box>

          <Box>
            <Typography variant='h6'>Kết quả tóm tắt:</Typography>
            <Typography>{summary}</Typography>
          </Box>
        </section>

        <section>
          <Typography variant='h6'>Help</Typography>
          {/* Add help content here */}
        </section>

        <section>
          <Typography variant='h6'>Introduction</Typography>
          {/* Add introduction content here */}
        </section>
      </main>

      <footer>{/* Add footer content here */}</footer>
    </Box>
  )
}

export default HomePage
