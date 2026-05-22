/**
 * Correct answer keys for all 8 quizzes.
 * Used for server-side score recalculation to prevent client-side manipulation.
 */
const quizAnswers = {
  "arrays": [
    "A) 1, 2",
    "C) Garbage value",
    "A) 5",
    "A) 1",
    "A) O(1)",
    "A) The elements of an array are stored in contiguous memory locations",
    "A) 0",
    "A) 0",
    "A) Address of the first element"
  ],
  "b-tree": [
    "B) A tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.",
    "A) The minimum number of keys a node can contain.",
    "C) 2t",
    "C) Better balance and reduced height.",
    "C) The node is split into two nodes.",
    "A) All leaves are at the same depth.",
    "C) It may require borrowing a key from a sibling or merging nodes.",
    "D) Every node can have an arbitrary number of children.",
    "B) File systems and databases.",
    "B) The height decreases as the order increases."
  ],
  "binary-search-tree": [
    "C) A tree where the left child is less than the parent and the right child is greater.",
    "B) O(log n)"
  ],
  "binary-tree": [
    "B) 1",
    "B) In-order",
    "A) 2^d",
    "B) O(log n)",
    "C) Both A and B.",
    "D) A and B.",
    "A) n",
    "C) Both A and B",
    "D) Reverse in-order traversal",
    "B) O(n)"
  ],
  "queue": [
    "D) Reverses the Q",
    "B) 2",
    "A and B",
    "C) Heap Data Structures like Binary Heap, Fibonacci Heap",
    "C) Both of the above",
    "A) 10, 8, 7, 5, 3, 2, 1",
    "A) n+m <= x < 2n and 2m <= y <= n+m",
    "B) Θ(n + k)",
    "C) Prints first n Fibonacci numbers",
    "D) Shuffle"
  ],
  "queues": [
    "B) Throws an error",
    "C) Efficient use of space",
    "A) 1, 2",
    "D) Both A and B",
    "A) O(1)",
    "D) dequeue",
    "A) Enqueue operation",
    "D) Random Queue",
    "B) Only by priority level",
    "C) 30"
  ],
  "red-black-tree": [
    "A) A binary search tree with additional color properties.",
    "C) Red and Black",
    "B) O(log n)",
    "B) Red nodes cannot have red children.",
    "B) To maintain the balance of the tree.",
    "A) Red",
    "A) By performing rotations and recoloring nodes.",
    "A) Inserting a red node in the left subtree of a left child.",
    "B) The tree is rebalanced.",
    "B) It guarantees O(log n) time complexity for insertions, deletions, and searches."
  ],
  "stack": [
    "A) Prints binary representation of n in reverse order",
    "B) ziuqskeeg",
    "D) (()))()",
    "A) 6, 1",
    "B) top1 + top2 + 1 = MAXSIZE",
    "A) abc × + def ^ ^ -",
    "C) 142",
    "A) 6",
    "C) strictly increasing order",
    "C) 2,1,2,2,1"
  ]
};

module.exports = quizAnswers;
