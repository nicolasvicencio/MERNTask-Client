import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar'
import Bar from  '../layout/Bar'
import TaskForm from '../task/TaskForm'
import TaskList from '../task/TaskList';
import AuthContext from '../../context/authentication/authContext'

const Projects = () => {

const authContext = useContext(AuthContext)
const {userAuthenticated} = authContext

useEffect(() => {
	userAuthenticated()
	//eslint-disable-next-line
}, [])

	return ( 
		<div className='contenedor-app'>
		<Sidebar />

		<div className="seccion-principal">
			<Bar />

			<main>
				<TaskForm />
				<div className="contenedor-tareas">
				<TaskList />
				</div>
			</main>
		</div>
		</div>


	 );
}
 
export default Projects;