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
	const complexityItems = [
		{ id: '1-3', title: '1-3' },
		{ id: '4-6', title: '4-6' },
		{ id: '7-8', title: '7-8' },
		{ id: '9-10', title: '9-10' }
	]

	const ratingItems = [
		{ id: 1, title: '1' },
		{ id: 2, title: '2' },
		{ id: 3, title: '3' },
		{ id: 4, title: '4' },
		{ id: 5, title: '5' }
	]
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
