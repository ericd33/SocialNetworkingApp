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
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../context/UserAuthContext'
import GoogleButton from 'react-google-button'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleLogIn } = useUserAuth();
  const navigate = useNavigate();

  
  const handleGoogleButton = async (e) => {
    e.preventDefault();
    try{
      await googleLogIn();
      navigate("/home")
    }catch(err){
      console.log(err)
    }
  }
          
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
        <LandingLogin />
            <Button id='changeForm' onClick={() => navigate('/signup')}>Register</Button>

            <GoogleButton onClick={handleGoogleButton}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  
}

export default LandingPage