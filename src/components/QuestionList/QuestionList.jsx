import { useAnimatedCards } from '../../hooks/useAnimatedCards'
import QuestionCard from '../QuestionList/QuestionCard/QuestionCard'
import styles from '../QuestionList/QuestionList.module.css'
import Pagination from '../ui/Pagination/Pagination'
import Skeleton from '../ui/Skeleton/Skeleton'
import EmptyState from './EmptyState/EmptyState'

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

	if (isLoading) {
		return (
			<div className={styles.questionList}>
				<h1 className={styles.title}>
					<Skeleton type="item" />
				</h1>
				<Skeleton
					count={5}
					type="item"
				/>
			</div>
		)
	}

	if (questions.length === 0) {
		return (
			<div className={styles.questionList}>
				<h1 className={styles.title}>
					{currentSpecialization?.title || 'Вопросы'}
				</h1>
				<EmptyState />
			</div>
		)
	}

	return (
		<div className={styles.questionList}>
			<h1 className={styles.title}>{currentSpecialization?.title}</h1>

			{questions.map(question => {
				const isOpen = openIds.includes(question.id)
				const targetHeight = heights[question.id] || 0

				return (
					<QuestionCard
						key={question.id}
						question={question}
						onOpenDetails={handleOpenDetails}
						onCardRef={onCardRef}
						isOpen={isOpen}
						isLoading={isLoading}
						targetHeight={targetHeight}
					/>
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
