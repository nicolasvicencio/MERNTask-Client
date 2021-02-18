import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {

//Get project state
const projectsContext = useContext(projectContext)
const {currentProject} = projectsContext

//Get tasks state
const tasksState = useContext(taskContext)
const {getTasks} = tasksState

//Add current project
const selectProject = id => {

currentProject(id) // Fix current project
getTasks(id) //Filter tasks


}


	return ( 
		<li>
			<button
			type='button'
			className='btn btn-blank'
			onClick={() => selectProject(project._id)}
			
			>{project.name}</button>
		</li>

	 );
}
 
export default Project;