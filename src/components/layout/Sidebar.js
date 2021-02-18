import React from 'react'
import Form from '../projects/Form'
import ProjectList from '../projects/ProjectList'


const Sidebar = () => {
	return ( 
		<aside>
			<h1>MERN<span>task</span></h1>
			<Form />
			<div className="proyectos">
				<h2>Your Projects</h2>
				<ProjectList />
			</div>
		</aside>


	 );
}
 
export default Sidebar;