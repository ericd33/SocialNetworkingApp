import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import './LandingRegister.css';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../../context/UserAuthContext'



const LandingRegister = () => {
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
			if (!input.username ) {
				 		errors.username = "The name is required";
				 	}
			if (!input.email || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(input.email)) {
				 		errors.email = "Invalid E-mail. Example: example@example.com";
				 	}
			if (!input.password || !/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(input.password)){
			  errors.password = "Invalid Password:  Min 8 characters, max. 15. At least one capital letter. At least one lowercase letter. At least one digit. No blanks.";
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
		  }


	return (
		<Grid className='loginForm' container sx={{fontFamily: 'Nunito'}}>
			<h1>Sign Up</h1>
			<br />
			<Grid item md={12}>
			  <FormControl>
				<Input 
				type='Username'
				id='Username'
				value={input.username}
				name="username"
				onChange={(e) => handleChange(e)}
				aria-describedby='username-helper'/>
				<FormHelperText sx={{mb:2, color:grey[400]}} id='username-helper'>Username</FormHelperText>
			  </FormControl>
			  {errors.username && <p className='error'>{errors.usermane}</p>}
		  </Grid>
			<Grid item md={12}>
			  <FormControl>
				<Input 
				type='email'
				id='email'
				value={input.email}
				name="email"
				onChange={(e) => handleChange(e)}
				aria-describedby='email-helper'/>
				<FormHelperText sx={{mb:2, color:grey[400]}} id='email-helper'>Your email</FormHelperText>
			  </FormControl>
			  {errors.email && <p className='error'>{errors.email}</p>}
		  </Grid>
			  <br/>
			  <Grid item md={12} >
				<FormControl>
					<Input 
					type='password'
					id='pwd'
					value={input.password}
					name="password"
					onChange={(e) => handleChange(e)}
					aria-describedby='password-helper'/>
					<FormHelperText sx={{mb:2, color:grey[400]}} id='password-helper'>Your password</FormHelperText>
				  </FormControl>
				  {errors.password && <p className='error'>{errors.password}</p>}
			  </Grid>
				<br/>
				{Object.keys(errors).length === 0 ? (
					<Button variant='contained' onClick={(e) => handleSubmit(e)}>
					Register
				  	</Button>
				) : (
					<Button variant='outlined' disabled={true}>Register</Button>
				)}
		  </Grid>
		  )
}

export default LandingRegister
