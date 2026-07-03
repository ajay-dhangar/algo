---
id: suffix-automaton
title: "Suffix Automaton Algorithm"
sidebar_label: "Suffix Automaton"
sidebar_position: 10
description: "Directed Acyclic Word Graph (DAWG) for linear time substring operations."
tags: [string, pattern matching, suffix automaton, competitive programming]
---

## Suffix Automaton (DAWG)

A **Suffix Automaton** is a powerful directed acyclic word graph representing all suffixes of a given string in linear time and space.

### Video Explanation

<LiteYouTubeEmbed
  id="hTN5U7fY5hU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="But what is Suffix Automaton"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## Complexity

- **Construction Time:** O(N)
- **Space Complexity:** O(N)

## Implementation (Python)

```python
class SuffixAutomaton:
    class State:
        def __init__(self, length=0, link=-1):
            self.len = length
            self.link = link
            self.next = {}

    def __init__(self, s=""):
        self.st = [self.State(0, -1)]
        self.sz = 1
        self.last = 0
        for char in s:
            self.extend(char)

    def extend(self, char):
        cur = self.sz
        self.sz += 1
        self.st.append(self.State(self.st[self.last].len + 1))
        
        p = self.last
        while p != -1 and char not in self.st[p].next:
            self.st[p].next[char] = cur
            p = self.st[p].link
            
        if p == -1:
            self.st[cur].link = 0
        else:
            q = self.st[p].next[char]
            if self.st[p].len + 1 == self.st[q].len:
                self.st[cur].link = q
            else:
                clone = self.sz
                self.sz += 1
                self.st.append(self.State(self.st[p].len + 1, self.st[q].link))
                self.st[clone].next = self.st[q].next.copy()
                
                while p != -1 and self.st[p].next.get(char) == q:
                    self.st[p].next[char] = clone
                    p = self.st[p].link
                    
                self.st[q].link = self.st[cur].link = clone
        self.last = cur

    def contains(self, pattern):
        curr = 0
        for char in pattern:
            if char not in self.st[curr].next:
                return False
            curr = self.st[curr].next[char]
        return True

# Example usage:
# sa = SuffixAutomaton("abbb")
# print(sa.contains("bb")) # True
# print(sa.contains("aba")) # False
```
