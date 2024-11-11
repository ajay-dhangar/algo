---
id: string-basics
title: String Basics
sidebar_label: Basics
sidebar_position: 2
description: Basics of String Data Structure
tags: [DSA, algorithms, strings]
---

# String Basics

### 1. Introduction to Strings

Strings are a data structure commonly used to store and manipulate text. They are usually represented as sequences of characters, and are an essential part of most programming languages. Strings can contain letters, numbers, symbols, and even whitespace.

Example:
``` python
text = "Hello, World!"
```
### 2. Declaring and Initializing Strings

In most programming languages, strings can be declared and initialized using quotes (single, double, or triple quotes for multiline strings).

Example:
``` python 
single_quote = 'Hello'
double_quote = "Hello"
triple_quote = """Hello, World!"""
 
let greeting = "Hello";
 
String greeting = "Hello";
```
### 3. Immutable Nature of Strings

Most languages treat strings as immutable, meaning they cannot be changed after they are created. Any operation that appears to modify a string actually creates a new string.

Example:
``` python 
text = "Hello"
text[0] = "h"  # This will cause an error because strings are immutable
```
### 4. Escape Characters in Strings

Escape characters allow you to include special characters in strings. They are represented by a backslash `(\)` followed by a character, providing a way to add newlines, tabs, or include quotation marks within the string.

Common Escape Characters:
- `\n` - Newline
- `\t` - Tab
- `\\` - Backslash
- `\"` - Double Quote
- `\'` - Single Quote

Example:
``` python 
text = "Hello,\nWorld!"  # Adds a newline between "Hello," and "World!"
```
### 5. String Literals and Raw Strings

In some languages, strings can be prefixed with specific characters to alter their behavior. For instance, Python allows for raw strings (prefixed by `r`), which treat backslashes as literal characters, ideal for regular expressions or file paths.


Example:
``` python 
path = r"C:\Users\Name"  # Interprets backslashes literally

```
- **JavaScript Template Literals:** In JavaScript, template literals are strings that allow embedding expressions and multi-line text, created using backticks:


```
let name = "World";
let greeting = `Hello, ${name}!`;
```

### 6. Common Methods for Basic String Operations

Languages provide various built-in functions to manipulate strings. Here are a few basic ones:

- `length`: Gets the length of the string.

    - Python: `len(string)`
    - JavaScript: `string.length`
    - Java: `string.length()`
- `Concatenation`: Joins two or more strings.

    - Python: `string1 + string2`
    - JavaScript: `string1 + string2`
    - Java: `string1.concat(string2)
`

- `Accessing Characters`: Access specific characters in a string using indexing.

    - Python: `string[index]`
    - JavaScript: `string.charAt(index)`
    - Java: `string.charAt(index)`

### 7. Strings as Character Arrays

Some languages treat strings as arrays or lists of characters, allowing you to access each character using an index.

Example in Python:
```
word = "Hello"
print(word[1])  # Outputs: e
```
### 8. Encoding and Decoding Strings

Encoding converts a string to bytes, which is useful for file I/O and network communication. Decoding converts bytes back to a string.

Example in Python:
```
text = "Hello, World!"
encoded_text = text.encode('utf-8')
decoded_text = encoded_text.decode('utf-8')
```

```
String text = "Hello, World!";
byte[] encodedText = text.getBytes(StandardCharsets.UTF_8);
String decodedText = new String(encodedText, StandardCharsets.UTF_8);
```

---
