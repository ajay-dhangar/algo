---
id: polynomial-representation-linked-list
sidebar_position: 1
title: "Polynomial Representation of a Linked List in C++"
description: "This tutorial explains how to represent and manipulate a polynomial using a linked list in C++."
sidebar_label: "Polynomial Representation of Linked List"
tags: [dsa, linked-lists, polynomial representation]
---

## Linked List Intersection:

This tutorial provides a C++ implementation to represent and perform operations on a polynomial using a singly linked list. In this representation, each node of the linked list stores the coefficient and exponent of a polynomial term.

### Problem Statement:

Represent a polynomial as a linked list, where each node contains two fields: one for the coefficient and another for the exponent of a polynomial term. This setup allows for efficient storage and manipulation of polynomial expressions, particularly for addition and multiplication.

### Approach:

The approach involves the following steps:

1. **Define the Node Structure: Each node contains the coefficient and exponent of a polynomial term, along with a pointer to the next node.**
2. **Create the Polynomial Linked List: Build a linked list by adding terms (nodes) in descending order of exponents.**
3. **Addition of Polynomials: Traverse two polynomial lists simultaneously and add terms with the same exponent.**
4. **Multiplication of Polynomials: Multiply each term of the first polynomial with each term of the second, combining terms with the same exponent.**
5. **Display the Polynomial: Traverse the list to output the polynomial in standard format.**
   
### C++ Implementation:

Here is the C++ code that implements this approach:

```cpp
#include <iostream>
using namespace std;

/* Node structure for a polynomial term */
class Node {
public:
    int coefficient;
    int exponent;
    Node* next;
};

/* Function to insert a new term in the polynomial linked list */
void insertTerm(Node** poly, int coeff, int exp) {
    Node* newNode = new Node();
    newNode->coefficient = coeff;
    newNode->exponent = exp;
    newNode->next = nullptr;

    if (*poly == nullptr || (*poly)->exponent < exp) {
        newNode->next = *poly;
        *poly = newNode;
    } else {
        Node* current = *poly;
        while (current->next != nullptr && current->next->exponent > exp) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
    }
}

/* Function to add two polynomial linked lists */
Node* addPolynomials(Node* poly1, Node* poly2) {
    Node* result = nullptr;

    while (poly1 != nullptr || poly2 != nullptr) {
        int coeff, exp;

        if (poly1 == nullptr) {
            coeff = poly2->coefficient;
            exp = poly2->exponent;
            poly2 = poly2->next;
        } else if (poly2 == nullptr) {
            coeff = poly1->coefficient;
            exp = poly1->exponent;
            poly1 = poly1->next;
        } else if (poly1->exponent == poly2->exponent) {
            coeff = poly1->coefficient + poly2->coefficient;
            exp = poly1->exponent;
            poly1 = poly1->next;
            poly2 = poly2->next;
        } else if (poly1->exponent > poly2->exponent) {
            coeff = poly1->coefficient;
            exp = poly1->exponent;
            poly1 = poly1->next;
        } else {
            coeff = poly2->coefficient;
            exp = poly2->exponent;
            poly2 = poly2->next;
        }

        if (coeff != 0) {
            insertTerm(&result, coeff, exp);
        }
    }

    return result;
}

/* Function to display the polynomial */
void displayPolynomial(Node* poly) {
    while (poly != nullptr) {
        cout << poly->coefficient << "x^" << poly->exponent;
        poly = poly->next;
        if (poly != nullptr) {
            cout << " + ";
        }
    }
    cout << endl;
}

/* Driver Code */
int main() {
    Node* poly1 = nullptr;
    Node* poly2 = nullptr;

    // Creating first polynomial: 3x^2 + 5x + 6
    insertTerm(&poly1, 3, 2);
    insertTerm(&poly1, 5, 1);
    insertTerm(&poly1, 6, 0);

    // Creating second polynomial: 4x^2 + 2x + 1
    insertTerm(&poly2, 4, 2);
    insertTerm(&poly2, 2, 1);
    insertTerm(&poly2, 1, 0);

    // Displaying both polynomials
    cout << "Polynomial 1: ";
    displayPolynomial(poly1);

    cout << "Polynomial 2: ";
    displayPolynomial(poly2);

    // Adding the two polynomials
    Node* sum = addPolynomials(poly1, poly2);
    cout << "Sum: ";
    displayPolynomial(sum);

    return 0;
}
```
## Explanation:

## Step 1: **Define the Node Structure**
Each node in the linked list holds a coefficient and exponent for a polynomial term.
## Step 2: **Insert Terms in the Polynomial**
The insertTerm() function places each term in the polynomial list, maintaining a descending order of exponents.
## Step 3: **Display the Polynomial**
The displayPolynomial() function outputs the polynomial in human-readable form.

Time Complexity:

- Time Complexity: O(m + n), where m and n are the number of terms in each polynomial. Each term is processed once.
- Space Complexity: O(m + n), due to the space required for the result polynomial.
  
### Applications:
This method is useful in various contexts:

- Symbolic Computation: Representing polynomials in computer algebra systems.
- Engineering and Physics: Handling polynomial expressions in simulations.
- Machine Learning: Polynomial regression models can benefit from this representation for sparse polynomials.
