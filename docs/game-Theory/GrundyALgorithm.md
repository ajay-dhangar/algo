---
id: Grundy Algorithm
sidebar_position: 5
title: Grundy Algo
sidebar_label: Grundy algorithm
tags: [Game-theory, Grundy]
---

# Grundy Algorithm (Numbers) in Game Theory

The **Grundy algorithm** (or **Numbers**) is used in combinatorial game theory to analyze and solve impartial games—games where available moves and win/loss conditions are the same for both players. This algorithm assigns each game position a **Grundy number** to determine whether it is a winning or losing position, allowing players to strategize optimally.

## Key Concepts

### Grundy Number
Each position in the game has a **Grundy number** (G):
- **G = 0** indicates a **losing position** if both players play optimally.
- **G ≠ 0** indicates a **winning position**.

### Minimum Excludant (mex)
The **minimum excludant (mex)** of a set is the smallest non-negative integer not present in that set. The Grundy number for a position is the **mex** of the Grundy numbers of all reachable positions.

### Steps for Applying the Grundy Algorithm
1. **Define Possible Moves**: Identify all possible moves from each position.
2. **Calculate Grundy Numbers Recursively**:
   - Assign terminal positions (where no moves are possible) a Grundy number of 0.
   - For each position, recursively calculate the Grundy number by finding the **mex** of the Grundy numbers of all positions reachable in a single move.
3. **Identify Winning and Losing Positions**:
   - If the Grundy number of the initial position is 0, it’s a losing position.
   - If the Grundy number is non-zero, it’s a winning position.

## Example: Grundy Algorithm in a Basic Game

Consider a game where players can remove 1, 2, or 3 items from a pile. The Grundy number for each position is calculated as follows:

```python
def calculate_grundy(n, moves):
    """Recursively calculates the Grundy number for a position `n` given possible moves."""
    if n == 0:
        return 0
    
    # Set to store grundy numbers of possible next moves
    reachable_grundy = set()
    
    # Recursively calculate grundy numbers for each possible move
    for move in moves:
        if n >= move:
            reachable_grundy.add(calculate_grundy(n - move, moves))
    
    # Minimum Excludant (mex): the smallest non-negative integer not in reachable_grundy
    grundy_number = 0
    while grundy_number in reachable_grundy:
        grundy_number += 1
    
    return grundy_number

# Example usage:
moves = [1, 2, 3]  # Possible moves
position = 4
print(f"Grundy number for position {position}: {calculate_grundy(position, moves)}")
```

### Explanation of Grundy Number Calculation
1. **Base Case**: When there are no items left (`n = 0`), the Grundy number is `0`.
2. **Recursive Case**: For each position `n`, calculate the Grundy number for each reachable position (`n - move`) and apply the **mex** function to these values.

### Calculated Grundy Numbers for Small Positions
If we calculate the Grundy number for positions 0 through 4:
- **Grundy(0) = 0**
- **Grundy(1) = mex({Grundy(0)}) = 1**
- **Grundy(2) = mex({Grundy(1), Grundy(0)}) = 2**
- **Grundy(3) = mex({Grundy(2), Grundy(1), Grundy(0)}) = 3**
- **Grundy(4) = mex({Grundy(3), Grundy(2), Grundy(1)}) = 0**

## Example: Grundy Algorithm in Nim Game

In a **Nim game**, players take turns removing objects from multiple piles. The **Grundy number** for a pile with \( n \) objects is simply `n`. To determine the winning player in a multi-pile game, calculate the **Nim-sum** (XOR of Grundy numbers of all piles):
- **Nim-sum = 0** → Losing position for the first player.
- **Nim-sum ≠ 0** → Winning position for the first player.

### Nim Game Code Example

```python
def calculate_nim_sum(piles):
    """Calculates the nim-sum of all piles."""
    nim_sum = 0
    for pile in piles:
        nim_sum ^= pile
    return nim_sum

# Example usage:
piles = [4, 5, 7]  # Number of objects in each pile
if calculate_nim_sum(piles) == 0:
    print("Losing position for the first player")
else:
    print("Winning position for the first player")
```

## Applications of the Grundy Algorithm

The Grundy algorithm is widely used in various combinatorial games:
- **Nim**: The classic game where players remove objects from piles.
- **Subtraction games**: Players subtract specific amounts from a total to reach zero.
- **Graph-based games**: Where players move to adjacent nodes until no moves are left.

By calculating Grundy numbers for all game positions, the algorithm allows players to identify winning strategies and optimal moves.

## Conclusion

The **Grundy algorithm** provides a mathematical approach to determine winning strategies in combinatorial games. By calculating Grundy numbers and analyzing Nim-sums, players can confidently determine winning and losing positions in games like Nim and other impartial games.

**References**
- [Grundy's Theorem](https://en.wikipedia.org/wiki/Grundy_number)
- [Game Theory and the Grundy Algorithm](https://mathworld.wolfram.com/GrundyNumber.html)


