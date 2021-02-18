import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertsContext'
import AuthContext from '../../context/authentication/authContext'



const Login = (props) => {

	const alertContext = useContext(AlertContext)
	const { alert, showAlert } = alertContext

	const authContext = useContext(AuthContext)
	const { message, authenticated, signIn } = authContext

	//In case password or user doesn`t exists
	useEffect(() => {
		if(authenticated){
			props.history.push('/projects')
		}

		if(message){
			showAlert(message.msg, message.category)
		}

	},[message, authenticated, props.history, showAlert])


	const [credentials, saveCredentials] = useState({
		email: '',
		password: ''
	})


	const { email, password } = credentials


	const onChange = e => {
		saveCredentials({
			...credentials,
			[e.target.name]: e.target.value
		})
	}


	//when user login in

	const onSubmit = e => {
		e.preventDefault()

		if (email.trim() === '' || password.trim() === '') {
			showAlert('All field are required', 'alerta-error')
		}
		signIn({ email, password })

	}


	return (
		<div className='form-usuario'>
			{alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Sign in</h1>
				<form
					onSubmit={onSubmit}
				>

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
						<input
							type='submit'
							value='Login In'
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

export default Login;