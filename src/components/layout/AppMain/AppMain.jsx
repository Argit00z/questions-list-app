import { Outlet } from 'react-router'
import styles from '../AppMain/AppMain.module.css'

function AppMain() {
	return (
		<div className={styles.container}>
			<Outlet />
		</div>
	)
}

export default AppMain
