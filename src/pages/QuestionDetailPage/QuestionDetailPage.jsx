import { useNavigate, useParams } from 'react-router'
import arrowLeft from '../../assets/images/arrow_left.svg'
import ActiveQuestionInfo from '../../components/ActiveQuestionInfo/ActiveQuestionInfo'
import AppSidebar from '../../components/layout/AppSidebar/AppSidebar'
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail'
import { useQuestionDetail } from '../../hooks/useQuestionDetail'
import { useQuestionsScreen } from '../../hooks/useQuestionsScreen'
import styles from '../QuestionDetailPage/QuestionDetailPage.module.css'

function QuestionDetailPage() {
	const navigate = useNavigate()
	const { id } = useParams()

	const { question, isQuestionLoading } = useQuestionDetail(id)

	const { isSidebarLoading } = useQuestionsScreen()

	return (
		<main className={styles.main}>
			<div className={styles.contentWrapper}>
				<button
					className={styles.btnBack}
					onClick={() => navigate(-1)}
				>
					<img
						width={20}
						height={20}
						src={arrowLeft}
						alt="Назад"
					/>
					<span>Назад</span>
				</button>

				<div className={styles.container}>
					<QuestionDetail
						question={question}
						isLoading={isQuestionLoading}
					/>

					<AppSidebar isLoading={isSidebarLoading}>
						<ActiveQuestionInfo question={question} />
					</AppSidebar>
				</div>
			</div>
		</main>
	)
}

export default QuestionDetailPage
