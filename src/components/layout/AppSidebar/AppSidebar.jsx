import icon from '../../../assets/images/loupe.svg'
import styles from '../AppSidebar/AppSidebar.module.css'

function AppSidebar({ filters, onFilterChange }) {
	const mockSpecializations = [
		{ id: 1, name: 'UI/UX design' },
		{ id: 2, name: 'Design' },
		{ id: 3, name: 'Frontend' },
		{ id: 4, name: 'Backend' },
		{ id: 5, name: 'QA' },
		{ id: 11, name: 'React' }
	]

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.inputWrapper}>
					<img
						className={styles.searchIcon}
						src={icon}
						alt=""
					/>
					<input
						className={styles.input}
						placeholder="Введите вопрос…"
						value={filters.search}
						onChange={e => onFilterChange('search', e.target.value)}
					/>
				</div>
				<div className={styles.categoryWrapper}>
					<h2 className={styles.categoryTitle}>Специализация</h2>
					<div className={styles.chipContainer}>
						{mockSpecializations.map(spec => {
							const isActive = filters.specializationId === spec.id

							return (
								<div
									key={spec.id}
									onClick={() => onFilterChange('specializationId', spec.id)}
									className={`${styles.chipWrapper} ${isActive ? styles.active : ''}`}
								>
									{spec.name}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default AppSidebar
