import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext'
import projectContext from '../../context/projects/projectContext'


const Task = ({ task }) => {

	
	const projectsContext = useContext(projectContext)
	const { project } = projectsContext

	const [currentProject] = project

	const tasksContext = useContext(taskContext)
	const { deleteTask, getTasks, updateTask, saveCurrentTask } = tasksContext

	//User press delete btn
	const removeTask = (id) => {
		deleteTask(id, currentProject._id)
		getTasks(currentProject.id)
	}

	//func to change tasks state
	const changeState = (task) => {

		if (task.state) {
			task.state = false
		} else {
			task.state = true
		}
		updateTask(task)
	}

	//Add current task when user edits

	const editCurrentTask = (task) => {
		saveCurrentTask(task)
		updateTask(task)
	}




	return (
		<li className='tarea sombra'>
			<p>{task.name}</p>
			<div className='estado'>
				{task.state
					?
					(
						<button
							type='button'
							className='completo'
							onClick={() => changeState(task)}
						>Complete</button>
					)

					:
					(
						<button
							type='button'
							className='incompleto'
							onClick={() => changeState(task)}
						>Incomplete</button>
					)
				}
			</div>

			<div className='acciones'>
				<button
					type='button'
					className='btn btn-primario'
					onClick={() => editCurrentTask(task)}
				>Edit</button>


				<button
					type='button'
					className='btn btn-secundario'
					onClick={() => removeTask(task._id)}
				>Delete</button>
			</div>



		</li>

	);
}

export default Task;