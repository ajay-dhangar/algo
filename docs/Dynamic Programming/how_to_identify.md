---
id: identifying-dynamic-programming-problem
title: Identifying a Dynamic Programming Problem
sidebar_label: Identifying a Dynamic Programming Problem 
description: "In this blog post, we'll explore how to identify problems that can be effectively solved using Dynamic Programming (DP) techniques, focusing on the key properties of optimal substructure and overlapping subproblems."
tags: [dsa, algorithms, dynamic programming]
---

To identify whether a problem can be solved using Dynamic Programming (DP), you typically look for two key properties:

### Optimal Substructure:

- A problem exhibits optimal substructure if an optimal solution to the problem can be constructed from optimal solutions to its subproblems. In other words, if you can solve a problem by combining the solutions of smaller instances of the same problem, it likely has optimal substructure.

### Overlapping Subproblems:

- A problem has overlapping subproblems if the same subproblems are solved multiple times during the computation of the solution. DP is useful when the same calculations are needed multiple times, and it allows you to store and reuse these solutions to avoid redundant work.
