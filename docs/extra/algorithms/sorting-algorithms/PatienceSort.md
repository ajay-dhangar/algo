---
id: patience-sort-algo
title: Patience Sort
sidebar_label: Patience Sort
description: A comprehensive guide on the Patience Sort algorithm, including explanations, complexity analysis, and implementations in C, C++, Java, Python, and JavaScript.
tags: [sorting algorithms, patience sort, dsa, programming]
sidebar_position: 31
---

### Definition
Patience Sort is a sorting algorithm inspired by, and named after, the card game patience (also known as solitaire). The algorithm is highly effective for sorting and is also used in solving the **Longest Increasing Subsequence (LIS)** problem.

It works by dividing the input elements into a sequence of piles according to specific rules, and then merging those piles to produce the final sorted output.

---

### Characteristics

- **Pile Building**:
  - The algorithm processes elements one by one.
  - Each element is placed on the leftmost pile whose top card is greater than or equal to the element.
  - If no such pile exists, a new pile is created to the right of all existing piles.
- **k-Way Merge**:
  - After all elements are placed into piles, we merge the piles. Since each pile itself is sorted (with smaller elements on top), we can repeatedly select the minimum element among the tops of all piles. This is typically optimized using a min-heap (similar to a k-way merge).
- **Longest Increasing Subsequence**:
  - The number of piles formed during the patience sorting process is exactly equal to the length of the Longest Increasing Subsequence of the input array.

---

### Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $\mathcal{O}(n)$ — When the array is already sorted in reverse order, only one pile of size $n$ is created, and merging takes $\mathcal{O}(n)$ time.
  - **Average Case**: $\mathcal{O}(n \log n)$ — Binary search is used to place each of the $n$ elements into piles, taking $\mathcal{O}(n \log n)$ time. Merging $k$ piles using a min-heap takes $\mathcal{O}(n \log k)$ time.
  - **Worst Case**: $\mathcal{O}(n \log n)$ — Occurs when elements are placed into $n$ distinct piles (e.g., when the array is already sorted).
- **Space Complexity**: $\mathcal{O}(n)$ — Additional space is required to store the piles and the heap structure.

---

### Implementations

Here are the complete implementations of Patience Sort in various programming languages:

#### C++ Implementation
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

// Patience Sort implementation using std::vector of piles
void patienceSort(vector<int>& arr) {
    if (arr.empty()) return;

    // List of piles, each pile is represented by a vector
    vector<vector<int>> piles;

    for (int x : arr) {
        // Binary search to find the leftmost pile whose top element is >= x
        auto it = lower_bound(piles.begin(), piles.end(), x, [](const vector<int>& pile, int value) {
            return pile.back() < value;
        });

        if (it == piles.end()) {
            piles.push_back({x});
        } else {
            it->push_back(x);
        }
    }

    // Min-heap to merge the piles (k-way merge)
    // Heap node: (top_value, (pile_index, element_index))
    typedef pair<int, pair<int, int>> HeapNode;
    priority_queue<HeapNode, vector<HeapNode>, greater<HeapNode>> pq;

    for (int i = 0; i < piles.size(); i++) {
        pq.push({piles[i].back(), {i, (int)piles[i].size() - 1}});
    }

    int idx = 0;
    while (!pq.empty()) {
        auto node = pq.top();
        pq.pop();

        arr[idx++] = node.first;

        int pileIdx = node.second.first;
        int elemIdx = node.second.second - 1;

        if (elemIdx >= 0) {
            pq.push({piles[pileIdx][elemIdx], {pileIdx, elemIdx}});
        }
    }
}

int main() {
    vector<int> arr = {4, 12, 5, 2, 1, 9, 7, 11, 3};
    
    patienceSort(arr);
    
    cout << "Sorted array: ";
    for (int x : arr) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
```

#### Python Implementation
```python
import bisect
import heapq

def patience_sort(arr):
    if not arr:
        return arr

    piles = []
    # Place elements in piles
    for x in arr:
        tops = [pile[-1] for pile in piles]
        idx = bisect.bisect_left(tops, x)
        
        if idx == len(piles):
            piles.append([x])
        else:
            piles[idx].append(x)

    # Merge piles using a min-heap (k-way merge)
    merged = []
    heap = []
    for i, pile in enumerate(piles):
        heapq.heappush(heap, (pile[-1], i, len(pile) - 1))

    while heap:
        val, pile_idx, elem_idx = heapq.heappop(heap)
        merged.append(val)
        
        if elem_idx > 0:
            next_elem_idx = elem_idx - 1
            heapq.heappush(heap, (piles[pile_idx][next_elem_idx], pile_idx, next_elem_idx))
            
    return merged

if __name__ == "__main__":
    arr = [4, 12, 5, 2, 1, 9, 7, 11, 3]
    sorted_arr = patience_sort(arr)
    print("Sorted array:", sorted_arr)
```

#### Java Implementation
```java
import java.util.*;

public class PatienceSort {
    public static void patienceSort(int[] arr) {
        if (arr == null || arr.length == 0) return;

        List<List<Integer>> piles = new ArrayList<>();

        for (int x : arr) {
            int dest = binarySearch(piles, x);
            if (dest == piles.size()) {
                List<Integer> newPile = new ArrayList<>();
                newPile.add(x);
                piles.add(newPile);
            } else {
                piles.get(dest).add(x);
            }
        }

        // Priority Queue for merging piles (k-way merge)
        // Element structure: {value, pileIndex, elementIndex}
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));

        for (int i = 0; i < piles.size(); i++) {
            List<Integer> pile = piles.get(i);
            pq.offer(new int[]{pile.get(pile.size() - 1), i, pile.size() - 1});
        }

        int idx = 0;
        while (!pq.isEmpty()) {
            int[] node = pq.poll();
            arr[idx++] = node[0];

            int pileIdx = node[1];
            int elemIdx = node[2] - 1;

            if (elemIdx >= 0) {
                pq.offer(new int[]{piles.get(pileIdx).get(elemIdx), pileIdx, elemIdx});
            }
        }
    }

    private static int binarySearch(List<List<Integer>> piles, int x) {
        int low = 0, high = piles.size() - 1;
        while (low <= high) {
            int mid = (low + high) >>> 1;
            List<Integer> pile = piles.get(mid);
            int top = pile.get(pile.size() - 1);
            if (top >= x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        int[] arr = {4, 12, 5, 2, 1, 9, 7, 11, 3};
        patienceSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
```

#### JavaScript Implementation
```javascript
function patienceSort(arr) {
    if (arr.length === 0) return arr;

    const piles = [];

    for (const x of arr) {
        let low = 0;
        let high = piles.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const top = piles[mid][piles[mid].length - 1];
            if (top >= x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (low === piles.length) {
            piles.push([x]);
        } else {
            piles[low].push(x);
        }
    }

    // Merge piles (using linear scan as a simple priority queue simulation)
    const result = [];
    const pointers = piles.map(pile => pile.length - 1);

    while (true) {
        let minVal = Infinity;
        let minPileIdx = -1;

        for (let i = 0; i < piles.length; i++) {
            if (pointers[i] >= 0) {
                const val = piles[i][pointers[i]];
                if (val < minVal) {
                    minVal = val;
                    minPileIdx = i;
                }
            }
        }

        if (minPileIdx === -1) break;

        result.push(minVal);
        pointers[minPileIdx]--;
    }

    return result;
}

const arr = [4, 12, 5, 2, 1, 9, 7, 11, 3];
console.log("Sorted array:", patienceSort(arr));
```

#### C Implementation
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* cards;
    int size;
    int capacity;
} Pile;

void patienceSort(int arr[], int n) {
    if (n <= 0) return;

    Pile* piles = (Pile*)malloc(n * sizeof(Pile));
    int numPiles = 0;

    for (int i = 0; i < n; i++) {
        int x = arr[i];
        
        // Binary search to find the leftmost pile whose top card is >= x
        int low = 0, high = numPiles - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            int top = piles[mid].cards[piles[mid].size - 1];
            if (top >= x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (low == numPiles) {
            piles[numPiles].capacity = 4;
            piles[numPiles].size = 1;
            piles[numPiles].cards = (int*)malloc(piles[numPiles].capacity * sizeof(int));
            piles[numPiles].cards[0] = x;
            numPiles++;
        } else {
            Pile* p = &piles[low];
            if (p->size >= p->capacity) {
                p->capacity *= 2;
                p->cards = (int*)realloc(p->cards, p->capacity * sizeof(int));
            }
            p->cards[p->size++] = x;
        }
    }

    // Merge piles
    int* pointers = (int*)malloc(numPiles * sizeof(int));
    for (int i = 0; i < numPiles; i++) {
        pointers[i] = piles[i].size - 1;
    }

    for (int i = 0; i < n; i++) {
        int minVal = 2e9; // infinity representation
        int minPileIdx = -1;

        for (int j = 0; j < numPiles; j++) {
            if (pointers[j] >= 0) {
                int val = piles[j].cards[pointers[j]];
                if (val < minVal) {
                    minVal = val;
                    minPileIdx = j;
                }
            }
        }

        arr[i] = minVal;
        pointers[minPileIdx]--;
    }

    // Memory cleanup
    for (int i = 0; i < numPiles; i++) {
        free(piles[i].cards);
    }
    free(piles);
    free(pointers);
}

int main() {
    int arr[] = {4, 12, 5, 2, 1, 9, 7, 11, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    patienceSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}
```

---

### Complexity Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Patience Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ |
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ |

---

### Common Mistakes

1. **Linear Scan instead of Binary Search**: Finding the correct pile using linear scan increases the complexity to $\mathcal{O}(n^2)$. Always use binary search (`lower_bound` or equivalent) to locate the pile.
2. **Incorrect k-Way Merge**: Directly pulling elements from the piles without using a min-heap or structured priority queue can degrade the merge time, resulting in sub-optimal execution.
