import { LinkedList, Node } from "../Linked List/linked-list.js";

export class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.size = 0;
		this.loadFactor = loadFactor;
		this.capacity = capacity;
		this.buckets = Array(this.capacity).fill(null);
	}

	errorBucket(index) {
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}
	}

	hash(key, capacity = this.capacity) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
		}
		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);
		this.errorBucket(index);

		// Initialize linked list at bucket if not present
		if (this.buckets[index] === null) {
			this.buckets[index] = new LinkedList();
		}

		let current = this.buckets[index].head;
		while (current) {
			if (current.value[0] === key) {
				current.value[1] = value; // Update value if key exists
				return;
			}
			current = current.next;
		}

		// Key not found, prepend new node with [key, value]
		this.buckets[index].prepend([key, value]);
		this.size++;

		if (this.size / this.capacity > this.loadFactor) {
			this.resize();
		}
	}

	resize() {
		const newCapacity = this.capacity * 2;
		const newBuckets = Array(newCapacity).fill(null);

		for (let i = 0; i < this.buckets.length; i++) {
			const list = this.buckets[i];
			if (list !== null) {
				let current = list.head;
				while (current) {
					const [key, value] = current.value;
					const index = this.hash(key, newCapacity);
					if (newBuckets[index] === null) {
						newBuckets[index] = new LinkedList();
					}
					newBuckets[index].prepend([key, value]);
					current = current.next;
				}
			}
		}

		this.buckets = newBuckets;
		this.capacity = newCapacity;
	}

	get(key) {
		const index = this.hash(key);
		this.errorBucket(index);

		const list = this.buckets[index];
		if (list === null) return null;

		let current = list.head;
		while (current) {
			if (current.value[0] === key) {
				return current.value[1];
			}
			current = current.next;
		}
		return null;
	}

	has(key) {
		const index = this.hash(key);
		this.errorBucket(index);

		const list = this.buckets[index];
		if (list === null) {
			return false;
		}

		let current = list.head;
		while (current) {
			if (current.value[0] === key) {
				return true;
			}
			current = current.next;
		}
		return false;
	}
	remove(key) {
		const index = this.hash(key);
		this.errorBucket(index);

		const list = this.buckets[index];
		if (list === null) return false;

		let current = list.head;
		let previous = null;

		while (current) {
			if (current.value[0] === key) {
				if (previous) {
					previous.next = current.next;
				} else {
					list.head = current.next;
				}
				if (current === list.tail) {
					list.tail = previous;
				}
				this.size--;
				return true;
			}
			previous = current;
			current = current.next;
		}

		return false; // Key not found
	}
	length() {
		return this.size;
	}
	clear() {
		this.buckets = Array(this.capacity).fill(null);
		this.size = 0;
	}
	keys() {
		const keysArray = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const list = this.buckets[i];
			if (list !== null) {
				let current = list.head;
				while (current) {
					keysArray.push(current.value[0]);
					current = current.next;
				}
			}
		}
		return keysArray;
	}
	values() {
		const valuesArray = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const list = this.buckets[i];
			if (list !== null) {
				let current = list.head;
				while (current) {
					valuesArray.push(current.value[1]);
					current = current.next;
				}
			}
		}
		return valuesArray;
	}
	entries() {
		const entriesArray = [];
		for (let i = 0; i < this.buckets.length; i++) {
			const list = this.buckets[i];
			if (list !== null) {
				let current = list.head;
				while (current) {
					entriesArray.push(current.value);
					current = current.next;
				}
			}
		}
		return entriesArray;
	}
}
