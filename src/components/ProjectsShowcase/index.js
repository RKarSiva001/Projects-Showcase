import {Component} from 'react'
import Loader from 'react-loader-spinner'
// import CategoryItem from '../CategoryItem'
import ProjectItem from '../ProjectItem'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProjectsShowcase extends Component {
  state = {
    projectsList: [],
    apiStatus: apiStatusConstants.initial,
    category: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    const {category} = this.state
    console.log(category)
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.projects.map(project => ({
        id: project.id,
        name: project.name,
        imageUrl: project.image_url,
      }))
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      // if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeCategory = event => {
    const {category} = this.state
    this.setState({category: event.target.value}, this.getProjects)

    this.getProjects()
    console.log(category, 'onChan')
  }

  clickRetry = () => {
    this.getProjects()
  }

  renderProjectsFailureView = () => (
    <div className="projects-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="projects-failure-img"
      />
      <h1 className="projects-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="projects-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="projects-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProjectsSuccessView() {
    const {category, projectsList} = this.state

    console.log(category, 'rend success')

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />

        <div className="tabs-container">
          <select
            className="category-select"
            onChange={this.onChangeCategory}
            value={category}
          >
            {categoriesList.map(tabDetails => (
              <option
                key={tabDetails.id}
                value={tabDetails.id}
                className="option"
              >
                {tabDetails.displayText}
              </option>
            ))}
          </select>
        </div>

        <ul className="project-list-container">
          {projectsList.map(projectDetails => (
            <ProjectItem
              key={projectDetails.id}
              projectDetails={projectDetails}
            />
          ))}
        </ul>
      </div>
    )
  }

  render = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsSuccessView()
      case apiStatusConstants.failure:
        return this.renderProjectsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProjectsShowcase
