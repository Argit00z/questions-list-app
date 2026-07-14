import Skeleton from '../../ui/Skeleton/Skeleton'
import styles from '../AppSidebar/AppSidebar.module.css'

function AppSidebar({ children, isLoading }) {
	return (
		<div className={styles.mainContainer}>
			{isLoading ? <Skeleton type="item" /> : children}
		</div>
	)
}

export default AppSidebar
