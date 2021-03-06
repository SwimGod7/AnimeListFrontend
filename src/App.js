import React, { useEffect } from 'react'
import AnimeApp from './components/AnimeApp'
import Users from './components/Users'
import User from './components/User'
import AnimeDetails from './components/AnimeDetails'
import Login from './components/Login'

import { login,logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeAnimes } from './reducers/animeReducer'
import storage from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

const theme1=createTheme({
  palette: {
    primary: {
      main: '#663c53'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  MuiCard:{
    root:{
      borderRadius: '10px'
    }
  },
  MuiOutlinedInput:{
    input:{
      padding:'4.5px 7px'
    }
  },
})

const App=() => {

  const user=useSelector(state => state.user)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(initializeAnimes())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleLogout=() => {
    dispatch(logout())
    storage.logoutUser()
    {(!user)?<Redirect to="/" />:null}
  }

  if(!user){
    return(
      <div className="appBackground">
        <ThemeProvider theme={theme1}>
          <Login />
        </ThemeProvider>
      </div>
    )
  }

  return(
    <div className="appBackground">
      <Router>
        <ThemeProvider theme={theme1}>
          <div>
            <AppBar position="fixed" color="primary">
              <Toolbar>
                <Box sx={{ flexGrow: 0.1 }}>
                  <Button color="inherit" component={Link} to="/">
                Animes
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 10 }} >
                  <Button color="inherit" component={Link} to="/users">
                Users
                  </Button>
                </Box>
                {user
                  ? <Box sx={{ flexGrow: 0 }}>{user.name} <Button color="inherit" onClick={handleLogout}><Link to="/">logout</Link></Button></Box>
                  : <Box sx={{ flexGrow: 0 }}><Button color="inherit" component={Link} to="/">Login</Button></Box>
                }
              </Toolbar>
            </AppBar>
          </div>

          <Container>
            <div style={{ marginTop:80 }}>
              <Switch>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/animes/:id">
                  <AnimeDetails />
                </Route>
                <Route path="/">
                  <AnimeApp />
                </Route>
              </Switch>
            </div>
          </Container>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App