import QuestionCard from '../QuestionCard/QuestionCard'
import styles from '../QuestionList/QuestionList.module.css'

function QuestionList({ questions }) {
	return (
		<div className={styles.questionList}>
			<h1 className={styles.title}> Заголовок </h1>
			<QuestionCard questions={questions} />
		</div>
	)
}

export default QuestionList
