---
id: heap-data-structure-4
title: heap data structure
sidebar_label: Merge k Sorted Lists
sidebar_position: 11
description: Heaps are useful for merging multiple sorted lists efficiently and solving problems related to merging sorted sequences.
tags: [Competitive Programming,merge,heap]
---

# Heap Problems: Merge k Sorted Lists

## Problem : Merge k Sorted Lists

### Problem Description:
Given `k` sorted linked lists, merge them into one sorted list.

### Example:

```
Input: [1->4->5], [1->3->4], [2->6] 
Output: 1->1->2->3->4->4->5->6
```

### Approach:
Using a Min Heap:
- Use a Min Heap to keep track of the minimum element from each list.
- Insert the head node of each list into the heap.
- Extract the minimum element from the heap, and if that element has a next node, insert it into the heap.
- Continue this process until all elements are merged.

Time Complexity: O(n log k), where `n` is the total number of elements and `k` is the number of lists.

### C++ Code:

```cpp
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

class ListNode {
public:
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
    
    bool operator>(const ListNode& other) const {
        return val > other.val;
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, greater<ListNode*>> minHeap;

    // Initialize the heap with the head of each list
    for (auto& list : lists) {
        if (list) {
            minHeap.push(list);
        }
    }

    ListNode *dummy = new ListNode(0);
    ListNode *current = dummy;

    while (!minHeap.empty()) {
        ListNode *node = minHeap.top();
        minHeap.pop();
        current->next = node;
        current = current->next;
        
        if (node->next) {
            minHeap.push(node->next);
        }
    }

    return dummy->next;
}

int main() {
    ListNode* list1 = new ListNode(1);
    list1->next = new ListNode(4);
    list1->next->next = new ListNode(5);

    ListNode* list2 = new ListNode(1);
    list2->next = new ListNode(3);
    list2->next->next = new ListNode(4);

    ListNode* list3 = new ListNode(2);
    list3->next = new ListNode(6);

    vector<ListNode*> lists = {list1, list2, list3};
    ListNode* mergedList = mergeKLists(lists);

    // Print the merged list
    while (mergedList) {
        cout << mergedList->val;
        if (mergedList->next) cout << " -> ";
        mergedList = mergedList->next;
    }
    cout << endl;

    return 0;
}
```

### Python Code:
```python
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __lt__(self, other):
        return self.val < other.val

def mergeKLists(lists):
    min_heap = []
    
    # Initialize the heap with the head of each list
    for l in lists:
        if l:
            heapq.heappush(min_heap, l)

    dummy = ListNode()
    current = dummy

    while min_heap:
        # Extract the minimum element from the heap
        node = heapq.heappop(min_heap)
        current.next = node
        current = current.next
        
        # If there's a next node, push it to the heap
        if node.next:
            heapq.heappush(min_heap, node.next)

    return dummy.next

# Example usage
list1 = ListNode(1, ListNode(4, ListNode(5)))
list2 = ListNode(1, ListNode(3, ListNode(4)))
list3 = ListNode(2, ListNode(6))

lists = [list1, list2, list3]
merged_list = mergeKLists(lists)

# Printing merged list
while merged_list:
    print(merged_list.val, end=" -> " if merged_list.next else "")
    merged_list = merged_list.next
```



