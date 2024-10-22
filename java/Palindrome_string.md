---
id: Palindrome_string
title: Palindroem string
sidebar_label: Palindrome string  
description: "is a well knows problem help to buid concept."
tags: [java,dsa, algorithms,Problem solving]
---

# Game Theory

**Palindrome string** 
Given a String , check is it palindrome or not , and return answer in boolean. Palindrome is when we read it from left to right and right to left it same. ex-madam1.

## Apporach

### 1. ** Understand the Problem:**
- Identify what constitutes a palindrome.
-Recognize that the string should be identical when read from left to right and right to left.

### 2. **Two-Pointer Technique:**
- This is an efficient method to check for palindromes. The idea is to use two pointers, one starting at the beginning of the string and the other at the end.
-By comparing characters at these pointers, you can determine if the string is a palindrome by progressively moving toward the center.
  
- **Steps to Implement:**:
  - **Initialize Pointers:
Set a pointer (left) at the start of the string (index 0).
Set another pointer (right) at the end of the string (index length - 1).

-**Iterate and Compare:**
While the left pointer is less than the right pointer:
Compare the characters at both pointers.
If the characters are not equal, return false.
If they are equal, move the left pointer one step to the right (increment) and the right pointer one step to the left (decrement).

-**Return Result:**
If the loop completes without finding any mismatches, return true, indicating the string is a palindrome.


## java Implementation 

```java
// your code here
public class Palindrome_string {
  public static void main(String[] args) {
    Palindrome_string obj = new Palindrome_string();
    boolean ans = obj.Palindrome_string("manad");
    System.out.println(ans);
  }

  public boolean Palindrome_string(String str) {
    int left=0;
    int right =str.length()-1;  // last character of string .
    
    while(left<right){      // Compare characters from both ends
      if(str.charAt(left)!=str.charAt(right)){
        return false;
      }
      left++;      //left increment 
      right--;     //right decrement.
    }
    return true;   //i.e all character mathes.
  }
}

```

**👉🏻👉🏻👉🏻 time complexity**= O(n);
**👉🏻👉🏻👉🏻space complexity**= O(1);
**👉🏻👉🏻👉🏻logic =**
//1.The key logic is the use of two pointers (left and right) to compare characters from both ends of the string and progressively move toward the center.
//2.If all characters match, the string is a palindrome. If any pair of characters does not match, the string is not a palindrome.

## Conclusion 

In this article, we learned about the Palindrome in string . Palindroem is a when you read from left to right and right to left is same  that basically a palindrome. The time complexit is O(1) and the space complexity is O(1)..