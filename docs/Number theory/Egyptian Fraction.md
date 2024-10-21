---
id: egyptian-fraction
title: Egyptian Fraction
sidebar_label: Introduction to Egyptian Fractions
description: 'Egyptian Fractions represent a fraction as a sum of distinct unit fractions.'
tags: [dsa, number-theory, fractions]
---

### Overview:

An Egyptian Fraction is a representation of a fraction as a sum of distinct unit fractions. For example, the fraction \( \frac{2}{3} \) can be expressed as \( \frac{1}{2} + \frac{1}{6} \). The challenge is to find such representations efficiently.

### Solutions:

## C++ 

```c++
#include <iostream>
#include <vector>
using namespace std;

void egyptianFraction(int numerator, int denominator) {
    // Vector to store the result
    vector<int> fractions;

    // While the numerator is greater than 0
    while (numerator > 0) {
        // Calculate the next unit fraction
        int unitFractionDenom = (denominator / numerator) + 1;
        fractions.push_back(unitFractionDenom);

        // Update the numerator and denominator
        numerator = numerator * unitFractionDenom - denominator;
        denominator = denominator * unitFractionDenom;
    }

    // Print the result
    cout << "Egyptian Fraction: ";
    for (size_t i = 0; i < fractions.size(); ++i) {
        cout << "1/" << fractions[i];
        if (i < fractions.size() - 1) {
            cout << " + ";
        }
    }
    cout << endl;
}

int main() {
    int numerator, denominator;
    cout << "Enter numerator: ";
    cin >> numerator; // Take numerator input from user
    cout << "Enter denominator: ";
    cin >> denominator; // Take denominator input from user
    egyptianFraction(numerator, denominator);
    return 0;
}

```

## Java

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class EgyptianFraction {
    public void findEgyptianFraction(int numerator, int denominator) {
        List<Integer> fractions = new ArrayList<>();

        while (numerator > 0) {
            // Calculate the next unit fraction
            int unitFractionDenom = (denominator / numerator) + 1;
            fractions.add(unitFractionDenom);

            // Update the numerator and denominator
            numerator = numerator * unitFractionDenom - denominator;
            denominator = denominator * unitFractionDenom;
        }

        // Print the result
        System.out.print("Egyptian Fraction: ");
        for (int i = 0; i < fractions.size(); i++) {
            System.out.print("1/" + fractions.get(i));
            if (i < fractions.size() - 1) {
                System.out.print(" + ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        EgyptianFraction ef = new EgyptianFraction();

        System.out.print("Enter numerator: ");
        int numerator = scanner.nextInt(); // Take numerator input from user
        System.out.print("Enter denominator: ");
        int denominator = scanner.nextInt(); // Take denominator input from user
        ef.findEgyptianFraction(numerator, denominator);

        scanner.close();
    }
}

```

## Python

```python
class EgyptianFraction:
    def find_egyptian_fraction(self, numerator, denominator):
        fractions = []

        while numerator > 0:
            # Calculate the next unit fraction
            unit_fraction_denom = (denominator // numerator) + 1
            fractions.append(unit_fraction_denom)

            # Update the numerator and denominator
            numerator = numerator * unit_fraction_denom - denominator
            denominator = denominator * unit_fraction_denom

        # Print the result
        print("Egyptian Fraction: ", end="")
        for i in range(len(fractions)):
            print(f"1/{fractions[i]}", end="")
            if i < len(fractions) - 1:
                print(" + ", end="")
        print()

# Example Usage
if __name__ == "__main__":
    ef = EgyptianFraction()
    num = int(input("Enter numerator: "))  # Take numerator input from user
    den = int(input("Enter denominator: "))  # Take denominator input from user
    ef.find_egyptian_fraction(num, den)

```

## Key Concepts:

➢ Unit Fractions: An Egyptian Fraction consists of distinct unit fractions, each of the form (1/n)
➢  Greedy Approach: The algorithm uses a greedy approach to find the next unit fraction, ensuring that each unit fraction contributes to reducing the original fraction until it is fully decomposed.
