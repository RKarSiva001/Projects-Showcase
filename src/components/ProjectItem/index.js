import './index.css'

const ProjectItem = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <>
      <li className="project-item-container">
        <img className="project-item-image" src={imageUrl} alt={name} />
        <div className="project-item-details-container">
          <h1 className="project-item-title">{name}</h1>
        </div>
      </li>
    </>
  )
}

export default ProjectItem
