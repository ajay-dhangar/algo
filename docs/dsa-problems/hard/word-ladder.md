---
id: word-ladder
title: Word Ladder
sidebar_label: Word Ladder
description: >-
  Solution for LeetCode 127: Word Ladder, utilizing Breadth-First Search (BFS)
  to find the shortest transformation sequence.
tags:
  - DSA
  - leetcode
  - graph
  - bfs
  - hash-table
companies:
  - Amazon
  - LinkedIn
  - Microsoft
---

## Description:

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
* Every adjacent pair of words differs by a single letter.
* Every $s_i$ for $1 \le i \le k$ is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
* $s_k == endWord$

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *the **number of words** in the shortest transformation sequence from* `beginWord` *to* `endWord`*, or* `0` *if no such sequence exists.*

---

## Video Solution:

<LiteYouTubeEmbed
  id="tRPda0rcf8E"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Word Ladder | Shortest Path | Graph | LeetCode 127"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Breadth-First Search (BFS) (Optimal)

Since we are looking for the **shortest** transformation sequence from a starting state to a target state, Breadth-First Search (BFS) is the ideal algorithm. We can treat each word as a node in a graph, and an edge exists between two words if they differ by exactly one character.

**Algorithm:**
1. **Hash Set for $O(1)$ Lookups:** Convert the given `wordList` into a Hash Set. This allows us to quickly check if a newly formed word exists in our dictionary. If `endWord` is not in this set, we can immediately return `0`.
2. **Queue for BFS:** Initialize a queue that stores the current word and the current sequence length (steps). Start by pushing `(beginWord, 1)`.
3. **Explore Level by Level:**
   - Pop a word from the queue. If it matches `endWord`, return the current step count.
   - For every character in the current word, replace it with all possible lowercase English letters (`'a'` to `'z'`).
   - If the newly formed word exists in our Hash Set, it is a valid transformation.
   - **Crucial Step:** Remove this new word from the Hash Set so we don't visit it again (which would cause infinite loops and unnecessary processing), and push it into the queue with `steps + 1`.
4. If the queue becomes empty and we haven't reached the `endWord`, return `0`.

#### Complexity
* **Time Complexity:** $O(N \times M \times 26)$ where $N$ is the number of words in `wordList` and $M$ is the length of each word. For each word we process, we loop $M$ times, and within that loop, we substitute 26 characters. String manipulation and hashing take $O(M)$ time. Thus, strictly speaking, it's $O(N \times M^2)$.
* **Space Complexity:** $O(N \times M)$ to store all the words in the Hash Set and the BFS Queue.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        
        // If the target word is not in the dictionary, no valid sequence exists
        if (wordSet.find(endWord) == wordSet.end()) return 0;
        
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        
        while (!q.empty()) {
            string word = q.front().first;
            int steps = q.front().second;
            q.pop();
            
            // If we reach the target word
            if (word == endWord) return steps;
            
            // Try changing every character to 'a'-'z'
            for (int i = 0; i < word.size(); i++) {
                char original = word[i];
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    word[i] = ch;
                    
                    // If the new word exists in the dictionary
                    if (wordSet.find(word) != wordSet.end()) {
                        wordSet.erase(word); // Remove to avoid revisiting
                        q.push({word, steps + 1});
                    }
                }
                // Backtrack to the original character
                word[i] = original;
            }
        }
        return 0;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        
        if (!wordSet.contains(endWord)) return 0;
        
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        int steps = 1;
        
        while (!q.isEmpty()) {
            int size = q.size();
            
            // Process all words at the current level
            for (int k = 0; k < size; k++) {
                String word = q.poll();
                
                if (word.equals(endWord)) return steps;
                
                char[] wordArray = word.toCharArray();
                for (int i = 0; i < wordArray.length; i++) {
                    char original = wordArray[i];
                    for (char ch = 'a'; ch <= 'z'; ch++) {
                        wordArray[i] = ch;
                        String newWord = new String(wordArray);
                        
                        if (wordSet.contains(newWord)) {
                            wordSet.remove(newWord);
                            q.offer(newWord);
                        }
                    }
                    wordArray[i] = original;
                }
            }
            steps++;
        }
        return 0;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:
        word_set = set(wordList)
        
        if endWord not in word_set:
            return 0
            
        queue = deque([(beginWord, 1)])
        
        while queue:
            current_word, steps = queue.popleft()
            
            if current_word == endWord:
                return steps
                
            for i in range(len(current_word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = current_word[:i] + c + current_word[i+1:]
                    
                    if next_word in word_set:
                        word_set.remove(next_word)
                        queue.append((next_word, steps + 1))
                        
        return 0
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    // Queue stores pairs of [word, steps]
    const queue = [[beginWord, 1]];
    let head = 0; // Use pointer instead of shift() to avoid O(N) overhead
    
    while (head < queue.length) {
        const [word, steps] = queue[head++];
        
        if (word === endWord) return steps;
        
        for (let i = 0; i < word.length; i++) {
            for (let charCode = 97; charCode <= 122; charCode++) { // 'a' to 'z'
                const newWord = word.slice(0, i) + String.fromCharCode(charCode) + word.slice(i + 1);
                
                if (wordSet.has(newWord)) {
                    wordSet.delete(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0;
};
```

  </TabItem>
</Tabs>
