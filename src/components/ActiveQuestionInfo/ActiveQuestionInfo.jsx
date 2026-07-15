import styles from '../ActiveQuestionInfo/ActiveQuestionInfo.module.css'

function ActiveQuestionInfo({ question }) {
	return (
		<>
			<div className={styles.categoryWrapper}>
				<h2 className={styles.categoryTitle}>Уровень</h2>
				<div className={styles.chipContainer}>
					<div className={styles.questionMetrics}>
						<div className={styles.metrics}>
							Рейтинг:
							<div className={styles.metricsMark}>{question.rate}</div>
						</div>
						<div className={styles.metrics}>
							Сложность:
							<div className={styles.metricsMark}>{question.complexity}</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.categoryWrapper}>
				<h2 className={styles.categoryTitle}>Навыки</h2>
				<div className={styles.chipContainer}>
					{question.questionSkills.map(skill => (
						<div
							key={skill.id}
							className={`${styles.chipWrapper}`}
						>
							{skill.title}
						</div>
					))}
				</div>
			</div>

			<div className={styles.categoryWrapper}>
				<h2 className={styles.categoryTitle}>Клучевые слова</h2>
				<div className={styles.chipContainer}>
					{question.keywords.map((keyword, index) => (
						<a
							className={styles.keywords}
							key={index}
						>
							#{keyword}
						</a>
					))}
				</div>
			</div>
		</>
	)
}

export default ActiveQuestionInfo
