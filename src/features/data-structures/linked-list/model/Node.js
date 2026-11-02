export class Node {
  #item;
  #next;

  constructor(item, next=null) {
    this.#item = item;
    this.#next = next;
  }

  setItem(item) {
    this.#item = item;
  }
  get item() {
    return this.#item;
  }

  setNext(next) {
    this.#next = next;
  }
  get next() {
    return this.#next;
  }
}