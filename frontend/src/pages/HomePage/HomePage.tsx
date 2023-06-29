import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  List,
  Collapse,
  ListItem,
  ListItemText
} from '@mui/material'
import axios from 'axios'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Avatar from '@mui/material/Avatar'

const HomePage = () => {
  const [waiting, setWaiting] = useState(false)
  const [context, setContext] = useState('')
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const chatContainerRef = useRef(null)
  const [collapsedItems, setCollapsedItems] = useState([])

  const toggleCollapse = (index) => {
    if (collapsedItems.includes(index)) {
      setCollapsedItems(collapsedItems.filter((item) => item !== index))
    } else {
      setCollapsedItems([...collapsedItems, index])
    }
  }

  const isItemCollapsed = (index) => {
    return collapsedItems.includes(index)
  }

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
      console.log('Error:', error)
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
        <Box
          sx={{
            width: '25%',
            backgroundColor: darkMode ? 'rgb(32, 33, 35)' : 'rgba(0, 0, 0, 0.08)',
            color: darkMode ? '#ffffff' : '#000000'
          }}
        >
          <Box sx={{ padding: '1rem' }}>
            <Typography variant='h4'>Question Answering</Typography>
          </Box>

          <List component='nav'>
            <ListItem button onClick={() => toggleCollapse(0)}>
              <ListItemText
                primary={
                  <Typography variant='body1' component='div' fontWeight={isItemCollapsed(0) ? 'bold' : 'inherit'}>
                    Introduce
                  </Typography>
                }
              />
            </ListItem>
            <Collapse in={isItemCollapsed(0)} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {/* Add specific content for the collapsed item */}
                <ListItem button>
                  <ListItemText primary='Introduce Info' />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => toggleCollapse(1)}>
              <ListItemText
                primary={
                  <Typography variant='body1' component='div' fontWeight={isItemCollapsed(1) ? 'bold' : 'inherit'}>
                    How to use
                  </Typography>
                }
              />
            </ListItem>
            <Collapse in={isItemCollapsed(1)} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {/* Add specific content for the collapsed item */}
                <ListItem button>
                  <ListItemText primary='About Info' />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => toggleCollapse(2)}>
              <ListItemText
                primary={
                  <Typography variant='body1' component='div' fontWeight={isItemCollapsed(2) ? 'bold' : 'inherit'}>
                    About us
                  </Typography>
                }
              />
            </ListItem>
            <Collapse in={isItemCollapsed(2)} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {/* Add specific content for the collapsed item */}
                <ListItem button>
                  <ListItemText primary='Help Info' />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>

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
                <Box
                  sx={{
                    marginRight: chat.role === 'user' ? '0' : '1rem',
                    marginLeft: chat.role === 'user' ? '1rem' : '0'
                  }}
                >
                  <Avatar>{chat.role === 'user' ? 'U' : 'C'}</Avatar>
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

          {/* Scroll to bottom button */}
          {/* <IconButton
            sx={{
              position: 'fixed',
              bottom: '1rem',
              right: '1rem'
            }}
            onClick={() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
              }
            }}
          >
          </IconButton> */}

          {/* Footer */}

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

        {/* Right Sidebar */}
        <Box
          sx={{
            width: '20%',
            backgroundColor: darkMode ? 'rgb(32, 33, 35)' : 'rgba(0, 0, 0, 0.08)',
            color: darkMode ? '#ffffff' : '#000000'
          }}
        >
          <Box sx={{ padding: '1rem', borderTop: '1px solid #e0e0e0', flexShrink: 0 }}>
            <Button variant='contained' onClick={toggleDarkMode} sx={{ marginTop: '1rem' }}>
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            {/* Add additional buttons as needed */}
            <Button variant='contained' sx={{ marginTop: '1rem' }}>
              Delete All
            </Button>
            <Button variant='contained' sx={{ marginTop: '1rem' }}>
              Copy
            </Button>
            {/* Add additional buttons as needed */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage
