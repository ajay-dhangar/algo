---
title: Recursion Fundamentals Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Recursion Fundamentals Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What is Recursion?**
   - A) A loop that runs a fixed number of times
   - B) A technique where a function calls itself, directly or indirectly, to solve a problem
   - C) A data structure used to store function calls
   - D) A method of sorting an array  
   **Answer:** B) A technique where a function calls itself, directly or indirectly, to solve a problem  
   **Explanation:** Recursion is a programming technique in which a function solves a problem by calling itself with a smaller or simpler version of the same problem, until it reaches a condition that stops the recursive calls.

2. **What is a 'Base Case' in recursion?**
   - A) The first call made to the recursive function
   - B) A condition that stops the recursive calls, preventing infinite recursion
   - C) The most complex case the function can handle
   - D) A case that always causes an error  
   **Answer:** B) A condition that stops the recursive calls, preventing infinite recursion  
   **Explanation:** The base case is the condition under which the function returns a result directly without making further recursive calls. Without a base case, recursion would continue indefinitely, eventually causing a stack overflow.

3. **What is the 'Recursive Case' in a recursive function?**
   - A) The part of the function that handles the simplest possible input
   - B) The part where the function calls itself with a modified (typically smaller) input, moving toward the base case
   - C) An error condition that must be avoided
   - D) A case where the function never returns  
   **Answer:** B) The part where the function calls itself with a modified (typically smaller) input, moving toward the base case  
   **Explanation:** The recursive case defines how the problem is broken down into a smaller subproblem and calls the function again on that subproblem, gradually approaching the base case.

4. **What data structure does the system use internally to manage recursive function calls?**
   - A) Queue
   - B) Call Stack
   - C) Hash Table
   - D) Heap (priority queue)  
   **Answer:** B) Call Stack  
   **Explanation:** Each recursive call is pushed onto the call stack, storing its local variables and return address. When a call returns, its frame is popped off the stack. This is why excessive recursion depth can cause a 'stack overflow.'

5. **What happens if a recursive function has no base case, or the base case is never reached?**
   - A) The function automatically optimizes itself
   - B) The function call stack grows indefinitely, eventually causing a stack overflow error
   - C) The function simply returns null after one call
   - D) Nothing unusual happens; it behaves like a normal loop  
   **Answer:** B) The function call stack grows indefinitely, eventually causing a stack overflow error  
   **Explanation:** Without a reachable base case, the function keeps calling itself, continuously pushing new frames onto the call stack until the stack's memory limit is exceeded, resulting in a stack overflow.

6. **What is the time complexity of a recursive function that computes the nth Fibonacci number using the naive approach (two recursive calls per invocation, no memoization)?**
   - A) O(n)
   - B) O(n log n)
   - C) O(2ⁿ)
   - D) O(log n)  
   **Answer:** C) O(2ⁿ)  
   **Explanation:** The naive recursive Fibonacci makes two recursive calls per invocation (fib(n-1) and fib(n-2)) without caching results, leading to exponential growth in the number of calls — approximately O(2ⁿ) time complexity due to massive redundant recomputation.

7. **What is 'Tail Recursion'?**
   - A) A recursive call that occurs at the very beginning of a function
   - B) A recursive call that is the last operation performed in a function, with no pending work after it returns
   - C) A function that never calls itself
   - D) A recursive function with multiple base cases  
   **Answer:** B) A recursive call that is the last operation performed in a function, with no pending work after it returns  
   **Explanation:** In tail recursion, the recursive call is the final action in the function — nothing happens after it returns. This allows some compilers/interpreters to optimize it into an iterative loop (tail call optimization), avoiding additional stack frames.

8. **What is the space complexity of a recursive function with maximum recursion depth d, assuming O(1) space is used per call frame (excluding the recursive calls themselves)?**
   - A) O(1)
   - B) O(d)
   - C) O(d²)
   - D) O(log d)  
   **Answer:** B) O(d)  
   **Explanation:** Each active recursive call occupies a frame on the call stack. If the maximum depth of recursion is d, then at most d frames exist simultaneously, giving a space complexity of O(d), even if each frame itself only uses constant extra space.

9. **Which of the following problems is most naturally and commonly solved using recursion?**
   - A) Adding two numbers together
   - B) Traversing a tree structure (e.g., inorder traversal of a binary tree)
   - C) Printing a single string to the console
   - D) Checking if a number is even or odd  
   **Answer:** B) Traversing a tree structure (e.g., inorder traversal of a binary tree)  
   **Explanation:** Tree traversal is a classic example where recursion shines: each subtree is itself a smaller tree, so the same traversal logic naturally applies recursively to left and right children until reaching null (the base case).

10. **How does 'memoization' improve the efficiency of a recursive algorithm, and what is its effect on the time complexity of naive recursive Fibonacci?**
   - A) It has no effect on time complexity, only on code readability
   - B) Memoization caches results of previously computed subproblems, reducing recursive Fibonacci's time complexity from O(2ⁿ) to O(n)
   - C) Memoization always increases time complexity due to caching overhead
   - D) Memoization eliminates the need for a base case  
   **Answer:** B) Memoization caches results of previously computed subproblems, reducing recursive Fibonacci's time complexity from O(2ⁿ) to O(n)  
   **Explanation:** Memoization stores the result of each subproblem (e.g., fib(k)) the first time it's computed, and returns the cached value on subsequent calls instead of recomputing. This eliminates redundant work, transforming exponential O(2ⁿ) recursion into linear O(n) time (at the cost of O(n) extra space for the cache).

11. **What is the relationship between recursion and the 'divide and conquer' algorithmic paradigm, and which complexity class do many divide-and-conquer algorithms (like Merge Sort) fall into?**
   - A) Divide and conquer never uses recursion
   - B) Divide and conquer algorithms typically use recursion to split a problem into smaller subproblems, solve them recursively, and combine results — many such algorithms (e.g., Merge Sort) achieve O(n log n)
   - C) All recursive algorithms are automatically O(n log n)
   - D) Divide and conquer always results in O(n²) complexity  
   **Answer:** B) Divide and conquer algorithms typically use recursion to split a problem into smaller subproblems, solve them recursively, and combine results — many such algorithms (e.g., Merge Sort) achieve O(n log n)  
   **Explanation:** Divide and conquer relies on recursion to break a problem into smaller independent subproblems, solve each recursively, then merge the results. Merge Sort, for example, recursively splits the array in half (log n levels) and does O(n) work merging at each level, yielding O(n log n) overall — captured precisely by the Master Theorem for recurrence relations.

12. **Why might converting a recursive algorithm into an iterative one (using an explicit stack or loop) be preferred in production systems, despite recursion being more elegant?**
   - A) Iterative solutions are always asymptotically faster in Big-O terms
   - B) Iterative solutions avoid the risk of stack overflow from excessive call depth and can reduce function-call overhead, which matters for very deep recursion or performance-critical code
   - C) Recursive solutions cannot be correctly implemented in most languages
   - D) There is never a reason to prefer iteration over recursion  
   **Answer:** B) Iterative solutions avoid the risk of stack overflow from excessive call depth and can reduce function-call overhead, which matters for very deep recursion or performance-critical code  
   **Explanation:** While recursion often expresses an algorithm's logic more clearly, deep recursion risks stack overflow (since most languages don't guarantee tail-call optimization), and each function call carries overhead (stack frame setup/teardown). Converting to an explicit iterative version with a manual stack can avoid these issues in performance-critical or very deep-recursion scenarios, though it may sacrifice some code clarity.

</main>
