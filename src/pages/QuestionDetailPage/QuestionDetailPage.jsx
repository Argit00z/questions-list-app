import { useNavigate } from 'react-router'
import arrowLeft from '../../assets/images/arrow_left.svg'
import ActiveQuestionInfo from '../../components/ActiveQuestionInfo/ActiveQuestionInfo'
import AppSidebar from '../../components/layout/AppSidebar/AppSidebar'
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail'
import { useQuestionsScreen } from '../../hooks/useQuestionsScreen'
import styles from '../QuestionDetailPage/QuestionDetailPage.module.css'

function QuestionDetailPage() {
	const navigate = useNavigate()
	const { isSidebarLoading, filters, handleFilterChange, filterConfigs } =
		useQuestionsScreen()

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
					<QuestionDetail />
					<AppSidebar isLoading={isSidebarLoading}>
						<ActiveQuestionInfo
							filters={filters}
							onFilterChange={handleFilterChange}
							filterConfigs={filterConfigs}
						/>
					</AppSidebar>
				</div>
			</div>
		</main>
	)
}

export default QuestionDetailPage
