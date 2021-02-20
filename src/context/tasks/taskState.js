
import React, { useReducer } from 'react';
import TaskContext from './taskContext'
import axiosClient from '../../config/axios'

import {
	PROJECT_TASKS,
	ADD_TASK,
	VALIDATE_TASK,
	DELETE_TASK,
	CURRENT_TASK,
	CLEAN_TASK,
	UPDATE_TASK

} from '../../types/index'
import taskReducer from './taskReducer';




const TaskState = (props) => {

	const initialState = {
		projecttasks: [],
		taskerror: false,
		selectedtask: null
	}

	//Creating dispatch and state
	const [state, dispatch] = useReducer(taskReducer, initialState)


	//Create functions

	//Get project tasks

	const getTasks = async (project) => {

		try {
			const response = await axiosClient.get('/api/tasks', { params: { project } })
			dispatch({
				type: PROJECT_TASKS,
				payload: response.data.tasks

			})
		} catch (error) {
			console.log(error)
		}

	}

	const addTask = async (task) => {
		console.log(task)
		try {
			const response = await axiosClient.post('/api/tasks', task)
			console.log(response)
			dispatch({
				type: ADD_TASK,
				payload: task
			})
		} catch (error) {
			console.log(error)
		}
	}


	//validate and show error

	const validateTask = () => {
		dispatch({
			type: VALIDATE_TASK
		})
	}

	const deleteTask = async (id, project) => {
		try {
			const response = await axiosClient.delete(`/api/tasks/${id}`, { params: { project } })

			console.log(response)
			dispatch({
				type: DELETE_TASK,
				payload: id
			})
		} catch (error) {
			console.log(error)
		}

	}




	const updateTask = async (task) => {

		try {

			const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
			console.log(result.data.task)

			dispatch({
				type: UPDATE_TASK,
				payload: result.data.task
			})

		} catch (error) {
			console.log(error)
		}

	}

	//Extract task to edit
	const saveCurrentTask = (task) => {
		dispatch({
			type: CURRENT_TASK,
			payload: task
		})

	}




	//Detele selected Task

	const cleanTask = () => {
		dispatch({
			type: CLEAN_TASK
		})
	}

	return (
		<TaskContext.Provider
			value={{
				projecttasks: state.projecttasks,
				taskerror: state.taskerror,
				selectedtask: state.selectedtask,
				getTasks,
				addTask,
				validateTask,
				deleteTask,
				saveCurrentTask,
				updateTask,
				cleanTask
			}}
		>

			{props.children}
		</TaskContext.Provider>
	)

}

export default TaskState