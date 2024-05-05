import './index.css'

const CategoryItem = props => {
  const {tabDetails, clickCategoryItem, isActive} = props
  const {id, displayText} = tabDetails

  const onClickCategoryItem = () => {
    clickCategoryItem(id)
  }

  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''

  return (
    <li className="tab-item-container ">
      <button
        type="button"
        className={`tab-btn ${activeTabBtnClassName}`}
        onClick={onClickCategoryItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default CategoryItem
