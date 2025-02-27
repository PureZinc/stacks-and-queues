// Step 1: Create a Queue class
// - Define a class named Queue.
// - Look into the private keyword. Make sure we can initialize a queue of any input type.
// - Initialize the queue in the constructor. Remember, we may need to utilize other data structures here to create the behavior we are looking for.

// Step 2: Implement enqueue method
// - Create a method to add an element to the queue.
// - Add the element to the end of the array.

// Step 3: Implement dequeue method
// - Create a method to remove the first element.
// - If the queue is empty, return null.
// - Otherwise, remove and return the first item.

// Step 4: Implement front method
// - Create a method to return the first element without removing it.
// - If the queue is empty, return null.

// Step 5: Implement isEmpty and size methods
// - Create a method to check if the queue is empty.
// - Create a method to return the number of elements in the queue.

// Step 6: Implement print method
// - Create a method to display the queue elements.
// - Print elements in order, separated by "<-".


export class Queue<T>{
    constructor(
        public list: T[] = []
    ) { }
    
    print() {
        for (const obj of this.list) {
            console.log(obj);
            console.log(' <- ')
        }
    }

    enqueue = (elm: T) => {
        this.list = [...this.list, elm]
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const first = this.front();
        this.list = this.list.slice(1, this.list.length - 1);
        return first;
    }

    front() {
        return this.list[0] || null
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.list.length;
    }
}

// Uncomment The Code Below to See If It Works! Feel free to write more code to test and examine the functionality of the queue.
const queue = new Queue<number>(); // Create a queue that stores numbers
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.print(); // Output: 10 <- 20 <- 30
console.log(queue.dequeue()); // 10
console.log(queue.front()); // 20
console.log(queue.size()); // 2
console.log(queue.isEmpty()); // false
