import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import './LandingRegister.css';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../../context/UserAuthContext'


const LandingRegister = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("")
	const { signUp } = useUserAuth();
	const navigate = useNavigate();

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  await signUp(username, email, password);
		  navigate("/")
		} catch (err) {
		  console.log(err);
		}
	};

	// function validate(input) {
	// 	let errors = {};
	// 	if (!username ) {
	// 		errors.username = "The name is required";
	// 	}
	// 	if (!email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
	// 		errors.email = "Invalid E-mail <br> Example: example@example.com";
	// 	}
	// 	// contrasena asi:
	// 	// Minimo 8 caracteres
	// 	// Maximo 15
	// 	// Al menos una letra mayúscula
	// 	// Al menos una letra minucula
	// 	// Al menos un dígito
	// 	// No espacios en blanco
	// 	// Al menos 1 caracter especial
	// 	if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$@$!%*?&]|[^]){8,15}$/.test(input.password)){
	// 		errors.password =
	// 		'8 to 15 characters - At least one capital letter - At least one digit - Not spaces - At least one special character';
	// 	}
	// 	return errors;
	// }

	return (
		<Grid className='registerForm' sx={{fontFamily:'Nunito'}}>
			<h1>Register</h1>
				<br />
				<Grid item md={12}>
					<FormControl>
						<InputLabel htmlFor='email'>E-mail</InputLabel>
						<Input 
						type='email'
						id='email'
						required
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						aria-describedby='email-helper'/>
						<FormHelperText sx={{mb:2, color:grey[400]}} id='email-helper'>Your email</FormHelperText>
					</FormControl>
				</Grid>

				<Grid item md={12}>
					<FormControl>
						<InputLabel htmlFor='pwd'>Password</InputLabel>
						<Input 
						type='password'
						id='pwd'
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						aria-describedby='password-helper'/>
						<FormHelperText sx={{mb:2, color:grey[400]}} id='password-helper'>Your password</FormHelperText>
					</FormControl>
				</Grid>
					<br/>
					<Button variant='contained' onClick={handleSubmit}>
						Register
					</Button>
		</Grid>
	)
}

export default LandingRegister