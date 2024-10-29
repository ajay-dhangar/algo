---
id: isPowerOfTwo
sidebar_position: 1
title: check isPowerOfTwo
sidebar_label: Is power of two?
description: "In this we need to determine if a given integer is a power of two. An integer is a power of two if it can be written as 2^𝑛 where 𝑛 is a non-negative integer."
tags: [java, problem-solving]
---

# isPowerOfTwo 
## Description:

The isPowerOfTwo problem is a common question where we need to determine if a given integer is a power of two. An integer is a power of two if it can be written as 2^𝑛 where 𝑛 is a non-negative integer.

## Approach

To solve this problem, you can use bit manipulation, which is very efficient. The key observation here is that a number which is a power of two has exactly one bit set to 1 in its binary representation.

## By Bit Manipulation
**1. Binary Check:** In binary, a power of two has a single '1' followed by zero or more '0's.
**2. Masking Trick:** For a number n, the condition n & (n - 1) will be zero if n is a power of two.

# Code in Java

```java
import java.util.*;

public class isPowerOfTwo {

	public static boolean isPowerOfTwo(int n) {
		return (n&(n-1)) == 0;
	}
	public static void main(String[] args) {
		System.out.println(isPowerOfTwo(15));
	}
}
```

## Explanation:

**Bitwise AND Operation:**
> n & (n - 1): This operation turns off the rightmost set bit of n. If n is a power of two, there will be exactly one set bit, so n & (n - 1) will be zero.

**For example**, 16 in binary is 10000, and 15 is 01111. 16 & 15 = 00000.
