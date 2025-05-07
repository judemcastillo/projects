import { HashMap } from './hashMap.js'; // Assuming your HashMap class is exported

class HashSet {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.map = new HashMap(capacity, loadFactor);
	}

	add(key) {
		this.map.set(key, true); // Value doesn't matter
	}

	has(key) {
		return this.map.get(key) !== undefined;
	}

	delete(key) {
		return this.map.remove(key); // Return true if deleted, false otherwise
	}

	clear() {
		this.map = new HashMap(); // Reinitialize
	}

	size() {
		return this.map.size;
	}

	values() {
		const keys = [];
		for (let bucket of this.map.buckets) {
			if (bucket !== null) {
				let current = bucket.head;
				while (current) {
					keys.push(current.value[0]); // Push the key
					current = current.next;
				}
			}
		}
		return keys;
	}
}
