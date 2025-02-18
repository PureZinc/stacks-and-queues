// BE SURE TO IMPORT YOUR QUEUE CLASS
import { Queue } from "./1-queue";
import { Stack } from "./2-stack";

// ==============================
// 1️⃣ Implement a Recent Calls Counter
// ==============================
// Write a function that counts the number of requests received in the past 3000 milliseconds.
// Use a queue to efficiently track the timestamps of requests.

// Example Test Cases:
// recentCounter.ping(1);    // returns 1
// recentCounter.ping(100);  // returns 2
// recentCounter.ping(3001); // returns 3
// recentCounter.ping(3002); // returns 3

// ==============================
// 2️⃣ First Unique Character in a String
// ==============================
// Given a string `s`, find the **first unique character** and return its index.
// If no unique character exists, return `-1`. Use a queue to efficiently track character order.

// Example Test Cases:
// firstUniqChar("leetcode") // 0
// firstUniqChar("loveleetcode") // 2
// firstUniqChar("aabb") // -1

// ==============================
// 3️⃣ Implement a Stack Using Queues
// ==============================
// Implement a stack using only two queues.
// The implemented stack should support `push`, `pop`, `top`, and `isEmpty` operations.

// Example Test Cases:
// myStack.push(1);
// myStack.push(2);
// myStack.top();    // returns 2
// myStack.pop();    // returns 2
// myStack.isEmpty(); // returns false

// ==============================
// 4️⃣ Rotting Oranges
// ==============================
// Given a 2D grid where `0` is an empty cell, `1` is a fresh orange, and `2` is a rotten orange,
// determine the minimum number of minutes needed for all fresh oranges to rot. Use BFS with a queue.

type OrangeMatrix = Array<Array<0 | 1 | 2>>
const orangesRotting = (orangeMatrix: OrangeMatrix) => {
    class Oranges {
        constructor(
            private matrix: OrangeMatrix
        ) { }
        
        size() {
            return [this.matrix.length, this.matrix[0].length];
        }

        posAsString(row: number, col: number): string {
            return `${this.matrix[row][col]} ${row},${col}`
        }

        getAllRotten() {
            let rotten: string[] = [];
            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[0].length; j++) {
                    if (this.matrix[i][j] === 2) {
                        rotten.push(this.posAsString(i, j));
                    }
                }
            }
            return rotten;
        }

        asAdjacencyList() {
            let adjacencyList = {};
            let [rows, cols] = this.size();
            let directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (this.matrix[r][c] !== 0) {
                        let node = this.posAsString(r, c);
                        adjacencyList[node] = [];

                        for (let [dr, dc] of directions) {
                            let nr = r + dr, nc = c + dc;

                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && this.matrix[nr][nc] !== 0) {
                                let neighbor = this.posAsString(nr, nc);
                                adjacencyList[node].push(neighbor);
                            }
                        }
                    }
                }
            }

            return adjacencyList;
        }

        bfs() {
            const adjacencyList = this.asAdjacencyList();
            const rotten = this.getAllRotten();
            let queue = new Queue(rotten);
            let visited = new Set();
            let distanceList = {};

            for (let orange of rotten) {
                distanceList[orange] = 0;
                visited.add(orange);
            }

            let maxDistance = 0;
            while (queue.size()) {
                let orange = queue.dequeue();

                if (orange) {
                    for (let neighbor of adjacencyList[orange]) {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            queue.enqueue(neighbor);
                            distanceList[neighbor] = distanceList[orange] + 1;
                            maxDistance = Math.max(maxDistance, distanceList[neighbor]);
                        }
                    }
                }
            }

            return [distanceList, maxDistance];
        }
    }  
    const oranges = new Oranges(orangeMatrix);
    return oranges.bfs()[1];
}

// Example Test Cases:
// orangesRotting([[2,1,1],[1,1,0],[0,1,1]]) // 4
// orangesRotting([[2,1,1],[0,1,1],[1,0,1]]) // -1
// orangesRotting([[0,2]]) // 0

// ==============================
// 5️⃣ Sliding Window Maximum
// ==============================
// Given an array `nums` and an integer `k`, return the maximum values in every window of size `k`.
// Use a deque (double-ended queue) to efficiently track the max values.

// Example Test Cases:
// maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3) // [3,3,5,5,6,7]
// maxSlidingWindow([1], 1) // [1]
// maxSlidingWindow([9, 11], 2) // [11]
