import {
	PROJECT_TASKS,
	ADD_TASK,
	VALIDATE_TASK,
	DELETE_TASK,
	UPDATE_TASK,
	CURRENT_TASK,
	CLEAN_TASK
} from '../../types/index'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
	switch(action.type) {
		case PROJECT_TASKS: 
		return {
			...state, 
			projecttasks: action.payload
		}
		case ADD_TASK: 
		return {
			...state,
			projecttasks: [action.payload, ...state.projecttasks ],
			taskerror: false
		}
		case VALIDATE_TASK:
			return{
				...state,
				taskerror: true
			}
		case DELETE_TASK:
			return{
				...state,
				projecttasks: state.projecttasks.filter(el => el._id !== action.payload)
			}
		case UPDATE_TASK:
		return{
			...state,
			projecttasks: state.projecttasks.map(el => el._id === action.payload._id ? action.payload : el)
			}
		case CURRENT_TASK: 
		return{
			...state,
			selectedtask: action.payload
		}

		case CLEAN_TASK:
			return{
				...state,
				selectedtask: null
			}
	

		default:
			return state
	}
}