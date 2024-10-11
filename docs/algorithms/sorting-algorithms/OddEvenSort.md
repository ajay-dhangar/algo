



### Definition:

Odd-Even Sort is a simple comparison-based sorting algorithm, also known as Brick Sort. It works by repeatedly comparing all odd-indexed elements with their next even-indexed neighbor and swapping them if they are out of order. Then, it performs the same comparison for even-indexed elements and continues alternating between these two phases until the list is sorted.

### Characteristics:

- **Parallel Comparison**:
  - Odd-Even Sort alternates between comparing odd-even indexed pairs and even-odd indexed pairs, progressively sorting the array.

- **In-Place Sorting**:
  - Like Shell Sort, Odd-Even Sort is an in-place algorithm, meaning it requires no extra memory aside from the input array itself.

- **Stable**:
  - Odd-Even Sort is a stable sorting algorithm, as it only swaps adjacent elements, preserving the relative order of equal elements.

- **Simple Implementation**:
  - Odd-Even Sort is easy to implement and can be parallelized since adjacent element comparisons are independent.

### Time Complexity:

- **Best Case: O(n)**  
  If the array is already sorted, Odd-Even Sort only requires one pass through the array.

- **Average Case: O(n²)**  
  In the average case, Odd-Even Sort takes quadratic time, as it may require multiple passes over the array.

- **Worst Case: O(n²)**  
  In the worst case, such as a reverse-sorted array, Odd-Even Sort also degrades to O(n²).

### Space Complexity:

- **Space Complexity: O(1)**  
  Like Shell Sort, Odd-Even Sort is an in-place sorting algorithm, requiring constant additional memory.

### java Implementation:

```cpp
import java.util.Scanner;

public class OddEvenSort {
    // Function to perform odd-even sort
    public static void oddEvenSort(int[] arr) {
        boolean sorted = false; // Initially, the array is unsorted

        while (!sorted) {
            sorted = true;

            // Perform Odd phase
            for (int i = 1; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    sorted = false;
                }
            }

            // Perform Even phase
            for (int i = 0; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    sorted = false;
                }
            }
        }
    }

    // Function to swap two elements in the array
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();
        
        int[] arr = new int[n];
        System.out.println("Enter " + n + " elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        oddEvenSort(arr);

        System.out.println("Sorted array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();

        scanner.close();
    }
}

```

### Explanation:

1. **Odd Phase**:
   - During the odd phase, elements at odd indices (1, 3, 5, etc.) are compared with their immediate even neighbors (2, 4, 6, etc.). If an odd-indexed element is larger than its even neighbor, they are swapped.

2. **Even Phase**:
   - During the even phase, elements at even indices (0, 2, 4, etc.) are compared with their immediate odd neighbors (1, 3, 5, etc.). Similarly, if an even-indexed element is larger, they are swapped.

3. **Repetition**:
   - The process alternates between odd and even phases until no swaps are made during a complete pass, which means the array is sorted.

### Summary:

Odd-Even Sort is a simple comparison-based algorithm that repeatedly compares and swaps adjacent elements based on their odd or even positions. Despite its simplicity, it is not particularly efficient for large datasets, as its average and worst-case time complexity is O(n²). However, its simplicity and parallelization potential make it an attractive choice for certain applications where simpler algorithms suffice or where parallel computation can be leveraged.