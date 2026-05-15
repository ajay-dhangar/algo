---
id: python-cheatsheet
title: Python Cheatsheet
sidebar_label: Python Cheatsheet
sidebar_position: 1
description: "A fast, practical Python reference for DSA and competitive programming."
tags: [python, cheatsheet, dsa]
---

This page is a quick reference for Python concepts and methods that show up constantly in DSA and competitive programming. If you're just starting out, don't worry, every snippet here is explained line by line 😊

## Core Syntax

### Swap, Unpacking, Multiple Assignment

```py
a, b = b, a                           # Swaps a and b without a temp variable
x, y, z = 1, 2, 3                     # Assigns 1->x, 2->y, 3->z
first, *mid, last = [10, 20, 30, 40]  # first=10, mid=[20,30], last=40
```

### Ternary Operator

```py
ans = x if x > y else y  # Returns x if x > y, otherwise returns y
```

## Built-ins Functions

### `zip`, `enumerate`

```py
for i, v in enumerate(arr):  # i=index (0,1,2...), v=value (arr[0],arr[1],...)
    pass

for a, b in zip(A, B):       # Pairs elements from A and B, stops at shortest
    pass
```

### `map`, `filter`

```py
nums = list(map(int, input().split()))          # Reads space-separated integers from input, e.g "1 2 3" -> [1, 2, 3]
evens = list(filter(lambda n: n % 2 == 0, nums)) # Keeps only even numbers, e.g [1,2,3,4] -> [2,4]
```

### `sorted`, `reversed`

```py
sorted_nums = sorted(nums)                      # Returns a new sorted list, original unchanged
sorted_by_key = sorted(pairs, key=lambda p: p[1]) # Sorts pairs by second element

for x in reversed(nums):                        # Iterates in reverse order without creating a new list
    pass
```

### `any`, `all`, `sum`, `round`

```py
ok = any(x < 0 for x in nums)   # Returns True if at least one element is negative
ok2 = all(x >= 0 for x in nums) # Returns True if all elements are non-negative
s = sum(nums)                    # Returns sum of all elements
r = round(3.14159, 2)            # Rounds to 2 decimal places, i.e r = 3.14
```

## Comprehensions

### Creating/Manipulating List / Set / Dictionary with Conditions

```py
squares = [x * x for x in range(10)]              # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
evens = [x for x in range(20) if x % 2 == 0]      # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
unique = {c.lower() for c in "AaBbCC"}             # {'a', 'b', 'c'} — duplicates removed
pos = {i: v for i, v in enumerate(nums) if v > 0} # Dict of index->value for positive elements only
```

## `collections` (Main concepts/functions for DSA)

```py
from collections import defaultdict, Counter, deque, namedtuple
```

### `defaultdict`

```py
g = defaultdict(list) # Returns [] for missing keys instead of raising KeyError
g[u].append(v)        # Safe to append without checking if key exists first
```

### `Counter`

```py
freq = Counter("banana")   # Counts occurrences: {'a':3, 'n':2, 'b':1}
top = freq.most_common(2)  # Returns top 2 most frequent: [('a', 3), ('n', 2)]
```

### `deque` (O(1) pops from both ends)

```py
q = deque([1, 2, 3]) # deque = [1, 2, 3]
q.append(4)          # Add to right,  deque = [1, 2, 3, 4]
q.appendleft(0)      # Add to left,   deque = [0, 1, 2, 3, 4]
q.pop()              # Remove right,  deque = [0, 1, 2, 3]
q.popleft()          # Remove left,   deque = [1, 2, 3]
```

### `namedtuple`

```py
Point = namedtuple("Point", ["x", "y"]) # Creates a lightweight class with fields x and y
p = Point(2, 5)                         # p.x = 2, p.y = 5
```

## Strings

### Formatting (f-strings)

```py
name = "Ada"
score = 42
msg = f"{name} scored {score}" # msg = "Ada scored 42"
```

### Common Methods: `join`, `split`, `replace`, `strip`

```py
parts = "a,b,c".split(",")              # Splits by comma, parts = ['a', 'b', 'c']
s = "-".join(parts)                     # Joins with dash, s = "a-b-c"
t = "hello world".replace("world", "python") # t = "hello python"
u = "  padded \n".strip()              # Removes leading/trailing whitespace, u = "padded"
```

## Functional Tools

### `lambda`

```py
key_fn = lambda p: (p[0], -p[1]) # Anonymous function: sorts by first element asc, second element desc
```

### `functools.partial`

```py
from functools import partial

def add(a, b):
    return a + b

add10 = partial(add, 10) # Fixes first argument as 10
add10(5)                 # i.e 10 + 5 = 15
```

### `lru_cache` (Memoization)

```py
from functools import lru_cache

@lru_cache(maxsize=None) # Caches results of previous calls, avoids recomputation
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2) # fib(5) -> 5, computed once and cached
```

## Iteration Patterns (`itertools`)

```py
import itertools as it
```

### `combinations`, `permutations`, `product`

```py
list(it.combinations([1, 2, 3, 4], 2)) # All 2-element combos (order doesn't matter): [(1,2),(1,3),...]
list(it.permutations([1, 2, 3], 2))    # All 2-element arrangements (order matters): [(1,2),(1,3),...]
list(it.product([0, 1], repeat=3))     # Cartesian product: [(0,0,0),(0,0,1),(0,1,0),...]
```

## Error Handling and Context Managers

### `try/except/finally`

```py
try:
    x = int("42")  # Attempts to parse string to int
except ValueError:
    x = 0          # Runs if parsing fails
finally:
    pass           # Always runs regardless of exception
```

### `with` (Context Managers)

```py
with open("input.txt", "r", encoding="utf-8") as f: # Automatically closes file after block
    data = f.read()                                  # Reads entire file content into data
```

## OOP Basics

### Classes, Inheritance

```py
class Base:
    def ping(self):
        return "base"   # Default implementation

class Child(Base):
    def ping(self):
        return "child"  # Overrides Base's ping()

c = Child()
print(c.ping()) # "child"
```

### Abstract Base Classes (ABC)

```py
from abc import ABC, abstractmethod

class Solver(ABC):
    @abstractmethod
    def solve(self) -> int: # Subclasses must implement solve(), cannot instantiate Solver directly
        raise NotImplementedError
```

### `__slots__` (Memory Optimization)

```py
class Node:
    __slots__ = ("val", "next") # Restricts attributes to only val and next, reduces memory usage
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

n = Node(1)  # n.val = 1, n.next = None
```

## Advanced Topics

### Generators

```py
def gen(n):
    for i in range(n):
        yield i * i  # Yields one value at a time instead of building a full list

list(gen(4))  # [0, 1, 4, 9] — generated lazily
```

### Coroutines (Async Basics)

```py
import asyncio

async def task():
    await asyncio.sleep(0.1) # Non-blocking wait, allows other tasks to run
    return 1
```

### `dataclasses`

```py
from dataclasses import dataclass

@dataclass
class Edge:
    u: int
    v: int
    w: int = 1  # Default weight is 1

e = Edge(0, 1)    # e.u=0, e.v=1, e.w=1
e2 = Edge(0, 1, 5) # e2.u=0, e2.v=1, e2.w=5
```

### Walrus Operator (`:=`)

```py
if (n := len(nums)) > 0:  # Assigns len(nums) to n and checks if > 0 in one step
    avg = sum(nums) / n   # Reuses n without calling len() again
```

