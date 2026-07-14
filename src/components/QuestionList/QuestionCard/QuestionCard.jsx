import { Link } from 'react-router'
import arrow from '../../../assets/images/arrow.svg'
import arrowRight from '../../../assets/images/arrow_right.svg'
import styles from '../QuestionCard/QuestionCard.module.css'
import RenderAnswer from './RenderAnswer'

function QuestionCard({
	question,
	onOpenDetails,
	onCardRef,
	isOpen,
	targetHeight
}) {
	return (
		<div
			key={question.id}
			className={styles.questionCard}
		>
			<div
				onClick={() => onOpenDetails(question.id)}
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
					onCardRef(question.id, el)
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
							<div className={styles.metricsMark}>{question.rate}</div>
						</div>
						<div className={styles.metrics}>
							Сложность:
							<div className={styles.metricsMark}>{question.complexity}</div>
						</div>
					</div>
					{question.imageSrc && (
						<div className={styles.code}>
							<img
								src={question.imageSrc}
								alt="код"
							/>
						</div>
					)}

					<div className={styles.answer}>
						<RenderAnswer answer={question.shortAnswer} />
					</div>
					<div className={styles.detailLink}>
						<Link to={`${question.id}`}>Подробнее</Link>
						<img
							width={25}
							height={25}
							src={arrowRight}
							alt="Вперед"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
