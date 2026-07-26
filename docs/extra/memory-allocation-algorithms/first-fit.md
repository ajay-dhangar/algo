---
id: first-fit-memory-allocation
title: First Fit Memory Allocation Strategy
sidebar_label: First Fit
sidebar_position: 1
description: First Fit is a memory allocation strategy that selects the first available block of memory that is large enough to satisfy the allocation request.
tags: [Memory Management, Memory Allocation, First Fit, Operating System]
---

# First Fit Memory Allocation Strategy

## 1. Introduction

**First Fit** is one of the simplest and fastest memory allocation strategies used by operating systems for memory management. When a process requests a block of memory, the operating system searches the list of free memory blocks from the beginning and allocates the **first block** that is large enough to accommodate the process.

This strategy is highly efficient in terms of search time because it stops searching as soon as it finds a suitable block. However, it can lead to significant memory fragmentation over time.

## Video Explanation

<LiteYouTubeEmbed
  id="N3rG_1CEQkQ"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L-5.5: First Fit, Next Fit, Best Fit, Worst fit Memory Allocation | Operating System"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

---

## 2. How It Works

1. Start searching the list of free memory blocks from the very first block.
2. Compare the size of the requesting process with the size of the current block.
3. If the block size is greater than or equal to the process size:
   - Allocate the process to this block.
   - Mark the block as occupied (or update its size if splitting is allowed).
   - Move to the next process.
4. If the block is too small or already occupied, move to the next block in the list.
5. If the search reaches the end of the memory block list without finding a suitable block, the process cannot be allocated memory at this time (it must wait or be placed in a queue).

---

## 3. Walkthrough Example

Consider a system with 5 memory blocks and 4 processes requesting memory in order. We assume a **fixed partitioning scheme** where each block can hold at most one process (any leftover space is internal fragmentation).

### Initial Configuration
- **Memory Blocks:**
  - Block 0: $100 \text{ KB}$
  - Block 1: $500 \text{ KB}$
  - Block 2: $200 \text{ KB}$
  - Block 3: $300 \text{ KB}$
  - Block 4: $600 \text{ KB}$

- **Processes (in arrival order):**
  - $P_1$: $212 \text{ KB}$
  - $P_2$: $417 \text{ KB}$
  - $P_3$: $112 \text{ KB}$
  - $P_4$: $426 \text{ KB}$

### Allocation Steps

1. **Allocate $P_1$ ($212 \text{ KB}$):**
   - Search from Block 0:
     - Block 0 ($100 \text{ KB}$): Too small.
     - Block 1 ($500 \text{ KB}$): Big enough. Allocate $P_1$ to Block 1.
   - *Status:* Block 1 is occupied by $P_1$. Remaining space of $288 \text{ KB}$ in Block 1 is lost as internal fragmentation.

2. **Allocate $P_2$ ($417 \text{ KB}$):**
   - Search from Block 0:
     - Block 0 ($100 \text{ KB}$): Too small.
     - Block 1 ($500 \text{ KB}$): Already occupied.
     - Block 2 ($200 \text{ KB}$): Too small.
     - Block 3 ($300 \text{ KB}$): Too small.
     - Block 4 ($600 \text{ KB}$): Big enough. Allocate $P_2$ to Block 4.
   - *Status:* Block 4 is occupied by $P_2$.

3. **Allocate $P_3$ ($112 \text{ KB}$):**
   - Search from Block 0:
     - Block 0 ($100 \text{ KB}$): Too small.
     - Block 1 ($500 \text{ KB}$): Already occupied.
     - Block 2 ($200 \text{ KB}$): Big enough. Allocate $P_3$ to Block 2.
   - *Status:* Block 2 is occupied by $P_3$.

4. **Allocate $P_4$ ($426 \text{ KB}$):**
   - Search from Block 0:
     - Block 0 ($100 \text{ KB}$): Too small.
     - Block 1 ($500 \text{ KB}$): Occupied.
     - Block 2 ($200 \text{ KB}$): Occupied.
     - Block 3 ($300 \text{ KB}$): Too small.
     - Block 4 ($600 \text{ KB}$): Occupied.
   - *Result:* $P_4$ cannot be allocated memory (Must wait).

### Summary Table

| Process | Process Size (KB) | Allocated Block | Block Size (KB) | Remaining / Internal Fragmentation |
|:-------:|:-----------------:|:---------------:|:---------------:|:----------------------------------:|
|  $P_1$  |        212        |     Block 1     |       500       |               288 KB               |
|  $P_2$  |        417        |     Block 4     |       600       |               183 KB               |
|  $P_3$  |        112        |     Block 2     |       200       |               88 KB                |
|  $P_4$  |        426        |  Not Allocated  |        -        |                 -                  |

---

## 4. Advantages & Disadvantages

### Advantages
- **Fast Execution:** It is the fastest strategy because it doesn't need to scan the entire memory list once a large enough block is found.
- **Simplicity:** Easy to understand, design, and implement.
- **Low Overhead:** Requires minimal computational effort.

### Disadvantages
- **Memory Fragmentation:** Can lead to severe internal and external fragmentation.
- **Hole Accumulation:** Often tends to crowd small processes at the beginning of the memory space, requiring larger processes to search further down the list.

---

## 5. Implementations

Here are the implementations of the First Fit memory allocation algorithm using a fixed partition policy (where a block can hold at most one process).

### Python Implementation

```python
def first_fit(block_sizes, process_sizes):
    """
    Allocates memory blocks to processes using the First Fit strategy.
    
    :param block_sizes: List of integers representing memory block sizes.
    :param process_sizes: List of integers representing process size requirements.
    :return: List of allocation indices (block index assigned to each process).
    """
    # Copy block sizes to avoid modifying the original list
    blocks = list(block_sizes)
    num_blocks = len(blocks)
    
    # Store allocation information (-1 indicates not allocated)
    allocation = [-1] * len(process_sizes)
    
    # Track whether a block is already occupied by a process
    block_occupied = [False] * num_blocks

    for i, process_size in enumerate(process_sizes):
        for j in range(num_blocks):
            # Check if block is free and has enough space
            if not block_occupied[j] and blocks[j] >= process_size:
                # Allocate block j to process i
                allocation[i] = j
                block_occupied[j] = True
                break
                
    return allocation

# Example Usage
if __name__ == "__main__":
    block_sizes = [100, 500, 200, 300, 600]
    process_sizes = [212, 417, 112, 426]
    
    allocations = first_fit(block_sizes, process_sizes)
    
    print("Process No.\tProcess Size\tBlock No.")
    for i, alloc in enumerate(allocations):
        block_str = alloc if alloc != -1 else "Not Allocated"
        print(f"{i + 1}\t\t{process_sizes[i]}\t\t{block_str}")
```

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>

/**
 * Allocates memory blocks to processes using the First Fit strategy.
 * 
 * @param blockSizes Vector containing sizes of memory blocks.
 * @param processSizes Vector containing memory requirements of processes.
 */
void firstFit(std::vector<int> blockSizes, const std::vector<int>& processSizes) {
    int numProcesses = processSizes.size();
    int numBlocks = blockSizes.size();
    
    // Store block allocation details (-1 means not allocated)
    std::vector<int> allocation(numProcesses, -1);
    
    // Keep track of which blocks are already occupied
    std::vector<bool> blockOccupied(numBlocks, false);

    for (int i = 0; i < numProcesses; i++) {
        for (int j = 0; j < numBlocks; j++) {
            // If block is not occupied and is large enough for the process
            if (!blockOccupied[j] && blockSizes[j] >= processSizes[i]) {
                allocation[i] = j;
                blockOccupied[j] = true;
                break; // Move to the next process
            }
        }
    }

    // Print allocation results
    std::cout << "Process No.\tProcess Size\tBlock No.\n";
    for (int i = 0; i < numProcesses; i++) {
        std::cout << " " << i + 1 << "\t\t" << processSizes[i] << "\t\t";
        if (allocation[i] != -1) {
            std::cout << allocation[i] + 1; // 1-based indexing for display
        } else {
            std::cout << "Not Allocated";
        }
        std::cout << "\n";
    }
}

int main() {
    std::vector<int> blockSizes = {100, 500, 200, 300, 600};
    std::vector<int> processSizes = {212, 417, 112, 426};

    firstFit(blockSizes, processSizes);

    return 0;
}
```
