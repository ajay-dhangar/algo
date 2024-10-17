---
id: strand_sort
title: Strand Sort
sidebar_label: "Strand Sort"
sidebar_position: 8
description: An overview of Strand Sort Algorithm and its applications in programming.
tags: [sorting,dsa,algorithms, programming,strand sort]
---



# Strand Sort
(Has Implementation in C,Python and Java)

**Strand Sort** is a recursive sorting algorithm that repeatedly extracts sorted sublists (strands) from the unsorted list and merges them to create a sorted list.

## Steps:

1. **Extract a strand**: Start from the first element of the list. Extract elements in order as long as they are larger than the last extracted one.
   
2. **Remove extracted elements**: Once a strand is extracted, remove those elements from the original list.

3. **Merge the strand**: Merge the extracted strand into the previously sorted list.

4. **Repeat**: Repeat the process with the remaining unsorted elements until all elements are sorted.

### Example

Let’s take an unsorted list:  
`[4, 3, 9, 1, 7, 2, 6, 5, 8]`

#### Step-by-Step Execution:

1. **Initial list**:  
   `Unsorted list = [4, 3, 9, 1, 7, 2, 6, 5, 8]`

2. **Extract the first strand**:
   - Start with the first element `4`.
   - Next, `9` is larger than `4`, so we add it to the strand.
   - The extracted strand is `[4, 9]`.

   Now, the unsorted list becomes:  
   `Unsorted list = [3, 1, 7, 2, 6, 5, 8]`

3. **Merge the strand with the sorted list**:
   - The sorted list is initially empty.
   - Merging the first strand `[4, 9]` results in:  
     `Sorted list = [4, 9]`.

4. **Extract the second strand**:
   - Start with the first element `3`.
   - Next, `7` is larger than `3`, so we add it to the strand.
   - The extracted strand is `[3, 7]`.

   Now, the unsorted list becomes:  
   `Unsorted list = [1, 2, 6, 5, 8]`

5. **Merge the second strand**:
   - Merge the second strand `[3, 7]` with the sorted list `[4, 9]`.
   - The result after merging:  
     `Sorted list = [3, 4, 7, 9]`.

6. **Extract the third strand**:
   - Start with the first element `1`.
   - `2` is larger than `1`, so we add it.
   - `6` is larger than `2`, so we add it as well.
   - The extracted strand is `[1, 2, 6]`.

   Now, the unsorted list becomes:  
   `Unsorted list = [5, 8]`

7. **Merge the third strand**:
   - Merge the third strand `[1, 2, 6]` with the sorted list `[3, 4, 7, 9]`.
   - The result after merging:  
     `Sorted list = [1, 2, 3, 4, 6, 7, 9]`.

8. **Extract the fourth strand**:
   - Start with the first element `5`.
   - Next, `8` is larger than `5`, so we add it.
   - The extracted strand is `[5, 8]`.

   Now, the unsorted list is empty:  
   `Unsorted list = []`

9. **Merge the fourth strand**:
   - Merge the final strand `[5, 8]` with the sorted list `[1, 2, 3, 4, 6, 7, 9]`.
   - The result after merging:  
     `Sorted list = [1, 2, 3, 4, 5, 6, 7, 8, 9]`.

### Final Sorted List:
The sorted list is:  
`[1, 2, 3, 4, 5, 6, 7, 8, 9]`



## Time Complexity Analysis

### Best Case:

- **Time Complexity: O(n log n)**  
  In the best case, each strand extracted is already sorted, meaning the extracted strand contains multiple elements. This scenario reduces the number of merges required and results in an efficient merge process similar to merge sort.

- **Example (Best Case)**:  
  If the input list is nearly sorted or already sorted, the strands will be long, minimizing the total number of merges.
  
  Example List:  
  `[1, 2, 3, 4, 5, 6, 7, 8, 9]`  
  - The first strand extracted will be the entire list: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`.
  - No further extraction or merging is required.

- **Number of strands**: Only one large strand.
- **Merge steps**: None.
  
  This minimizes both the number of strands extracted and merge operations, resulting in O(n log n).

### Worst Case:

- **Time Complexity: O(n²)**  
  In the worst case, each extracted strand contains only one element, meaning the strands are as short as possible. This leads to the maximum number of merge operations.

- **Example (Worst Case)**:  
  If the input list is in reverse order, each element must be extracted individually, as each element will be smaller than the previous one.

  Example List:  
  `[9, 8, 7, 6, 5, 4, 3, 2, 1]`
  - The first strand extracted is `[9]`.
  - The next extracted strand is `[8]`, and so on.
  - This requires many merging operations, with each strand consisting of just one element.

- **Number of strands**: n (where each strand contains only one element).
- **Merge steps**: Each strand (single element) must be merged one-by-one into the sorted list.

  This results in O(n²) due to excessive merging operations.

---

## Example for Worst Case:

Consider the reverse sorted list:

`[9, 8, 7, 6, 5, 4, 3, 2, 1]`

1. Extract strands:
   - First strand: `[9]`
   - Second strand: `[8]`
   - Third strand: `[7]`
   - (Continue extracting single elements until the list is empty)

2. Merge process:
   - Merge `[9]` with `[8]` → `[8, 9]`
   - Merge `[8, 9]` with `[7]` → `[7, 8, 9]`
   - Continue merging each extracted strand (one element) with the sorted list.

3. Since each strand consists of only one element, the number of merging steps grows quadratically as we repeatedly merge single-element strands into an ever-growing sorted list.

This results in a time complexity of **O(n²)**.

---

## Example for Best Case:

Consider a sorted list:

`[1, 2, 3, 4, 5, 6, 7, 8, 9]`

1. Extract strands:
   - The first strand will be `[1, 2, 3, 4, 5, 6, 7, 8, 9]`.

2. Merge process:
   - Since the entire list was extracted as a single strand, no further merging steps are required.

This leads to the best-case time complexity of **O(n log n)**.

---

## Summary of Time Complexity

- **Best Case**: O(n log n) — Occurs when the list is already sorted or nearly sorted, reducing the number of strands and merge operations.
- **Worst Case**: O(n²) — Occurs when each strand contains only one element (e.g., reverse sorted list), leading to many merge operations.
- **Average Case**: Typically between O(n log n) and O(n²), depending on the structure of the input list.




## Advantages:
1. **Simple to understand**: The process of extracting sorted strands and merging is conceptually easy.
2. **Works well with linked lists**: As strand sort can efficiently handle linked lists, it avoids the overhead of frequent element shifting like in arrays.
3. **Stable sort**: Strand sort maintains the relative order of equal elements.

## Disadvantages:
1. **Not efficient for large datasets**: The worst-case time complexity is O(n²), which makes it inefficient for large lists.
2. **Recursive nature**: Its recursive design can lead to high memory usage and potential stack overflow issues for deep recursion.
3. **Limited use cases**: Due to its inefficiency with arrays and larger datasets, it's not commonly used in practice.

## Implementations

### 1. **C Implementation**

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* newNode(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->next = NULL;
    return node;
}

void append(Node** head, int data) {
    Node* temp = *head;
    Node* new_node = newNode(data);
    if (!*head) {
        *head = new_node;
        return;
    }
    while (temp->next)
        temp = temp->next;
    temp->next = new_node;
}

Node* merge(Node* a, Node* b) {
    if (!a) return b;
    if (!b) return a;
    
    if (a->data < b->data) {
        a->next = merge(a->next, b);
        return a;
    } else {
        b->next = merge(a, b->next);
        return b;
    }
}

Node* extractStrand(Node** head) {
    Node* curr = *head, *prev = NULL, *strand = NULL, *tail = NULL;
    while (curr) {
        if (!prev || curr->data >= prev->data) {
            if (!strand) strand = tail = curr;
            else {
                tail->next = curr;
                tail = curr;
            }
            if (prev) prev->next = curr->next;
            else *head = curr->next;
            curr = curr->next;
            tail->next = NULL;
        } else {
            prev = curr;
            curr = curr->next;
        }
    }
    return strand;
}

void strandSort(Node** head) {
    Node* sorted = NULL;
    while (*head) {
        Node* strand = extractStrand(head);
        sorted = merge(sorted, strand);
    }
    *head = sorted;
}

void printList(Node* head) {
    while (head) {
        printf("%d ", head->data);
        head = head->next;
    }
    printf("\n");
}

int main() {
    Node* head = NULL;
    int arr[] = {4, 3, 9, 1, 7, 2, 6, 5, 8};
    int n = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < n; i++) append(&head, arr[i]);
    
    strandSort(&head);
    
    printf("Sorted list: ");
    printList(head);
    return 0;
}
```
# 2) Python Implementation
```c 
def merge(a, b):
    if not a:
        return b
    if not b:
        return a
    
    if a[0] < b[0]:
        return [a[0]] + merge(a[1:], b)
    else:
        return [b[0]] + merge(a, b[1:])

def extract_strand(lst):
    strand = [lst[0]]
    i = 1
    while i < len(lst):
        if lst[i] >= strand[-1]:
            strand.append(lst.pop(i))
        else:
            i += 1
    return strand

def strand_sort(lst):
    sorted_lst = []
    while lst:
        strand = extract_strand(lst)
        sorted_lst = merge(sorted_lst, strand)
    return sorted_lst

# Example usage
lst = [4, 3, 9, 1, 7, 2, 6, 5, 8]
sorted_lst = strand_sort(lst)
print("Sorted list:", sorted_lst)
```
# 3) Java Implementation

```c
import java.util.LinkedList;

public class StrandSort {
    public static LinkedList<Integer> merge(LinkedList<Integer> a, LinkedList<Integer> b) {
        LinkedList<Integer> result = new LinkedList<>();
        while (!a.isEmpty() && !b.isEmpty()) {
            if (a.peek() <= b.peek()) {
                result.add(a.poll());
            } else {
                result.add(b.poll());
            }
        }
        result.addAll(a);
        result.addAll(b);
        return result;
    }

    public static LinkedList<Integer> extractStrand(LinkedList<Integer> list) {
        LinkedList<Integer> strand = new LinkedList<>();
        strand.add(list.poll());
        for (int i = 0; i < list.size(); ) {
            if (list.get(i) >= strand.getLast()) {
                strand.add(list.remove(i));
            } else {
                i++;
            }
        }
        return strand;
    }

    public static LinkedList<Integer> strandSort(LinkedList<Integer> list) {
        LinkedList<Integer> sorted = new LinkedList<>();
        while (!list.isEmpty()) {
            LinkedList<Integer> strand = extractStrand(list);
            sorted = merge(sorted, strand);
        }
        return sorted;
    }

    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        int[] arr = {4, 3, 9, 1, 7, 2, 6, 5, 8};
        for (int j : arr) {
            list.add(j);
        }

        LinkedList<Integer> sortedList = strandSort(list);
        System.out.println("Sorted list: " + sortedList);
    }
}
```

