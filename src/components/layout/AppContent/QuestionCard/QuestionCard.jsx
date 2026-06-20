import { useEffect, useRef, useState } from 'react'
import arrow from '../../../../assets/images/arrow.svg'
import styles from '../QuestionCard/QuestionCard.module.css'

function QuestionCard({ questions }) {
	const [openIds, setOpenIds] = useState([])
	const [heights, setHeights] = useState({})
	const cardRefs = useRef({})

	useEffect(() => {
		const newHeights = {}
		questions.forEach(question => {
			const element = cardRefs.current[question.id]
			if (element) {
				newHeights[question.id] = element.scrollHeight
			}
		})
		setHeights(newHeights)
	}, [questions])

	const handleOpenDetails = id => {
		if (openIds.includes(id)) {
			setOpenIds(openIds.filter(itemId => itemId !== id))
		} else {
			setOpenIds([...openIds, id])
		}
	}

	return (
		<>
			{questions.map(question => {
				const isOpen = openIds.includes(question.id)
				const targetHeight = heights[question.id] || 0

				return (
					<div
						key={question.id}
						className={styles.questionCard}
					>
						<div
							onClick={() => handleOpenDetails(question.id)}
							className={styles.questionHeader}
						>
							<p className={styles.title}>{question.title}</p>
							<img
								className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
								src={arrow}
								alt="arrow"
							/>
						</div>

						<div
							ref={el => {
								cardRefs.current[question.id] = el
							}}
							className={`${styles.details} ${isOpen ? styles.open : ''}`}
							style={{
								height: isOpen ? `${targetHeight}px` : '0px',
								opacity: isOpen ? 1 : 0
							}}
						>
							<div className={styles.detailsInner}>
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
						</div>
					</div>
				)
			})}
		</>
	)
}

export default QuestionCard
