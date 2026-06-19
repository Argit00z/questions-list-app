import figma from '../../../assets/images/figma.svg'
import github from '../../../assets/images/github.svg'
import logo from '../../../assets/images/logo_white.svg'
import telegram from '../../../assets/images/telegram.svg'
import tiktok from '../../../assets/images/tiktok.svg'
import youtube from '../../../assets/images/youtube.svg'
import styles from '../AppFooter/AppFooter.module.css'

function AppFooter() {
	return (
		<footer className={styles.footer}>
			<div className={styles.main}>
				<div className={styles.top}>
					<img
						src={logo}
						alt="logo"
					/>
					<h1>Выбери, каким будет IT завтра, вместе с нами</h1>
					<p className={styles.text}>
						YeaHub — это полностью открытый проект, призванный объединить и
						улучшить IT-сферу. Наш исходный код доступен для просмотра на
						GitHub. Дизайн проекта также открыт для ознакомления в Figma.
					</p>
				</div>
				<div className={styles.bottom}>
					<div className={styles.left}>
						<p>© 2024 YeaHub</p>
						<p>Документы</p>
					</div>
					<div className={styles.right}>
						<p>Ищите нас и в других соцсетях @yeahub_it</p>
						<div className={styles.socialLinks}>
							<a href="">
								<img src={figma} />
							</a>
							<a href="">
								<img src={telegram} />
							</a>
							<a href="">
								<img src={youtube} />
							</a>
							<a href="">
								<img src={tiktok} />
							</a>
							<a href="">
								<img src={github} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default AppFooter
