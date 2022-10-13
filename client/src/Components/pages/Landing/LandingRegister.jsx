import React, { useState } from 'react'

const LandingRegister = () => {
  const [input, setInput] = useState({
		name:"",
		email:"",
		password: "",
	});

	const [errors, setErrors] = useState({});

	function validate(input) {
		let errors = {};
		if (!input.name) {
			errors.name = "The name is requiered";
		}
		if (!input.email) {
			errors.email = "The email is required";
		}
		if (!input.password) {
			errors.password = "The password is requiered";
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
		e.preventDefault();
		// dispatch(postVideogame(input));
		setInput({
			name:"",
			email:"",
			password: "",
		});
	}

	return (
		<div>
			<h1>Register</h1>
				<br />
				<form>
				<div>
					<label>Name :</label>
					<input
						type="text"
						value={input.name}
						name="name"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("name") ? (
						<p>{errors.name}</p>
					) : null}
				</div>
				<div>
					<label>E-mail :</label>
					<input
						type="text"
						value={input.email}
						name="email"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("email") ? (
						<p>{errors.email}</p>
					) : null}
				</div>
				<label>Password :</label>
					<input
						type="text"
						value={input.password}
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("password") ? (
						<p>{errors.password}</p>
					) : null}
					<br/>
					{Object.entries(errors).length > 0 ? (
						<button className="falso">login</button>
					) : (
						<button onClick={(e) => handleSubmit(e)} className="bueno">
							login
						</button>
					)}
					</form>
		</div>
	)
}

export default LandingRegister