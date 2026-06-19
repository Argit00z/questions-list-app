import { useEffect } from 'react'
import styles from '../AppContent/AppContent.module.css'
import QuestionList from './QuestionList/QuestionList'

function AppContent({ questions }) {
	useEffect(() => {}, [])

	return (
		<div className={styles.mainContainer}>
			<QuestionList questions={questions} />
		</div>
	)
}

export default AppContent
