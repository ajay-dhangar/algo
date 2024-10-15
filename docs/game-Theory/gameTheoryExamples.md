---
id: Game-Theory-examples  
title: Game theory Problem 
sidebar_label: Game Theory  
description: "is a mathematical framework used to study decision-making in situations where multiple players interact."
tags: [dsa, algorithms, game theory algorithms]
---


## 1. Prisoner's Dilemma
In this example, we simulate a simple Prisoner's Dilemma game where two players either confess or stay silent.

```cpp
Copy code
#include <iostream>
using namespace std;

void prisonerDilemma() {
    int playerA, playerB;
    // 0 = Stay Silent, 1 = Confess

    cout << "Player A: Enter 0 to Stay Silent, 1 to Confess: ";
    cin >> playerA;
    cout << "Player B: Enter 0 to Stay Silent, 1 to Confess: ";
    cin >> playerB;

    if (playerA == 0 && playerB == 0) {
        cout << "Both stay silent: (1 year, 1 year)" << endl;
    } else if (playerA == 1 && playerB == 1) {
        cout << "Both confess: (3 years, 3 years)" << endl;
    } else if (playerA == 0 && playerB == 1) {
        cout << "Player A stays silent, Player B confesses: (5 years, goes free)" << endl;
    } else if (playerA == 1 && playerB == 0) {
        cout << "Player A confesses, Player B stays silent: (goes free, 5 years)" << endl;
    }
}

int main() {
    prisonerDilemma();
    return 0;
}
```
## 2. Matching Pennies
The Matching Pennies game simulates two players choosing heads or tails. The game checks whether the players' choices match.

```cpp
Copy code
#include <iostream>
using namespace std;

void matchingPennies() {
    int playerA, playerB;
    // 0 = Heads, 1 = Tails

    cout << "Player A: Enter 0 for Heads, 1 for Tails: ";
    cin >> playerA;
    cout << "Player B: Enter 0 for Heads, 1 for Tails: ";
    cin >> playerB;

    if (playerA == playerB) {
        cout << "Player A wins!" << endl;
    } else {
        cout << "Player B wins!" << endl;
    }
}

int main() {
    matchingPennies();
    return 0;
}
```
## 3. Stag Hunt
In this example, two hunters choose whether to hunt a Stag together or hunt a Rabbit alone. The game outputs their payoffs based on their choices.

```cpp
Copy code
#include <iostream>
using namespace std;

void stagHunt() {
    int hunterA, hunterB;
    // 0 = Hunt Rabbit, 1 = Hunt Stag

    cout << "Hunter A: Enter 0 to Hunt Rabbit, 1 to Hunt Stag: ";
    cin >> hunterA;
    cout << "Hunter B: Enter 0 to Hunt Rabbit, 1 to Hunt Stag: ";
    cin >> hunterB;

    if (hunterA == 1 && hunterB == 1) {
        cout << "Both hunt the stag: (10, 10)" << endl;
    } else if (hunterA == 0 && hunterB == 0) {
        cout << "Both hunt rabbits: (2, 2)" << endl;
    } else if (hunterA == 1 && hunterB == 0) {
        cout << "Hunter A hunts stag, Hunter B hunts rabbit: (0, 2)" << endl;
    } else if (hunterA == 0 && hunterB == 1) {
        cout << "Hunter A hunts rabbit, Hunter B hunts stag: (2, 0)" << endl;
    }
}

int main() {
    stagHunt();
    return 0;
}
```