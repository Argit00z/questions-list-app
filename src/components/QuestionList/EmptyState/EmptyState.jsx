import styles from './EmptyState.module.css'

export const EmptyState = ({
	onResetFilters,
	message = 'Вопросы не найдены'
}) => {
	return (
		<div className={styles.emptyState}>
			<div className={styles.icon}>🔍</div>
			<h3 className={styles.title}>{message}</h3>
			<p className={styles.description}>
				Попробуйте изменить параметры фильтрации или ввести другой поисковый
				запрос.
			</p>
			{onResetFilters && (
				<button
					className={styles.resetButton}
					onClick={onResetFilters}
				>
					Сбросить фильтры
				</button>
			)}
		</div>
	)
}

export default EmptyState
