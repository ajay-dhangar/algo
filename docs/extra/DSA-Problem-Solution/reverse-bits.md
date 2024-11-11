---
id: Reverse Bits 
title: Reverse-Bits-Solution
sidebar_label: DSA Problem Solution
sidebar-position: 1
description: The Reverse Bits problem asks you to reverse the bits of a given 32-bit unsigned integer. Essentially, you need to flip the binary representation of the number so that the least significant bit (LSB) becomes the most significant bit (MSB) and vice versa."
tags: [DSA, leetcode, problem-solving]
---

# Leetcode Problem-190 [Type -> easy]: 

## Description:
Reverse bits of a given 32 bits unsigned integer.

- **Note:**
Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.
 
- **Example 1:**
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

- **Example 2:**
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.

## Implementation in java:

```java
public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
        return Integer.reverse(n);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            Solution example = new Solution();
            int result = example.reverseBits(n);
            System.out.println(result);
        }
        sc.close();
    }
}
```
## Approach:
- **1. Imports and Class Declaration:**
  ```java
  import java.util.Scanner;
  public class Solution {
  ```
  > Imports the Scanner class for input.
  
  > Declares the Solution class.
- **2. reverseBits Method:**
  ```java
  public int reverseBits(int n) {
    return Integer.reverse(n);
  }
  ```
  > This method uses the Integer.reverse(n) function, which reverses the bits of the given 32-bit integer n.
- **3. main Method:**
  ```java
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    while (sc.hasNextInt()) {
        int n = sc.nextInt();
        Examples example = new Examples();
        int result = example.reverseBits(n);
        System.out.println(result);
    }
    sc.close();
  }
  ```
  > **Scanner Initialization:** Creates a Scanner object sc to read input from the user.
   
  > **Loop for Input:** Uses while (sc.hasNextInt()) to continually read integers as long as there are any.
   
  > **Instance Creation and Method Call:** For each integer input, it creates an instance of the *Solution* class and calls the *reverseBits* method on it.
  
  > **Print Result:** Outputs the reversed bits result.
  
  > **Close Scanner:** Ensures the Scanner is closed after usage.

## Submission details:

![Submission img](https://github.com/user-attachments/assets/2183e57d-213f-435d-a51d-5c84fc8f4e7a)
