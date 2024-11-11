---
id: What-is-String
title: "Strings"
sidebar_label: "What is Strings"
sidebar_position: 4
description: "The KMP algorithm is an efficient method for substring searching in a string."
tags: [String Matching, kmp-algorithm, Substring Search, Algorithm, Pattern Matching]
---
# Strings in Programming

## What is a String?
A **string** is a sequence of characters, typically used to represent text. It can include letters, numbers, symbols, and whitespace. Strings are one of the most commonly used data types in programming, especially for tasks involving text manipulation, user input, and output.

In most programming languages, strings are enclosed within quotes, either single (`'`) or double (`"`). The characters within the quotes form the actual content of the string.

### Example:
```java
String greeting = "Hello, World!";
```
## String in Memory
In many programming languages, strings are stored as an array of characters (or a list of characters). Each character in the string corresponds to a specific position or index.

For example, the string "Hello" is stored as:
Index: 0 1 2 3 4 Char : H e l l o
- **Indexing** starts from `0` in most languages.
- Each character is stored in contiguous memory locations.

## String Operations

### 1. Concatenation
Concatenation is the operation of joining two or more strings together to form a single string.

```java
String part1 = "Hello";
String part2 = "World";
String fullGreeting = part1 + " " + part2;  // Output: "Hello World"
```
## 2. Accessing Characters
You can access individual characters in a string by using their index.

```java
String text = "OpenAI";
char firstLetter = text.charAt(0);  // Output: 'O'
```
## 3. Substring
Extracting a portion of a string is called substring. You can specify the starting and ending index to get part of a string.

```java

String text = "OpenAI";
String subText = text.substring(0, 4);  // Output: "Open"
```
## 4. String Length
You can determine the length of a string (i.e., the number of characters it contains).

```java

String text = "OpenAI";
int length = text.length();  // Output: 6
```
## 5. String Comparison
Strings can be compared to check whether they are equal or to compare them lexicographically (i.e., dictionary order).

```java

String str1 = "apple";
String str2 = "banana";
boolean isEqual = str1.equals(str2);  // Output: false
int comparison = str1.compareTo(str2); // Output: -1 (because "apple" is lexicographically less than "banana")
```
## 6. Changing Case
Strings can be converted to uppercase or lowercase.

```java

String text = "Hello";
String upper = text.toUpperCase();  // Output: "HELLO"
String lower = text.toLowerCase();  // Output: "hello"
```
## 7. Trimming
Whitespace can be removed from the beginning and end of a string using the trim method.

```java
String text = "  Hello  ";
String trimmedText = text.trim();  // Output: "Hello"
```

## Immutable Nature of Strings
In many programming languages, strings are immutable, meaning once a string is created, it cannot be changed. Any operation that appears to modify a string actually creates a new string.

Example:
```java

String original = "OpenAI";
original.concat(" Rocks!");  // This does not modify 'original'
System.out.println(original);  // Output: "OpenAI"
```
To actually change the content of the string, we need to assign the result to a new or the same variable:

```java

original = original.concat(" Rocks!");
System.out.println(original);  // Output: "OpenAI Rocks!"
```

## StringBuilder (Mutable Strings)
In some cases, you may need to modify strings frequently, which can be inefficient if strings are immutable. For such cases, many languages provide a mutable alternative to strings. For example, in Java, the StringBuilder class is used for this purpose.

Example:
```java

StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // Efficiently modifies the original string
System.out.println(sb.toString());  // Output: "Hello World"
```
## String Methods

Here are some commonly used string methods in various programming languages:

| **Method**               | **Description**                                      |
|--------------------------|------------------------------------------------------|
| `length()`               | Returns the length of the string                     |
| `charAt(index)`          | Returns the character at the specified index         |
| `substring(start, end)`  | Returns a substring from the string                  |
| `equals(str)`            | Compares two strings for equality                    |
| `toUpperCase()`          | Converts the string to uppercase                     |
| `toLowerCase()`          | Converts the string to lowercase                     |
| `trim()`                 | Removes leading and trailing spaces                  |
| `replace(oldChar, newChar)` | Replaces characters in the string                 |
| `split(delimiter)`       | Splits the string based on a delimiter
## String Encoding
Strings are encoded using character encoding standards such as ASCII or UTF-8. This ensures that characters are stored as bytes that can be interpreted consistently across different systems.

ASCII uses 7 bits to represent characters (128 unique characters).
UTF-8 is a more modern encoding that can represent a large variety of characters, including international ones.
### Conclusion

Strings are fundamental to programming, providing a way to handle textual data. Understanding how to manipulate strings efficiently, especially when working with large datasets or performance-critical applications, is essential for developers.