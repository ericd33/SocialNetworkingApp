import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  const { user } = useUserAuth();
  const navigate = useNavigate();
  let location = useLocation()

  useEffect(() => {
    if (user) navigate('/home');
  }, [])


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
          {location.pathname === `/` ?
            <>
              <LandingLogin />
              <Button id='changeForm' onClick={() => navigate('/signup')}>Register </Button>
            </>
            : <><LandingRegister />
              <Button id='changeForm' onClick={() => navigate('/')}>Login </Button>
            </>}


        </Grid>


      </Grid>
    </ThemeProvider>
  );

}

export default LandingPage
