import { complexityItems, ratingItems } from '../../../constants/filters'
import styles from '../AppSidebar/AppSidebar.module.css'
import FilterWrapper from './FilterWrapper/FilterWrapper'
import InputWrapper from './InputWrapper/InputWrapper'

function AppSidebar({
	filters,
	onFilterChange,
	specializations,
	skills,
	isLoading
}) {
	return (
		<>
			<div className={styles.mainContainer}>
				<InputWrapper
					value={filters.search}
					onChange={onFilterChange}
				/>
				<FilterWrapper
					items={specializations}
					title={'Специализация'}
					onFilterChange={onFilterChange}
					filterName={'specializationId'}
					selectedValues={filters.specializationId}
				/>
				<FilterWrapper
					items={skills}
					title={'Выберите навыки'}
					onFilterChange={onFilterChange}
					filterName={'skillIds'}
					selectedValues={filters.skillIds}
				/>
				<FilterWrapper
					items={complexityItems}
					title={'Сложность'}
					onFilterChange={onFilterChange}
					filterName={'complexity'}
					selectedValues={filters.complexity}
				/>
				<FilterWrapper
					items={ratingItems}
					title={'Рейтинг вопросов'}
					onFilterChange={onFilterChange}
					filterName={'rating'}
					selectedValues={filters.rating}
				/>
			</div>
		</>
	)
}

export default AppSidebar
