---
id: aho-corasick
title: Aho-Corasick Algorithm
sidebar_label: Aho-Corasick
sidebar_position: 2
description: An efficient string searching algorithm that searches for multiple patterns simultaneously using an automaton.
tags: [string, algorithm, trie, automaton, advanced]
---

# Aho-Corasick Algorithm

The Aho-Corasick algorithm is a string-searching algorithm invented by Alfred V. Aho and Margaret J. Corasick. It builds an automaton (specifically a finite state machine) based on a Trie data structure to search for multiple patterns simultaneously.

## Intuition
Unlike regular pattern matching (e.g., KMP) which searches for a single pattern, Aho-Corasick is optimized to search a text against a dictionary of multiple patterns. It utilizes failure links (similar to KMP's prefix function) to transition state efficiently when a mismatch occurs.

## Complexity Analysis
- **Time Complexity:** `O(N + M + Z)` where `N` is text length, `M` is total length of all patterns, and `Z` is the total number of matches found.
- **Space Complexity:** `O(M * K)` where `K` is the size of the alphabet, to store the Trie and transition table.

## Implementation Structure
The standard approach involves:
1. **Building a Trie** with all patterns.
2. **Adding Failure Links** using BFS so that we know where to fallback upon a mismatch.
3. **Searching** the text by traversing the automaton.
