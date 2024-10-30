---
id: fast-exponential
sidebar_position: 1
title: Fast Exponential 
sidebar_label: fast exponential
description: Fast exponentiation is a powerful technique for handling large exponents efficiently, commonly used in various computational and mathematical applications. Its ability to work in logarithmic time makes it indispensable for performance-critical systems.
tags: [java, problem-solving]
---

# Fast Exponential 

## Description:

Fast Exponentiation is an algorithm to compute powers of numbers efficiently, typically used to calculate a^b%c. The common approach is Exponentiation by Squaring, which reduces the time complexity to $O(log n)$.

**Key Points:**

**1. Base and Modulo:** Initialize base to be within modulo. 

**2. Loop Until Exp is Zero:**

> *Odd Exponent:* If exp is odd (exp & 1), multiply result by base and take modulo.

> *Update Base and Exponent:* Square the base and halve the exp.

**3. Return Result:** Final result after computing power modulo.

## Efficiency: 

This algorithm runs in $O(log n)$ time, making it very efficient for large exponents.

# Code in Java:

```java
public class FastExpo {

	public static int fastExpo(int a, int n) {
		int ans = 1;

		while(n>0) {
			if((n&1) != 0) {
				ans = ans*a;
			}
			a=a*a;
			n=n>>1;
		}
		return ans;
	}
	public static void main(String[] args) {
		System.out.println(fastExpo(2, 4));
	}
}
```
