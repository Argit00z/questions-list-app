import styles from '../ActiveQuestionInfo/ActiveQuestionInfo.module.css'

function ActiveQuestionInfo() {
	const visibleItems = [{ id: 1, title: '123' }]
	return (
		<div className={styles.categoryWrapper}>
			<h2 className={styles.categoryTitle}>Название</h2>

			<div className={styles.chipContainer}>
				{visibleItems.map(item => {
					return (
						<div
							key={item.id}
							className={`${styles.chipWrapper}`}
						>
							{item.title}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ActiveQuestionInfo
