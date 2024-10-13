

# Strand Sort

**Strand Sort** is a recursive, comparison-based sorting algorithm that works by pulling out sorted sublists (strands) from the original list and then merging them together to create the final sorted list. Strand Sort works best with linked lists due to its insertions and extraction steps but can also be implemented with arrays.

## Characteristics

- **Type:** Comparison-based, Recursive
- **Stability:** Stable (preserves the relative order of equal elements)
- **Time Complexity:**
  - **Best Case:** O(n) (when the input list is already sorted)
  - **Average Case:** O(n²)
  - **Worst Case:** O(n²)
- **Space Complexity:** O(n) (for merging sublists)

## How it Works

1. **Extract Strands:** A sorted sublist (strand) is repeatedly pulled out from the unsorted list by taking elements in increasing order.
2. **Merge:** Each extracted strand is merged into an existing sorted list.

### Example:

Consider the list: `[4, 2, 5, 3, 8, 7, 6, 1]`

- The first strand will pull out `[4, 5, 8]` from the unsorted list.
- The second strand will pull out `[2, 3, 7]`.
- The remaining elements `[6, 1]` will form additional strands.
- The strands are merged together to form a sorted list.

## C++ Implementation

Here's a simple C++ implementation of **Strand Sort** using vectors:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to merge two sorted vectors
vector<int> merge(vector<int>& list1, vector<int>& list2) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < list1.size() && j < list2.size()) {
        if (list1[i] < list2[j]) {
            result.push_back(list1[i++]);
        } else {
            result.push_back(list2[j++]);
        }
    }

    // Add remaining elements of list1 or list2
    while (i < list1.size()) {
        result.push_back(list1[i++]);
    }
    while (j < list2.size()) {
        result.push_back(list2[j++]);
    }

    return result;
}

// Function to extract a strand from the list
vector<int> extractStrand(vector<int>& unsortedList) {
    vector<int> strand;
    strand.push_back(unsortedList[0]);
    unsortedList.erase(unsortedList.begin());

    for (auto it = unsortedList.begin(); it != unsortedList.end(); ) {
        if (*it >= strand.back()) {
            strand.push_back(*it);
            it = unsortedList.erase(it);
        } else {
            ++it;
        }
    }

    return strand;
}

// Function to perform strand sort
vector<int> strandSort(vector<int>& unsortedList) {
    vector<int> sortedList;

    while (!unsortedList.empty()) {
        vector<int> strand = extractStrand(unsortedList);
        sortedList = merge(sortedList, strand);
    }

    return sortedList;
}

int main() {
    vector<int> unsortedList = {4, 2, 5, 3, 8, 7, 6, 1};

    vector<int> sortedList = strandSort(unsortedList);

    cout << "Sorted list: ";
    for (int num : sortedList) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

## Usage

1. Clone this repository or copy the code.
2. Compile the code using any C++ compiler, such as `g++`:
   ```bash
   g++ -o strand_sort strand_sort.cpp
   ```
3. Run the program:
   ```bash
   ./strand_sort
   ```
4. The program will output the sorted list.

### Example Output

```
Sorted list: 1 2 3 4 5 6 7 8
```

## Advantages

- Simple and intuitive.
- Stable sorting algorithm.
- Works well on data that has some presorted segments.

## Disadvantages

- Not efficient for large datasets due to its O(n²) time complexity in the average and worst case.
- Best suited for linked lists but can be adapted to arrays or vectors.

