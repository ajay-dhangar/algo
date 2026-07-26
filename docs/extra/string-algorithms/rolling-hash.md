---
id: rolling-hash
title: Rolling Hash
sidebar_label: Rolling Hash
sidebar_position: 5
description: A hashing technique used heavily in string matching algorithms like Rabin-Karp.
tags: [string, algorithm, hashing, advanced]
---

# Rolling Hash

A rolling hash (also known as recursive hashing) is a hash function where the input is hashed in a window that moves through the input.

## Intuition
When sliding a window of length `M` across a text of length `N`, recomputing the hash of the window from scratch would take `O(M)` time for each position. A rolling hash allows us to compute the hash of the new window from the hash of the previous window in `O(1)` time by dropping the contribution of the character leaving the window and adding the contribution of the new character entering.

## Rabin-Karp Algorithm
The Rabin-Karp string search algorithm is the most famous application of the rolling hash. It uses a polynomial rolling hash function.

### Mathematical Formulation
If `S` is a string of length `M`, the polynomial hash is:
`H(S) = (S[0] \cdot B^{M-1} + S[1] \cdot B^{M-2} + ... + S[M-1] \cdot B^0) \mod P`
Where `B` is the base (typically prime) and `P` is a large prime modulus.

## Complexity Analysis
- **Time Complexity:** `O(N + M)` on average.
- **Space Complexity:** `O(1)`.
