---
id: tower-of-hanoi
title: Tower of Hanoi Algorithm
sidebar_label: Tower of Hanoi
sidebar_position: 10
description: A comprehensive guide to the Tower of Hanoi problem, recursive algorithm, and iterative solution.
tags: [dsa, recursion, algorithms, Tower of Hanoi]
---

## Introduction

The **Tower of Hanoi** is a classic mathematical puzzle that consists of three pegs (or towers) and a number of disks of different sizes. The puzzle starts with all disks stacked on one peg in order of decreasing size (smallest on top), forming a conical shape. The objective is to move the entire stack to another peg, following these rules:

1. Only one disk can be moved at a time.
2. Each move consists of taking the top disk from one stack and placing it on top of another stack.
3. No disk may be placed on top of a smaller disk.

## Problem Statement

Given `n` disks on peg A, peg B as auxiliary, and peg C as the destination, move all `n` disks from peg A to peg C.

## Recursive Solution

The recursive strategy is elegantly simple:

1. Move `n-1` disks from source to auxiliary peg (using destination as temporary storage).
2. Move the largest disk directly from source to destination.
3. Move the `n-1` disks from auxiliary to destination (using source as temporary storage).

### Algorithm (Pseudo-code)

```text
function TowerOfHanoi(n, source, destination, auxiliary):
    if n == 1:
        print "Move disk 1 from", source, "to", destination
        return

    TowerOfHanoi(n - 1, source, auxiliary, destination)
    print "Move disk", n, "from", source, "to", destination
    TowerOfHanoi(n - 1, auxiliary, destination, source)
```

### Implementation in C

```c
#include <stdio.h>

void towerOfHanoi(int n, char source, char destination, char auxiliary) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\n", source, destination);
        return;
    }
    towerOfHanoi(n - 1, source, auxiliary, destination);
    printf("Move disk %d from %c to %c\n", n, source, destination);
    towerOfHanoi(n - 1, auxiliary, destination, source);
}

int main() {
    int n = 4;
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}
```

### Implementation in Python

```python
def tower_of_hanoi(n, source, destination, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return

    tower_of_hanoi(n - 1, source, auxiliary, destination)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, destination, source)

# Example: Move 4 disks from A to C using B as auxiliary
tower_of_hanoi(4, 'A', 'C', 'B')
```

## Step-by-Step Visualization (n=3)

| Step | Move |
|------|------|
| 1 | Move disk 1 from A to C |
| 2 | Move disk 2 from A to B |
| 3 | Move disk 1 from C to B |
| 4 | Move disk 3 from A to C |
| 5 | Move disk 1 from B to A |
| 6 | Move disk 2 from B to C |
| 7 | Move disk 1 from A to C |

## Iterative Solution

The recursive solution can be converted to an iterative one using a stack to simulate the call stack. The key insight is that the parity of the number of disks determines which disk moves first.

### Implementation in Python (Iterative)

```python
def tower_of_hanoi_iterative(n):
    if n % 2 == 0:
        # For even number of disks, the auxiliary and destination are swapped
        aux, dest = 'B', 'C'
        moves = []
        for i in range(1, 4):
            moves.append(chr(ord('A') + i - 1))
    else:
        aux, dest = 'C', 'B'
        moves = []
        for i in range(1, 4):
            moves.append(chr(ord('A') + i - 1))

    # Simplified iterative approach
    from collections import deque
    # Track pegs as stacks
    pegs = {
        'A': list(range(n, 0, -1)),
        'B': [],
        'C': []
    }

    total_moves = 2 ** n - 1
    from_even = [('A', 'C'), ('A', 'B'), ('B', 'C')]
    from_odd = [('A', 'B'), ('A', 'C'), ('B', 'C')]

    for move_num in range(1, total_moves + 1):
        if n % 2 == 0:
            moves_pair = from_even[(move_num - 1) % 3]
        else:
            moves_pair = from_odd[(move_num - 1) % 3]

        src, dst = moves_pair
        if not pegs[src]:
            # Find the other non-empty peg
            for peg in ['A', 'B', 'C']:
                if peg != src and peg != dst and pegs[peg]:
                    src = peg
                    break
        elif not pegs[dst] or pegs[src][-1] < pegs[dst][-1]:
            disk = pegs[src].pop()
            pegs[dst].append(disk)
            print(f"Move disk {disk} from {src} to {dst}")
        else:
            # Swap: move smaller disk back to free the larger one
            disk = pegs[dst].pop()
            pegs[src].append(disk)
            print(f"Move disk {disk} from {dst} to {src}")

if __name__ == "__main__":
    tower_of_hanoi_iterative(3)
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| Time Complexity | O(2^n) - The recurrence T(n) = 2T(n-1) + 1 solves to 2^n - 1 |
| Space Complexity | O(n) - Recursive call stack depth |
| Minimum Moves Required | 2^n - 1 |

For 64 disks (the classic legend), the minimum number of moves is 2^64 - 1, which at one move per second would take approximately 584 billion years.

## Applications

1. **Recursive Thinking** - Demonstrates how complex problems can be broken down into simpler subproblems.
2. **Stack Data Structure** - The recursive solution is essentially managing a stack of calls.
3. **Disk Scheduling** - Similar principles apply in some disk scheduling algorithms.
4. **Mathematical Induction** - Used to prove formulas for recurrence relations.

## Practice Problems

1. Count the minimum number of moves required to transfer N disks from source to destination.
2. Given the move number K, determine which disk is moved.
3. Given the current state of pegs, determine if it is a valid intermediate state.
4. Implement Tower of Hanoi with 4 pegs (reve's puzzle) - known Frame-Stewart algorithm.
