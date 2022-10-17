import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey} from '@mui/material/colors';
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux';
import { getMyUser, login } from '../../../../Redux/actions';
import './LandingLogin.css';


const LandingLogin = () => {
    const dispatch = useDispatch(); 
    const [input, setInput] = useState({
      email:"",
      password: "",
    });
  
    const [errors, setErrors] = useState({});
  
    function validate(input) {
      let errors = {};
      if (!input.email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
        errors.email = "Invalid E-mail ";
      }
      if (!input.password ||!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(input.password)){
        errors.password = "Invalid Password";
      }
      return errors;
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
      // console.log(input)
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      dispatch(login(input));
      setInput({
        email:"",
        password: "",
      });
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
              onChange={(e) => handleChange(e)}
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