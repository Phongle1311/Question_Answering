import { Box, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'
import useAppSnackbar from '../../lib/hooks/useAppSnackBar'

const HomePage = () => {
  const [waiting, setWaiting] = useState(false)
  const [context, setContext] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const { showSnackbarError } = useAppSnackbar()

  const handleContextChange = (event) => {
    setContext(event.target.value)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleAnswering = async () => {
    try {
      setWaiting(true)
      const response = await axios.post(
        'http://127.0.0.1:5000/api/question-answering',
        {
          context: context,
          question: question
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setAnswer(response.data.answer)
      // setAnswer(response.data.summary_text)
    } catch (error) {
      showSnackbarError(error)
    } finally {
      setWaiting(false)
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
          <Typography variant='h6'>Question Answering</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '1rem'
            }}
          >
            <TextField
              fullWidth
              multiline
              value={context}
              onChange={handleContextChange}
              placeholder='Enter context ...'
              variant='outlined'
              sx={{
                marginRight: '1rem'
              }}
            />

            <TextField
              fullWidth
              value={question}
              onChange={handleQuestionChange}
              placeholder='Enter question ...'
              variant='outlined'
              sx={{
                marginRight: '1rem'
              }}
            />

            <LoadingButton loading={waiting} color='primary' variant='contained' onClick={handleAnswering}>
              Gửi
            </LoadingButton>
          </Box>

          <Box>
            <Typography variant='h6'>Answer</Typography>
            <Typography>{answer}</Typography>
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
