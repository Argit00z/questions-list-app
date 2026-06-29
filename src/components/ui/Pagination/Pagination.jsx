import arrowLeft from '../../../assets/images/arrow_left.svg'
import arrowRight from '../../../assets/images/arrow_right.svg'
import styles from './Pagination.module.css'

function Pagination({
	totalPages,
	currentPage,
	handleNextPage,
	handlePrevPage,
	handlePageClick
}) {
	const getPaginationRange = () => {
		const siblingCount = 2
		const totalPageNumbers = siblingCount + 5

		if (totalPageNumbers >= totalPages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPages - 2

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount
			let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
			return [...leftRange, '...', totalPages]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount
			let rightRange = Array.from(
				{ length: rightItemCount },
				(_, i) => totalPages - rightItemCount + i + 1
			)
			return [1, '...', ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = Array.from(
				{ length: rightSiblingIndex - leftSiblingIndex + 1 },
				(_, i) => leftSiblingIndex + i
			)
			return [1, '...', ...middleRange, '...', totalPages]
		}
	}

	const paginationRange = getPaginationRange()

	return (
		<div className={styles.pagination}>
			<button
				onClick={handlePrevPage}
				className={styles.arrow}
				disabled={currentPage <= 1}
			>
				<img
					width={20}
					height={20}
					src={arrowLeft}
					alt="Назад"
				/>
			</button>

			<div className={styles.list}>
				{paginationRange?.map((pageNumber, index) => {
					if (pageNumber === '...') {
						return (
							<span
								key={`dots-${index}`}
								className={styles.dots}
							>
								...
							</span>
						)
					}

					const isActive = pageNumber === currentPage

					return (
						<button
							key={pageNumber}
							onClick={() => handlePageClick(pageNumber)}
							className={`${styles.pageNumber} ${isActive ? styles.active : ''}`}
						>
							{pageNumber}
						</button>
					)
				})}
			</div>
			<button
				onClick={handleNextPage}
				className={styles.arrow}
				disabled={currentPage >= totalPages}
			>
				<img
					width={20}
					height={20}
					src={arrowRight}
					alt="Вперед"
				/>
			</button>
		</div>
	)
}

export default Pagination
