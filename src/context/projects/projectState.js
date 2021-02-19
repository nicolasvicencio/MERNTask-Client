import React, { useReducer } from 'react';


import projectContext from './projectContext'
import projectReducer from './projectReducer'

import {
	PROJECT_FORM,
	GET_PROJECTS,
	ADD_PROJECT,
	VALIDATE_FORM,
	CURRENT_PROJECT,
	DELETE_PROJECT,
	ERROR_PROJECT
} from '../../types/index'

import axiosClient from '../../config/axios'


const ProjectState = (props) => {


	const initialState = {
		form: false,
		projects: [],
		formerror: false,
		project: null,
		message: null

	}
	//Create dispatch to exec actions

	const [state, dispatch] = useReducer(projectReducer, initialState)

	//functions to CRUD

	const showForm = () => {
		dispatch({
			type: PROJECT_FORM
		})
	}

	//Get Projects
	const getProjects = async () => {
		try {
			const result = await axiosClient.get('/api/projects')


			dispatch({
				type: GET_PROJECTS,
				payload: result.data

			})
		} catch (error) {
			const alert = {
				msg: 'An error has ocurred',
				category: 'alerta-error'
			}
			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})

		}
	}

	//ADD new project
	const addProject = async (project) => {

		try {

			const result = await axiosClient.post('/api/projects', project)
			console.log(result)

			dispatch({
				type: ADD_PROJECT,
				payload: result.data.project
			})

		} catch (error) {
			const alert = {
				msg: 'An error has ocurred',
				category: 'alerta-error'
			}

			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})

		}
	}

	//Validate form by errors
	const showError = () => {
		dispatch({
			type: VALIDATE_FORM,

		})
	}
	//Select project by user click

	const currentProject = (projectID) => {
		dispatch({
			type: CURRENT_PROJECT,
			payload: projectID
		})
	}

	//Delete a project 
	const deleteProject = async (projectID) => {
		try {

			await axiosClient.delete(`/api/projects/${projectID}`)

			dispatch({
				type: DELETE_PROJECT,
				payload: projectID
			})

		} catch (error) {
			const alert = {
				msg: 'An error has ocurred',
				category: 'alerta-error'
			}

			dispatch({
				type: ERROR_PROJECT,
				payload: alert
			})
		}
	}



	return (
		<projectContext.Provider
			value={{
				projects: state.projects,
				form: state.form,
				formerror: state.formerror,
				project: state.project,
				message: state.message,
				showForm,
				getProjects,
				addProject,
				showError,
				currentProject,
				deleteProject
			}}
		>
			{props.children}


		</projectContext.Provider>
	)
}

export default ProjectState