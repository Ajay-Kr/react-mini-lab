import { Node } from "./Node";

export class LinkedList {
  #head;
  #length;

  constructor() {
    this.#head = null;
    this.#length = 0;
  }

  append(item) {
    const node = new Node(item);
    if(this.#head === null) {
      this.#head = node;
      this.#length++;
      return;
    } 
    console.log("after head block");
    let current = this.#head;
    while(current.next !== null) {
      current = current.next;
    }
    current.setNext(node);
    this.#length++;
  }

  toArray() {
    const arr = new Array();

    let current = this.#head;
    while(current) {
      arr.push(current.item);
      current = current.next;
    }

    return arr;
  }

  get size() {
    return this.#length;
  }

  get isEmpty() {
    return this.#length === 0;
  }
}