// C++ example demonstrating encapsulation using a BankAccount class.
// The sensitive data members (balance) are made private, and they can only be accessed or modified through specific public methods (deposit() and withdraw()).
#include <iostream>
using namespace std;

class BankAccount {
private:
    // Private data member to prevent direct access
    double balance;

public:
    // Constructor to initialize the balance
    BankAccount(double initialBalance) {
        if (initialBalance >= 0) {
            balance = initialBalance;
        } else {
            balance = 0;
            cout << "Initial balance cannot be negative. Balance set to 0." << endl;
        }
    }

    // Public method to deposit money
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: $" << amount << endl;
        } else {
            cout << "Deposit amount must be positive." << endl;
        }
    }

    // Public method to withdraw money
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: $" << amount << endl;
        } else if (amount > balance) {
            cout << "Insufficient balance. Withdrawal denied." << endl;
        } else {
            cout << "Withdrawal amount must be positive." << endl;
        }
    }

    // Public method to check balance
    double getBalance() {
        return balance;
    }
};

int main() {
    // Creating a bank account object with an initial balance of $1000
    BankAccount account(1000);

    // Performing operations on the account
    cout << "Current balance: $" << account.getBalance() << endl;
    account.deposit(500);      // Depositing $500
    cout << "Current balance: $" << account.getBalance() << endl;
    account.withdraw(300);     // Withdrawing $300
    cout << "Current balance: $" << account.getBalance() << endl;
    account.withdraw(1500);    // Attempting to withdraw more than balance

    return 0;
}
