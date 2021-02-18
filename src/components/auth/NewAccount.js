import React, { useState, useContext , useEffect} from 'react';
import { Link } from 'react-router-dom'
import alertContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/authentication/authContext'

const NewAccount = (props) => {

	//Extract alert context
	const alertsContext = useContext(alertContext)
	const {alert, showAlert } = alertsContext

	const authsContext = useContext(AuthContext)
	const {message, authenticated, registerUsers} = authsContext

	const [credentials, saveCredentials] = useState({
		name: '',
		email: '',
		password: '',
		confirm: ''
	})


	const { name, email, password , confirm} = credentials


	const onChange = e => {
		saveCredentials({
			...credentials,
			[e.target.name]: e.target.value
		})
	}


	//when user login in

	const onSubmit = e => {
		e.preventDefault()

		//Validate
		if(name.trim() === ''||
		 email.trim() === '' ||
		  password.trim() === '' || 
			confirm.trim() === ''){
			return showAlert('All fields are required', 'alerta-error')
		}
		
		//Password min 6 char
		if(password.length < 6){
			showAlert('Password must be at least 6 characters long', 'alerta-error')
			return
		}


		//same passwords
		if(password !== confirm){
			showAlert('Passwords don`t match', 'alerta-error')
			return
		}
		//pass to action

		registerUsers({
		name, 
		email,
		password	
		})
	}


	// In case user has been aunthenticated or duplicated register
	useEffect(() => {
		if(authenticated){
			props.history.push('/projects')
		}

		if(message){
			showAlert(message.msg, message.category)
		}

	},[message, authenticated, props.history, showAlert])


	return (
		<div className='form-usuario'>
			{alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null }
			<div className='contenedor-form sombra-dark'>
				<h1>Sign in</h1>
				<form
					onSubmit={onSubmit}
				>

					<div className='campo-form'>
						<label htmlFor='name'>name</label>
						<input 
						type='text'
						id='name'
						name='name'
						value={name}
						placeholder='Your name'
						onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={email}
							placeholder='Your email'
							onChange={onChange}
						/>
					</div>


					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							placeholder='Your password'
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='confirm'>Password</label>
						<input
							type='password'
							id='confirm'
							name='confirm'
							value={confirm}
							placeholder='Repeat your password'
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<input
							type='submit'
							value='Sing Up'
							className='btn btn-primario btn-block'
						/>
					</div>
				</form>

				<Link to={'/new-account'} className='enlace-cuenta'>
					Create account
				</Link>
			</div>
		</div>


	);
}

export default NewAccount;