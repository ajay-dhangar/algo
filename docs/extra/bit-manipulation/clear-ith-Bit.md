---
id: clear-ith-bit
tittle: Clear ith Bit
sidebar-level: Clear ith Bit
sidebar-position: 2
Description: Clearing the i-th bit in a number is a nifty bit manipulation technique. This involves setting the i-th bit to 0, leaving all other bits unchanged.
tags: [dsa, bit manipulation, clear bits]
---

# Description

Clearing the i-th bit in a number is a common bit manipulation technique. This operation involves setting the i-th bit to 0 while leaving all other bits unchanged.

## Steps to Clear the i-th Bit
**1. Create a Mask:** Create a number that has all bits set to 1 except for the i-th bit, which is set to 0.

**2. AND Operation:** Perform a bitwise AND between the original number and the mask. This will clear the i-th bit while keeping all other bits unchanged.

## Formula 
> `mask =∼ (1<<𝑖)`

> `result = num&mask`


# Code in Java
```java
import java.util.*;

public class clearIthBit {
	
	public static int clearIthBit(int n, int i) {
		int bitMask = ~(1<<i);
		return n & bitMask;
	}
	public static void main(String[] args) {
		System.out.println(clearIthBit(10, 1));
	}
}
```

# Explanation:
• **Create Mask:** The mask `~(1 << i)` flips all bits of `1 << i`. For i = 2, `1 << 2` results in 00000100, and ~00000100 results in 11111011.

• **AND Operation:** Performing num & mask clears the i-th bit. If num = 29 (binary 11101), then 29 & 11111011 results in 11001 (binary 11001, decimal 25).

# Key Points:

## Bitwise Operators:

➔ `~`: Bitwise NOT (flips all bits)

➔ `&`: Bitwise AND

➔ `<<`: Left shift (shifts bits to the left)

This technique is widely used in low-level programming, graphics, networking, and other areas where efficient bit manipulation is crucial.
