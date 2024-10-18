### 191 - Number of 1 bits

**Problem Statement**
Given a positive integer n, write a function that returns the number of 
set bits in its binary representation (also known as the Hamming weight).

**Example:**

- Input: n = 11

- Output: 3

**Explanation:**

- The input binary string 1011 has a total of three set bits.

**Solution**

```text
    class Solution {
        public int hammingWeight(int n) {
            int count=0;
            while(n!=0){
                if((n&1)==1){
                    count++;
                }
                n=n>>1;
            }
            return count;
        }
    }
```

### Complexity

- Runtime: 0 ms
- Memory Usage: 40.5 MB
