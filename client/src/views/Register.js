import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../config.js';
import {useNavigate , Link} from 'react-router-dom'

const Register = () => {
	const [ form, setValues ] = useState({
		email: '',
		password: '',
		password2: ''
	});
	const [ message, setMessage ] = useState('');

	const navigate=useNavigate()

	const handleChange = (e) => {
		setValues({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		debugger
		e.preventDefault();
		try {
			const response = await axios.post(`${URL}/users/register`, {
				email: form.email,
				password: form.password,
				password2: form.password2
			});
			setMessage(response.data.message);
			//console.log(response)
			if (response.data.ok) {
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (<div>
		<h1 className="welcome_message">Welcome to BitsOfCoins!</h1>
    <p className="info_text">
Join our community and start exploring the exciting world of cryptocurrency.
</p>
<p className="info_text">
Register now to unlock all the features and stay updated with the latest trends in the digital currency space.
</p>
		<form onSubmit={handleSubmit} onChange={handleChange} className="form_container">
			<label>Email</label>
			<input name="email" type='email'/>

			<label>Password</label>
			<input name="password" type='password' />

			<label>Repeat password</label>
			<input name="password2" type='password' />

			<button>register</button>
			<div className="message">
				<h4>{message}</h4>
			</div>
		</form>
		<p>Already a member?
  <Link to={`/login`} >
  <span className="link_to_register"> Log in now</span>
            </Link></p>
		</div>
	);
};

export default Register;
