import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import './LandingRegister.css';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../../context/UserAuthContext'



const LandingRegister = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("")
	const { signUp } = useUserAuth();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		email:"",
		password: "",
		username: "",
	  });
	  
	  const [errors, setErrors] = useState({});
	
	  
	  
	  
	  const handleSubmit = async (e) => {
		  e.preventDefault();
		  try {
			  await signUp(input.username, input.email, input.password);
			  navigate("/")
			} catch (err) {
				console.log(err);
			}
		};
		
		function validate(input) {
			let errors = {};
			if (!username ) {
				 		errors.username = "The name is required";
				 	}
			if (!email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
				 		errors.email = "Invalid E-mail. Example: example@example.com";
				 	}
			if (!input.password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)){
			  errors.password = "Invalid Password:  Min 8 characters, max. 15. At least one capital letter. At least one lowercase letter. At least one digit. No blancks.";
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
			setInput(e.target.value)
		  }

		  function handleChangePassword(e) {
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
			<h1>Sign Up</h1>
			<br />
			<Grid item md={12}>
			  <FormControl>
				<InputLabel htmlFor='Username'>Username</InputLabel>
				<Input 
				type='Username'
				id='Username'
				value={input.username}
				name="username"
				onChange={(e) => handleChangeEmail(e)}
				aria-describedby='username-helper'/>
				<FormHelperText sx={{mb:2, color:grey[400]}} id='username-helper'>Username</FormHelperText>
			  </FormControl>
			  {errors.hasOwnProperty("username") ? (
				<p className='error'>{errors.usermane}</p>
			  ) : null}
		  </Grid>
			<Grid item md={12}>
			  <FormControl>
				<InputLabel htmlFor='email'>E-mail</InputLabel>
				<Input 
				type='email'
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
					onChange={(e) => handleChangePassword(e)}
					aria-describedby='password-helper'/>
					<FormHelperText sx={{mb:2, color:grey[400]}} id='password-helper'>Your password</FormHelperText>
				  </FormControl>
				  {errors.hasOwnProperty("password") ? (
					<p className='error'>{errors.password}</p>
				  ) : null}
			  </Grid>
				<br/>
				{Object.entries(errors).length > 0 || (input.email === '' && input.password === '') ? (
				  <Button variant='outlined' disabled={true}>Register</Button>
				) : (
				  <Button variant='contained' onClick={(e) => handleSubmit(e)}>
					Register
				  </Button>
				)}
		  </Grid>
		  )
}

export default LandingRegister