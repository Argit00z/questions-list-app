import styles from './Pagination.module.css'

function Pagination({ totalPages }) {
	return (
		<div className={styles.pagination}>
			<button>{'<'}</button>
			<div>
				{[...Array(totalPages)].map((_, index) => {
					return <button key={index}>{index + 1}</button>
				})}
			</div>
			<button>{'>'}</button>
		</div>
	)
}

export default Pagination
