import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, TextField, Paper } from '@mui/material'
import axios from 'axios'
import useAppSnackbar from '../../lib/hooks/useAppSnackBar'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'

const HomePage = () => {
  const [waiting, setWaiting] = useState(false)
  const [context, setContext] = useState('')
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const { showSnackbarError } = useAppSnackbar()
  const chatContainerRef = useRef(null)

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
      const answer = response.data.answer
      const newChat = {
        role: 'user',
        content: question
      }
      const newAnswer = {
        role: 'bot',
        content: answer
      }
      setChatHistory((prevChatHistory) => [...prevChatHistory, newChat, newAnswer])
      setQuestion('')
    } catch (error) {
      showSnackbarError(error)
    } finally {
      setWaiting(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    // Check if file size exceeds the limit (e.g., 5MB)
    const fileSizeLimit = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > fileSizeLimit) {
      // Show an error message or notification to the user
      console.log('File size exceeds the limit.')
      return
    }

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      setContext(reader.result.toString())
    }
    reader.onerror = () => {
      console.log('Error on reading file: ', reader.error)
    }
  }

  useEffect(() => {
    // Auto scroll to bottom of chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar */}
      <Box sx={{ flexBasis: '300px', backgroundColor: '#f5f5f5', padding: '1rem' }}>
        <Typography variant='h6' sx={{ marginBottom: '1rem' }}>
          Chat History
        </Typography>
        <Box sx={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}>
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: '0.5rem',
                backgroundColor: chat.role === 'user' ? '#e1f5fe' : '#f3e5f5',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {chat.role === 'user' ? 'User:' : 'Bot:'}
              </Typography>
              <Typography>{chat.content}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0
          }}
        >
          <Typography variant='h4'>WebApp Demo</Typography>
        </Box>

        {/* Chat Container */}
        <Box sx={{ flex: 1, padding: '1rem', overflowY: 'auto' }} ref={chatContainerRef}>
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: chat.role === 'user' ? 'row-reverse' : 'row',
                marginBottom: '1rem',
                alignItems: 'flex-start'
              }}
            >
              <Box sx={{ marginRight: chat.role === 'user' ? '0' : '1rem' }}>
                <Paper
                  elevation={2}
                  sx={{
                    backgroundColor: chat.role === 'user' ? '#e1f5fe' : '#f3e5f5',
                    padding: '0.5rem',
                    borderRadius: '8px'
                  }}
                >
                  <Typography>{chat.content}</Typography>
                </Paper>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box sx={{ padding: '1rem', borderTop: '1px solid #e0e0e0', flexShrink: 0 }}>
          <Box sx={{ display: 'flex' }}>
            <input type='file' onChange={handleFileUpload} accept='.txt' />
            <TextField
              fullWidth
              multiline
              value={context}
              onChange={handleContextChange}
              placeholder='Enter context ...'
              variant='outlined'
              sx={{ marginRight: '1rem' }}
            />
          </Box>

          <Box sx={{ display: 'flex', marginTop: '1rem' }}>
            <TextField
              fullWidth
              value={question}
              onChange={handleQuestionChange}
              placeholder='Enter question ...'
              variant='outlined'
            />
            <LoadingButton loading={waiting} color='primary' variant='contained' onClick={handleAnswering}>
              Gửi
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
