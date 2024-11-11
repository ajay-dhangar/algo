---
id: water-jug
title: Water Jug Problem Using Recursion
sidebar_label: Generate Water Jug Problem Solution
description: "The Recursive Water Jug Problem Solver is an engaging algorithmic approach to a classic puzzle involving two jugs of different capacities. This solver efficiently utilizes recursion to explore all possible states, allowing users to achieve a specific target volume of water through a series of defined operations, such as filling, pouring, and emptying the jugs. Ideal for computer science enthusiasts and learners, this solution highlights the power of recursive problem-solving techniques while demonstrating state management and optimization strategies. Whether you're looking to deepen your understanding of algorithms or tackle a fascinating combinatorial challenge, the Recursive Water Jug Problem Solver offers a practical and insightful experience."
tags: [WaterJug, recursion, dsa]
---

## Water Jug Problem Via Recursion

**Problem Statement:**

You are given two jugs with different capacities: Jug A with a maximum capacity of mm**m** liters and Jug B with a maximum capacity of nn**n** liters. You also have an unlimited supply of water. The objective is to measure exactly dd**d** liters of water using these two jugs by performing a series of allowed operations.

**Allowed Operations** :

1. Fill Jug A completely.
2. Fill Jug B completely.
3. Empty Jug A.
4. Empty Jug B.
5. Pour water from Jug A to Jug B until Jug B is full or Jug A is empty.
6. Pour water from Jug B to Jug A until Jug A is full or Jug B is empty.

**Constraints** :

- You must find a sequence of operations that leads to exactly d liters of water in either jug.
- The target volume d must be less than or equal to the maximum capacity of either Jug A or Jug B i.e. d≤max⁡(m,n).
- It is assumed that both jugs are initially empty.

  **Output** :

- The algorithm should output the sequence of operations required to achieve exactly d liters in one of the jugs or indicate if it is impossible to measure that amount given the initial capacities.

### Example:

**Given** :

- Jug A capacity: 5 liters
- Jug B capacity: 3 liters
- Target amount: 4 liters

  **Expected Output** :

- Sequence of operations to achieve 4 liters in one of the jugs:
  1. Fill Jug A (5 liters in Jug A, 0 liters in Jug B)
  2. Pour from Jug A to Jug B (2 liters in Jug A, 3 liters in Jug B)
  3. Empty Jug B (2 liters in Jug A, 0 liters in Jug B)
  4. Pour from Jug A to Jug B (0 liters in Jug A, 2 liters in Jug B)
  5. Fill Jug A (5 liters in Jug A, 2 liters in Jug B)
  6. Pour from Jug A to Jug B (4 liters in Jug A, 3 liters in Jug B)

This problem not only challenges the solver's algorithmic thinking but also serves as a practical example of using recursion to explore state spaces effectively.

### Explanation of the Recursive Water Jug Problem Solver

The Recursive Water Jug Problem Solver tackles a classic algorithmic challenge that involves measuring a specific volume of water using two jugs of different capacities. The solution employs a recursive approach to explore all possible states of the jugs and determine the sequence of operations needed to achieve the target volume. Here’s a breakdown of how the algorithm works:

1. **Initial State** :

- Start with both jugs empty: Jug A=0 liters, Jug B=0 liters.
- Define the maximum capacities of the jugs: Jug A with m liters and Jug B with n liters.
- Set the target volume d liters that you want to measure.

1. **Allowed Operations** :
   The algorithm can perform several operations to manipulate the water levels in the jugs:

- **Fill Jug A** : Set the amount in Jug A to m.
- **Fill Jug B** : Set the amount in Jug B to n.
- **Empty Jug A** : Set the amount in Jug A to 0.
- **Empty Jug B** : Set the amount in Jug B to 0.
- **Pour from Jug A to Jug B** : Transfer water from Jug A to Jug B until Jug B is full or Jug A is empty.
- **Pour from Jug B to Jug A** : Transfer water from Jug B to Jug A until Jug A is full or Jug B is empty.

**Recursive Exploration** :

- The core of the algorithm is a recursive function that takes the current state of the jugs as input.
- Each recursive call attempts to apply all possible operations, generating new states of the jugs.
- For each new state, the function checks if it matches the target volume d:
  - If a jug contains exactly d liters, the algorithm has successfully found a solution.
  - If not, the function continues to explore further states by recursively calling itself.

**Base Case and Termination** :

- The base case of the recursion is when the target volume d is found in either jug.
- If all possible states have been explored without finding the target volume, the algorithm concludes that it is impossible to measure d liters with the given jug capacities.

**Visited States** :

- To optimize the algorithm and avoid infinite loops, a set of visited states can be maintained. This set tracks which combinations of water amounts in the jugs have already been processed.
- If a state has already been visited, the algorithm does not explore it again.

**Output** :

- The algorithm returns the sequence of operations leading to the target amount, including each step taken (e.g., filling, pouring, or emptying the jugs).
- If the target volume cannot be achieved, the algorithm informs the user that it is impossible based on the initial capacities and the desired measurement.

### Time and Space Complexity

The time complexity of the **Recursive Water Jug Problem Solver** primarily depends on the number of distinct states that can be generated based on the capacities of the two jugs. Each jug can hold a maximum of m and n liters respectively, which means the total number of possible states is O(m×n) The algorithm explores each state through recursive calls, applying all possible operations for each state. In the worst case, the algorithm may end up visiting all possible states before determining whether the target volume can be achieved, leading to a time complexity of O(m×n).

The space complexity is influenced by the depth of the recursion and the storage of visited states. In the worst-case scenario, the maximum depth of the recursion can reach O(m+n) (the sum of the capacities), as each call corresponds to a unique state of the jugs. Additionally, the algorithm maintains a set of visited states, which can also grow up to O(m×n). Therefore, the overall space complexity is O(m×n) due to the storage of state information and the recursion stack.

In summary, the algorithm operates with a time complexity of O(m×n) and a space complexity of O(m×n) , making it efficient for reasonably sized jug capacities but potentially challenging for very large values of m and n.

### Limitations and Considerations

The **Recursive Water Jug Problem Solver** presents an elegant approach to solving the jug problem but has several limitations and considerations that users should be aware of:

1. **Scalability** : The algorithm's time and space complexity is O(m×n) which means that it can become inefficient with larger jug capacities. For significantly large values of m and n, the number of possible states can grow rapidly, leading to increased computation time and memory usage.
2. **Integer Volumes Only** : This solution is designed to work with integer capacities and target volumes. It does not handle scenarios involving fractional measurements or capacities, which may limit its applicability in real-world problems that require precise measurements.
3. **Exhaustive Search** : The recursive approach explores all possible states, which can lead to performance issues in cases where the target volume is unreachable. While the visited set mitigates some inefficiency, the algorithm still performs exhaustive searching, which may not be optimal for more complex or larger-scale problems.
4. **Lack of Optimization** : The basic algorithm does not implement any heuristic methods or optimization strategies to guide the search process more efficiently. This may result in unnecessary exploration of states that do not contribute to reaching the target volume.
5. **Stack Overflow Risk** : The recursive nature of the algorithm poses a risk of stack overflow errors for very deep recursive calls, especially in environments with limited stack size. Iterative approaches or tail recursion optimizations could be considered as alternatives to mitigate this issue.
6. **User Input Validation** : The algorithm assumes valid input for jug capacities and the target volume. It does not handle invalid scenarios (e.g., negative capacities, non-integer values) gracefully, which may lead to unexpected behavior or errors.
7. **Target Volume Feasibility** : The algorithm does not inherently check if the target volume d is feasible based on the capacities of the jugs (e.g., using the greatest common divisor). Users should validate that d can be achieved before executing the algorithm, as certain combinations of m and n may make it impossible to reach dd**d**.

**C++ implementation :**

**Output :**

Enter the capacity of Jug 1: 5
Enter the capacity of Jug 2: 3
Enter the target amount of water: 4
Steps to measure 4 liters:
Fill Jug 1
Fill Jug 2
Empty Jug 1
Pour Jug 2 into Jug 1
Fill Jug 2
Pour Jug 2 into Jug 1
Empty Jug 1
Pour Jug 2 into Jug 1
Fill Jug 2
Pour Jug 2 into Jug 1

**Code :**

```cpp
#include <iostream>
#include <set>
#include <vector>
#include <tuple>

using namespace std;

bool waterJugSolver(int jug1, int jug2, int target, int current1, int current2,
                    set<tuple<int, int>>& visited, vector<string>& steps) {
    if (current1 == target || current2 == target) {
        return true;
    }
    if (visited.count(make_tuple(current1, current2))) {
        return false;
    }
    visited.insert(make_tuple(current1, current2));

    steps.push_back("Fill Jug 1");
    if (waterJugSolver(jug1, jug2, target, jug1, current2, visited, steps)) {
        return true;
    }
    steps.pop_back();

    steps.push_back("Fill Jug 2");
    if (waterJugSolver(jug1, jug2, target, current1, jug2, visited, steps)) {
        return true;
    }
    steps.pop_back();

    steps.push_back("Empty Jug 1");
    if (waterJugSolver(jug1, jug2, target, 0, current2, visited, steps)) {
        return true;
    }
    steps.pop_back();

    steps.push_back("Empty Jug 2");
    if (waterJugSolver(jug1, jug2, target, current1, 0, visited, steps)) {
        return true;
    }
    steps.pop_back();

    int pour1to2 = min(current1, jug2 - current2);
    steps.push_back("Pour Jug 1 into Jug 2");
    if (waterJugSolver(jug1, jug2, target, current1 - pour1to2, current2 + pour1to2, visited, steps)) {
        return true;
    }
    steps.pop_back();

    int pour2to1 = min(current2, jug1 - current1);
    steps.push_back("Pour Jug 2 into Jug 1");
    if (waterJugSolver(jug1, jug2, target, current1 + pour2to1, current2 - pour2to1, visited, steps)) {
        return true;
    }
    steps.pop_back();

    return false;
}

int main() {
    int jug1, jug2, target;

    cout << "Enter the capacity of Jug 1: ";
    cin >> jug1;
    cout << "Enter the capacity of Jug 2: ";
    cin >> jug2;
    cout << "Enter the target amount of water: ";
    cin >> target;

    if (target > max(jug1, jug2) || target < 0) {
        cout << "Target volume is not achievable with the given jug capacities." << endl;
        return 0;
    }

    set<tuple<int, int>> visited;
    vector<string> steps;

    if (waterJugSolver(jug1, jug2, target, 0, 0, visited, steps)) {
        cout << "Steps to measure " << target << " liters:" << endl;
        for (const string& step : steps) {
            cout << step << endl;
        }
    } else {
        cout << "No solution exists to measure " << target << " liters." << endl;
    }

    return 0;
}

```
