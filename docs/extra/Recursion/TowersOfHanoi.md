---
id: Towers-of-Hanoi-dsa
title: Towers of Hanoi Recursion
sidebar_label: Towers of Hanoi
sidebar_position: 7
description: "The Towers of Hanoi problem involves moving a stack of n disks from one rod to another, following specific rules. The problem is often solved using backtracking, a form of recursion."
tags: [towers-of-hanoi, recursion, dsa]
---

## Towers of Hanoi Problem | Return the Sequence of Moves to Solve the Puzzle

- Problem Statement: The Towers of Hanoi problem consists of three rods and a number of disks of different sizes. Initially, all the disks are stacked on the first rod in ascending order of size. The objective is to move the entire stack to the last rod, obeying the following rules:
1. Only one disk can be moved at a time.
2. A disk can only be placed on top of a larger disk or on an empty rod.
3. A disk can only be moved from the top of its current rod to the top of another rod.

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class TowersOfHanoi {
  public:
    // Method to solve the Towers of Hanoi problem recursively
    void solveHanoi(int n, char source, char destination, char auxiliary, vector<string> &moves) {
        // Base case: if there is only one disk, move it from source to destination
        if (n == 1) {
            moves.push_back("Move disk 1 from " + string(1, source) + " to " + string(1, destination));
            return;
        }
        
        // Move the top (n-1) disks from source to auxiliary rod using destination as an intermediate
        solveHanoi(n - 1, source, auxiliary, destination, moves);
        
        // Move the nth disk from source to destination rod
        moves.push_back("Move disk " + to_string(n) + " from " + string(1, source) + " to " + string(1, destination));
        
        // Move the (n-1) disks from auxiliary rod to destination rod using source as an intermediate
        solveHanoi(n - 1, auxiliary, destination, source, moves);
    }

  public:
    // Method to return the sequence of moves to solve the Towers of Hanoi problem
    vector<string> getHanoiMoves(int n) {
        vector<string> moves;
        solveHanoi(n, 'A', 'C', 'B', moves); // Initial rods: 'A' (source), 'C' (destination), 'B' (auxiliary)
        return moves;
    }
};

int main() {
    int n = 3; // Number of disks
    TowersOfHanoi obj;
    vector<string> moves = obj.getHanoiMoves(n);
    
    // Display the sequence of moves
    cout << "Towers of Hanoi solution for " << n << " disks:" << endl;
    for (int i = 0; i < moves.size(); i++) {
        cout << "Step " << i + 1 << ": " << moves[i] << endl;
    }
    return 0;
}
```