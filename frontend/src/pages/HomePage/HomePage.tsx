import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Avatar from '@mui/material/Avatar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FaceIcon from '@mui/icons-material/Face'
import LeftSideBar from '../../modules/layout/components/LeftSideBar/LeftSideBar'
import UploadFileButton from '../../lib/components/UploadFileButton/UploadFileButton'
import useAppSnackbar from '../../lib/hooks/useAppSnackBar'
import CopyToClipboardButton from '../../lib/components/CopyToClipboardButton/CopyToClipboardButton'

const HomePage = () => {
  const [waiting, setWaiting] = useState(false)
  const [context, setContext] = useState('')
  const [currentContext, setCurrentContext] = useState('')
  const [question, setQuestion] = useState('')
  const [url, setUrl] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const chatContainerRef = useRef(null)
  const { showSnackbarSuccess, showSnackbarError } = useAppSnackbar()

  const handleContextChange = (event) => {
    setContext(event.target.value)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAnswering = async () => {
    try {
      setWaiting(true)

      if (context === '' || context === undefined) {
        showSnackbarError('You need to fill context first!')
        return
      }
      if (question === '' || question === undefined) {
        showSnackbarError("The question mustn't is empty")
        return
      }

      const response = await axios.post(
        'http://127.0.0.1:5000/api/question-answering',
        {
          context: context,
          question: question,
          url: url,
          type: 'plain text'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log(currentContext)
      console.log(context)
      if (context !== currentContext) {
        setCurrentContext(context)
        const newContext = {
          role: 'user',
          content: context
        }
        setChatHistory((prevChatHistory) => [...prevChatHistory, newContext])
      }

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
      console.log('Error:', error)
    } finally {
      setWaiting(false)
    }
  }

  useEffect(() => {
    // Auto scroll to bottom of chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#000000' : '#ffffff'
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        {/* Left Sidebar */}
        <LeftSideBar darkMode={darkMode} />

        {/* Main Content - Conversation */}
        <Box
          sx={{
            backgroundColor: darkMode ? 'rgb(68, 70, 84)' : '#f5f5f5',
            width: '55%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Chat Container */}
          <Box
            sx={{ flex: 1, padding: '1rem', overflowY: 'scroll', maxHeight: 600 }}
            onScroll={() => {
              const container = chatContainerRef.current
              if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container
                setShowScrollButton(scrollTop + clientHeight < scrollHeight)
              }
            }}
            ref={chatContainerRef}
          >
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
                <Box
                  sx={{
                    marginRight: chat.role === 'user' ? '0' : '1rem',
                    marginLeft: chat.role === 'user' ? '1rem' : '0'
                  }}
                >
                  <Avatar sx={{ bgcolor: chat.role === 'user' ? 'green' : 'blue', boxShadow: '1px 2px 9px #F4AAB9' }}>
                    {chat.role === 'user' ? <FaceIcon /> : <SmartToyIcon />}
                  </Avatar>
                </Box>
                <Box>
                  <Paper
                    elevation={2}
                    sx={{
                      backgroundColor: chat.role === 'user' ? '#e1f5fe' : '#f3e5f5',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      color: darkMode ? '#000000' : '#000000',
                      position: 'relative',
                      display: 'inline-block'
                    }}
                  >
                    <Typography>{chat.content}</Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Footer */}

          <Box
            sx={{
              display: 'flex',
              marginTop: '1rem',
              gap: '1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              position: 'relative',
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              value={question}
              onChange={handleQuestionChange}
              placeholder='Enter question ...'
              variant='outlined'
            />
            <Box sx={{ display: 'flex', paddingTop: '15px', paddingBottom: '15px' }}>
              <Tooltip title='Submit' arrow enterDelay={300} leaveDelay={100}>
                <LoadingButton loading={waiting} color='primary' variant='contained' onClick={handleAnswering}>
                  <SendIcon />
                </LoadingButton>
              </Tooltip>
            </Box>
            {/* Scroll to bottom button */}
            {showScrollButton && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '-3rem',
                  right: '1rem'
                }}
                onClick={() => {
                  if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
                  }
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: '20%',
            backgroundColor: darkMode ? 'rgb(32, 33, 35)' : 'rgba(0, 0, 0, 0.08)',
            color: darkMode ? '#ffffff' : '#000000',
            padding: '1rem',
            borderTop: '1px solid #e0e0e0',
            flexShrink: 0,
            flexDirection: 'column'
          }}
        >
          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <Tooltip title='Clear conversation' arrow enterDelay={300} leaveDelay={100}>
              <Button
                variant='contained'
                onClick={() => {
                  setQuestion('')
                  setContext('')
                  setChatHistory([])
                }}
                sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <DeleteForeverIcon />
              </Button>
            </Tooltip>

            <Tooltip title='Upload File' arrow enterDelay={300} leaveDelay={100}>
              <UploadFileButton
                onLoad={(context) => {
                  showSnackbarSuccess('Load file successfully!')
                  setContext(context)
                }}
              />
            </Tooltip>

            <CopyToClipboardButton
              text={context}
              sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
            />

            <Tooltip
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              arrow
              enterDelay={300}
              leaveDelay={100}
            >
              <Button
                variant='contained'
                onClick={toggleDarkMode}
                sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
              >
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </Button>
            </Tooltip>
          </Box>

          <TextField
            fullWidth
            multiline
            value={context}
            onChange={handleContextChange}
            placeholder='Enter context ...'
            variant='outlined'
            sx={{ marginRight: '1rem' }}
            maxRows={14}
          />

          <TextField
            fullWidth
            value={url}
            onChange={handleUrlChange}
            placeholder='You can enter url to a website ...'
            variant='outlined'
            sx={{ marginRight: '1rem' }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage
