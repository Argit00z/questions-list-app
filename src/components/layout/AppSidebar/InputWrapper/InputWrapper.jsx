import { useEffect, useState } from 'react'
import icon from '../../../../assets/images/loupe.svg'
import styles from '../InputWrapper/InputWrapper.module.css'

function InputWrapper({ value, onChange }) {
	const [localValue, setLocalValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			onChange('search', localValue)
		}, 500)

		return () => clearTimeout(timer)
	}, [localValue])

	return (
		<div className={styles.inputWrapper}>
			<img
				className={styles.searchIcon}
				src={icon}
				alt=""
			/>
			<input
				className={styles.input}
				placeholder="Введите вопрос…"
				value={localValue}
				onChange={e => setLocalValue(e.target.value)}
			/>
		</div>
	)
}

export default InputWrapper
