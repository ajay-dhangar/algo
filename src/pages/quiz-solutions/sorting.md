---
title: Sorting Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Sorting Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **Which of the following sorting algorithms is stable by default?**
   - A) Quick Sort
   - B) Merge Sort
   - C) Heap Sort
   - D) Selection Sort  
   **Answer:** B) Merge Sort  
   **Explanation:** Merge Sort is stable because it preserves the relative order of equal elements during the merge step, unlike Quick Sort, Heap Sort, or Selection Sort which can swap equal elements across large distances.

2. **What is the worst-case time complexity of Bubble Sort?**
   - A) O(n)
   - B) O(n log n)
   - C) O(n²)
   - D) O(1)  
   **Answer:** C) O(n²)  
   **Explanation:** In the worst case (when the array is sorted in reverse order), Bubble Sort requires n-1 passes, with each pass performing comparisons and swaps, resulting in O(n²) comparisons and swaps.

3. **Which sorting algorithm has a best-case time complexity of O(n) when the array is already sorted?**
   - A) Selection Sort
   - B) Merge Sort
   - C) Insertion Sort
   - D) Heap Sort  
   **Answer:** C) Insertion Sort  
   **Explanation:** Insertion Sort only does one comparison per element and no swaps if the array is already sorted, resulting in a best-case time complexity of O(n). Selection Sort always does O(n²) comparisons regardless of the initial order.

4. **What is the auxiliary space complexity of Heap Sort?**
   - A) O(1)
   - B) O(log n)
   - C) O(n)
   - D) O(n log n)  
   **Answer:** A) O(1)  
   **Explanation:** Heap Sort is an in-place sorting algorithm because it re-arranges the elements inside the input array itself, requiring only a constant amount of auxiliary space — O(1).

5. **Why is Quick Sort preferred over Merge Sort for sorting arrays in-place, despite having a worst-case complexity of O(n²)?**
   - A) Quick Sort is always stable
   - B) Quick Sort is in-place (requiring only O(log n) auxiliary stack space) and has excellent cache locality in practice
   - C) Merge Sort has a worse average-case time complexity
   - D) Quick Sort requires no comparisons  
   **Answer:** B) Quick Sort is in-place (requiring only O(log n) auxiliary stack space) and has excellent cache locality in practice  
   **Explanation:** Quick Sort operates in-place (requiring only O(log n) stack space for recursion), whereas Merge Sort requires O(n) auxiliary space to merge subarrays. Quick Sort also exhibits excellent cache localization (sequential memory access patterns during partitioning), making it very fast in practice.

6. **What is the time complexity of building a binary heap of size n from an unsorted array of n elements?**
   - A) O(1)
   - B) O(n)
   - C) O(n log n)
   - D) O(n²)  
   **Answer:** B) O(n)  
   **Explanation:** Using the bottom-up heap construction algorithm (heapify from the lowest non-leaf nodes up to the root), the time complexity is bounded by O(n). This is because the height of the nodes decreases as we move down the tree, and the work done at each level is proportional to the height of that level.

7. **Which of the following is a hybrid sorting algorithm that combines Merge Sort and Insertion Sort, and is the default sorting algorithm in Python and Java?**
   - A) Intro Sort
   - B) Tim Sort
   - C) Block Sort
   - D) Shell Sort  
   **Answer:** B) Tim Sort  
   **Explanation:** Timsort is a hybrid stable sorting algorithm derived from Merge Sort and Insertion Sort. It identifies natural runs (already sorted subsegments) and uses Insertion Sort for small runs, then merges them using Merge Sort. It is the default sorting algorithm for Python, Java (for objects), and Rust.

8. **What happens during the partitioning step of Quick Sort using Lomuto's partition scheme?**
   - A) The array is split into two equal halves
   - B) Elements smaller than or equal to the pivot are moved to the left, and elements greater are moved to the right
   - C) The array is sorted completely
   - D) The smallest element is placed at the first position  
   **Answer:** B) Elements smaller than or equal to the pivot are moved to the left, and elements greater are moved to the right  
   **Explanation:** The partitioning step in Quick Sort chooses a pivot element and rearranges the array so that all elements smaller than or equal to the pivot are placed to its left, and all elements larger than the pivot are placed to its right, leaving the pivot in its final sorted position.

9. **In which scenario would Selection Sort be preferred over other O(n²) algorithms like Insertion Sort?**
   - A) When the array is already sorted
   - B) When minimizing the number of write operations (swaps) to memory is critical
   - C) When stability is required
   - D) When auxiliary space is limited  
   **Answer:** B) When minimizing the number of write operations (swaps) to memory is critical  
   **Explanation:** Selection Sort performs at most O(n) swaps (write operations) in the worst case, whereas Bubble Sort and Insertion Sort can perform up to O(n²) swaps. If writes to memory are very expensive (e.g., in flash memory or EEPROM), Selection Sort can be advantageous.

10. **Which sorting algorithm does Intro Sort use as a fallback when the recursion depth exceeds a certain limit (usually 2 * log n)?**
    - A) Merge Sort
    - B) Heap Sort
    - C) Insertion Sort
    - D) Bubble Sort  
    **Answer:** B) Heap Sort  
    **Explanation:** Intro Sort (Introspective Sort) starts with Quick Sort. If the recursion depth exceeds a threshold (indicating a worst-case O(n²) partitioning behavior), it switches to Heap Sort to guarantee O(n log n) worst-case time complexity, while maintaining Quick Sort's practical speed for most inputs. It also switches to Insertion Sort for very small subarrays.

11. **What is the theoretical lower bound for the time complexity of any comparison-based sorting algorithm in the worst case?**
    - A) Ω(n)
    - B) Ω(n log n)
    - C) Ω(n²)
    - D) Ω(2^n)  
    **Answer:** B) Ω(n log n)  
    **Explanation:** The decision tree model shows that to sort n elements, there are n! possible permutations. A binary decision tree must have at least n! leaves, meaning its height (the minimum number of comparisons in the worst case) is at least log(n!) = Ω(n log n) by Stirling's approximation.

12. **Which of the following non-comparison-based sorting algorithms has a time complexity of O(n + k), where n is the number of elements and k is the range of the input values?**
    - A) Radix Sort
    - B) Bucket Sort
    - C) Counting Sort
    - D) Shell Sort  
    **Answer:** C) Counting Sort  
    **Explanation:** Counting Sort is a non-comparison-based algorithm that operates by counting the number of occurrences of each unique value in the input array. It uses this count to place elements in their correct positions in the sorted output, achieving O(n + k) time complexity, where k is the range of key values.

</main>
