import { useState } from 'react'
import styles from '../FilterWrapper/FilterWrapper.module.css'

function FilterWrapper({
	items = [],
	title,
	onFilterChange,
	filterName,
	selectedValues
}) {
	const [isShowAll, setIsShowAll] = useState(false)
	const visibleItems = isShowAll ? items : items.slice(0, 5)
	const isItemActive = id => {
		if (Array.isArray(selectedValues)) {
			return selectedValues.map(String).includes(String(id))
		}

		return String(selectedValues) === String(id)
	}

	return (
		<div className={styles.categoryWrapper}>
			<h2 className={styles.categoryTitle}>{title}</h2>

			<div className={styles.chipContainer}>
				{visibleItems.map(item => {
					const isActive = isItemActive(item.id)

					return (
						<div
							key={item.id}
							onClick={() => onFilterChange(filterName, item.id)}
							className={`${styles.chipWrapper} ${isActive ? styles.active : ''}`}
						>
							{item.title}
						</div>
					)
				})}
			</div>

			{items.length > 5 && (
				<button
					onClick={() => setIsShowAll(prev => !prev)}
					className={styles.openAllBtn}
				>
					{!isShowAll ? 'Посмотреть все' : 'Скрыть'}
				</button>
			)}
		</div>
	)
}

export default FilterWrapper
