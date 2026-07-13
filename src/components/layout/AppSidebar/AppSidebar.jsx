import styles from '../AppSidebar/AppSidebar.module.css'
import FilterWrapper from './FilterWrapper/FilterWrapper'
import InputWrapper from './InputWrapper/InputWrapper'

function AppSidebar({ filters, onFilterChange, filterConfigs }) {
	return (
		<>
			<div className={styles.mainContainer}>
				<InputWrapper
					value={filters.search}
					onChange={onFilterChange}
				/>
				{filterConfigs.map(config => (
					<FilterWrapper
						key={config.id}
						items={config.items}
						title={config.title}
						onFilterChange={onFilterChange}
						filterName={config.filterName}
						selectedValues={filters.specializationId}
					/>
				))}
			</div>
		</>
	)
}

export default AppSidebar
