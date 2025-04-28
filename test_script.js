// 测试脚本 - 用于诊断GitHub页面结构
// 在GitHub页面的浏览器控制台中运行这段代码

function testGitHubStructure() {
	console.log('=== GitHub页面结构测试开始 ===')

	// 1. 检查当前URL
	console.log('当前URL:', window.location.href)

	// 2. 检查是否是仓库页面
	const path = window.location.pathname.substring(1).split('/')
	console.log('路径部分:', path)

	if (path.length < 2) {
		console.log('不是仓库页面 - 路径段太少')
	} else {
		console.log('可能的仓库信息:', {
			owner: path[0],
			repo: path[1]
		})
	}

	// 3. 测试各种可能的插入点选择器
	const selectors = [
		'a[href*="readme-ov-file"]',
		'a[href*="README"]',
		'a[href*="readme"]',
		'.file-navigation',
		'.d-flex.mb-3',
		'nav.js-repo-nav',
		'a[href*="star"]',
		'.starred',
		'.unstarred',
		'.pagehead-actions',
		'.repository-content'
	]

	selectors.forEach((selector) => {
		const elements = document.querySelectorAll(selector)
		console.log(`选择器 "${selector}": 找到 ${elements.length} 个元素`)

		if (elements.length > 0) {
			console.log('第一个匹配元素:', elements[0])
		}
	})

	// 4. 尝试找到任何可能的按钮容器
	const possibleContainers = document.querySelectorAll(
		'.d-flex, .pagehead-actions, .file-navigation'
	)
	console.log(`可能的按钮容器: 找到 ${possibleContainers.length} 个元素`)

	// 5. 检查是否有任何DeepWiki相关元素
	const deepWikiElements = Array.from(document.querySelectorAll('*')).filter(
		(el) =>
			(el.id && el.id.includes('deepwiki')) ||
			(el.className && el.className.includes('deepwiki'))
	)

	console.log(`已存在的DeepWiki相关元素: ${deepWikiElements.length}个`)
	deepWikiElements.forEach((el) => console.log(el))

	console.log('=== GitHub页面结构测试结束 ===')
}

// 执行测试
testGitHubStructure()

// 提示: 在GitHub仓库页面打开开发者工具控制台(F12)，粘贴并运行此代码
