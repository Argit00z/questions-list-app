import RenderAnswer from '../QuestionList/QuestionCard/RenderAnswer'
import Skeleton from '../ui/Skeleton/Skeleton'
import styles from './QuestionDetail.module.css'

function QuestionDetail({ question, isLoading }) {
	if (isLoading) {
		return <Skeleton type="item" />
	}

	if (!question) {
		return <div className={styles.error}>Вопрос не найден</div>
	}

	return (
		<div className={styles.main}>
			<div className={styles.detailWrapper}>
				<h1 className={styles.title}>{question.title}</h1>
				<div className={styles.description}>
					<p>{question.description}</p>
				</div>
			</div>
			<div className={styles.detailWrapper}>
				<h1 className={styles.title}>Короткий ответ:</h1>
				<RenderAnswer answer={question.shortAnswer} />
			</div>
			<div className={styles.detailWrapper}>
				<h1 className={styles.title}>Длинный ответ:</h1>
				<RenderAnswer answer={question.longAnswer} />
			</div>
		</div>
	)
}

export default QuestionDetail
