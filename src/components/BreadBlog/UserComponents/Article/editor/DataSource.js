const emojis = [
	'😀',
	'😃',
	'😄',
	'😁',
	'😆',
	'😅',
	'😂',
	'🤣',
	'🤔',
	'😊',
	'😇',
	'🙂',
	'🙃',
	'😉',
	'😌',
	'😍',
	'🥰',
	'😘',
	'😗',
	'😙',
	'😚',
	'😋',
	'😛',
	'😝',
	'😜',
	'🤪',
	'🤨',
	'🧐',
	'🤓',
	'😎',
	'🤩',
	'🥳',
	'😏',
	'😒',
	'😞',
	'😔',
	'😟',
	'😕',
	'🙁',
	'👻',
	'😣',
	'😖',
	'😫',
	'😩',
	'🥺',
	'😢',
	'😭',
	'😤',
	'😠',
	'😡',
	'🤬',
	'🤯',
	'😳',
	'👀',
	'👍',
	'🙏',
	'🤏',
	'👌',
	'👈',
	'👉',
	'❤',
	'⭕',
	'❌',


];
const MarkDownExtension = {
	name: 'MarkExtension',
	level: 'inline',
	start: (text) => text.match(/@[^@]/)?.index,
	tokenizer(text) {
		const reg = /^@([^@]*)@/;
		const match = reg.exec(text);

		if (match) {
			const token = {
				type: 'MarkExtension',
				raw: match[0],
				text: match[1].trim(),
				tokens: []
			};

			return token;
		}
	},
	renderer(token) {
		return `<mark>${token.text}</mark>`;
	}
};

const toolbars = [
	'bold',
	'underline',
	'italic',
	'strikeThrough',
	'-',
	'title',
	'sub',
	'sup',
	'quote',
	'unorderedList',
	'orderedList',
	'-',
	'codeRow',
	'code',
	'link',
	// 'image',
	'table',
	'mermaid',
	'katex',
	'标记',
	"emoji",
	0,
	1,
	'-',
	'revoke',
	'next',
	// 'save',
	'=',
	'prettier',
	// 'pageFullscreen',
	// 'fullscreen',
	'preview',
	'htmlPreview',
	'catalog',
	// 'github'
]
export {MarkDownExtension,emojis,toolbars}