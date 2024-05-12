import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LandingPage.css'
import LandingLogin from './Login/LandingLogin';
import LandingRegister from './Register/LandingRegister';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';
import logogrande2 from '../../../Logos/logogrande2.png';




const theme = createTheme();

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn, googleLogIn } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home');
  }, [])

  console.log(window.location)

  return (
    <ThemeProvider theme={theme}>
      <Grid className='landing' container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          className='carousel'
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
        <img src={logogrande2} id='logoLanding' alt='logo' />
        <Grid className='form' item component={Paper} elevation={6} square>
          {window.location.pathname === `/` ?
            <LandingLogin /> : <LandingRegister />
          }
          {window.location.pathname === `/` ?
            <Button id='changeForm' onClick={() => navigate('/signup')}>Register </Button> : <Button id='changeForm' onClick={() => navigate('/')}>

              Login </Button>}


        </Grid>


      </Grid>
    </ThemeProvider>
  );

}

export default LandingPage
