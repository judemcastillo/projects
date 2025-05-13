class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.array = [...new Set(array)].sort((a, b) => a - b); // Sort and remove duplicates
		this.root = this.buildTree(this.array);
	}

	buildTree(array) {
		if (array.length === 0) return null;

		const mid = Math.floor(array.length / 2);

		const node = new Node(array[mid]);

		node.left = this.buildTree(array.slice(0, mid));
		node.right = this.buildTree(array.slice(mid + 1));

		return node;
	}
	insert(value) {
		const insertRecursively = (node, value) => {
			if (!node) return new Node(value);

			if (value < node.data) {
				node.left = insertRecursively(node.left, value);
			} else if (value > node.data) {
				node.right = insertRecursively(node.right, value);
			}
			// If value is equal, do nothing (no duplicates)
			return node;
		};

		this.root = insertRecursively(this.root, value);
	}
	deleteItem(value) {
		const deleteRecursively = (node, value) => {
			if (!node) return null;

			if (value < node.data) {
				node.left = deleteRecursively(node.left, value);
			} else if (value > node.data) {
				node.right = deleteRecursively(node.right, value);
			} else {
				// Node found
				if (!node.left && !node.right) {
					return null; // No children
				}
				if (!node.left) {
					return node.right; // One child (right)
				}
				if (!node.right) {
					return node.left; // One child (left)
				}

				// Two children: get in-order successor (min of right subtree)
				let successor = node.right;
				while (successor.left) {
					successor = successor.left;
				}
				node.data = successor.data;
				node.right = deleteRecursively(node.right, successor.data);
			}
			return node;
		};

		this.root = deleteRecursively(this.root, value);
	}
	find(value) {
		const searchRecursively = (node, value) => {
			if (!node) return null;

			if (value === node.data) {
				return node;
			} else if (value < node.data) {
				return searchRecursively(node.left, value);
			} else {
				return searchRecursively(node.right, value);
			}
		};

		return searchRecursively(this.root, value);
	}
	levelOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback function is required");
		}

		const queue = [this.root];
		const result = []; // store visited nodes or values

		while (queue.length > 0) {
			const node = queue.shift();
			callback(node); // perform external action
			result.push(node.data); // or push `node` if you want full nodes

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}

		return result;
	}

	inOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback function is required");
		}

		const traverse = (node) => {
			if (!node) return;
			traverse(node.left);
			callback(node);
			traverse(node.right);
		};

		traverse(this.root);
	}
	preOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback function is required");
		}

		const traverse = (node) => {
			if (!node) return;
			callback(node);
			traverse(node.left);
			traverse(node.right);
		};

		traverse(this.root);
	}
	postOrder(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback function is required");
		}

		const traverse = (node) => {
			if (!node) return;
			traverse(node.left);
			traverse(node.right);
			callback(node);
		};

		traverse(this.root);
	}
	height(value) {
		const findNode = (node, value) => {
			if (!node) return null;
			if (value === node.data) return node;
			if (value < node.data) return findNode(node.left, value);
			return findNode(node.right, value);
		};

		const calculateHeight = (node) => {
			if (!node) return -1; // base case: no node
			const leftHeight = calculateHeight(node.left);
			const rightHeight = calculateHeight(node.right);
			return 1 + Math.max(leftHeight, rightHeight);
		};

		const targetNode = findNode(this.root, value);
		if (!targetNode) return null;

		return calculateHeight(targetNode);
	}
	depth(value) {
		let current = this.root;
		let depth = 0;

		while (current) {
			if (value === current.data) {
				return depth;
			}

			current = value < current.data ? current.left : current.right;
			depth++;
		}

		return null; // value not found
	}
	isBalanced() {
		const checkBalance = (node) => {
			if (!node) return { balanced: true, height: -1 };

			const left = checkBalance(node.left);
			const right = checkBalance(node.right);

			const balanced =
				left.balanced &&
				right.balanced &&
				Math.abs(left.height - right.height) <= 1;

			const height = 1 + Math.max(left.height, right.height);

			return { balanced, height };
		};

		return checkBalance(this.root).balanced;
	}
	rebalance() {
		// Helper to do in-order traversal and collect values
		const inOrderCollect = (node, result = []) => {
			if (!node) return result;
			inOrderCollect(node.left, result);
			result.push(node.data);
			inOrderCollect(node.right, result);
			return result;
		};

		const sortedValues = inOrderCollect(this.root);
		this.root = this.buildTree(sortedValues); // rebuild tree from sorted data
	}
}
export { Tree, Node };
