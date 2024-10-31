---
id: dawg-match-algorithm
sidebar_position: 31
title: DAWG-Match Algorithm
sidebar_label: DAWG-Match Algorithm
---

### Definition:

The DAWG-Match (Directed Acyclic Word Graph Match) Algorithm is a string matching algorithm that utilizes a DAWG data structure for efficient pattern matching. It constructs a minimal deterministic automaton that recognizes all suffixes of the pattern and uses it for fast text scanning.

### Characteristics:

- **DAWG Construction**:
 - Minimal automaton building
 - Suffix recognition
 - State minimization

- **Pattern Processing**:
 - Suffix-based matching
 - State transitions
 - Failure links

- **Automaton Management**:
 - State tracking
 - Transition optimization
 - Match detection

- **Efficient Scanning**:
 - Linear-time processing
 - Optimal transitions
 - Quick mismatch detection

### Time Complexity:

- **Preprocessing: $O(m)$**
 - Where m is pattern length
 - DAWG construction
 - State computation

- **Searching: $O(n)$**
 - Where n is text length
 - Linear scan time
 - Efficient transitions

### Space Complexity:

- **Space Usage: $O(m)$**
 - Where m is pattern length
 - DAWG storage
 - State information

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class DAWGMatch {
private:
   struct State {
       unordered_map<char, int> transitions;
       int suffixLink;
       bool isTerminal;
       
       State() : suffixLink(-1), isTerminal(false) {}
   };
   
   vector<State> dawg;
   string pattern;
   int states;
   
   // Build DAWG for pattern
   void buildDAWG() {
       dawg.clear();
       dawg.push_back(State());
       states = 1;
       
       int lastState = 0;
       // Process pattern to build DAWG
       for (int i = 0; i < pattern.length(); i++) {
           char c = pattern[i];
           int currentState = states++;
           dawg.push_back(State());
           
           // Add transition from last state
           dawg[lastState].transitions[c] = currentState;
           
           // Process suffix links
           int p = lastState;
           while (p != -1 && !dawg[p].transitions.count(c)) {
               dawg[p].transitions[c] = currentState;
               p = dawg[p].suffixLink;
           }
           
           if (p == -1) {
               dawg[currentState].suffixLink = 0;
           } else {
               int q = dawg[p].transitions[c];
               if (p == lastState) {
                   dawg[currentState].suffixLink = q;
               } else {
                   // Clone state for minimization
                   int clone = states++;
                   dawg.push_back(dawg[q]);
                   dawg[currentState].suffixLink = clone;
                   
                   while (p != -1 && dawg[p].transitions[c] == q) {
                       dawg[p].transitions[c] = clone;
                       p = dawg[p].suffixLink;
                   }
               }
           }
           
           lastState = currentState;
       }
       
       // Mark terminal states
       dawg[lastState].isTerminal = true;
       for (int i = 0; i < states; i++) {
           if (dawg[i].suffixLink != -1) {
               int p = i;
               while (p != -1) {
                   if (dawg[p].isTerminal) break;
                   if (p == lastState) dawg[p].isTerminal = true;
                   p = dawg[p].suffixLink;
               }
           }
       }
   }

public:
   vector<int> search(const string& text, const string& pat) {
       vector<int> matches;
       pattern = pat;
       
       if (pattern.empty() || text.empty()) return matches;
       
       // Build DAWG
       buildDAWG();
       
       // Searching phase
       int state = 0;
       for (int i = 0; i < text.length(); i++) {
           while (state != -1 && !dawg[state].transitions.count(text[i])) {
               state = dawg[state].suffixLink;
           }
           
           if (state == -1) {
               state = 0;
               continue;
           }
           
           state = dawg[state].transitions[text[i]];
           
           if (dawg[state].isTerminal) {
               matches.push_back(i - pattern.length() + 1);
           }
       }
       
       return matches;
   }
   
   // Advanced search with optimizations
   vector<int> advancedSearch(const string& text, const string& pat) {
       vector<int> matches;
       pattern = pat;
       
       if (pattern.empty() || text.empty()) return matches;
       
       // Build DAWG
       buildDAWG();
       
       // Precompute pattern characters
       vector<bool> patternChars(256, false);
       for (char c : pattern) {
           patternChars[c] = true;
       }
       
       // Searching with optimizations
       int state = 0;
       for (int i = 0; i < text.length(); i++) {
           // Quick character check
           if (!patternChars[text[i]]) {
               state = 0;
               continue;
           }
           
           while (state != -1 && !dawg[state].transitions.count(text[i])) {
               state = dawg[state].suffixLink;
           }
           
           if (state == -1) {
               state = 0;
               continue;
           }
           
           state = dawg[state].transitions[text[i]];
           
           if (dawg[state].isTerminal) {
               matches.push_back(i - pattern.length() + 1);
           }
       }
       
       return matches;
   }
};