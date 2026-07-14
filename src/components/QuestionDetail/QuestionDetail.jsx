import styles from '../QuestionDetail/QuestionDetail.module.css'

function QuestionDetail() {
	return (
		<div className={styles.questionDetail}>
			<div className={styles.wrapper}>
				<h1>Заголовок</h1>
				<p>Текст</p>
			</div>
		</div>
	)
}

export default QuestionDetail
