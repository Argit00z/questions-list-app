import FilterWrapper from './FilterWrapper/FilterWrapper'
import InputWrapper from './InputWrapper/InputWrapper'

function SidebarFilters({ filters, onFilterChange, filterConfigs }) {
	return (
		<>
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
					selectedValues={filters[config.filterName]}
				/>
			))}
		</>
	)
}

export default SidebarFilters
