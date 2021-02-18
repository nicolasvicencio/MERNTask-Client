import React, { useReducer} from 'react';
import AuthContext from './authContext'
import AuthReducer from "./authReducer"

import axiosClient from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'



import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGN_OUT
} from '../../types/index'


const AuthState = props => {

	const initialState = {
		token: localStorage.getItem('token'),
		authenticated: null,
		user: null,
		message: null,
		loading: true
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)



	//Functions
const registerUsers = async (data) => {
	try {
		const response = await axiosClient.post('http://localhost:4000/api/users', data)
		console.log(response.data)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data
		})

		//Obtener user
		userAuthenticated()

	} catch (error) {
		console.log(error.response.data.msg)

		const alert = {
			msg: error.response.data.msg,
			category: 'alerta-error'
		}

		dispatch({
			type: REGISTER_ERROR,
			payload: alert
		})

	}
}

//Return authenticated user
const userAuthenticated = async () => {
	const token = localStorage.getItem('token')
	if(token){
		//Send token by headers
		tokenAuth(token)
	}

	try {
		
		const response = await axiosClient.get('http://localhost:4000/api/auth')
		
		dispatch({
			type: GET_USER,
			payload: response.data.user
		})

	} catch (error) {
		console.log(error.response)
		dispatch({
			type: LOGIN_ERROR
		})
	}

}

//user sign in
const signIn = async (data) => {
	try {
		const response  = await axiosClient.post('http://localhost:4000/api/auth', data)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data
		})

		userAuthenticated()
		
	} catch (error) {
		console.log(error.response.data.msg)
		const alert = {
			msg: error.response.data.msg,
			category: 'alerta-error'
		}
		dispatch({
			type: LOGIN_ERROR,
			payload: alert
		})
	}
}

//Sign Our
const signOut = () => {
	dispatch({
		type: SIGN_OUT
	})
}


	return(
		<AuthContext.Provider
		value={{
			token: state.token,
			authenticated: state.authenticated,
			user: state.user,
			message: state.message,
			loading: state.loading,
			registerUsers,
			signIn,
			userAuthenticated,
			signOut
		}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState