import { ADD_PROJECT, CURRENT_PROJECT, DELETE_PROJECT, ERROR_PROJECT, GET_PROJECTS, PROJECT_FORM , VALIDATE_FORM} from '../../types/index'


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {

	switch (action.type) {

		case PROJECT_FORM:
			return {
				...state,
				form: true
			}
		
		case GET_PROJECTS:
			return{
				...state,
				projects: action.payload.projects
			}	

		case ADD_PROJECT:
			return{
				...state,
				projects: [action.payload, ...state.projects ],
				form: false,
				formerror: false
			}

		case VALIDATE_FORM:
			return{
				...state,
				formerror: true
			}

		case CURRENT_PROJECT:
			return{
				...state,
				project: state.projects.filter(el => el._id === action.payload)
			}

			case DELETE_PROJECT: 
			return{
				...state,
				projects: state.projects.filter(el => el._id !== action.payload ),
				project: null 
			}

			case ERROR_PROJECT:
			return{
				...state,
				message: action.payload
			}

		default:
			return state;
	}
}