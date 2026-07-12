---
id: worst-fit-memory-allocation
title: Worst Fit Memory Allocation Strategy
sidebar_label: Worst Fit
sidebar_position: 3
description: Worst Fit is a memory allocation strategy that selects the largest available block of memory that is large enough to satisfy the allocation request.
tags: [Memory Management, Memory Allocation, Worst Fit, Operating System]
---

# Worst Fit Memory Allocation Strategy

## 1. Introduction

**Worst Fit** is a memory allocation strategy that allocates a process to the **largest available memory block** that is big enough to accommodate it. It is the opposite of the Best Fit strategy.

The underlying philosophy is that by choosing the largest block, the leftover memory portion (fragmentation) will also be large. A large leftover space is much more likely to be useful for satisfying future memory requests than the tiny leftover spaces left behind by Best Fit. However, like Best Fit, this algorithm requires scanning all blocks, and it can quickly use up large blocks that might be needed by bigger incoming processes.

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

1. Initialize `worst_block_index` as `-1`.
2. Traverse all the available memory blocks in the list.
3. For each block, if the block is free and its size is greater than or equal to the process size:
   - If `worst_block_index` is `-1` (first candidate found), or if the current block's size is larger than the block size at `worst_block_index`:
     - Update `worst_block_index` to the current block's index.
4. After traversing all blocks:
   - If `worst_block_index` is not `-1`, allocate the process to the block at `worst_block_index` and mark it as occupied.
   - If `worst_block_index` is still `-1`, the process cannot be allocated memory at this time.
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
   - The largest suitable block is Block 4.
   - *Result:* Allocate $P_1$ to Block 4.

2. **Allocate $P_2$ ($417 \text{ KB}$):**
   - Block 4 is occupied.
   - Candidate blocks: Block 1 ($500 \text{ KB}$). (Block 0, 2, 3 are too small).
   - The largest suitable block is Block 1.
   - *Result:* Allocate $P_2$ to Block 1.

3. **Allocate $P_3$ ($112 \text{ KB}$):**
   - Blocks 1 and 4 are occupied.
   - Candidate blocks: Block 2 ($200 \text{ KB}$), Block 3 ($300 \text{ KB}$). (Block 0 is too small).
   - The largest suitable block is Block 3.
   - *Result:* Allocate $P_3$ to Block 3.

4. **Allocate $P_4$ ($426 \text{ KB}$):**
   - Blocks 1, 3, and 4 are occupied.
   - Candidate blocks: None (Block 0 is $100\text{ KB}$ and Block 2 is $200\text{ KB}$, both too small).
   - *Result:* $P_4$ cannot be allocated.

### Summary Table

| Process | Process Size (KB) | Allocated Block | Block Size (KB) | Remaining / Internal Fragmentation |
|:-------:|:-----------------:|:---------------:|:---------------:|:----------------------------------:|
|  $P_1$  |        212        |     Block 4     |       600       |               388 KB               |
|  $P_2$  |        417        |     Block 1     |       500       |               83 KB                |
|  $P_3$  |        112        |     Block 3     |       300       |               188 KB               |
|  $P_4$  |        426        |  Not Allocated  |        -        |                 -                  |

---

## 4. Advantages & Disadvantages

### Advantages
- **Larger Leftover Blocks:** Leftover space is typically large enough to accommodate future processes, reducing the problem of tiny, useless memory fragments.
- **Fair Layout:** Reduces chances of generating tiny fragments.

### Disadvantages
- **Slower Execution:** The algorithm must traverse the entire list of blocks to find the worst match (largest block) unless sorted.
- **Consumes Large Blocks Early:** Large blocks that could be critical for very large processes later are used up by smaller processes.

---

## 5. Implementations

Here are the implementations of the Worst Fit memory allocation algorithm using a fixed partition policy (where a block can hold at most one process).

### Python Implementation

```python
def worst_fit(block_sizes, process_sizes):
    """
    Allocates memory blocks to processes using the Worst Fit strategy.
    
    :param block_sizes: List of integers representing memory block sizes.
    :param process_sizes: List of integers representing process size requirements.
    :return: List of allocation indices (block index assigned to each process).
    """
    blocks = list(block_sizes)
    num_blocks = len(blocks)
    allocation = [-1] * len(process_sizes)
    block_occupied = [False] * num_blocks

    for i, process_size in enumerate(process_sizes):
        worst_idx = -1
        for j in range(num_blocks):
            if not block_occupied[j] and blocks[j] >= process_size:
                if worst_idx == -1 or blocks[j] > blocks[worst_idx]:
                    worst_idx = j
                    
        # If a suitable block was found
        if worst_idx != -1:
            allocation[i] = worst_idx
            block_occupied[worst_idx] = True
            
    return allocation

# Example Usage
if __name__ == "__main__":
    block_sizes = [100, 500, 200, 300, 600]
    process_sizes = [212, 417, 112, 426]
    
    allocations = worst_fit(block_sizes, process_sizes)
    
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
 * Allocates memory blocks to processes using the Worst Fit strategy.
 * 
 * @param blockSizes Vector containing sizes of memory blocks.
 * @param processSizes Vector containing memory requirements of processes.
 */
void worstFit(std::vector<int> blockSizes, const std::vector<int>& processSizes) {
    int numProcesses = processSizes.size();
    int numBlocks = blockSizes.size();
    
    std::vector<int> allocation(numProcesses, -1);
    std::vector<bool> blockOccupied(numBlocks, false);

    for (int i = 0; i < numProcesses; i++) {
        int worstIdx = -1;
        for (int j = 0; j < numBlocks; j++) {
            if (!blockOccupied[j] && blockSizes[j] >= processSizes[i]) {
                if (worstIdx == -1 || blockSizes[j] > blockSizes[worstIdx]) {
                    worstIdx = j;
                }
            }
        }

        // If a suitable block was found
        if (worstIdx != -1) {
            allocation[i] = worstIdx;
            blockOccupied[worstIdx] = true;
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

    worstFit(blockSizes, processSizes);

    return 0;
}
```
