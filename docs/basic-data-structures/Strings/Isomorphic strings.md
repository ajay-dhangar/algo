---
id: isomorphic-strings
title: "What are isomorphic strings."
sidebar_label: "Isomorphic strings"
sidebar_position: 6
description: "Isomorphic strings are two strings that can be transformed into each other by a consistent mapping of characters. "
tags: [String,isomorphic strings]
---

# Isomorphic Strings

## Definition
Isomorphic strings are two strings that can be transformed into each other by a consistent mapping of characters. Each character in one string can be replaced with a character from the other string in a way that preserves the order of characters.

### Example
- **Isomorphic**: "egg" and "add"
- **Not Isomorphic**: "foo" and "add"

## Characteristics
- Each character must map to a unique character in the other string.
- The mapping must be consistent across the entire string.

## Code Examples

### Java

```java
import java.util.HashMap;
import java.util.HashSet;

public class IsomorphicStrings {
    public static boolean areIsomorphic(String str1, String str2) {
        if (str1.length() != str2.length()) {
            return false;
        }

        HashMap<Character, Character> mapping = new HashMap<>();
        HashSet<Character> mappedChars = new HashSet<>();

        for (int i = 0; i < str1.length(); i++) {
            char char1 = str1.charAt(i);
            char char2 = str2.charAt(i);

            if (mapping.containsKey(char1)) {
                if (mapping.get(char1) != char2) {
                    return false;
                }
            } else {
                if (mappedChars.contains(char2)) {
                    return false;
                }
                mapping.put(char1, char2);
                mappedChars.add(char2);
            }
        }

        return true;
    }

    public static void main(String[] args) {
        String str1 = "egg";
        String str2 = "add";

        if (areIsomorphic(str1, str2)) {
            System.out.println("The strings are isomorphic.");
        } else {
            System.out.println("The strings are not isomorphic.");
        }
    }
}
```


### C++
```C++
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string>

bool areIsomorphic(const std::string& str1, const std::string& str2) {
    if (str1.length() != str2.length()) {
        return false;
    }

    std::unordered_map<char, char> mapping;
    std::unordered_set<char> mappedChars;

    for (size_t i = 0; i < str1.length(); ++i) {
        char char1 = str1[i];
        char char2 = str2[i];

        if (mapping.find(char1) != mapping.end()) {
            if (mapping[char1] != char2) {
                return false;
            }
        } else {
            if (mappedChars.find(char2) != mappedChars.end()) {
                return false;
            }

            mapping[char1] = char2;
            mappedChars.insert(char2);
        }
    }

    return true;
}

int main() {
    std::string str1 = "egg";
    std::string str2 = "add";

    if (areIsomorphic(str1, str2)) {
        std::cout << "The strings are isomorphic." << std::endl;
    } else {
        std::cout << "The strings are not isomorphic." << std::endl;
    }

    return 0;
}
```

### Python
```Python

def are_isomorphic(str1, str2):
    if len(str1) != len(str2):
        return False

    char_map = {}
    mapped_chars = set()

    for char1, char2 in zip(str1, str2):
        if char1 in char_map:
            if char_map[char1] != char2:
                return False
        else:
            if char2 in mapped_chars:
                return False

            char_map[char1] = char2
            mapped_chars.add(char2)

    return True

if __name__ == "__main__":
    str1 = "egg"
    str2 = "add"

    if are_isomorphic(str1, str2):
        print("The strings are isomorphic.")
    else:
        print("The strings are not isomorphic.")
```

### JavaScript

```javascript
function areIsomorphic(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    const mapping = new Map();
    const mappedChars = new Set();

    for (let i = 0; i < str1.length; i++) {
        const char1 = str1[i];
        const char2 = str2[i];

        if (mapping.has(char1)) {
            if (mapping.get(char1) !== char2) {
                return false;
            }
        } else {
            if (mappedChars.has(char2)) {
                return false;
            }

            mapping.set(char1, char2);
            mappedChars.add(char2);
        }
    }

    return true;
}

// Usage
const str1 = "egg";
const str2 = "add";

if (areIsomorphic(str1, str2)) {
    console.log("The strings are isomorphic.");
} else {
    console.log("The strings are not isomorphic.");
}
```
