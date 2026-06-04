---
title: Java Code Style Guide for DSA Examples
description: Guidelines for writing clean, readable, and beginner-friendly Java DSA examples.
--

# Java Code Style Guide

This guide explains how to write clean and beginner-friendly Java code for DSA examples.

The main goal is to keep Java solutions simple, readable, and easy to understand for students and new contributors.

## Why This Guide Is Needed

DSA examples are easier to learn when the code follows one clean style.

This guide helps contributors with:

- Clear class and method names
- Meaningful variable names
- Proper formatting
- Simple comments
- Time and space complexity
- Input and output examples
- Edge case handling

---

## 1. Class Naming

Use **PascalCase** for class names.

Class names should clearly describe the algorithm or data structure.

### Good

```java
public class BinarySearch {
}
```

```java
public class MergeSort {
}
```

### Avoid

```java
public class binarysearch {
}
```

```java
public class mergesortexample {
}
```

---

## 2. Method Naming

Use **camelCase** for method names.

Method names should describe what the method does.

### Good

```java
public static int binarySearch(int[] arr, int target) {
    return -1;
}
```

```java
public static void mergeSort(int[] arr, int left, int right) {
}
```

### Avoid

```java
public static int Binary_Search(int[] arr, int target) {
    return -1;
}
```

```java
public static void sort1(int[] arr) {
}
```

---

## 3. Variable Naming

Use meaningful variable names.

For DSA examples, short names like `i`, `j`, and `n` are fine in loops, but important values should have clear names.

### Good

```java
int left = 0;
int right = arr.length - 1;
int mid = left + (right - left) / 2;
```

### Avoid

```java
int a = 0;
int b = arr.length - 1;
int c = (a + b) / 2;
```

### Common DSA Variable Names

| Variable | Meaning |
|---|---|
| `left` | Left pointer or left boundary |
| `right` | Right pointer or right boundary |
| `mid` | Middle index |
| `start` | Starting index |
| `end` | Ending index |
| `target` | Value to search |
| `result` | Final answer |
| `count` | Number of occurrences |
| `sum` | Sum of values |

---

## 4. Formatting and Indentation

Use consistent indentation.

Recommended indentation:

```text
4 spaces
```

### Good

```java
if (arr[mid] == target) {
    return mid;
}
```

### Avoid

```java
if(arr[mid]==target){
return mid;
}
```

Clean formatting makes the code easier to read and review.

---

## 5. Keep Code Simple

For beginner DSA examples, avoid unnecessary advanced syntax.

The code should be easy for students to follow.

### Good

```java
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}
```

### Avoid for beginner examples

```java
Arrays.stream(arr).forEach(System.out::println);
```

Advanced syntax is useful, but beginner examples should focus on clarity first.

---

## 6. Comments

Use comments only when they help the reader understand the logic.

Do not add comments for every single line.

### Good

```java
// Move the left boundary because the target is greater than mid value
left = mid + 1;
```

### Avoid

```java
// Increase left
left = mid + 1;
```

A comment should explain **why** something is happening, not just repeat the code.

---

## 7. Input and Output Examples

Whenever possible, add input and output examples.

This helps learners understand how the algorithm works.

### Example

Input:

```text
Array = [1, 3, 5, 7, 9]
Target = 7
```

Output:

```text
3
```

Explanation:

```text
The target value 7 is present at index 3.
```

---

## 8. Time and Space Complexity

Every DSA solution should mention time and space complexity.

Use this format:

```text
Time Complexity: O(log n)
Space Complexity: O(1)
```

### Example

For binary search:

```text
Time Complexity: O(log n)
Space Complexity: O(1)
```

Reason:

- Binary search divides the search space by 2 each time.
- It uses only a few extra variables.

---

## 9. Edge Cases

Always mention important edge cases.

Common edge cases in Java DSA examples:

- Empty array
- Single element array
- Duplicate values
- Negative numbers
- Large input size
- Target not found
- Null input, if applicable

### Example

```java
if (arr == null || arr.length == 0) {
    return -1;
}
```

This prevents errors when the input array is empty or not available.

---

## 10. Avoid Integer Overflow

When finding the middle index in binary search, avoid this:

```java
int mid = (left + right) / 2;
```

Use this instead:

```java
int mid = left + (right - left) / 2;
```

This is safer for large values of `left` and `right`.

---

## 11. Use Clear Method Structure

A Java DSA solution should usually follow this structure:

1. Check edge cases
2. Initialize variables
3. Apply algorithm logic
4. Return result
5. Mention complexity

### Example

```java
public class BinarySearch {

    public static int binarySearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            }

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
}
```

Time Complexity: `O(log n)`

Space Complexity: `O(1)`

---

## 12. Use Beginner-Friendly Examples

When adding a Java example, keep it simple.

### Good

```java
public static int findMaximum(int[] arr) {
    int max = arr[0];

    for (int num : arr) {
        if (num > max) {
            max = num;
        }
    }

    return max;
}
```

### Avoid

```java
public static int findMaximum(int[] arr) {
    return Arrays.stream(arr).max().getAsInt();
}
```

The second code is shorter, but the first code is better for DSA beginners because it shows the actual logic.

---

## 13. Use Consistent File and Topic Names

When adding Java documentation or examples, use clear names.

### Good

```text
binary-search.md
merge-sort.md
java-fast-io.mdx
java-code-style-guide.md
```

### Avoid

```text
newfile.md
java1.md
code.md
example.md
```

Clear names help contributors and learners find topics easily.

---

## 14. Add Explanation After Code

Do not only add code. Add a short explanation after the code.

A good explanation should answer:

- What does the code do?
- How does the main logic work?
- What is the time complexity?
- What is the space complexity?
- What edge cases are handled?

---

## 15. Final Checklist for Java DSA Examples

Before submitting a Java DSA example, check these points:

- [ ] Class name uses PascalCase
- [ ] Method name uses camelCase
- [ ] Variable names are meaningful
- [ ] Code is properly formatted
- [ ] Code is beginner-friendly
- [ ] Comments are useful and not excessive
- [ ] Input and output examples are added
- [ ] Time complexity is mentioned
- [ ] Space complexity is mentioned
- [ ] Important edge cases are mentioned
- [ ] The solution is easy to understand

---

## Conclusion

Java DSA examples should be simple, clean, and easy to follow.

Following this style guide will help keep the repository consistent and make the learning experience better for beginners.
