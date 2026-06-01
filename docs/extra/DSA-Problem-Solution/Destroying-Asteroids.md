---
id: destroying-asteroids
title: "Destroying Asteroids"
sidebar_label: Destroying Asteroids
description: "Finding if a planet can destroy all asteroids using a greedy approach."
tags: [DSA, leetcode, array, greedy, sorting]
---

## Description:

You are given an integer `mass`, which represents the original mass of a planet. You are further given an integer array `asteroids`, where `asteroids[i]` is the mass of the `i-th` asteroid.

You can arrange for the planet to collide with the asteroids in any **arbitrary order**. If the mass of the planet is greater than or equal to the mass of the asteroid, the asteroid is **destroyed** and the planet **gains** the mass of the asteroid. Otherwise, the planet is destroyed.

Return `true` if **all** asteroids can be destroyed. Otherwise, return `false`.

**Example 1:**
Input: `mass = 10, asteroids = [3,9,19,5,21]`
Output: `true`
**Explanation:** - The planet collides with the asteroid of mass 3: 10 + 3 = 13.
- The planet collides with the asteroid of mass 5: 13 + 5 = 18.
- The planet collides with the asteroid of mass 9: 18 + 9 = 27.
- The planet collides with the asteroid of mass 19: 27 + 19 = 46.
- The planet collides with the asteroid of mass 21: 46 + 21 = 67.
All asteroids are destroyed.

**Example 2:**
Input: `mass = 5, asteroids = [4,9,23,4]`
Output: `false`
**Explanation:** - The planet collides with the asteroid of mass 4: 5 + 4 = 9.
- The planet collides with the asteroid of mass 4: 9 + 4 = 13.
- The planet collides with the asteroid of mass 23. It is destroyed as 13 < 23.

---

## Approaches:

### 1. Greedy Algorithm with Sorting

To maximize the planet's chances of survival, it should always consume the smallest available asteroids first to build up its mass. If the planet can't even destroy the smallest available asteroid, it definitely won't be able to destroy the larger ones. 

We can solve this efficiently by sorting the array in ascending order and iterating through it. We also need to ensure we use a 64-bit integer to track the accumulating mass so we don't encounter an integer overflow error during the additions.

* **Time Complexity:** $O(N \log N)$ where $N$ is the number of asteroids. The dominating factor is the sorting step. The subsequent linear scan takes $O(N)$ time.
* **Space Complexity:** $O(1)$ or $O(N)$ depending on the language's internal sorting algorithm. Excluding the space used by the sorting algorithm, our space complexity is strictly $O(1)$.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    bool asteroidsDestroyed(int mass, vector<int>& asteroids) {
        sort(asteroids.begin(), asteroids.end());
        
        long long currentMass = mass;
        
        for (int asteroid : asteroids) {
            if (currentMass >= asteroid) {
                currentMass += asteroid;
            } else {
                return false; 
            }
        }
        
        return true;
    }
};
```

**Java**
```java
class Solution {
    public boolean asteroidsDestroyed(int mass, int[] asteroids) {
        Arrays.sort(asteroids);
        
        long currentMass = mass;
        
        for (int asteroid : asteroids) {
            if (currentMass >= asteroid) {
                currentMass += asteroid;
            } else {
                return false;
            }
        }
        
        return true;
    }
}
```

**Python**
```py
class Solution:
    def asteroidsDestroyed(self, mass: int, asteroids: List[int]) -> bool:
        asteroids.sort()
         
        for asteroid in asteroids:
            if mass >= asteroid:
                mass += asteroid
            else:
                return False
                
        return True
```

**JavaScript**
```js
/**
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
const asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a, b) => a - b);
    
    let currentMass = mass;
    
    for (let i = 0; i < asteroids.length; i++) {
        if (currentMass >= asteroids[i]) {
            currentMass += asteroids[i];
        } else {
            return false;
        }
    }
    
    return true;
};
```
