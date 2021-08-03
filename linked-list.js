/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      let placeholder = this.head;
      this.head = newNode;
      newNode.next = placeholder;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) return null;
    else if (this.length === 1) {
      let popNode = this.tail;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return popNode.val;
    }
    else {
      let popNode = this.tail;
      this.tail = this._getNodeAt(this.length - 2);
      this.tail.next = null;
      this.length -= 1;
      return popNode.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) return null;
    else if (this.length === 1) {
      let shiftedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return shiftedNode.val;
    }
    else {
      let shiftedNode = this.head;
      this.head = this.head.next;
      this.length -= 1;
      return shiftedNode.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (this.length === 0 || idx < 0 || idx >= this.length) return null;
    else return this._getNodeAt(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (this.length === 0 || idx < 0 || idx >= this.length) throw new Error("ERROR: LIST CANNOT BE EMPTY");
    else this._getNodeAt(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) this.unshift(val);
    else if (idx === this.length) this.push(val);
    else if (idx < 0 || idx > this.length) throw new Error("ERROR: INDEX IS OUT OF BOUNDS");
    else {
      let nodeBefore = this._getNodeAt(idx - 1);
      let nodeAfter = nodeBefore.next;
      let newNode = new Node(val);
      nodeBefore.next = newNode;
      newNode.next = nodeAfter;
      this.length += 1;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length === 0 || idx < 0 || idx >= this.length) throw new Error("ERROR: INDEX IS OUT OF BOUNDS");
    else if (idx === 0) return this.shift(idx);
    else if (idx === this.length - 1) return this.pop();
    else {
      let nodeBefore = this._getNodeAt(idx - 1);
      let nodeAfter = nodeBefore.next.next;
      let targetNode = nodeBefore.next;
      nodeBefore.next = nodeAfter;
      this.length -= 1;
      return targetNode.val;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    else if (this.length === 1) return this.head.val;
    else {
      let sum = 0;
      let targetNode = this.head;
      for (let i = 0; i < this.length; i++) {
        sum += targetNode.val;
        if (i < this.length - 1) targetNode = targetNode.next;
      }
      return sum / this.length;
    }
  }

module.exports = LinkedList;
