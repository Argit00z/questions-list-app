import { useAnimatedCards } from '../../hooks/useAnimatedCards'
import QuestionCard from '../QuestionList/QuestionCard/QuestionCard'
import styles from '../QuestionList/QuestionList.module.css'
import Pagination from '../ui/Pagination/Pagination'
import Skeleton from '../ui/Skeleton/Skeleton'

function QuestionList({
	questions,
	isLoading,
	currentPage,
	totalPages,
	onNextPage,
	onPrevPage,
	onPageClick,
	filters,
	specializations
}) {
	const currentSpecialization = specializations.find(
		spec => spec.id === filters.specializationId
	)

	const { openIds, heights, handleOpenDetails, onCardRef } = useAnimatedCards(
		questions,
		currentPage
	)

	return (
		<div className={styles.questionList}>
			<h1 className={styles.title}>
				{!isLoading ? currentSpecialization?.title : <Skeleton type={'item'} />}
			</h1>

			{questions.map(question => {
				const isOpen = openIds.includes(question.id)
				const targetHeight = heights[question.id] || 0

				return !isLoading ? (
					<QuestionCard
						key={question.id}
						question={question}
						onOpenDetails={handleOpenDetails}
						onCardRef={onCardRef}
						isOpen={isOpen}
						isLoading={isLoading}
						targetHeight={targetHeight}
					/>
				) : (
					<Skeleton type={'item'} />
				)
			})}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={onNextPage}
				handlePrevPage={onPrevPage}
				handlePageClick={onPageClick}
			/>
		</div>
	)
}

export default QuestionList
