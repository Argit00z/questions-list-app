import logo from '../../../assets/images/logo.svg'
import styles from './AppHeader.module.css'

function AppHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.main}>
				<div className={styles.left}>
					<div className={styles.logo}>
						<img
							src={logo}
							alt="logo"
							width={172}
							className={styles.logoImage}
						/>
					</div>
					<nav className={styles.nav}>
						<ul className={styles.headerList}>
							<li className={styles.navItem}>База вопросов</li>
							<li className={styles.navItem}>Тренажер</li>
							<li className={styles.navItem}>Материалы</li>
							<li className={styles.navItem}>Навыки (hh)</li>
						</ul>
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
