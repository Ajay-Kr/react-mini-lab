import { describe, it, expect } from "vitest";
import { LinkedList } from "../model/LinkedList";


describe("Linked List", () => {
  it("1. creates an empty linked list", () => {
    const list = new LinkedList();

    expect(list.toArray()).toEqual([]);
  });

  it("2. append single node", () => {
    const list = new LinkedList();
    list.append(10);

    expect(list.toArray()).toEqual([10]);
  })
  it("3. append values in order", () => {
    const list = new LinkedList();
    list.append(10);
    list.append(20);
    list.append(30);

    expect(list.toArray()).toEqual([10, 20, 30]);
  });

  it("4. appends null as a valid value", () => {
    const list = new LinkedList();

    list.append(null);

    expect(list.toArray()).toEqual([null]);
  });

  it("5. appends undefined as a valid value", () => {
    const list = new LinkedList();

    list.append(undefined);

    expect(list.toArray()).toEqual([undefined]);
  });

  it("6. new linked list has 0 size", () => {
    const list = new LinkedList();

    expect(list.size).toEqual(0);
  });
  it("6. list with 1 node has size 1", () => {
    const list = new LinkedList();
    list.append(10);

    expect(list.size).toEqual(1);
  });
  it("7. list with 3 nodes have size 3", () => {
    const list = new LinkedList();
    list.append(10);
    list.append(20);
    list.append(30);

    expect(list.size).toEqual(3);
  });
  it("8. calling toArray() doesn't change the size", () => {
    const list = new LinkedList();
    list.append(10);
    list.append(20);

    expect(list.toArray()).toEqual([10, 20]);
    expect(list.size).toEqual(2);
  });

  it("9. empty list should have isEmpty true", () => {
    const list = new LinkedList();

    expect(list.isEmpty).toEqual(true);
  });
  it("10. non empty list should have isEmpty false", () => {
    const list = new LinkedList();
    list.append(10);

    expect(list.isEmpty).toEqual(false);
  });
})