import React,{ useState } from 'react'
import LandingLogin from './LandingLogin';
import LandingRegister from './LandingRegister';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LandingPage = () => {

  const[ login_register, setLogin_register] = useState(true)

  const loginOrRegister = (e) =>{
    e.preventDefault();
    setLogin_register(!login_register)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {login_register ? (<LandingLogin />) : <LandingRegister/> }
        {login_register ? <button onClick={(e) => loginOrRegister(e)}>Register</button> : <button onClick={(e) => loginOrRegister(e)}>Login</button>}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  
}

export default LandingPage


// const[ login_register, setLogin_register] = useState(true)

  // const loginOrRegister = (e) =>{
  //   e.preventDefault();
  //   setLogin_register(!login_register)
  // }
  // return(
  //   <div>
  //     {login_register ? (<LandingLogin />) : <LandingRegister/> }
  //     {login_register ? <button onClick={(e) => loginOrRegister(e)}>Register</button> : <button onClick={(e) => loginOrRegister(e)}>Login</button>}
  //   </div>
  // )