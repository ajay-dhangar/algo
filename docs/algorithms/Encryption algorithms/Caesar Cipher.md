---
id: caesar-cipher-implementation
title: Caesar Cipher Implementation
sidebar_label: Caesar Cipher
tags: [Cipher, Encryption, String Manipulation, DSA]
description: A Caesar Cipher shifts each letter in the input string by a given number of positions down or up the alphabet, with non-alphabetic characters remaining unchanged.
---

# Caesar Cipher Implementation

## Description
The Caesar Cipher is a type of substitution cipher where each letter in the plaintext is shifted by a certain number of positions down or up the alphabet. It is one of the simplest and most widely known encryption techniques.

## Problem Definition
- **Input**: A string `text` and an integer `shift` representing the number of positions each letter should be shifted.
- **Output**: Return the encrypted string by shifting each letter in the input string by the given shift value. Non-alphabetic characters should remain unchanged.

## Example
- **Input**: 
  - `text = "HELLO"`
  - `shift = 3`
  
- **Output**: 
  - `"KHOOR"`

- **Input**: 
  - `text = "caesar cipher"`
  - `shift = 2`
  
- **Output**: 
  - `"ecguct ekrjgt"`

## Algorithm Overview
1. Traverse each character in the input string.
2. If the character is a letter, shift it by the given `shift` value.
   - For lowercase letters, ensure it wraps around 'z' to 'a'.
   - For uppercase letters, ensure it wraps around 'Z' to 'A'.
3. If the character is non-alphabetic (e.g., spaces, punctuation), leave it unchanged.
4. Return the encrypted string.

## Time Complexity
- **O(n)** where `n` is the length of the input string. Each character in the string is processed once.

## C++ Implementation

```cpp
#include <iostream>
#include <string>
using namespace std;

string caesarCipher(string text, int shift) {
    string result = "";

    // Traverse each character in the input string
    for (int i = 0; i < text.length(); i++) {
        char c = text[i];

        // Encrypt uppercase letters
        if (isupper(c)) {
            result += char(int(c + shift - 'A') % 26 + 'A');
        }
        // Encrypt lowercase letters
        else if (islower(c)) {
            result += char(int(c + shift - 'a') % 26 + 'a');
        }
        // Leave non-alphabetic characters unchanged
        else {
            result += c;
        }
    }
    return result;
}

int main() {
    string text = "HELLO";
    int shift = 3;

    cout << "Original text: " << text << endl;
    cout << "Encrypted text: " << caesarCipher(text, shift) << endl;

    return 0;
}
```