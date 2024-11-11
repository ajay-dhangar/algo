---
id: polynomial-addition 
title: Polynomial-addition 
sidebar_label: Polynomial-addition  
description: "Addition of two polynomials represented as linked lists and displays the resulting polynomial"  
tags: [dsa, algorithms, linked-list]
---

### Problem Statement:
 Write a program in C++ to add two polynomials using a linked list. Each node of the linked list will represent a term in the polynomial, containing the coefficient and exponent of the term. The program will take two polynomials as input, add them, and output the resulting polynomial in simplified form.

### Features

- Input two polynomials from the user.                   
- Add polynomials by combining like terms.                   
- Display polynomials in a readable format (e.g., 3x^2 + 2x + 1).  

### Algorithm Steps:

1. **Define the Node Structure:**
   - Create a structure `Node` with fields for coefficient (`coeff`), exponent (`exp`), and a pointer to the next node (`next`).

2. **Create the Polynomial:**
   - Initialize the head of the polynomial as `nullptr`.

3. **Insert Terms:**
   - Define a function `insertTerm(Node*& head, int coeff, int exp)` to insert a new term into the polynomial.
   - If the head is `nullptr`, set it to the new node. Otherwise, traverse to the end of the list and append the new node.

4. **Display Polynomial:**
   - Define a function `displayPolynomial(Node* head)` to print the polynomial in a formatted manner.
   - Handle special cases for exponents 1 and 0 to omit unnecessary parts of the output.

5. **Add Polynomials:**
   - Define a function `addPolynomials(Node* poly1, Node* poly2)` that takes two polynomial linked lists.
   - Initialize an empty result polynomial.
   - Traverse both polynomials:
     - If the exponent of the first polynomial term is greater, insert it into the result.
     - If the exponent of the second polynomial term is greater, insert it into the result.
     - If the exponents are equal, sum the coefficients and insert the resulting term if non-zero.
   - After finishing one polynomial, insert any remaining terms from the other polynomial.

6. **Main Function:**
   - Initialize pointers for the two input polynomials and the result polynomial.
   - Input the number of terms and the corresponding coefficients and exponents for each polynomial.
   - Display both polynomials and the sum of the polynomials.

7. **End of Program:**
   - Return 0 to indicate successful execution.

### Time Complexity:
- The time complexity of this program is `O(max(n, m))` , where `n` and `m` are the number of terms in the two polynomials being added. The `addPolynomials` function processes each term from both polynomials once, resulting in linear time complexity relative to the larger polynomial. The `insertTerm` function performs insertions in constant time, and displaying the polynomials has a linear complexity as well, but it is dominated by the addition process.

### Sample Input:

  Enter the number of terms for the first polynomial: 3                 
  Enter coefficient and exponent for term 1: 3 2                      
  Enter coefficient and exponent for term 2: 2 1                   
  Enter coefficient and exponent for term 3: 1 0                                 
  Enter the number of terms for the second polynomial: 2                              
  Enter coefficient and exponent for term 1: 4 2                        
  Enter coefficient and exponent for term 2: 3 0                                          

### Sample Output:
  First Polynomial: 3x^2 + 2x + 1                
  Second Polynomial: 4x^2 + 3                       
  Sum of Polynomials: 7x^2 + 2x + 4                                      

### C++ Implementation:

```cpp

#include <iostream>
using namespace std;

struct Node {
    int coeff;
    int exp;
    Node* next;
    Node(int c, int e) : coeff(c), exp(e), next(nullptr) {}  // Constructor for easy initialization
};

// Function to insert a term at the end of the polynomial
void insertTerm(Node*& head, int coeff, int exp) {
    Node* newNode = new Node(coeff, exp);
    if (head == nullptr) {
        head = newNode;
    } else {
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}

// Function to display the polynomial in a formatted way
void displayPolynomial(Node* head) {
    Node* temp = head;
    bool isFirstTerm = true;

    while (temp != nullptr) {
        // Adjust display for x^1 and x^0 cases
        if (temp->exp == 1) {
            cout << (temp->coeff > 0 && !isFirstTerm ? " + " : "") << temp->coeff << "x";
        } else if (temp->exp == 0) {
            cout << (temp->coeff > 0 && !isFirstTerm ? " + " : "") << temp->coeff;
        } else {
            cout << (temp->coeff > 0 && !isFirstTerm ? " + " : "") << temp->coeff << "x^" << temp->exp;
        }
        temp = temp->next;
        isFirstTerm = false;
    }
    cout << endl;
}

// Function to add two polynomials and return the resulting polynomial
Node* addPolynomials(Node* poly1, Node* poly2) {
    Node* result = nullptr;
    Node* p1 = poly1;
    Node* p2 = poly2;

    while (p1 != nullptr && p2 != nullptr) {
        if (p1->exp > p2->exp) {
            insertTerm(result, p1->coeff, p1->exp);
            p1 = p1->next;
        } else if (p1->exp < p2->exp) {
            insertTerm(result, p2->coeff, p2->exp);
            p2 = p2->next;
        } else {
            int sumCoeff = p1->coeff + p2->coeff;
            if (sumCoeff != 0) {  // Only add non-zero coefficients
                insertTerm(result, sumCoeff, p1->exp);
            }
            p1 = p1->next;
            p2 = p2->next;
        }
    }

    // Insert remaining terms from either polynomial if any are left
    while (p1 != nullptr) {
        insertTerm(result, p1->coeff, p1->exp);
        p1 = p1->next;
    }
    while (p2 != nullptr) {
        insertTerm(result, p2->coeff, p2->exp);
        p2 = p2->next;
    }

    return result;
}

int main() {
    Node* poly1 = nullptr;
    Node* poly2 = nullptr;
    Node* result = nullptr;
    int n, coeff, exp;
    cout << "Enter the number of terms for the first polynomial: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Enter coefficient and exponent for term " << i + 1 << ": ";
        cin >> coeff >> exp;
        insertTerm(poly1, coeff, exp);
    }
    cout << "Enter the number of terms for the second polynomial: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Enter coefficient and exponent for term " << i + 1 << ": ";
        cin >> coeff >> exp;
        insertTerm(poly2, coeff, exp);
    }
    cout << "First Polynomial: ";
    displayPolynomial(poly1);
    cout << "Second Polynomial: ";
    displayPolynomial(poly2);
    result = addPolynomials(poly1, poly2);
    cout << "Sum of Polynomials: ";
    displayPolynomial(result);
    return 0;
}
```
