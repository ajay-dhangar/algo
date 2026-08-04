---
id: reverse-bits
title: Reverse Bits Solution
sidebar_label: Reverse Bits
description: >-
  The Reverse Bits problem asks you to reverse the bits of a given 32-bit
  unsigned integer. Essentially, you need to flip the binary representation of
  the number so that the least significant bit (LSB) becomes the most
  significant bit (MSB) and vice versa.
tags:
  - DSA
  - leetcode
  - problem-solving
companies:
  - Microsoft
---

# Leetcode Problem-190 [Type -> easy]: 

## Description:
Reverse bits of a given 32 bits unsigned integer.

- **Note:**
Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.

## Video Explanation

<LiteYouTubeEmbed
  id="UcoN6UjAI64"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Reverse Bits - Binary - Leetcode 190 - Python"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
 
- **Example 1:**
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

- **Example 2:**
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.

## Implementation in java:

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

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

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0;
};
```

  </TabItem>
</Tabs>
