---
id: ulam-sequence 
title: Ulam Sequence Generation Via Recursion 
sidebar_label: Generate Ulam Sequence  
description: "The Recursive Ulam Sequence Generator is a feature that generates the Ulam sequence—a unique integer sequence—using a recursive algorithm. The Ulam sequence starts with two predefined numbers, 1 and 2, and each subsequent number is the smallest integer that can be expressed as the sum of two distinct earlier numbers in exactly one way. This feature provides a recursive approach to find Ulam numbers up to a given integer, maxN."
tags: [UlamSequence, recursion, dsa]
---
## Ulam Sequence Generation 

**Problem Statement:**

Design a recursive algorithm to generate the Ulam sequence up to a given integer `maxN`. The Ulam sequence begins with two predefined integers, **1** and  **2** , and each subsequent number is the smallest integer that can be expressed uniquely as the sum of two distinct earlier numbers in exactly one way. The task is to implement a recursive function that, given an upper limit `maxN`, generates and outputs the Ulam sequence up to this number.

### Constraints:

* The generated number must only be expressible as a sum of two distinct previous Ulam numbers in exactly one way.
* The sequence should start with 1 and 2, with each subsequent number satisfying the Ulam sequence properties.

### Input:

* A single integer `maxN` representing the upper bound for the Ulam sequence generation.

### Output:

* A list of Ulam numbers up to the value of `maxN`.

#### Example  : 

For an input of `maxN = 20`, the output should be:

1 2 3 4 6 8 11 13 16 18

#### Complexity :

The time complexity of the recursive Ulam Sequence generation is primarily influenced by the need to evaluate each number up to `maxN` and check whether it can be represented as the sum of two distinct Ulam numbers in exactly one way. For each candidate number, the algorithm must iterate over all pairs of previously generated Ulam numbers to count how many distinct pairs sum to the candidate.

In the worst case, this results in checking **O**(**n**2**)** pairs for each of the numbers up to `maxN`. Thus, for generating `m` Ulam numbers, where `m` is the number of valid Ulam numbers up to `maxN`, the overall time complexity becomes approximately  **O(m * n^2)** , where `n` is the current number being evaluated. However, depending on the implementation details, such as using optimized data structures to store sums or checking distinct pairs, the complexity may be slightly improved, but it remains quadratic in nature due to the pair-checking process.

The space complexity is  **O(m)** , where `m` is the number of Ulam numbers stored, as the sequence must be stored to check future sums.

### Limitations and Considerations

* **Time Complexity:**
  * The recursive Ulam Sequence generation, while conceptually elegant, has a high time complexity, especially for large values of `maxN`. As each candidate number needs to be checked against all previously generated Ulam numbers, this can lead to quadratic time complexity. For large sequences, this results in slower performance and makes the algorithm inefficient compared to iterative or optimized approaches.
* **Memory Usage:**
  * The algorithm requires storing the Ulam numbers generated up to `maxN` for future use in the recursive calls. This can lead to high memory consumption for larger sequences as every Ulam number up to the limit needs to be kept in memory, contributing to space complexity concerns.
* **Limited Scalability:**
  * Due to the combination of quadratic time complexity and increasing memory requirements, the recursive Ulam Sequence generation may not scale well for large values of `maxN`. As `maxN` increases, the time to generate the sequence grows significantly, making it impractical for very large inputs.
* **Recursive Call Overhead:**
  * The recursive nature of the solution can lead to increased overhead from repeated function calls. In some languages, recursion also introduces the risk of stack overflow for very deep recursion when `maxN` is large, making the algorithm less suitable for cases where iterative or tail-recursive optimizations are not applied.
* **Distinct Pair Checking:**
  * Ensuring that each candidate Ulam number can be expressed as the sum of two distinct earlier numbers in exactly one way requires careful checking of all possible pairs. This process is not easily parallelizable, which limits potential optimization through concurrency or multi-threading.

**C++ implementation :**

**Output :**

Enter the maximum value for the Ulam sequence: 20
1 2 3 4 6 8 11 13 16 18

Enter the maximum value for the Ulam sequence: 100
1 2 3 4 6 8 11 13 16 18 26 28 36 38 47 48 53 57 62 69 72 77 82 87 97 99

**Code :**

```cpp
 #include <iostream>
#include <vector>

using namespace std;

vector<int> ulam = {1, 2};

bool isUlam(int n) {
    int count = 0;

    for (size_t i = 0; i < ulam.size(); i++) {
        for (size_t j = i + 1; j < ulam.size(); j++) {
            if (ulam[i] + ulam[j] == n) {
                count++;
                if (count > 1) {
                    return false;  // More than one way to represent the sum
                }
            }
        }
    }
    return count == 1;
}

void generateUlam(int current, int maxN) {
    if (current > maxN) {
        return;  
    }

    if (isUlam(current)) {
        ulam.push_back(current);  
    }

    generateUlam(current + 1, maxN);  
}

int main() {
    int maxN;

    cout << "Enter the maximum value for the Ulam sequence: ";
    cin >> maxN;

    generateUlam(3, maxN);

    for (int num : ulam) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}



```
