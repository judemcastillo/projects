import { Tree } from "./BST.js";

const tree = new Tree([]);
[1, 2, 3, 4, 5, 6, 7].forEach(val => tree.insert(val));

console.log(tree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};
console.log("Binary Search Tree:");
prettyPrint(tree.root);
const values = tree.levelOrder((node) => console.log(""));
console.log("All values:", values);
console.log("Height of 4:", tree.height(4));
console.log("isBalanced:", tree.isBalanced());
console.log("Reblance:",tree.rebalance());
console.log("isBalanced:", tree.isBalanced());
console.log("After rebalancing:");
prettyPrint(tree.root);

// tree.insert(30);
// console.log("After inserting 30:");
// prettyPrint(tree.root);


// console.log("After deleting 8:");
// prettyPrint(tree.root);
