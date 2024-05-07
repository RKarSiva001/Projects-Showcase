import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CategoryItem from '../CategoryItem'
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

  clickCategoryItem = categoryType => {
    this.setState({category: categoryType})
    this.getProjects()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="projects-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProjectsSuccessView() {
    const {category, projectsList} = this.state

    // console.log(category)

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />

        <ul className="tabs-container">
          {categoriesList.map(tabDetails => (
            <CategoryItem
              key={tabDetails.id}
              tabDetails={tabDetails}
              clickCategoryItem={this.clickCategoryItem}
              isActive={category === tabDetails.id}
            />
          ))}
        </ul>

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
