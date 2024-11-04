---
id: stack-permutation 
title: Stack Permutation 
sidebar_label: Stack Permutation 
description: "A stack permutation is a reordering of an input sequence that can be achieved using a single stack with push and pop operations."  
tags: [dsa, algorithms, stack]
---

### Definition:
A stack permutation is a permutation of objects in the given input queue which is done by transferring elements from the input queue to the output queue with the help of a stack and the built-in push and pop functions.

The rules are: 
- Only dequeue from the input queue.
- Use inbuilt push, and pop functions in the single stack.
- Stack and input queue must be empty at the end.
- Only enqueue to the output queue.

### Problem Statement:
Given two integer arrays, `input` and `output`, each containing unique elements and both of the same length `n`, determine if it is possible to achieve the output sequence using only stack operations on the input sequence. In other words, we start with the input array and can perform a series of stack operations: we may push elements from input onto a stack in their original order and pop them off the stack to match the output sequence. The task is to write a program that checks if the output sequence is a valid stack permutation of the input sequence. If it's possible to generate the output using these stack operations, print "Yes"; otherwise, print "No"

### Algorithm Steps:

1. Initialize an empty stack to hold elements temporarily.
2. Push each element from the input sequence onto the stack.
3. Whenever the stack's top matches the next element in the output sequence, pop it from the stack.
4. If all elements are matched and the stack is empty at the end, the output is a valid stack permutation; otherwise, it is not.

### Steps Involved:
1. **Input Arrays:** The program receives `input` and `output` arrays, which are both of the same length and contain unique elements.                     

2. **Function `isStackPermutation`:** This function checks if `output` is a valid stack permutation of `input`.                                         

    *Step 2.1:* A `stack<int>` is initialized to simulate stack operations, and it uses standard stack operations with C++'s inbuilt `push()` and `pop()` methods.                                              
    *Step 2.2:* The variable `j` tracks the current index of the `output` array.                       
3. **Iterate through `input`:** The loop processes each element in `input`:

    *Step 3.1:* Each element from `input` is pushed onto the stack.                                      
    *Step 3.2:* If the stack’s top matches the next element in `output`, it’s popped from the stack, and the index `j` is incremented to move to the next element in `output`.
4. **Result Check:** After processing all elements in input, the program checks if all elements in `output` have been matched. If `j` equals `n` (the length of output), the function returns `true`; otherwise, it returns `false`.

5. **Main Function:** The `main` function tests the `isStackPermutation` function with sample arrays and outputs "Yes" if `output` is achievable from `input` using stack operations, and "No" otherwise.


### Time Complexity:
- The time complexity of this solution is `O(n)`, where `n` is the number of elements in the input (or output) array. This is because we iterate through each element in the input array once, pushing each onto the stack. Each element can only be popped from the stack once when it matches the next element in the output array, so the number of push and pop operations is limited to
`2n` (one push and one pop per element at most). Thus, the algorithm efficiently completes the check in linear time.

### Sample Input:
int input[] = {1, 2, 3};                                              
int output[] = {2, 1, 3};           

### Sample Output:
Yes, it is a stack permutation.

### Explanation of Sample:

- Push 1 and 2 from input onto the stack. The stack now contains {1, 2}.
- Pop 2 and 1 from the stack since they match the first two elements of output. The stack is now empty.
- Push 3 from input onto the stack, then pop 3 as it matches the next element in output.
- All elements in output have been matched, and the stack is empty, confirming that {2, 1, 3} is a valid stack permutation of {1, 2, 3}.

### C++ Implementation:
```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to check if the given output is a stack permutation of input
bool isStackPermutation(int input[], int output[], int n) {
    stack<int> st;
    int j = 0;

    for (int i = 0; i < n; i++) {
        // Push the current element of the input array to the stack
        st.push(input[i]);

        // Check if the top of the stack matches the output array
        while (!st.empty() && st.top() == output[j]) {
            st.pop();
            j++;
        }
    }

    // If j has reached n, then output is a valid permutation
    return (j == n);
}

int main() {
    int input[] = {1, 2, 3};
    int output[] = {2, 1, 3};
    int n = sizeof(input) / sizeof(input[0]);

    if (isStackPermutation(input, output, n))
        cout << "Yes, it is a stack permutation" << endl;
    else
        cout << "No, it is not a stack permutation" << endl;

    return 0;
}


```

### Python Implementation:
```python
def is_stack_permutation(input, output):
    stack = []
    j = 0
    n = len(input)

    for i in range(n):
        # Push the current element of the input array to the stack
        stack.append(input[i])

        # Check if the top of the stack matches the output array
        while stack and stack[-1] == output[j]:
            stack.pop()
            j += 1

    # If j has reached n, then output is a valid permutation
    return j == n

if __name__ == "__main__":
    input = [1, 2, 3]
    output = [2, 1, 3]

    if is_stack_permutation(input, output):
        print("Yes, it is a stack permutation")
    else:
        print("No, it is not a stack permutation")
```


