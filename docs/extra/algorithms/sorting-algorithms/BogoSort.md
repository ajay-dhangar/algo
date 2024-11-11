---

id: bogo-sort-algo  
sidebar_position: 13
title: Bogo Sort  
sidebar_label: Bogo Sort  

---

### Definition:

Bogo Sort (also known as permutation sort, stupid sort, or slow sort) is a highly inefficient sorting algorithm based on the generate-and-test paradigm. The algorithm generates random permutations of the array until it finds one that is sorted. It is not practical for large arrays, as its average-case time complexity is extremely poor.

### Characteristics:

- **Generate-and-Test**:
  - Bogo sort works by randomly shuffling the elements of an array and then checking if the array is sorted. This process repeats until the array is sorted.
  
- **Highly Inefficient**:
  - The time complexity of Bogo sort makes it unusable for all but the smallest inputs, as the number of permutations of an array grows factorially with its size.
  
- **Not In-Place**:
  - Bogo sort can be in-place or not depending on the implementation, though it's typically done in-place since no extra memory is needed aside from shuffling operations.

- **Not Stable**:
  - Since elements are randomly shuffled, Bogo sort does not preserve the relative order of equal elements, making it inherently unstable.

### Time Complexity:

- **Best Case: O(n)**  
  In the best-case scenario, the array is already sorted on the first check, so only one permutation is generated.

- **Average Case: O((n+1)!)**  
  On average, Bogo sort requires generating and checking all possible permutations, leading to factorial time complexity.

- **Worst Case: Unbounded**  
  In the worst-case scenario, Bogo sort could theoretically never find a sorted permutation, making the time to complete unbounded.

### Space Complexity:

- **Space Complexity: O(1)**  
  Bogo sort requires no additional space other than the input array, as it works in-place by shuffling the array.

### C++ Implementation:

```cpp
#include <iostream>
#include <algorithm>
#include <cstdlib>
#include <ctime>
using namespace std;

// Function to check if the array is sorted
bool isSorted(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

// Function to shuffle the array randomly
void shuffle(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        swap(arr[i], arr[rand() % size]);
    }
}

// Function to perform Bogo sort
void bogoSort(int arr[], int size) {
    while (!isSorted(arr, size)) {
        shuffle(arr, size);
    }
}

int main() {
    srand(time(0));
    int arr[] = {3, 2, 5, 1, 4};
    int size = sizeof(arr) / sizeof(arr[0]);

    bogoSort(arr, size);

    cout << "Sorted array: \n";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### Summary:

Bogo sort is a highly inefficient sorting algorithm based on generating random permutations until the array is sorted. With an average-case time complexity of $O((n+1)!)$, it is impractical for anything but small arrays or as a teaching tool to illustrate inefficiency. Despite its impracticality, Bogo sort serves as a humorous example of how not to sort a list, given its extreme inefficiency.

The main takeaway is that Bogo sort, while theoretically interesting, should not be used in practice due to its poor performance and high computational cost.

