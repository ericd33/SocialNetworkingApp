import React, {useState} from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect } from "react";
import Home from '../Home/Home';
import { useDispatch } from "react-redux";
import { postUser } from "../../../Redux/actions";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LandingPage.css'
import { grey, yellow } from '@mui/material/colors';
import LandingLogin from './Login/LandingLogin';
import LandingRegister from './Register/LandingRegister';

export default function LandingPage() {
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  const[ login_register, setLogin_register] = useState(true)
  const loginOrRegister = (e) =>{
    e.preventDefault();
    setLogin_register(!login_register)
  }

  ///INFO DE LA SESION
  const auth = getAuth();
  
  const [curUser, setCurUser] = useState();

  //CUANDO INICIA LA PAGINA SE GUARDA EL USUARIO QUE ESTA EN LA SESION EN EL ESTADO
  useEffect(()=> {
    auth.onAuthStateChanged(function(user) {

      //GUARDO EL USUARIO EN EL ESTADO
      if (user) {
        setCurUser(user)
      }
      }
    );
    setCurUser(getAuth().currentUser)
  },[])



  //AUTHSTATECHANGED SE LLAMA CUANDO SE HACE EL LOGIN
  


    //LOGIN
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        ///REVISAR SI EL USUARIO ES NUEVO
        if (user.metadata.creationTime ===user.metadata.lastSignInTime) {
            console.log('Usuario se acaba de registrar')
        } else {
            console.log('Usuario existente logueado')
        }
        window.localStorage.setItem("user", JSON.stringify(user))
        
        setCurUser(user)
        // ...
        const token = getAuth().currentUser.accessToken
        window.localStorage.setItem("token", JSON.stringify(token))

        dispatch(postUser(user,token))
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  const theme = createTheme();

  if (curUser) {
    return <Home info={curUser}/>
  } else {
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
            <div>
              <Button  onClick={(e) => signIn(e)}>SIGN IN WITH GOOGLE</Button>
            </div>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
  }
}
