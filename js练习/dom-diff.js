// vno
class VNode {
	constructor(type, props, children) {
		this.type = type
		this.props = props
		this.children = children
	}
}
// 创建元素
function createElement(type, props, children) {
	return new VNode(type, props, children)
}

function render(element) {
	let el = document.createElement(element.type)
	for(let key in element.props) {
		// 设置属性
		setAttr(el, key, element.props[key])

	}
	// 遍历子节点,如果不是VNode节点，就是文本节点
	element.children.forEach(child => {
		child = (child instanceof VNode) ? render(child) : document.createTextNode(child)
		el.appendChild(child)
	})
	return el
}
// 设置属性
function setAttr(node, key, value) {

	switch (key) {
		case 'value':
			if(node.tagName.toUpperCase() === 'TEXTAREA' || node.tagName.toUpperCase() === 'INPUT') {
				node.value = value
			} else {
				node.setAttribute(key, value)
			}
			break;
		case 'style': 
			node.style.cssText = value
			break;
		default:
			node.setAttribute(key, value)	
	}

}
// 将虚拟dom转化成真实dom
function renderDom(el, target) {
	target.appendChild(el)
}

// 比较两个虚拟dom的区别 ——diff 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom
// 先序深度遍历
function diff(oldTree, newTree) {
	let patches = {}
	let index  = 0

	// 递归树，比较后的结果放到补丁包中
	walk(oldTree, newTree, index, patches)

	return patches
}

// 
function diffAttr(oldAttrs, newAttrs) {
	let patch = {}

	// 遍历老节点属性
	for(let key in oldAttrs) {
		if(oldAttrs[key] !== newAttrs[key]) {
			// 有时候会出现undefined
			patch[key] = newAttrs[key]
		}
	}
	// 遍历新节点属性，可能新节点有新加的属性
	for(let key in newAttrs) {
		if(!oldAttrs.hasOwnProperty(key)) {
			patch[key] = newAttrs[key]
		}
	}

	return patch
}
let Index = 0
function diffChildren(oldChildren, newChildren, patches) {
	// 比较老的第一个和新的第一个
	oldChildren.forEach((child, idx) => {
		// 
		walk(child, newChildren[idx], ++Index, patches)
	})
}

const TEXT = 'TEXT'
const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
function walk(oldNode, newNode, index, patches) {
	// 当前元素的补丁对象
	let currentPatch = []

	if(!newNode) {
		// 新节点被删除
		currentPatch.push({type: REMOVE, index})
	} else if(isString(oldNode) && isString(newNode)) {
		// 判断string类型的字节点
		if(oldNode !== newNode) {
			currentPatch.push({type: TEXT, newNode})
		}
	} else if(oldNode.type === newNode.type) { // 新老节点type相同
		// 比较属性是否有更改
		let attrs = diffAttr(oldNode.props, newNode.props)
		if(Object.keys(attrs).length) {
			currentPatch.push({type: ATTRS, attrs})
		}
		// 如果有儿子节点，遍历儿子
		diffChildren(oldNode.children, newNode.children, patches)
	} else {
		// 说明节点被替换
		currentPatch.push({type: REPLACE, newNode})
	}

	// 如果有补丁，将放入大补丁包中
	if(currentPatch.length) {
		patches[index] = currentPatch
	}

}

function isString(node) {
	return Object.prototype.toString.call(node) === '[object String]'
}

function patch(node, patches) {
	let index = 0 
	// 元素打补丁
}