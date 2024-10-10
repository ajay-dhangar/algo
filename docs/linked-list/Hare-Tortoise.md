---
id: introduction-to-LinkedList
title: Hare and Tortoise Algorithm
sidebar_label: Introduction to Hare and Tortoise Algorithm
sidebar_position: 11
description: The Hare and Tortoise Algorithm, also known as Floyd's Cycle Detection Algorithm, is a method used to detect cycles in a linked list. It employs two pointers that move at different speeds to identify whether a cycle exists.

tags: [dsa, data-structures,Hare and Tortoise Algorithm]
---


### Defination:

The Hare and Tortoise Algorithm, also known as Floyd's Cycle Detection Algorithm, is a method used to detect cycles in a linked list. It employs two pointers that move at different speeds to identify whether a cycle exists.

### Characteristics:

- **Two Pointer Technique**:
- The algorithm uses two pointers: a tortoise that moves one step at a time and a hare that moves two steps at a time.

- **Cycle Detection**:
- If the linked list contains a cycle, the fast-moving hare will eventually meet the slow-moving tortoise.

-**Space Efficiency**:
The algorithm uses a constant amount of space (O(1)), making it very efficient.

-**Applicable to Linked Lists**:
- It is specifically designed to work with linked lists, where the next node is accessed through pointers.

### Time Complexity:

- **Best, Average, and Worst Case: O(N)**  
 - In the worst case, both pointers traverse the entire list, leading to linear time complexity, where n is the number of nodes in the linked list.

- **Space Complexity: O(1)**  
- The algorithm only uses two pointers regardless of the input size, resulting in constant space complexity.

### C++ Implementation:

```cpp
#include <iostream>

struct ListNode {
    int value;
    ListNode* next;
    ListNode(int val) : value(val), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* tortoise = head;
    ListNode* hare = head;

    while (hare != nullptr && hare->next != nullptr) {
        tortoise = tortoise->next;        // Move tortoise by 1 step
        hare = hare->next->next;          // Move hare by 2 steps

        if (tortoise == hare) {
            return true;                  // Cycle detected
        }
    }

    return false;                        // No cycle
}

int main() {
    // Creating a linked list with a cycle for testing
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = head->next; // Creating a cycle

    if (hasCycle(head)) {
        std::cout << "Cycle detected in the linked list." << std::endl;
    } else {
        std::cout << "No cycle detected in the linked list." << std::endl;
    }

    // Clean up memory (not reached due to cycle)
    return 0;
}


```

### JAVA Implementation:

```java
class ListNode {
    int value;
    ListNode next;

    ListNode(int val) {
        this.value = val;
        this.next = null;
    }
}

public class CycleDetection {
    
    public static boolean hasCycle(ListNode head) {
        ListNode tortoise = head;
        ListNode hare = head;

        while (hare != null && hare.next != null) {
            tortoise = tortoise.next;            // Move tortoise by 1 step
            hare = hare.next.next;               // Move hare by 2 steps

            if (tortoise == hare) {
                return true;                     // Cycle detected
            }
        }

        return false;                            // No cycle
    }

    public static void main(String[] args) {
        // Creating a linked list with a cycle for testing
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = head.next; // Creating a cycle

        if (hasCycle(head)) {
            System.out.println("Cycle detected in the linked list.");
        } else {
            System.out.println("No cycle detected in the linked list.");
        }
    }
}


```

### Python Implementation:
```py
class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def has_cycle(head):
    tortoise = head
    hare = head

    while hare and hare.next:
        tortoise = tortoise.next        # Move tortoise by 1 step
        hare = hare.next.next           # Move hare by 2 steps

        if tortoise == hare:
            return True                 # Cycle detected

    return False                        # No cycle

if __name__ == "__main__":
    # Creating a linked list with a cycle for testing
    head = ListNode(1)
    head.next = ListNode(2)
    head.next.next = ListNode(3)
    head.next.next.next = ListNode(4)
    head.next.next.next.next = head.next  # Creating a cycle

    if has_cycle(head):
        print("Cycle detected in the linked list.")
    else:
        print("No cycle detected in the linked list.")


```

### Summary:

The Hare and Tortoise Algorithm is an efficient method for detecting cycles in a linked list using a two-pointer technique. It operates in linear time and constant space, making it a widely used approach in various applications involving linked data structures.
