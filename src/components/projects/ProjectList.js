import React, { useContext, useEffect } from 'react';
import Project from './Project'
import projectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertsContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ProjectList = () => {
	const nodeRef = React.useRef(null) //prevent warning stric mode of trnasition group

	//Extract project from initialState
	const projectsContext = useContext(projectContext)
	const {message, projects, getProjects} = projectsContext

	const alertContext = useContext(AlertContext)
	const {alert, showAlert} = alertContext




	//Get Projects when component is loaded
	useEffect(() => {
		if(message){
			showAlert(message.msg, message.category)
		}
		getProjects()
		//eslint-disable-next-line
	}, [message])


	//Look up if project has content
	if (projects.length === 0) return <p>There are no projects!, start by creating one</p>

	return (
		<ul className='listado-proyectos'>
{alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
		

			<TransitionGroup>
				{projects.map(project => (
					<CSSTransition
					nodeRef={nodeRef}
					key={project._id}
					timeout={200}
					classNames='proyecto'
					>
						<Project
							project={project}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
}

export default ProjectList;