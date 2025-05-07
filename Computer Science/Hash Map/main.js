import { HashMap } from "./hashMap.js";

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("HashMap Size(before resize): ", test.length());
console.log("HashMap Capacity(before resize): ", test.capacity);
console.log("Entries: ", JSON.stringify(test.entries()));
// console.log("Hat key:", test.get("hat"));
console.log("Values:", test.values());
console.log("Keys:", test.keys());
test.set('dragon', 'silver')

console.log("HashMap Size(after resize): ", test.length());
console.log("HashMap Capacity(after resize): ", test.capacity);
console.log("Entries: ", JSON.stringify(test.entries()));
console.log("remove:", test.remove('lion'));
console.log("HashMap Size(after resize): ", test.length());
console.log("HashMap Capacity(after resize): ", test.capacity);