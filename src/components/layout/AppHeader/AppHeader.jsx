import { NavLink } from 'react-router'
import logo from '../../../assets/images/logo.svg'
import styles from './AppHeader.module.css'

function AppHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.main}>
				<div className={styles.left}>
					<div className={styles.logo}>
						<NavLink
							to="/"
							className={styles.navItem}
						>
							<img
								src={logo}
								alt="logo"
								width={172}
								className={styles.logoImage}
							/>
						</NavLink>
					</div>
					<nav className={styles.nav}>
						<NavLink
							to="/questions"
							className={styles.navItem}
						>
							База вопросов
						</NavLink>
					</nav>
				</div>
				<div className={styles.right}>
					<a
						href="/"
						className={styles.loginLink}
					>
						Вход
					</a>
					<button className={styles.button}>Регистрация</button>
				</div>
			</div>
		</header>
	)
}

export default AppHeader
