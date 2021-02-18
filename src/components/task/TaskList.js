import React, { Fragment, useContext } from 'react';
import Task from './Task'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'
import{CSSTransition, TransitionGroup}from 'react-transition-group'

const TaskList = () => {

const nodeRef = React.useRef(null)
const projectsContext = useContext(projectContext)
const {project, deleteProject} = projectsContext

const tasksContext = useContext(taskContext)
const {projecttasks} = tasksContext


//If there aren`t select project
if(!project)return <h2>Select a project</h2>


//Array distructuring to extract current project

const [currentProject] = project



//Delete a project
const onClickDelete = () => {
	deleteProject(currentProject._id)
}

	return (
		<Fragment>
			<h2>Project: {currentProject.name}</h2>

			<ul className='listado-tareas'>
				{projecttasks.length === 0
				 ?(<li className='tarea'><p>There is no tasks</p></li>)
				 : 
				 <TransitionGroup>
					{ projecttasks.map(task => (
						<CSSTransition
						nodeRef={nodeRef}
						key={task._id}
						timeout={200}
						classNames='tarea'
						>
							<Task 
							task={task}
							/>

						</CSSTransition>
					))}
				 </TransitionGroup>
				 
				 }
			</ul>

			<button
			type='button'
			className='btn btn-eliminar'
			onClick={onClickDelete}
			>Delete Project &times;</button>

		</Fragment>

	);
}

export default TaskList;