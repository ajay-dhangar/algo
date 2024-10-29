//Write a C++ program to multiply two polynomials using singly linked lists. Each polynomial should be represented as a linked list where each node contains a coefficient and an exponent for a term.
//The program should take user input for two polynomials, perform the multiplication, and display the result.

//APPROACH-
/*The provided C++ code implements polynomial multiplication using a linked list.
1) Node Structure: Each term of the polynomial is represented by a Node containing the coefficient, exponent, and a pointer to the next term.
2) Adding Terms: The addTerm function adds new terms to the polynomial. It appends terms to the end of the linked list.
3) Displaying Polynomials: The display function formats and prints the polynomial, handling the sign between terms.
4) Multiplying Polynomials: The multiplyPolynomials function multiplies two polynomials by iterating through each term of both polynomials, combining like terms as needed.
5) Main Function: It handles user input for the polynomials, displays them, performs the multiplication, and shows the result.*/

#include <iostream>
using namespace std;

// Node structure for polynomial terms
struct Node {
    int coeff; // Coefficient of the term
    int exp;   // Exponent of the term
    Node* next; // Pointer to the next term
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
