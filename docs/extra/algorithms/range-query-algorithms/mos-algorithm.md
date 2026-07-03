---
id: mos-algorithm
title: "Mo's Algorithm"
sidebar_label: "Mo's Algorithm"
description: "Learn Mo's Algorithm for offline range queries with block decomposition, dry runs, complexity analysis, and implementations in C++, Java, Python, and JavaScript."
sidebar_position: 1
tags:
  - mos-algorithm
  - range-query
  - offline-query
  - sqrt-decomposition
  - algorithms
  - dsa
  - competitive-programming
---

# Mo's Algorithm

**Mo's Algorithm** is an offline range-query technique that answers many queries on a static array by reordering the queries to minimize pointer movement. It is most useful when each answer can be updated quickly after adding or removing one element from the current range.

Typical examples include:

- count distinct elements in each range
- frequency-based answers
- sum of frequency-weighted values
- range mode variants with extra bookkeeping
- problems where prefix sums are not enough because the answer depends on element frequencies

## Video Explanation

<LiteYouTubeEmbed
  id="BJhzd_VG61k"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Square Root Decomposition, Mo's Algorithm"
  lazyLoad={true}
  webp
/>

---

## Problem It Solves

Suppose an array has `n` elements and there are `q` queries:

```text
arr = [1, 2, 1, 3, 2]

queries:
0: [0, 2] -> distinct values in [1, 2, 1]
1: [1, 4] -> distinct values in [2, 1, 3, 2]
2: [2, 4] -> distinct values in [1, 3, 2]
```

A brute-force solution scans every range independently.

```text
Brute force per query: O(range length)
Worst case total:      O(n * q)
```

Mo's Algorithm reduces the total work by keeping one active window `[currentLeft, currentRight]` and moving its endpoints gradually.

---

## Offline vs Online Queries

Mo's Algorithm is an **offline** algorithm.

| Query Type | Meaning | Example |
| --- | --- | --- |
| Online query | Queries must be answered immediately in input order | Interactive systems, live updates |
| Offline query | All queries are known before processing starts | Competitive programming test cases |

Mo's Algorithm sorts queries before answering them. Because of that, it should be used only when the original answer order can be restored using each query's index.

---

## Core Idea

Split the array into blocks of size about `sqrt(n)`.

For every query `[L, R]`:

1. Sort by the block number of `L`.
2. For queries in the same block, sort by `R`.
3. Maintain a current window.
4. Move the current window to match the next query.
5. Use `add(index)` and `remove(index)` to update the current answer.

```text
blockSize = floor(sqrt(n))
block(L) = L / blockSize
```

The sorted order makes nearby queries reuse most of the previous window.

---

## Step-by-Step Dry Run

Use this array and query set:

```text
arr = [1, 2, 1, 3, 2]
queries:
Q0 = [0, 2]
Q1 = [1, 4]
Q2 = [2, 4]
```

For `n = 5`, use `blockSize = 2`.

| Query | L | R | L block |
| --- | ---: | ---: | ---: |
| Q0 | 0 | 2 | 0 |
| Q1 | 1 | 4 | 0 |
| Q2 | 2 | 4 | 1 |

Sorted order by `(L block, R)`:

```text
Q0 [0, 2]
Q1 [1, 4]
Q2 [2, 4]
```

Maintain the current range and a frequency map.

| Step | Target Query | Window Movement | Active Window | Distinct Count |
| --- | --- | --- | --- | ---: |
| 1 | Q0 `[0, 2]` | add 0, add 1, add 2 | `[1, 2, 1]` | 2 |
| 2 | Q1 `[1, 4]` | remove 0, add 3, add 4 | `[2, 1, 3, 2]` | 3 |
| 3 | Q2 `[2, 4]` | remove 1 | `[1, 3, 2]` | 3 |

Final answers are placed back using original query indexes.

```text
Q0 -> 2
Q1 -> 3
Q2 -> 3
```

---

## Algorithm

```text
1. Store each query as (left, right, originalIndex).
2. Choose blockSize = sqrt(n).
3. Sort queries:
   - smaller left block first
   - smaller right endpoint first inside the same block
4. Start with an empty current range:
   currentLeft = 0
   currentRight = -1
5. For each sorted query:
   - expand or shrink currentLeft
   - expand or shrink currentRight
   - update the current answer with add/remove
   - store answer[originalIndex]
```

A common optimization is **serpentine ordering**:

```text
If left block is even, sort R ascending.
If left block is odd, sort R descending.
```

This avoids moving the right pointer back to the beginning for every block.

---

## Complexity

Let:

- `n` be the array length
- `q` be the number of queries
- block size be about `sqrt(n)`

| Operation | Complexity |
| --- | --- |
| Sorting queries | `O(q log q)` |
| Pointer movement | `O((n + q) * sqrt(n))` |
| Add/remove update | Usually `O(1)` |
| Total | `O(q log q + (n + q) * sqrt(n))` |
| Extra space | `O(n + q)` plus frequency storage |

In practice, it is usually described as:

```text
O((n + q) * sqrt(n))
```

when add/remove operations are constant time.

---

## When To Use Mo's Algorithm

Use it when:

- the array is static
- all queries are known before processing
- query answers can be updated by adding/removing one element
- the answer depends on frequencies or other non-trivial range state

Avoid it when:

- queries must be answered online
- the array changes often
- a simple prefix sum can answer the query in `O(1)`
- Fenwick Tree or Segment Tree gives a cleaner `O(log n)` solution
- add/remove operations are expensive

---

## Comparison With Other Range Query Techniques

| Technique | Best For | Updates | Query Time | Notes |
| --- | --- | --- | --- | --- |
| Prefix Sum | Static range sum | No | `O(1)` | Simple and fastest for sums |
| Difference Array | Batch range updates | Offline only | `O(1)` after build | Great for range increments |
| Fenwick Tree | Prefix/range sums | Yes | `O(log n)` | Compact and fast |
| Segment Tree | Flexible associative queries | Yes | `O(log n)` | Good for min, max, sum, gcd |
| Mo's Algorithm | Offline frequency-based queries | Usually no | About `O(sqrt(n))` amortized | Great when add/remove is easy |

---

## Implementation: Count Distinct Elements In Range

The following implementations answer each query `[L, R]` using **0-based inclusive indexes**.

### C++

```cpp
#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

struct Query {
    int left;
    int right;
    int index;
    int block;
};

vector<int> countDistinctMo(const vector<int>& arr, const vector<pair<int, int>>& ranges) {
    int n = static_cast<int>(arr.size());
    int q = static_cast<int>(ranges.size());
    int blockSize = max(1, static_cast<int>(sqrt(n)));

    vector<int> values = arr;
    sort(values.begin(), values.end());
    values.erase(unique(values.begin(), values.end()), values.end());

    vector<int> compressed(n);
    for (int i = 0; i < n; i++) {
        compressed[i] = lower_bound(values.begin(), values.end(), arr[i]) - values.begin();
    }

    vector<Query> queries;
    for (int i = 0; i < q; i++) {
        queries.push_back({ranges[i].first, ranges[i].second, i, ranges[i].first / blockSize});
    }

    sort(queries.begin(), queries.end(), [](const Query& a, const Query& b) {
        if (a.block != b.block) {
            return a.block < b.block;
        }

        if (a.block % 2 == 0) {
            return a.right < b.right;
        }
        return a.right > b.right;
    });

    vector<int> frequency(values.size(), 0);
    vector<int> answer(q);
    int currentLeft = 0;
    int currentRight = -1;
    int distinct = 0;

    auto add = [&](int position) {
        int value = compressed[position];
        if (frequency[value] == 0) {
            distinct++;
        }
        frequency[value]++;
    };

    auto remove = [&](int position) {
        int value = compressed[position];
        frequency[value]--;
        if (frequency[value] == 0) {
            distinct--;
        }
    };

    for (const Query& query : queries) {
        while (currentLeft > query.left) {
            add(--currentLeft);
        }
        while (currentRight < query.right) {
            add(++currentRight);
        }
        while (currentLeft < query.left) {
            remove(currentLeft++);
        }
        while (currentRight > query.right) {
            remove(currentRight--);
        }

        answer[query.index] = distinct;
    }

    return answer;
}

int main() {
    vector<int> arr = {1, 2, 1, 3, 2};
    vector<pair<int, int>> queries = {{0, 2}, {1, 4}, {2, 4}};

    vector<int> result = countDistinctMo(arr, queries);

    for (int value : result) {
        cout << value << '\n';
    }

    return 0;
}
```

### Java

```java
import java.util.*;

public class MosAlgorithm {
    static class Query {
        int left;
        int right;
        int index;
        int block;

        Query(int left, int right, int index, int block) {
            this.left = left;
            this.right = right;
            this.index = index;
            this.block = block;
        }
    }

    static int[] countDistinctMo(int[] arr, int[][] ranges) {
        int n = arr.length;
        int q = ranges.length;
        int blockSize = Math.max(1, (int) Math.sqrt(n));

        int[] sortedValues = arr.clone();
        Arrays.sort(sortedValues);

        int uniqueCount = 0;
        for (int value : sortedValues) {
            if (uniqueCount == 0 || sortedValues[uniqueCount - 1] != value) {
                sortedValues[uniqueCount++] = value;
            }
        }

        int[] uniqueValues = Arrays.copyOf(sortedValues, uniqueCount);
        int[] compressed = new int[n];
        for (int i = 0; i < n; i++) {
            compressed[i] = Arrays.binarySearch(uniqueValues, arr[i]);
        }

        Query[] queries = new Query[q];
        for (int i = 0; i < q; i++) {
            queries[i] = new Query(ranges[i][0], ranges[i][1], i, ranges[i][0] / blockSize);
        }

        Arrays.sort(queries, (a, b) -> {
            if (a.block != b.block) {
                return Integer.compare(a.block, b.block);
            }

            if (a.block % 2 == 0) {
                return Integer.compare(a.right, b.right);
            }
            return Integer.compare(b.right, a.right);
        });

        int[] frequency = new int[uniqueCount];
        int[] answer = new int[q];
        int currentLeft = 0;
        int currentRight = -1;
        int distinct = 0;

        for (Query query : queries) {
            while (currentLeft > query.left) {
                int value = compressed[--currentLeft];
                if (frequency[value] == 0) {
                    distinct++;
                }
                frequency[value]++;
            }

            while (currentRight < query.right) {
                int value = compressed[++currentRight];
                if (frequency[value] == 0) {
                    distinct++;
                }
                frequency[value]++;
            }

            while (currentLeft < query.left) {
                int value = compressed[currentLeft++];
                frequency[value]--;
                if (frequency[value] == 0) {
                    distinct--;
                }
            }

            while (currentRight > query.right) {
                int value = compressed[currentRight--];
                frequency[value]--;
                if (frequency[value] == 0) {
                    distinct--;
                }
            }

            answer[query.index] = distinct;
        }

        return answer;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 1, 3, 2};
        int[][] queries = {{0, 2}, {1, 4}, {2, 4}};

        int[] result = countDistinctMo(arr, queries);
        for (int value : result) {
            System.out.println(value);
        }
    }
}
```

### Python

```python
from math import sqrt


def count_distinct_mo(arr, ranges):
    n = len(arr)
    q = len(ranges)
    block_size = max(1, int(sqrt(n)))

    compressed_values = {value: idx for idx, value in enumerate(sorted(set(arr)))}
    compressed = [compressed_values[value] for value in arr]

    queries = []
    for idx, (left, right) in enumerate(ranges):
        queries.append((left, right, idx))

    def query_key(query):
        left, right, _ = query
        block = left // block_size
        return (block, right if block % 2 == 0 else -right)

    queries.sort(key=query_key)

    frequency = [0] * len(compressed_values)
    answer = [0] * q
    current_left = 0
    current_right = -1
    distinct = 0

    def add(position):
        nonlocal distinct
        value = compressed[position]
        if frequency[value] == 0:
            distinct += 1
        frequency[value] += 1

    def remove(position):
        nonlocal distinct
        value = compressed[position]
        frequency[value] -= 1
        if frequency[value] == 0:
            distinct -= 1

    for left, right, index in queries:
        while current_left > left:
            current_left -= 1
            add(current_left)

        while current_right < right:
            current_right += 1
            add(current_right)

        while current_left < left:
            remove(current_left)
            current_left += 1

        while current_right > right:
            remove(current_right)
            current_right -= 1

        answer[index] = distinct

    return answer


arr = [1, 2, 1, 3, 2]
queries = [(0, 2), (1, 4), (2, 4)]
print(count_distinct_mo(arr, queries))
```

### JavaScript

```javascript
function countDistinctMo(arr, ranges) {
  const n = arr.length;
  const q = ranges.length;
  const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));

  const uniqueValues = [...new Set(arr)].sort((a, b) => a - b);
  const compressedMap = new Map();
  uniqueValues.forEach((value, index) => compressedMap.set(value, index));

  const compressed = arr.map((value) => compressedMap.get(value));
  const queries = ranges.map(([left, right], index) => ({
    left,
    right,
    index,
    block: Math.floor(left / blockSize),
  }));

  queries.sort((a, b) => {
    if (a.block !== b.block) {
      return a.block - b.block;
    }

    return a.block % 2 === 0 ? a.right - b.right : b.right - a.right;
  });

  const frequency = Array(uniqueValues.length).fill(0);
  const answer = Array(q).fill(0);
  let currentLeft = 0;
  let currentRight = -1;
  let distinct = 0;

  function add(position) {
    const value = compressed[position];
    if (frequency[value] === 0) {
      distinct++;
    }
    frequency[value]++;
  }

  function remove(position) {
    const value = compressed[position];
    frequency[value]--;
    if (frequency[value] === 0) {
      distinct--;
    }
  }

  for (const query of queries) {
    while (currentLeft > query.left) {
      add(--currentLeft);
    }

    while (currentRight < query.right) {
      add(++currentRight);
    }

    while (currentLeft < query.left) {
      remove(currentLeft++);
    }

    while (currentRight > query.right) {
      remove(currentRight--);
    }

    answer[query.index] = distinct;
  }

  return answer;
}

const arr = [1, 2, 1, 3, 2];
const queries = [
  [0, 2],
  [1, 4],
  [2, 4],
];

console.log(countDistinctMo(arr, queries));
```

---

## Customizing Add And Remove

The algorithm skeleton stays the same. Only the `add` and `remove` functions change.

For range sum:

```text
add(i):    currentSum += arr[i]
remove(i): currentSum -= arr[i]
```

For count distinct:

```text
add(i):
  freq[arr[i]]++
  if freq[arr[i]] becomes 1, distinct++

remove(i):
  freq[arr[i]]--
  if freq[arr[i]] becomes 0, distinct--
```

For frequency-weighted answers, such as sum of `value * frequency(value)^2`, update the contribution before and after changing frequency.

---

## Common Mistakes

- Forgetting to store the original query index before sorting.
- Mixing 0-based and 1-based ranges.
- Using Mo's Algorithm for queries that can be solved with prefix sums.
- Choosing a block size of `0` when `n` is small.
- Forgetting to coordinate-compress large or negative values before using a frequency array.
- Making `add` and `remove` asymmetric.
- Returning answers in sorted-query order instead of original input order.

---

## Practice Problems

Try these problem types after learning the basics:

- Count distinct elements in a range
- Sum of values multiplied by squared frequency in a range
- Number of equal pairs in a range
- Range frequency queries on a static array
- Offline queries with add/remove state transitions

Examples to search for:

- SPOJ DQUERY
- Codeforces 86D - Powerful Array
- CSES Distinct Values Queries
- Codeforces 617E - XOR and Favorite Number

---

## Key Takeaways

- Mo's Algorithm is for offline range queries on static arrays.
- It reorders queries to reduce total pointer movement.
- It works best when adding or removing one element updates the answer quickly.
- It is not a replacement for Prefix Sum, Fenwick Tree, or Segment Tree; it is useful when those structures do not model the query state cleanly.
