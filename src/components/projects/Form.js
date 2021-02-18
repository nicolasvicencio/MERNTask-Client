import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext'

const Form = () => {

	//Get form state
	const projectsContext = useContext(projectContext)
	const { form ,formerror , showForm, addProject, showError  } = projectsContext

	const [project, saveProject] = useState({
		name: ''
	})


	const {name} = project



	const onChangeProject = e => {
		saveProject({
			...project,
			[e.target.name]: e.target.value
		})
	}


	const onSubmitProject = e => {
		e.preventDefault()

	//validate
	if(name === '') {
		showError()
		return 
	}

	//Add to state
	addProject(project)

		//reset form 

		saveProject({
			name: ''
		})
	}

	return (

		<Fragment>
			<button
				type='button'
				className='btn btn-block btn-primario'
				onClick={() => showForm() }
			>New Project</button>

			{form
				? (<form
					className='formulario-nuevo-proyecto'
					onSubmit={onSubmitProject}
				>
					<input
						type='text'
						className='input-text'
						placeholder='Project name'
						name='name'
						value={name}
						onChange={onChangeProject}
					/>

					<input
						type='submit'
						className='btn btn-primario btn-block'
						value='Add Project'
					/>

				</form>
				)
				: null
			}

			{formerror ?<p className='mensaje error'>A project name is required</p> :null }


		</Fragment>


	);
}

export default Form;