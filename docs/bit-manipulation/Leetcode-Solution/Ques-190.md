### 190 - Revese Bits

**Problem Statement**
Reverse bits of a given 32 bits unsigned integer.

**Example:**

- Input: n = 00000010100101000001111010011100

- Output: 964176192 (00111001011110000010100101000000)

**Explanation:**

- The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

**Solution**

```text
    public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
         int bit;
         int count=0;
         int rev=n&1;
            n=n>>>1;
            count++;
         while(n!=0){
            bit=n&1;
            count++;
            n=n>>>1;
            rev=rev<<1;
            rev+=bit;
        }
    
         while(count!=32){
                rev=rev<<1;
                count++;
         }
        
        return rev;
        }
    }
```

### Complexity

- Runtime: 0 ms
- Memory Usage: 41.4 MB
