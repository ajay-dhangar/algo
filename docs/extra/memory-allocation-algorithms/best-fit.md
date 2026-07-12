---
id: best-fit-memory-allocation
title: Best Fit Memory Allocation Strategy
sidebar_label: Best Fit
sidebar_position: 2
description: Best Fit is a memory allocation strategy that selects the smallest available block of memory that is large enough to satisfy the allocation request.
tags: [Memory Management, Memory Allocation, Best Fit, Operating System]
---

# Best Fit Memory Allocation Strategy

## 1. Introduction

**Best Fit** is a memory allocation strategy designed to minimize wasted memory space (fragmentation). Unlike First Fit, which allocates the first suitable block it encounters, Best Fit scans the entire list of free memory blocks and selects the **smallest block** that is large enough to satisfy the allocation request.

By choosing the closest-sized block, this strategy attempts to preserve larger memory blocks for processes that might require them later. However, searching the entire list increases the overhead, and it can leave behind very small, unusable fragments of memory.

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

1. Initialize `best_block_index` as `-1`.
2. Traverse all the available memory blocks in the list.
3. For each block, if the block is free and its size is greater than or equal to the process size:
   - If `best_block_index` is `-1` (first candidate found), or if the current block's size is smaller than the block size at `best_block_index`:
     - Update `best_block_index` to the current block's index.
4. After traversing all blocks:
   - If `best_block_index` is not `-1`, allocate the process to the block at `best_block_index` and mark it as occupied.
   - If `best_block_index` is still `-1`, the process cannot be allocated memory at this time.
5. Repeat for all requesting processes.

---

## 3. Walkthrough Example

Consider a system with 5 memory blocks and 4 processes requesting memory in order. We assume a **fixed partitioning scheme** where each block can hold at most one process.

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
   - Candidate blocks: Block 1 ($500 \text{ KB}$), Block 3 ($300 \text{ KB}$), Block 4 ($600 \text{ KB}$).
   - The smallest suitable block is Block 3.
   - *Result:* Allocate $P_1$ to Block 3.

2. **Allocate $P_2$ ($417 \text{ KB}$):**
   - Block 3 is occupied.
   - Candidate blocks: Block 1 ($500 \text{ KB}$), Block 4 ($600 \text{ KB}$).
   - The smallest suitable block is Block 1.
   - *Result:* Allocate $P_2$ to Block 1.

3. **Allocate $P_3$ ($112 \text{ KB}$):**
   - Blocks 1 and 3 are occupied.
   - Candidate blocks: Block 2 ($200 \text{ KB}$), Block 4 ($600 \text{ KB}$). (Block 0 is $100\text{ KB}$ and too small).
   - The smallest suitable block is Block 2.
   - *Result:* Allocate $P_3$ to Block 2.

4. **Allocate $P_4$ ($426 \text{ KB}$):**
   - Blocks 1, 2, and 3 are occupied.
   - Candidate blocks: Block 4 ($600 \text{ KB}$).
   - *Result:* Allocate $P_4$ to Block 4.

### Summary Table

| Process | Process Size (KB) | Allocated Block | Block Size (KB) | Remaining / Internal Fragmentation |
|:-------:|:-----------------:|:---------------:|:---------------:|:----------------------------------:|
|  $P_1$  |        212        |     Block 3     |       300       |               88 KB                |
|  $P_2$  |        417        |     Block 1     |       500       |               83 KB                |
|  $P_3$  |        112        |     Block 2     |       200       |               88 KB                |
|  $P_4$  |        426        |     Block 4     |       600       |               174 KB               |

*Notice:* Under Best Fit, all processes were allocated successfully, whereas First Fit failed to allocate $P_4$.

---

## 4. Advantages & Disadvantages

### Advantages
- **Better Memory Utilization:** Tends to make better decisions by utilizing the smallest possible blocks, which preserves larger blocks for subsequent bigger processes.
- **Reduces Fragmentation for Large Blocks:** Prevents large blocks from being split or wasted on small processes.

### Disadvantages
- **Slower Execution:** The algorithm must traverse the entire list of blocks to find the best match (unless the list is kept pre-sorted).
- **Tiny Fragments ("Holes"):** Leaves behind tiny leftover slots of memory that are too small to satisfy any future process request (causing high fragmentation of tiny chunks).

---

## 5. Implementations

Here are the implementations of the Best Fit memory allocation algorithm using a fixed partition policy (where a block can hold at most one process).

### Python Implementation

```python
def best_fit(block_sizes, process_sizes):
    """
    Allocates memory blocks to processes using the Best Fit strategy.
    
    :param block_sizes: List of integers representing memory block sizes.
    :param process_sizes: List of integers representing process size requirements.
    :return: List of allocation indices (block index assigned to each process).
    """
    blocks = list(block_sizes)
    num_blocks = len(blocks)
    allocation = [-1] * len(process_sizes)
    block_occupied = [False] * num_blocks

    for i, process_size in enumerate(process_sizes):
        best_idx = -1
        for j in range(num_blocks):
            if not block_occupied[j] and blocks[j] >= process_size:
                if best_idx == -1 or blocks[j] < blocks[best_idx]:
                    best_idx = j
                    
        # If a suitable block was found
        if best_idx != -1:
            allocation[i] = best_idx
            block_occupied[best_idx] = True
            
    return allocation

# Example Usage
if __name__ == "__main__":
    block_sizes = [100, 500, 200, 300, 600]
    process_sizes = [212, 417, 112, 426]
    
    allocations = best_fit(block_sizes, process_sizes)
    
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
 * Allocates memory blocks to processes using the Best Fit strategy.
 * 
 * @param blockSizes Vector containing sizes of memory blocks.
 * @param processSizes Vector containing memory requirements of processes.
 */
void bestFit(std::vector<int> blockSizes, const std::vector<int>& processSizes) {
    int numProcesses = processSizes.size();
    int numBlocks = blockSizes.size();
    
    std::vector<int> allocation(numProcesses, -1);
    std::vector<bool> blockOccupied(numBlocks, false);

    for (int i = 0; i < numProcesses; i++) {
        int bestIdx = -1;
        for (int j = 0; j < numBlocks; j++) {
            if (!blockOccupied[j] && blockSizes[j] >= processSizes[i]) {
                if (bestIdx == -1 || blockSizes[j] < blockSizes[bestIdx]) {
                    bestIdx = j;
                }
            }
        }

        // If a suitable block was found
        if (bestIdx != -1) {
            allocation[i] = bestIdx;
            blockOccupied[bestIdx] = true;
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

    bestFit(blockSizes, processSizes);

    return 0;
}
```
