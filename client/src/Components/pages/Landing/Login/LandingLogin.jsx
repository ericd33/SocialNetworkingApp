import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey} from '@mui/material/colors';
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux';
import { getMyUser, login } from '../../../../Redux/actions';
import './LandingLogin.css';
import { useLocalStorage } from './useLocalStorage';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../../context/UserAuthContext'

const LandingLogin = () => {
  const { logIn } = useUserAuth();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [input, setInput] = useState({
      email:"",
      password: "",
    });
    const [inputEmail, setInputEmail] = useLocalStorage('input',"")
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await logIn(input.email, input.password);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    };
  
    function validate(input) {
      let errors = {};
      if (!input.email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
        errors.email = "Invalid E-mail ";
      }
      if (!input.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$@$!%*?&]|[^]){8,15}$/.test(input.password)){
        errors.password = "Invalid Password";
      }
      return errors;
    }


  function handleChangeEmail(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInputEmail(e.target.value)
  }
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  

    return (
      <Grid className='loginForm' container sx={{fontFamily: 'Nunito'}}>
          <h1>Login</h1>
          <br />
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor='email'>E-mail</InputLabel>
              <Input 
              type='text'
              id='email'
              value={input.email}
              name="email"
              onChange={(e) => handleChangeEmail(e)}
              aria-describedby='email-helper'/>
              <FormHelperText sx={{mb:2, color:grey[400]}} id='email-helper'>Your email</FormHelperText>
            </FormControl>
            {errors.hasOwnProperty("email") ? (
              <p className='error'>{errors.email}</p>
            ) : null}
        </Grid>
            <br/>
            <Grid item md={12} >
              <FormControl>
                  <InputLabel htmlFor='pwd'>Password</InputLabel>
                  <Input 
                  type='password'
                  id='pwd'
                  value={input.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  aria-describedby='password-helper'/>
                  <FormHelperText sx={{mb:2, color:grey[400]}} id='password-helper'>Your password</FormHelperText>
                </FormControl>
                {errors.hasOwnProperty("password") ? (
                  <p className='error'>{errors.password}</p>
                ) : null}
            </Grid>
              <br/>
              {Object.entries(errors).length > 0 || (input.email === '' && input.password === '') ? (
                <Button variant='outlined' disabled={true}>Login</Button>
              ) : (
                <Button variant='contained' onClick={(e) => handleSubmit(e)}>
                  Login
                </Button>
              )}
        </Grid>
        )
  }



export default LandingLogin