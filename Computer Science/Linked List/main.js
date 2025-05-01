import { LinkedList } from "./linked-list.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log("List size:", list.size());
console.log("Tail:", list.tail.value);
console.log(list.toString());
console.log("insert at index 6:", list.insertAt("dragon",6));
console.log("remove at index 2:", list.removeAt(2));
console.log(list.toString());