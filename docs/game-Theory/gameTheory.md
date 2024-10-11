---
id: Game-Theory-theory  
title: Game theory  
sidebar_label: Game Theory  
description: "is a mathematical framework used to study decision-making in situations where multiple players interact."
tags: [dsa, algorithms, game theory algorithms]
---

# Game Theory

**Game Theory** is a mathematical framework used to study decision-making in situations where multiple players (or agents) interact. Each player’s outcome depends not only on their own actions but also on the actions of other players. Game theory helps in analyzing strategies and predicting outcomes in competitive situations.

## Key Concepts

### 1. **Game**
A game in game theory consists of:
- **Players**: The decision-makers in the game.
- **Strategies**: The available choices or plans of action for each player.
- **Payoffs**: The outcome each player receives based on the combination of chosen strategies by all players.

### 2. **Types of Games**
- **Cooperative vs Non-cooperative**:
  - **Cooperative games**: Players can form alliances or coalitions and negotiate collective strategies.
  - **Non-cooperative games**: No collaboration is allowed, and each player acts independently.
  
- **Zero-sum vs Non-zero-sum**:
  - **Zero-sum games**: The gain of one player is exactly the loss of the other (e.g., chess).
  - **Non-zero-sum games**: The total payoff can vary, and one player's gain is not necessarily the other player's loss (e.g., trade negotiations).

- **Simultaneous vs Sequential**:
  - **Simultaneous games**: Players choose their strategies at the same time, without knowing the strategies of other players.
  - **Sequential games**: Players take turns choosing their strategies, with each player observing previous moves before making their choice.

### 3. **Strategy Types**
- **Pure Strategy**: A strategy where a player consistently chooses the same action.
- **Mixed Strategy**: A strategy where a player assigns probabilities to different actions and makes a random choice based on those probabilities.

### 4. **Nash Equilibrium**
A **Nash Equilibrium** occurs when each player chooses the best possible strategy, given the strategies chosen by the other players. No player has an incentive to change their strategy unilaterally.

Example: In the **Prisoner's Dilemma**, both players confess because it is the Nash Equilibrium, even though staying silent would have been a better outcome for both if they cooperated.

### 5. **Dominant Strategy**
A strategy is dominant if it always results in a better outcome for the player, regardless of what the other players do.

### 6. **Payoff Matrix**
In a **Payoff Matrix**, each player’s payoffs are listed based on the strategies chosen by all players. This is used to visualize outcomes in simultaneous games.

Example of a **Payoff Matrix** for two players:

| Player 2 | Strategy A | Strategy B |
|----------|------------|------------|
| **Player 1: Strategy X** | (3, 2)     | (1, 1)     |
| **Player 1: Strategy Y** | (2, 3)     | (4, 4)     |

In this matrix, each cell represents the payoffs for Player 1 and Player 2 for a given combination of strategies.

### 7. **Minimax Theorem**
In zero-sum games, the **Minimax Theorem** states that players should minimize the possible maximum loss. The idea is to choose a strategy that has the best worst-case outcome.

### 8. **Examples of Games in Game Theory**

- **Prisoner’s Dilemma**: A classic example of a non-zero-sum game where rational decision-making leads to a suboptimal outcome.
- **Battle of the Sexes**: A coordination game where two players prefer different outcomes but want to be together.
- **Stag Hunt**: A game that examines trust and collaboration, where two hunters must decide whether to cooperate or hunt alone.

## Applications of Game Theory
Game theory is widely used in various fields, such as:
- **Economics**: To analyze markets and strategic interactions between firms.
- **Political Science**: For understanding conflicts, elections, and voting behavior.
- **Computer Science**: In algorithms, AI, and network design.
- **Biology**: In studying evolutionary strategies and animal behavior.

## Conclusion
Game theory provides a powerful framework to analyze situations where individuals or groups make decisions that affect each other. It helps in finding optimal strategies and predicting the outcomes of complex interactions in competitive environments.
