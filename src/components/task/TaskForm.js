import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'


const TaskForm = () => {

	const projectsContext = useContext(projectContext)
	const { project } = projectsContext


	const tasksContext = useContext(taskContext)
	const { addTask, taskerror, selectedtask, getTasks, validateTask, updateTask, cleanTask } = tasksContext


	//This effect detects if any task is selected

	useEffect(() => {
		if(selectedtask !== null) {
			saveTask(selectedtask)
		}else{
			saveTask({
				name: ''
			})
		}
	},[selectedtask])




	//Form state
	const [task, saveTask] = useState({
		name: ''
	})
	const { name } = task



	if (!project) return null

	const [currentProject] = project

	//Read values of form
	const handleOnChange = (e) => {
		saveTask({
			...task,
			[e.target.name]: e.target.value
		})
	}


	const onSubmit = (e) => {
		e.preventDefault()

		//Validate
		if (name.trim() === '') {
			validateTask()
			return
		}

		//If is edition or new task
		if(selectedtask === null) {
			task.project = currentProject._id;
			addTask(task)
		}else {
			updateTask(task)

			//Delete current task from state
			cleanTask()
		}

		//Get and filter current project tasks
		getTasks(currentProject._id)


		//reset form
		saveTask({
			name: ''
		})

	}




	return (
		<div className='formulario'>
			<form
				onSubmit={onSubmit}
			>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder={selectedtask ? selectedtask.name : 'Create Task'}
						name='name'
						value={name}
						onChange={handleOnChange}
					/>
				</div>

				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-block'
						value={selectedtask ? 'Edit Task' : 'Add Task'}
					/>

				</div>

			</form>
			{taskerror ? <p className='mensaje error'>Task name is required</p> : null}
		</div>

	);
}

export default TaskForm;