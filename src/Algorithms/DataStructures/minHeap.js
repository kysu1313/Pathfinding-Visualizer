
// Thanks to GeeksForGeeks awesome writeup on minheaps
// for this class https://www.geeksforgeeks.org/implementation-priority-queue-javascript/

class QElement {

    constructor(element, priority){
        this.element = element;
        this.priority = priority;
    }
}

export default class PriorityQueue {

    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        var qElement = new QElement(element, priority);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in queue";
        }
        return this.items[this.items.length - 1];
    }

    remove(item) {
        if (this.isEmpty()) {
            return "Empty list";
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                this.items.splice(i, 1);
            }
        }
    }

    has(item) {
        if (this.isEmpty()) {
            return "empty list";
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                return true;
            }
        }
        return false;
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printPQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++) {
            str += this.items[i].element + " ";
        }
        return str;
    }

}