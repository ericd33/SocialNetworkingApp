import React,{ useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from "../Home/Home";
import './LandingPage.css'
import { grey, yellow } from '@mui/material/colors';
import LandingLogin from './Login/LandingLogin';
import LandingRegister from './Register/LandingRegister';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/actions';

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

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
      <Button
        sx={{ml:6,mt:2, textAlign:'center'}}
        variant='contained'
        onClick={async () =>
          await loginWithRedirect({
            redirect_uri: "http://localhost:3000/home",
          })
        }
      >
        Login auth0
      </Button>
    );
  };

const theme = createTheme();

const LandingPage = () => {
    const { isAuthenticated } = useAuth0();
    const[ login_register, setLogin_register] = useState(true)

  const loginOrRegister = (e) =>{
    e.preventDefault();
    setLogin_register(!login_register)
  }
          
  if (isAuthenticated) return <Home/>
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
        <Grid className='form' item component={Paper} elevation={6} square>
            {login_register ? (<LandingLogin />) : <LandingRegister/> }
            <p id='or'>Or</p>
            {login_register ? <Button id='changeForm' onClick={(e) => loginOrRegister(e)}>Register</Button> : <Button id='changeForm' onClick={(e) => loginOrRegister(e)}>Login</Button>}
            {LoginButton()}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  
}

export default LandingPage