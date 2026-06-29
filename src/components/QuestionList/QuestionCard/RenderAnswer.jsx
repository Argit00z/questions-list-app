import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { memo, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function extractText(node) {
	if (!node) return ''

	if (node.type === 'text') {
		return node.data || ''
	}

	if (node.children) {
		return node.children.map(extractText).join('')
	}

	return ''
}

function normalizeLanguage(className = '', code = '') {
	const match = className.match(/language-([^\s]+)/)
	let language = match?.[1] || ''

	if (language === 'typescriptreact') return 'tsx'
	if (language === 'javascriptreact') return 'jsx'
	if (language === 'html') return 'markup'
	if (language === 'css') return 'css'
	if (language === 'javascript') return 'javascript'
	if (language === 'typescript') return 'typescript'

	if (
		code.includes('const ') ||
		code.includes('function ') ||
		code.includes('=>') ||
		code.includes('return ')
	) {
		return 'javascript'
	}

	if (code.includes('<') && code.includes('>')) {
		return 'markup'
	}

	return 'javascript'
}

export default memo(function RenderAnswer({ answer }) {
	const parsedAnswer = useMemo(() => {
		const cleanHtml = DOMPurify.sanitize(answer || '')

		return parse(cleanHtml, {
			replace: node => {
				if (node.type !== 'tag' || node.name !== 'pre') return

				const codeNode = node.children?.find(
					child => child.type === 'tag' && child.name === 'code'
				)

				if (!codeNode) return

				const code = extractText(codeNode)
				const language = normalizeLanguage(codeNode.attribs?.class || '', code)

				return (
					<SyntaxHighlighter
						language={language}
						style={oneDark}
						customStyle={{
							margin: '16px 0',
							borderRadius: '12px',
							padding: '16px',
							fontSize: '14px'
						}}
					>
						{code}
					</SyntaxHighlighter>
				)
			}
		})
	}, [answer])

	return parsedAnswer
})
