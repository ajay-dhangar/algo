---
id: polynomial-multiplication-linked-list
title: "Polynomial Multiplication using Singly Linked Lists in C++"
sidebar_label: Polynomial Multiplication
sidebar_position: 1
description: "A C++ program that multiplies two polynomials represented as linked lists, showcasing linked list operations and polynomial arithmetic."
tags: [C++, Linked Lists, Polynomial Multiplication]
---
# Polynomial Multiplication using Singly Linked Lists in C++

## Description
This program demonstrates how to multiply two polynomials represented by singly linked lists in C++. Each term of a polynomial is stored as a node containing a coefficient and an exponent, and the program outputs the result of the multiplication.

## Approach

1. **Node Structure**: Each term of the polynomial is represented by a `Node` struct with fields for coefficient, exponent, and a pointer to the next node.
2. **Adding Terms**: The `addTerm` function inserts terms to the polynomial as nodes in the linked list.
3. **Displaying Polynomials**: The `display` function formats and prints the polynomial, ensuring proper display of positive and negative terms.
4. **Multiplying Polynomials**: The `multiplyPolynomials` function multiplies each term from one polynomial with each term from the other, combining terms with the same exponents.
5. **Main Function**: Manages user input for polynomials, displays them, multiplies them, and shows the resulting polynomial.

## Code

```cpp
#include <iostream>
using namespace std;

// Node structure for polynomial terms
struct Node {
    int coeff;    // Coefficient of the term
    int exp;      // Exponent of the term
    Node* next;   // Pointer to the next term
    Node(int c, int e) : coeff(c), exp(e), next(nullptr) {}
};

// Function to add a new term to the polynomial
void addTerm(Node*& poly, int coeff, int exp) {
    Node* newNode = new Node(coeff, exp);
    if (!poly) {
        poly = newNode;
    } else {
        Node* temp = poly;
        while (temp->next)
            temp = temp->next;
        temp->next = newNode;
    }
}

// Function to display the polynomial
void display(Node* poly) {
    if (!poly) {
        cout << "0" << endl;
        return;
    }
    bool firstTerm = true;
    while (poly) {
        if (firstTerm) {
            firstTerm = false;
        } else if (poly->coeff > 0) {
            cout << " + ";
        }
        cout << poly->coeff << "x^" << poly->exp;
        poly = poly->next;
    }
    cout << endl;
}

// Function to multiply two polynomials and return the resulting polynomial
Node* multiplyPolynomials(Node* poly1, Node* poly2) {
    if (!poly1 || !poly2) return nullptr;

    Node* result = nullptr;

    // Traverse each term of the first polynomial
    for (Node* p1 = poly1; p1; p1 = p1->next) {
        // Traverse each term of the second polynomial
        for (Node* p2 = poly2; p2; p2 = p2->next) {
            int coeff = p1->coeff * p2->coeff;
            int exp = p1->exp + p2->exp;
            // Insert term in result, combining like terms
            Node* temp = result;
            Node* prev = nullptr;
            bool combined = false;
            while (temp) {
                if (temp->exp == exp) { // Combine like terms
                    temp->coeff += coeff;
                    combined = true;
                    break;
                }
                if (temp->exp < exp) break;
                prev = temp;
                temp = temp->next;
            }
            if (!combined) {
                Node* newNode = new Node(coeff, exp);
                if (!prev) { // Insert at the beginning
                    newNode->next = result;
                    result = newNode;
                } else { // Insert in between or end
                    newNode->next = prev->next;
                    prev->next = newNode;
                }
            }
        }
    }

    return result;
}

// Main function
int main() {
    Node* poly1 = nullptr;
    Node* poly2 = nullptr;

    // Input first polynomial
    int terms;
    cout << "Enter number of terms for the first polynomial: ";
    cin >> terms;
    cout << "Enter coefficient and exponent for each term:" << endl;
    for (int i = 0; i < terms; ++i) {
        int coeff, exp;
        cin >> coeff >> exp;
        addTerm(poly1, coeff, exp);
    }

    // Input second polynomial
    cout << "Enter number of terms for the second polynomial: ";
    cin >> terms;
    cout << "Enter coefficient and exponent for each term:" << endl;
    for (int i = 0; i < terms; ++i) {
        int coeff, exp;
        cin >> coeff >> exp;
        addTerm(poly2, coeff, exp);
    }

    // Display both polynomials
    cout << "First polynomial: ";
    display(poly1);
    cout << "Second polynomial: ";
    display(poly2);

    // Multiply the polynomials
    Node* result = multiplyPolynomials(poly1, poly2);

    // Display result
    cout << "Result of multiplication: ";
    if (result) {
        display(result);
    } else {
        cout << "Both polynomials are empty." << endl;
    }

    return 0;
}
```
