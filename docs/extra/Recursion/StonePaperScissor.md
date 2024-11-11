---
id: stone-paper-scissor-game 
title: Stone Paper Scissor Game Using Recursion
sidebar_label: Generate Stone Paper Scissor Game 
description: "Stone Paper Scissors is a classic hand game enjoyed by people of all ages around the world. In this engaging game, two players simultaneously choose one of three options: stone, paper, or scissors. The rules are simple: stone crushes scissors, scissors cut paper, and paper covers stone. This fast-paced game not only fosters friendly competition but also helps improve decision-making and strategic thinking skills. Often played in a best-of-three format, players aim to win two out of three rounds to determine the overall winner."
tags: [StonePaperScissor, recursion, dsa]
---
## Stone Paper Scissor Game Via Recursion

**Problem Statement:**

The **Stone-Paper-Scissors Game** is a widely recognized hand game that requires players to choose one of three options—Stone (Rock), Paper, or Scissors—simultaneously. Despite its simplicity, the game incorporates elements of strategy and psychology, as players attempt to predict and outmaneuver their opponents.

In this implementation, the goal is to develop an engaging online version of the Stone-Paper-Scissors game that allows users to play against a computer opponent or against other players. The system should support multiple rounds of play, keeping track of wins and losses to determine an overall winner.

 **Key Requirements** :

1. **User Input** : Allow players to select their choice (Stone, Paper, or Scissors) through an intuitive interface.
2. **Computer Opponent** : Implement a random selection mechanism for the computer’s move to ensure fair play.
3. **Game Logic** : Establish the rules for determining the winner of each round based on the interactions between the choices.
4. **Score Tracking** : Maintain a score tally for each player throughout multiple rounds, displaying results after each round and at the end of the game.
5. **User Experience** : Provide an interactive and visually appealing interface, including graphics and animations, to enhance player engagement.

 **Challenges** :

* Designing a user-friendly interface that accommodates players of all ages and skill levels.
* Ensuring the game logic is robust and correctly implements the rules of Stone-Paper-Scissors.
* Creating an enjoyable experience that balances simplicity with strategic depth.

By addressing these requirements and challenges, the Stone-Paper-Scissors game aims to offer a fun and interactive platform that captivates users and promotes friendly competition.

#### Explanation:

The **Stone-Paper-Scissors Game** is a simple yet engaging hand game that challenges players to make strategic choices against an opponent. The problem statement outlines the development of an online version of this game, where users can play against either a computer or other players, making it a versatile and entertaining experience.

#### Key Elements of the Problem Statement:

**User Input** :

* The game requires an interface where players can select their move: Stone (Rock), Paper, or Scissors. This is essential for user interaction and sets the stage for the competition.

**Computer Opponent** :

* To create a dynamic gameplay experience, the computer needs to make random choices. This randomness ensures that players face a unique challenge each round, preventing predictability.

**Game Logic** :

* The core of the game lies in its rules, which dictate the outcomes of player choices:
  * Stone crushes Scissors.
  * Scissors cut Paper.
  * Paper covers Stone.
* Implementing this logic correctly is crucial for a fair and enjoyable game.

**Score Tracking** :

* The game should maintain a record of wins and losses, allowing players to see their performance over multiple rounds. This tracking helps build competitiveness and encourages players to improve their strategies.

#### Complexity :

The complexity analysis of the **Stone-Paper-Scissors Game** involves examining both the time complexity and space complexity of the implementation. This analysis helps to understand the efficiency of the game in terms of performance and resource usage.

#### Time Complexity

**User Input** :

* The time taken for user input can be considered constant,  **O(1)** , as the user makes a choice without any looping or iterative processes involved.

**Computer Selection** :

* The computer randomly selects a move (Stone, Paper, or Scissors) using a random number generator, which is also a constant-time operation,  **O(1)** .

**Determining the Winner** :

* Evaluating the winner based on user and computer choices involves a series of conditional checks. Regardless of the number of rounds played, determining the winner for each round requires a fixed number of operations, resulting in a time complexity of **O(1)** for each round.

**Total Time Complexity** :

* If the game is played for **n** rounds, the total time complexity is  **O(n)** , where each round takes constant time to process.

#### Space Complexity

**Storage for Scores** :

* The game requires variables to store the scores of the user and the computer. These are a fixed number of integer variables, resulting in **O(1)** space complexity.

**Input and Output** :

* Space is also needed for storing user input and the output displayed on the screen, but this does not grow with the size of the input; hence it remains  **O(1)** .

**Total Space Complexity** :

* Overall, the space complexity of the Stone-Paper-Scissors game is  **O(1)** , as it only uses a constant amount of space regardless of the number of rounds played.

### Limitations and Considerations

The  **Stone-Paper-Scissors Game** , while entertaining, has several limitations and considerations. Its simplicity may not engage all users, especially those looking for more complex gameplay or strategies, as it largely relies on chance. The game is primarily designed for two players, limiting its social interaction potential in larger groups. Additionally, if the user interface is not intuitive, it could frustrate players, and poor optimization for mobile devices may deter users. The absence of adaptive learning mechanisms means the game lacks replayability, and security concerns must be addressed if user accounts are required. Overall, while it offers classic fun, developers should consider these factors to enhance the user experience.

**C++ implementation :**

**Output :**

Welcome to Stone Paper Scissors Game!
Enter the number of rounds: 5
Enter your choice (r for rock, p for paper, s for scissors): r
Computer chose: p
User wins
Enter your choice (r for rock, p for paper, s for scissors): s
Computer chose: p
Computer wins
Enter your choice (r for rock, p for paper, s for scissors): p
Computer chose: p
Draw
Enter your choice (r for rock, p for paper, s for scissors): s
Computer chose: s
Draw
Enter your choice (r for rock, p for paper, s for scissors): p
Computer chose: r
Computer wins
Computer wins the game with 2 wins!

**Code :**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

string determineWinner(char userChoice, char computerChoice) {
    if (userChoice == computerChoice) {
        return "Draw";
    } else if ((userChoice == 's' && computerChoice == 'p') ||
               (userChoice == 'p' && computerChoice == 'r') ||
               (userChoice == 'r' && computerChoice == 's')) {
        return "Computer wins";
    } else {
        return "User wins";
    }
}

void playGame(int rounds, int &userWins, int &computerWins) {
    if (rounds == 0) {
        if (userWins > computerWins) {
            cout << "User wins the game with " << userWins << " wins!" << endl;
        } else if (computerWins > userWins) {
            cout << "Computer wins the game with " << computerWins << " wins!" << endl;
        } else {
            cout << "It's a tie game!" << endl;
        }
        return;
    }

    char userChoice;
    cout << "Enter your choice (r for rock, p for paper, s for scissors): ";
    cin >> userChoice;

    srand(time(0));
    int randomChoice = rand() % 3;
    char computerChoice = (randomChoice == 0) ? 'r' : (randomChoice == 1) ? 'p' : 's';

    cout << "Computer chose: " << computerChoice << endl;

    string roundResult = determineWinner(userChoice, computerChoice);
    cout << roundResult << endl;

    if (roundResult == "User wins") {
        userWins++;
    } else if (roundResult == "Computer wins") {
        computerWins++;
    }

    playGame(rounds - 1, userWins, computerWins);
}

int main() {
    int rounds;
    cout << "Welcome to Stone Paper Scissors Game!" << endl;
    cout << "Enter the number of rounds: ";
    cin >> rounds;

    int userWins = 0, computerWins = 0;

    playGame(rounds, userWins, computerWins);

    return 0;
}

```
