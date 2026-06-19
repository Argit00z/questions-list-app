import { useEffect } from 'react'
import arrow from '../../../../assets/images/arrow.svg'
import styles from '../QuestionCard/QuestionCard.module.css'

function QuestionCard({ questions }) {
	useEffect(() => {}, [])

	return (
		<>
			{questions.map(question => (
				<div
					key={question.id}
					className={styles.questionCard}
				>
					<div className={styles.questionHeader}>
						<p className={styles.title}>{question.title}</p>
						<img
							className={styles.arrow}
							src={arrow}
						/>
					</div>
					<div className={styles.questionMetrics}>
						<div className={styles.metrics}>
							Рейтинг:
							<div className={styles.metricsMark}>4</div>
						</div>
						<div className={styles.metrics}>
							Сложность:
							<div className={styles.metricsMark}>10</div>
						</div>
					</div>
					<code>код</code>
					<div className={styles.answer}>{question.description}</div>
				</div>
			))}
		</>
	)
}

export default QuestionCard
