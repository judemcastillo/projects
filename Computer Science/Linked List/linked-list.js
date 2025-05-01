class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}
class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	append(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
	}
	prepend(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length++;
	}
	size() {
		return this.length;
	}
	head() {
		return this.head;
	}
	tail() {
		return this.tail;
	}
	at(index) {
		if (index < 0 || index >= this.length) {
			return null;
		}
		let current = this.head;
		for (let i = 0; i < index; i++) {
			current = current.next;
		}
		return current;
	}
	pop() {
		if (!this.head) {
			return null; // List is empty
		}

		if (this.length === 1) {
			const removedNode = this.head;
			this.head = null;
			this.tail = null;
			this.length--;
			return removedNode;
		}

		// Traverse to the second-to-last node
		let current = this.head;
		while (current.next !== this.tail) {
			current = current.next;
		}

		const removedNode = this.tail;
		current.next = null;
		this.tail = current;
		this.length--;
		return removedNode;
	}
	contains(value) {
		let current = this.head;
		while (current) {
			if (current.value === value) {
				return true;
			}
			current = current.next;
		}
		return false;
	}
	find(value) {
		let current = this.head;
		let index = 0;
		while (current) {
			if (current.value === value) {
				return index;
			}
			current = current.next;
			index++;
		}
		return -1; // Not found
	}
	toString() {
		let current = this.head;
		let result = "";
		while (current) {
			result += `(${current.value}) -> `;
			current = current.next;
		}
		result += "null";
		return result;
	}
	// Extra Credit
	insertAt(value, index) {
		if (index < 0 || index > this.length) {
			return false; // Invalid index
		}
		if (index === 0) {
			this.prepend(value);
			return true;
		}
		if (index === this.length) {
			this.append(value);
			return true;
		}
		const newNode = new Node(value);
		let current = this.head;
		for (let i = 0; i < index - 1; i++) {
			current = current.next;
		}
		newNode.next = current.next;
		current.next = newNode;
		this.length++;
		return true;
	}
	removeAt(index) {
		if (index < 0 || index >= this.length) {
			return false;
		}

		if (index === 0) {
			const removedNode = this.head;
			this.head = this.head.next;
			if (this.length === 1) this.tail = null;
			this.length--;
			return removedNode;
		}

		let current = this.head;
        
		for (let i = 0; i < index - 1; i++) {
			current = current.next;
		}
		console.log("Current Node:", current);
		const removedNode = current.next;
		current.next = removedNode.next;

		if (index === this.length - 1) {
			this.tail = current;
		}

		this.length--;
		console.log("removed node:", removedNode);
		return removedNode;
	}
}
export { Node, LinkedList };
