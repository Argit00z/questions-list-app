import AppSidebar from '../../components/layout/AppSidebar/AppSidebar'
import QuestionList from '../../components/QuestionList/QuestionList'
import SidebarFilters from '../../components/SidebarFilters/SidebarFilters'
import { useQuestionsScreen } from '../../hooks/useQuestionsScreen'
import styles from '../QuestionListPage/QuestionListPage.module.css'

function QuestionListPage() {
	const {
		filters,
		currentPage,
		totalPages,
		specializations,
		isQuestionsLoading,
		isSidebarLoading,
		paginatedQuestions,
		handleFilterChange,
		handleNextPage,
		handlePrevPage,
		handlePageClick,
		filterConfigs
	} = useQuestionsScreen()

	return (
		<div className={styles.container}>
			<QuestionList
				filters={filters}
				specializations={specializations}
				questions={paginatedQuestions}
				isLoading={isQuestionsLoading}
				currentPage={currentPage}
				totalPages={totalPages}
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
				onPageClick={handlePageClick}
			/>
			<AppSidebar isLoading={isSidebarLoading}>
				<SidebarFilters
					filters={filters}
					onFilterChange={handleFilterChange}
					filterConfigs={filterConfigs}
				/>
			</AppSidebar>
		</div>
	)
}

export default QuestionListPage
