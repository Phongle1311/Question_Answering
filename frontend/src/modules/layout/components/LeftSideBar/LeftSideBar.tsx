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
  )
}

export default LeftSideBar
