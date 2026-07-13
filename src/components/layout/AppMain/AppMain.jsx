import { useQuestionsScreen } from '../../../hooks/useQuestionsScreen'
import QuestionList from '../../QuestionList/QuestionList'
import styles from '../AppMain/AppMain.module.css'
import AppSidebar from '../AppSidebar/AppSidebar'

function AppMain() {
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
			<AppSidebar
				filters={filters}
				isLoading={isSidebarLoading}
				onFilterChange={handleFilterChange}
				filterConfigs={filterConfigs}
			/>
		</div>
	)
}

export default AppMain
