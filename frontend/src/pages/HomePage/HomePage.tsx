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
  ListItemText,
  IconButton,
  ListItemIcon,
  Tooltip
} from '@mui/material'
import axios from 'axios'
import LoadingButton from '../../lib/components/LoadingButton/LoadingButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Avatar from '@mui/material/Avatar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SendIcon from '@mui/icons-material/Send'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import FaceIcon from '@mui/icons-material/Face'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'

const HomePage = () => {
  const [waiting, setWaiting] = useState(false)
  const [context, setContext] = useState('')
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [collapsedItems, setCollapsedItems] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const chatContainerRef = useRef(null)

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
              <List component='div' disablePadding sx={{ paddingLeft: '10px' }}>
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
              <List component='div' disablePadding sx={{ paddingLeft: '10px' }}>
                {/* Add specific content for the collapsed item */}
                <ListItem button>
                  <ListItemText primary='Help Info' />
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
              <List component='div' disablePadding sx={{ paddingLeft: '10px' }}>
                <ListItem>
                  <ListItemText primary='Lê Hoài Phong' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Đỗ Trung Hiếu' />
                </ListItem>
                <ListItem>
                  <ListItemText secondary='FIT - HCMUS' />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <a href='mailto:hoaiphong13.11.2002@gmail.com' target='_blank' rel='noopener noreferrer'>
                      <EmailIcon />
                    </a>
                  </ListItemIcon>
                  <ListItemIcon>
                    <a href='https://github.com/PhongLe1311' target='_blank' rel='noopener noreferrer'>
                      <GitHubIcon />
                    </a>
                  </ListItemIcon>
                  <ListItemIcon>
                    <a href='https://www.facebook.com/lehoaiphongIT/' target='_blank' rel='noopener noreferrer'>
                      <FacebookIcon />
                    </a>
                  </ListItemIcon>
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
              <LoadingButton loading={waiting} color='primary' variant='contained' onClick={handleAnswering}>
                <SendIcon />
              </LoadingButton>
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
            <Tooltip title='New conversation' arrow enterDelay={300} leaveDelay={100}>
              <Button
                variant='contained'
                onClick={() => {
                  setQuestion('')
                  setContext('')
                  setChatHistory([])
                }}
                sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <AddIcon />
              </Button>
            </Tooltip>

            <Tooltip title='Upload File' arrow enterDelay={300} leaveDelay={100}>
              <Button
                variant='contained'
                component='label'
                sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <UploadFileIcon />
                <input type='file' hidden onChange={handleFileUpload} accept='.txt' />
              </Button>
            </Tooltip>

            <Tooltip title='Copy' arrow enterDelay={300} leaveDelay={100}>
              <Button
                variant='contained'
                onClick={(e) => {
                  console.log(e)
                }}
                sx={{ marginTop: '1rem', marginBottom: '1rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>

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
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage
