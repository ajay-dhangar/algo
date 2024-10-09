---
id: what-is-hashing
sidebar_position: 1
title: What is Hashing and Hash Maps?
sidebar_label: What is Hashing and Hash Maps?
description: "Hashing is a technique used to uniquely identify a specific object from a group of similar objects. Hash maps are data structures that implement this technique."
tags: [data structures, algorithms, hashing, hash maps]
---

## Hashing

Hashing is a technique used in computer science to uniquely identify a specific object from a group of similar objects. It involves the transformation of input data (keys) into a fixed-size hash code using a hash function. This hash code serves as an index in a hash table where the actual data (values) is stored.

### Importance of Hashing

1. **Fast Data Retrieval**: Hashing allows for quick data retrieval, enabling average-case constant time complexity \(O(1)\) for search, insert, and delete operations.

2. **Efficient Memory Usage**: Hash tables can store a large amount of data with minimal wasted memory due to their fixed size.

3. **Collision Resolution**: Hashing provides methods for resolving collisions (when two keys hash to the same index), ensuring data integrity and retrieval accuracy.

4. **Flexibility**: Hash maps can handle various data types as keys, making them versatile for different applications.

### Common Applications of Hashing

- **Database Indexing**: Hashing is often used in databases to quickly locate a data record.
- **Caching**: Web applications use hashing to cache data and improve performance.
- **Cryptography**: Hash functions are crucial in data integrity checks and password storage.
- **Counting Frequencies**: Hash maps are commonly used to count the occurrences of elements in a dataset.

### Hash Maps

A hash map (or hash table) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

#### Example of Hash Map Implementation

Here’s a simple implementation of a hash map in Python and C++:

**Python Implementation**:
```python
class HashMap:
    def __init__(self):
        self.size = 1000
        self.map = [[] for _ in range(self.size)]
    
    def hash_function(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self.hash_function(key)
        for pair in self.map[index]:
            if pair[0] == key:
                pair[1] = value
                return
        self.map[index].append([key, value])
    
    def get(self, key):
        index = self.hash_function(key)
        for pair in self.map[index]:
            if pair[0] == key:
                return pair[1]
        return None
    
    def delete(self, key):
        index = self.hash_function(key)
        for i, pair in enumerate(self.map[index]):
            if pair[0] == key:
                del self.map[index][i]
                return

# Example usage
hash_map = HashMap()
hash_map.insert("name", "Alice")
print(hash_map.get("name"))  # Output: Alice
hash_map.delete("name")
print(hash_map.get("name"))  # Output: None
```

**C++ Implementation**:
```C++
#include <iostream>
#include <vector>
#include <list>
#include <utility>
using namespace std;

class HashMap {
private:
    static const int size = 1000;
    vector<list<pair<string, string>>> map;

public:
    HashMap() : map(size) {}

    int hash_function(const string& key) {
        return hash<string>()(key) % size;
    }

    void insert(const string& key, const string& value) {
        int index = hash_function(key);
        for (auto& pair : map[index]) {
            if (pair.first == key) {
                pair.second = value;
                return;
            }
        }
        map[index].emplace_back(key, value);
    }

    string get(const string& key) {
        int index = hash_function(key);
        for (const auto& pair : map[index]) {
            if (pair.first == key) {
                return pair.second;
            }
        }
        return "";
    }

    void delete_key(const string& key) {
        int index = hash_function(key);
        for (auto it = map[index].begin(); it != map[index].end(); ++it) {
            if (it->first == key) {
                map[index].erase(it);
                return;
            }
        }
    }
};

// Example usage
int main() {
    HashMap hash_map;
    hash_map.insert("name", "Alice");
    cout << hash_map.get("name") << endl;  // Output: Alice
    hash_map.delete_key("name");
    cout << hash_map.get("name") << endl;  // Output: (empty)
    return 0;
}

```

### Common Hash Map Problems
Here are some problems commonly encountered when working with hash maps, along with their solutions.

- **Two Sum Problem**
**Problem**: Given an array of integers and a target sum, find two numbers such that they add up to the target.

   - **Python Solution**:
   
   ```
    def two_sum(nums, target):
        hashmap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hashmap:
                return [hashmap[complement], i]
            hashmap[num] = i

    # Example usage
    print(two_sum([2, 7, 11, 15], 9))  # Output: [0, 1]
    ```

   - **C++ Solution**:
   
   ```
    #include <iostream>
    #include <unordered_map>
    #include <vector>
    using namespace std;

    vector<int> two_sum(vector<int>& nums, int target) {
        unordered_map<int, int> hashmap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (hashmap.count(complement)) {
                return {hashmap[complement], i};
            }
            hashmap[nums[i]] = i;
        }
        return {};
    }

    // Example usage
    int main() {
        vector<int> nums = {2, 7, 11, 15};
        vector<int> result = two_sum(nums, 9);
        for (int index : result) {
            cout << index << " ";  // Output: 0 1
        }
        return 0;
    }

    ```

- **Group Anagrams**
**Problem**: Given an array of strings, group the anagrams together.

   - **Python Solution**:
   
   ```
    def group_anagrams(strs):
        anagrams = {}
        for s in strs:
            key = tuple(sorted(s))
            anagrams.setdefault(key, []).append(s)
        return list(anagrams.values())

    # Example usage
    print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
    # Output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

    ```

   - **C++ Solution**:
   
   ```
    #include <iostream>
    #include <vector>
    #include <unordered_map>
    #include <algorithm>
    using namespace std;

    vector<vector<string>> group_anagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> anagrams;
        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            anagrams[key].push_back(s);
        }
        vector<vector<string>> result;
        for (const auto& pair : anagrams) {
            result.push_back(pair.second);
        }
        return result;
    }

    // Example usage
    int main() {
        vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        vector<vector<string>> result = group_anagrams(strs);
        for (const auto& group : result) {
            for (const auto& word : group) {
                cout << word << " ";
            }
            cout << endl;  // Output: eat tea ate | tan nat | bat
        }
        return 0;
    }

    ```

### Conclusion
Hashing is a fundamental concept in computer science that allows for efficient data retrieval and storage. Hash maps, which leverage hashing, provide an optimal way to manage key-value pairs. Understanding these concepts and their applications is essential for solving various algorithmic challenges, particularly in competitive programming and real-world applications.
