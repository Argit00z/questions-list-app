import { useEffect, useState } from 'react'
import icon from '../../../assets/images/loupe.svg'
import { useDebounce } from '../../../hooks/useDebounce'
import styles from '../InputWrapper/InputWrapper.module.css'

function InputWrapper({ value, onChange }) {
	const [localValue, setLocalValue] = useState(value)

	const debouncedSearchTerm = useDebounce(localValue, 500)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLocalValue(value)
	}, [value])

	useEffect(() => {
		onChange('search', debouncedSearchTerm)
	}, [debouncedSearchTerm, onChange])

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
