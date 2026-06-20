import { useState } from 'react'
import Pagination from '../../../ui/Pagination/Pagination'
import QuestionCard from '../QuestionCard/QuestionCard'
import styles from '../QuestionList/QuestionList.module.css'

function QuestionList({ questions }) {
	const [currentPage, setCurrentPage] = useState(1)
	const totalPage = 10
	const pageSize = 10

	return (
		<div className={styles.questionList}>
			<h1 className={styles.title}> Заголовок </h1>
			<QuestionCard questions={questions} />
			<Pagination totalPages={totalPage} />
		</div>
	)
}

export default QuestionList
