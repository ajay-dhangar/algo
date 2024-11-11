---
id: what-is-hashset
sidebar_position: 3
title: What is a HashSet?
sidebar_label: What is a HashSet?
description: "A HashSet is a data structure used to store unique elements and provides efficient insertion, deletion, and search operations."
tags: [data structures, algorithms, hashset, sets, hashing, C++]
---

## HashSet

A **HashSet** is a data structure that stores a collection of unique elements, ensuring no duplicates. Unlike a **HashMap**, which maps keys to values, a **HashSet** only stores the keys (elements) and guarantees uniqueness. Internally, a **HashSet** uses hashing to provide efficient operations.

### Importance of HashSets

1. **Unique Elements**: The main purpose of a **HashSet** is to ensure all elements are unique. If you try to add a duplicate element, the set will reject it.

2. **Fast Lookup, Insert, and Delete**: HashSets offer average-case constant time complexity \(O(1)\) for insertion, deletion, and search operations due to the underlying hash table implementation.

3. **Memory Efficiency**: Since a **HashSet** only stores unique elements and uses hashing to place items in a table, it optimizes memory and performance.

4. **Unordered**: **HashSets** do not maintain any specific order of elements. If order is required, other data structures like `std::set` or `std::vector` can be used.

### Common Applications of HashSets

- **Duplicate Removal**: HashSets are perfect when you need to remove duplicates from a collection.
- **Membership Testing**: You can use a HashSet to quickly check whether an element exists in a collection.
- **Set Operations**: HashSets allow for efficient implementation of set operations like union, intersection, and difference.

### HashSet vs HashMap

Although both **HashSet** and **HashMap** use hashing internally, their key difference is that **HashSet** only stores unique elements (keys), while **HashMap** stores key-value pairs.

### Example of HashSet Implementation in C++

In C++, the `unordered_set` from the Standard Template Library (STL) is commonly used for hash-based sets. Here's a simple custom **HashSet** implementation in C++ to show how it works under the hood:

```C++
#include <iostream>
#include <vector>
#include <list>
#include <string>
using namespace std;

class HashSet {
private:
    static const int size = 1000;  // Define the size of the hash table
    vector<list<string>> table;

public:
    HashSet() : table(size) {}  // Initialize the hash table with empty lists

    int hash_function(const string& key) {
        return hash<string>()(key) % size;  // Use the built-in hash function
    }

    void add(const string& key) {
        int index = hash_function(key);
        for (const string& element : table[index]) {
            if (element == key) {
                return;  // Key already exists, no need to add duplicates
            }
        }
        table[index].push_back(key);  // Add the key if it's not a duplicate
    }

    bool contains(const string& key) {
        int index = hash_function(key);
        for (const string& element : table[index]) {    
            if (element == key) {
                return true;  // Key is found
            }
        }
        return false;  // Key is not found
    }

    void remove(const string& key) {
        int index = hash_function(key);
        table[index].remove(key);  // Remove the key if it exists
    }
};

// Example usage
int main() {
    HashSet hashSet;
    hashSet.add("apple");
    cout << "Contains 'apple': " << hashSet.contains("apple") << endl;  // Output: 1 (true)
    hashSet.remove("apple");
    cout << "Contains 'apple': " << hashSet.contains("apple") << endl;  // Output: 0 (false)
    return 0;
}
```
## Common HashSet Problems and Solutions in C++
Below are some common problems that can be efficiently solved using HashSets.

### 1. Finding Duplicates in an Array
Problem: Given an array, determine if it contains any duplicates.

C++ Solution:

```cpp
#include <iostream>
#include <unordered_set>
#include <vector>
using namespace std;

bool contains_duplicates(const vector<int>& nums) {
    unordered_set<int> hashSet;
    for (int num : nums) {
        if (hashSet.find(num) != hashSet.end()) {
            return true;  // Duplicate found
        }
        hashSet.insert(num);
    }
    return false;  // No duplicates found
}

int main() {
    vector<int> nums1 = {1, 2, 3, 1};
    cout << "Contains duplicates: " << contains_duplicates(nums1) << endl;  // Output: 1 (true)
    vector<int> nums2 = {1, 2, 3};
    cout << "Contains duplicates: " << contains_duplicates(nums2) << endl;  // Output: 0 (false)
    return 0;
}
```

### 2. Intersection of Two Arrays
Problem: Given two arrays, return their intersection (common elements).

C++ Solution:

```cpp
#include <iostream>
#include <unordered_set>
#include <vector>
using namespace std;

vector<int> intersection(const vector<int>& nums1, const vector<int>& nums2) {
    unordered_set<int> set1(nums1.begin(), nums1.end());  // Store elements of nums1 in a set
    vector<int> result;
    for (int num : nums2) {
        if (set1.find(num) != set1.end()) {
            result.push_back(num);  // Add to result if found in set1
            set1.erase(num);  // Avoid duplicates in result
        }
    }
    return result;
}

int main() {
    vector<int> nums1 = {1, 2, 2, 1};
    vector<int> nums2 = {2, 2};
    vector<int> result = intersection(nums1, nums2);
    
    cout << "Intersection: ";
    for (int num : result) {
        cout << num << " ";  // Output: 2
    }
    cout << endl;
    return 0;
}
```
### 3. Unique Email Addresses
Problem: Given a list of email addresses, return the number of unique email addresses, ignoring periods . and any portion of the address after a plus sign + in the local name.

C++ Solution:
```cpp
#include <iostream>
#include <unordered_set>
#include <vector>
#include <string>
using namespace std;

string clean_email(const string& email) {
    string local, domain;
    bool in_domain = false;
    for (char ch : email) {
        if (ch == '@') {
            in_domain = true;
        }
        if (in_domain) {
            domain += ch;  // Copy the domain part as is
        } else if (ch == '+') {
            break;  // Ignore the part after '+'
        } else if (ch != '.') {
            local += ch;  // Copy the local part, ignoring '.'
        }
    }
    return local + domain;
}

int unique_emails(const vector<string>& emails) {
    unordered_set<string> uniqueSet;
    for (const string& email : emails) {
        uniqueSet.insert(clean_email(email));  // Insert the cleaned email
    }
    return uniqueSet.size();
}

int main() {
    vector<string> emails = {
        "test.email+alex@leetcode.com", 
        "test.e.mail+bob@leetcode.com", 
        "testemail+david@lee.tcode.com"
    };
    cout << "Unique emails: " << unique_emails(emails) << endl;  // Output: 2
    return 0;
}
```

### Example of HashSet Implementation in JavaScript


### 1. **HashSet Implementation**

```javascript
class HashSet {
    constructor(size = 1000) {
        this.size = size;
        this.table = Array.from({ length: size }, () => []);
    }

    hashFunction(key) {
        let hash = 0;
        for (const char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    add(key) {
        const index = this.hashFunction(key);
        if (!this.table[index].includes(key)) {
            this.table[index].push(key);
        }
    }

    contains(key) {
        const index = this.hashFunction(key);
        return this.table[index].includes(key);
    }

    remove(key) {
        const index = this.hashFunction(key);
        this.table[index] = this.table[index].filter(item => item !== key);
    }
}

// Example usage
const hashSet = new HashSet();
hashSet.add("apple");
console.log("Contains 'apple':", hashSet.contains("apple"));  // Output: true
hashSet.remove("apple");
console.log("Contains 'apple':", hashSet.contains("apple"));  // Output: false
```

### 2. **Finding Duplicates in an Array**
Problem: Given an array, determine if it contains any duplicates.

```javascript
function containsDuplicates(nums) {
    const hashSet = new Set();
    for (const num of nums) {
        if (hashSet.has(num)) {
            return true;  // Duplicate found
        }
        hashSet.add(num);
    }
    return false;  // No duplicates found
}

// Example usage
console.log(containsDuplicates([1, 2, 3, 1]));  // Output: true
console.log(containsDuplicates([1, 2, 3]));     // Output: false
```

### 3. **Intersection of Two Arrays**
Problem: Given two arrays, return their intersection (common elements).

```javascript
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const result = [];
    for (const num of nums2) {
        if (set1.has(num)) {
            result.push(num);
            set1.delete(num);  // Avoid duplicates in result
        }
    }
    return result;
}

// Example usage
console.log(intersection([1, 2, 2, 1], [2, 2]));  // Output: [2]
```

### 4. **Unique Email Addresses**
Problem: Given a list of email addresses, return the number of unique email addresses, ignoring periods . and any portion of the address after a plus sign + in the local name.

```javascript
function cleanEmail(email) {
    const [local, domain] = email.split('@');
    const cleanLocal = local.split('+')[0].replace(/\./g, '');
    return `${cleanLocal}@${domain}`;
}

function uniqueEmails(emails) {
    const uniqueSet = new Set();
    for (const email of emails) {
        uniqueSet.add(cleanEmail(email));
    }
    return uniqueSet.size;
}

// Example usage
const emails = [
    "test.email+alex@leetcode.com", 
    "test.e.mail+bob@leetcode.com", 
    "testemail+david@lee.tcode.com"
];
console.log("Unique emails:", uniqueEmails(emails));  // Output: 2
```
