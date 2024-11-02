---
id: highest-frequency-letter
title: "Finding letter with highest frequency in a string."
sidebar_label: "Highest frequency letter"
sidebar_position: 5
description: "The frequency of a letter in a string refers to the number of times that particular letter appears within the string.In this blog we will learn how to find letter that appears largest number of times"
tags: [String, frequecy, Hashmap]
---


# Find the Letter with the Highest Frequency in a String (Java)

## Explanation

- Imports:

##### import java.util.HashMap: This imports the HashMap class, which is used to store letter frequencies.

#### Finding the Highest Frequency Letter:

- char highestLetter = ' '; : This initializes highestLetter to an empty character.
- int highestCount = 0; : This initializes highestCount to zero.
- for `(char letter : frequency.keySet()) { ... }`: This loop iterates over the keys (letters) in the frequency map.
- if `(frequency.get(letter) > highestCount) { ... }`: Inside the loop, this condition checks if the current letter’s frequency is greater than highestCount. If so, it updates highestCount and sets highestLetter to the current letter.

#### Return Statement:

return highestLetter;: Finally, the method returns the letter that has the highest frequency.

The following Java code finds the letter with the highest frequency in a given string:

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        String input = "Hello, World!";
        char highestLetter = highestFrequencyLetter(input);
        System.out.println("The letter with the highest frequency: " + highestLetter);
    }

    public static char highestFrequencyLetter(String s) {
        s = s.toLowerCase().replaceAll("[^a-z]", ""); // Convert to lowercase and filter non-alphabetic characters
        HashMap<Character, Integer> frequency = new HashMap<>();
        
        // Count frequency of each letter
        for (char letter : s.toCharArray()) {
            frequency.put(letter, frequency.getOrDefault(letter, 0) + 1);
        }
        
        char highestLetter = ' ';
        int highestCount = 0;

        // Find the letter with the highest frequency
        for (char letter : frequency.keySet()) {
            if (frequency.get(letter) > highestCount) {
                highestCount = frequency.get(letter);
                highestLetter = letter;
            }
        }
        
        return highestLetter;
    }
}
```

# Find the Letter with the Highest Frequency in a String (C++)

The following C++ code finds the letter with the highest frequency in a given string:

```cpp
#include <iostream>
#include <unordered_map>
#include <cctype>

char highestFrequencyLetter(const std::string& s) {
    std::unordered_map<char, int> frequency;

    // Count frequency of each letter
    for (char letter : s) {
        if (std::isalpha(letter)) {  // Check if the character is a letter
            letter = std::tolower(letter);  // Convert to lowercase
            frequency[letter]++;
        }
    }

    char highestLetter = ' ';
    int highestCount = 0;

    // Find the letter with the highest frequency
    for (const auto& pair : frequency) {
        if (pair.second > highestCount) {
            highestCount = pair.second;
            highestLetter = pair.first;
        }
    }

    return highestLetter;
}

int main() {
    std::string input = "Hello, World!";
    char letter = highestFrequencyLetter(input);
    std::cout << "The letter with the highest frequency: " << letter << std::endl;
    return 0;
}
```

# Find the Letter with the Highest Frequency in a String

The following Python code finds the letter with the highest frequency in a given string:

```python
def highest_frequency_letter(s):
    # Convert the string to lowercase and filter out non-alphabetic characters
    s = ''.join(filter(str.isalpha, s.lower()))
    
    # Create a frequency dictionary
    frequency = {}
    
    for letter in s:
        frequency[letter] = frequency.get(letter, 0) + 1
    
    # Find the letter with the highest frequency
    highest_letter = max(frequency, key=frequency.get)
    highest_count = frequency[highest_letter]
    
    return highest_letter, highest_count

# Example usage
input_string = "Hello, World!"
letter, count = highest_frequency_letter(input_string)
print(f"The letter '{letter}' has the highest frequency: {count}")

```

# Find the Letter with the Highest Frequency in a String (JavaScript)

```javascript
function highestFrequencyLetter(s) {
    const frequency = {};

    // Count frequency of each letter
    for (const letter of s) {
        if (/[a-zA-Z]/.test(letter)) { // Check if the character is a letter
            const lowerLetter = letter.toLowerCase(); // Convert to lowercase
            frequency[lowerLetter] = (frequency[lowerLetter] || 0) + 1; // Increment count
        }
    }

    let highestLetter = ' ';
    let highestCount = 0;

    // Find the letter with the highest frequency
    for (const [letter, count] of Object.entries(frequency)) {
        if (count > highestCount) {
            highestCount = count;
            highestLetter = letter;
        }
    }

    return highestLetter;
}

// Example usage
const input = "Hello, World!";
const letter = highestFrequencyLetter(input);
console.log("The letter with the highest frequency:", letter); // Output the result
```
