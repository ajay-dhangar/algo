---
id: reservoir-sampling
title: Reservoir Sampling Algorithm
sidebar_label: Reservoir Sampling
sidebar_position: 2
description: A comprehensive guide to Reservoir Sampling algorithms for selecting random samples from large data streams.
tags: [dsa, randomized-algorithms, sampling, data-streams, probability]
---

## Introduction

**Reservoir Sampling** is a family of randomized algorithms used to select a random sample of `k` items from a stream of `n` items where `n` is either unknown or extremely large (so large that it does not fit in memory).

The key challenge: we cannot store all `n` items, and we do not know `n` in advance.

## Problem Statement

Given a stream of unknown size `n`, select `k` items such that each item in the stream has an equal probability `k/n` of being selected.

## Algorithm R (Simple Reservoir Sampling)

Algorithm R is the simplest reservoir sampling approach:

1. Store the first `k` items in the reservoir.
2. For each subsequent item `i` (where `i > k`), generate a random number `j` from `1` to `i`.
3. If `j <= k`, replace item `j` in the reservoir with item `i`.
4. Continue until the stream ends.

### Proof of Correctness

Each item `i` (for `i > k`) has probability `k/i` of being selected. The probability that it survives to the end is:

```
P(survives) = k/(i) * (i+1)/(i+1) * ... * n/n = k/n
```

This proves that each item has an equal probability of being in the final reservoir.

### Implementation in Python

```python
import random

def reservoir_sampling(stream, k):
    """
    Select k items uniformly at random from a stream.
    stream: iterable of items
    k: size of the reservoir
    """
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            # Generate random number in range [0, i]
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir

# Example usage
data_stream = range(1, 100001)  # Numbers 1 to 100000
sample = reservoir_sampling(data_stream, 5)
print("Random sample:", sample)
```

### Implementation in C

```c
#include <stdlib.h>
#include <time.h>

void reservoir_sampling(int* stream, int n, int* reservoir, int k) {
    // Store first k elements
    for (int i = 0; i < k && i < n; i++) {
        reservoir[i] = stream[i];
    }

    // Process remaining elements
    for (int i = k; i < n; i++) {
        int j = rand() % (i + 1);  // Random number in [0, i]
        if (j < k) {
            reservoir[j] = stream[i];
        }
    }
}
```

## Algorithm L (LLRR Algorithm)

Algorithm L provides a more efficient solution for large reservoirs. It computes the distance between selected items using a geometric distribution.

### Algorithm

1. Select the first `k` items for the reservoir.
2. Calculate a skip distance `d` from a geometric distribution with probability `k/(i + k - 1)` for the (i+k)-th element.
3. Skip `d` elements and add the next element to the reservoir.
4. Repeat.

### Implementation in Python

```python
import random
import math

def reservoir_sampling_l(stream, k):
    """Algorithm L for reservoir sampling."""
    reservoir = []
    it = iter(stream)

    # Fill the reservoir with first k items
    for item in it:
        reservoir.append(item)
        if len(reservoir) == k:
            break

    # Use a random start
    w = math.exp(random.uniform(0, 1) / k)
    n = k

    for item in it:
        n += 1
        # Skip count: floor(ln(uniform(0,1))/ln(1-p)) where p = k/n
        skip = int(math.log(random.uniform(0, 1)) / math.log(1 - k/n))
        for _ in range(skip):
            try:
                next(it)
            except StopIteration:
                return reservoir
        try:
            next(it)  # skip the computed number of items
        except StopIteration:
            break
        reservoir[random.randint(0, k - 1)] = item
        n += 1

    return reservoir
```

## Weighted Reservoir Sampling

When each item has an associated weight (importance), use weighted reservoir sampling.

### Algorithm (A-Chao)

1. Store first `k` items with their weights.
2. For each new item with weight `w`, generate a random key `key = random()^(1/w)`.
3. If the new key is larger than the smallest key in the reservoir, replace that item.

```python
import random
import heapq

def weighted_reservoir_sampling(stream, k):
    """Weighted reservoir sampling using exponential sketches."""
    reservoir = []
    min_heap = []  # (key, weight, item)

    for item, weight in stream:
        key = random.random() ** (1.0 / weight)
        if len(reservoir) < k:
            heapq.heappush(min_heap, (key, weight, item))
            reservoir.append((item, weight))
        elif key > min_heap[0][0]:
            heapq.heapreplace(min_heap, (key, weight, item))
            reservoir[0] = (item, weight) if min_heap[0][0] == key else reservoir[0]

    return [item for item, _ in reservoir]
```

## Time and Space Complexity

| Algorithm | Time per Element | Space |
|-----------|------------------|-------|
| Algorithm R | O(1) | O(k) |
| Algorithm L | O(1) amortized | O(k) |
| Weighted | O(log k) | O(k) |

## Real-World Applications

1. **Database Query Sampling** - Sampling rows from large database tables.
2. **Social Media Analytics** - Analyzing random samples of tweets/posts.
3. **Network Monitoring** - Random packet sampling in high-speed networks.
4. **Machine Learning** - Mini-batch selection for online learning.
5. **Search Engine Indexing** - Sampling documents for quality assessment.

## Practice Problems

1. Implement Algorithm R to sample 10 elements from a stream of 1 million integers.
2. Modify Algorithm R to sample elements with weights.
3. Given a stream of unknown size, find the median of sampled elements.
4. Implement distributed reservoir sampling for parallel streams.
