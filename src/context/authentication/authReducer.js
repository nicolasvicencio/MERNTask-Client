import {
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGN_OUT
} from '../../types/index'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				authenticated: true,
				message: null,
				loading: false
			}
		case GET_USER:
			return {
				...state,
				authenticated: true,
				user: action.payload,
				loading: false
			}
		case SIGN_OUT:
		case LOGIN_ERROR:
		case REGISTER_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				user: null,
				authenticated: null,
				message: action.payload,
				loading: false
			}




		default:
			return state
	}
}