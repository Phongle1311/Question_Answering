import { Box, BoxProps, Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import React, { useState } from 'react'

const LeftSideBar = ({
  darkMode,
  ...boxProps
}: {
  darkMode: boolean
} & BoxProps) => {
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

  return (
    <Box
      {...boxProps}
      sx={{
        width: '25%',
        backgroundColor: darkMode ? 'rgb(32, 33, 35)' : 'rgba(0, 0, 0, 0.08)',
        color: darkMode ? '#ffffff' : '#000000'
      }}
    >
      <Box sx={{ padding: '1rem' }}>
        <Typography variant='h4'>Question Answering</Typography>
      </Box>

      <List component='nav' sx={{ maxHeight: '80vh', overflowY: 'scroll' }}>
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
            <ListItem>
              <ListItemText primary='This is a learning project on the topic of the Transformer model. We retrain DistilBERT on SQuADv1 to solve Question Answering problem.' />
            </ListItem>
            <ListItem button sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src='https://siamcomputing.com/wp-content/uploads/2022/05/Chatbot.png'
                width='200px'
                height='200px'
                alt='chatbot'
              />
            </ListItem>
            <ListItem>
              <ListItemText primary='Question Answering models can retrieve the answer to a question from a given text, which is useful for searching for an answer in a document. Some question answering models can generate answers without context!' />
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
            <ListItem>
              <ListItemText primary='You need to enter both context and question.' />
            </ListItem>
            <ListItem>
              <ListItemText primary='You can also have multiple questions for one context.' />
            </ListItem>
            <ListItem>
              <ListItemText primary='You can upload a file text for the context!' />
            </ListItem>
            <ListItem>
              <ListItemText primary='There is another beautiful use-case: change to url mode and enter link to website you want to ask about! ' />
            </ListItem>
            <ListItem>
              <ListItemText primary='You can change light mode to dark mode and reverse' />
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
  )
}

export default LeftSideBar
