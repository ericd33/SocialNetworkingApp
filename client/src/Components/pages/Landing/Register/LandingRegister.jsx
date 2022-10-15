import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { postUser } from "../../../../Redux/actions.js";
import './LandingRegister.css';


const LandingRegister = () => {
	const dispatch = useDispatch()

    const [input, setInput] = useState({
			name:"",
			email:"",
			password: "",
	});

	const [errors, setErrors] = useState({});

	function validate(input) {
		let errors = {};
		if (!input.name ) {
			errors.name = "The name is required";
		}
		if (!input.email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
			errors.email = "Invalid E-mail <br> Example: example@example.com";
		}
		// contrasena asi:
		// Minimo 8 caracteres
		// Maximo 15
		// Al menos una letra mayúscula
		// Al menos una letra minucula
		// Al menos un dígito
		// No espacios en blanco
		// Al menos 1 caracter especial
		if (!input.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$@$!%*?&]|[^]){8,15}$/.test(input.password)){
			errors.password =
			'8 to 15 characters - At least one capital letter - At least one digit - Not spaces - At least one special character';
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
		console.log(input)
	}

	function handleSubmit(e) {
		console.log(input)
		e.preventDefault();
		dispatch(postUser(input));
		setInput({
			name:"",
			email:"",
			password: "",
		});
	}

	return (
		<Grid className='registerForm' sx={{fontFamily:'Nunito'}}>
			<h1>Register</h1>
				<br />
				<Grid item md={12}>
					<FormControl>
					<InputLabel htmlFor='name'>Name</InputLabel>
					<Input 
					type='text'
					id='name'
					value={input.name}
					name="name"
					onChange={(e) => handleChange(e)}
					aria-describedby='name-helper'/>
					<FormHelperText sx={{mb:2, color:grey[400]}} id='name-helper'>Your name</FormHelperText>
					</FormControl>
					{errors.hasOwnProperty("name") ? (
					<p className='error'>{errors.name}</p>
					) : null}
				</Grid>
				
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

				<Grid item md={12}>
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