import csv
import os

DATA_FILE = 'budget_data.csv'

def initialize_data_file():
    """Initialize the CSV data file with headers if it doesn't exist."""
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Type', 'Category', 'Amount', 'Description'])

def add_transaction(transaction_type, category, amount, description):
    """Add a new transaction to the data file."""
    with open(DATA_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([transaction_type, category, amount, description])

def update_transaction(index, transaction_type, category, amount, description):
    """Update an existing transaction by its index."""
    temp_file = DATA_FILE + '.tmp'
    with open(DATA_FILE, mode='r') as file, open(temp_file, mode='w', newline='') as temp:
        reader = csv.reader(file)
        writer = csv.writer(temp)
        for i, row in enumerate(reader):
            if i == index + 1:  # Skip header
                writer.writerow([transaction_type, category, amount, description])
            else:
                writer.writerow(row)
    os.replace(temp_file, DATA_FILE)

def delete_transaction(index):
    """Delete a transaction by its index."""
    temp_file = DATA_FILE + '.tmp'
    with open(DATA_FILE, mode='r') as file, open(temp_file, mode='w', newline='') as temp:
        reader = csv.reader(file)
        writer = csv.writer(temp)
        for i, row in enumerate(reader):
            if i != index + 1:  # Skip header
                writer.writerow(row)
    os.replace(temp_file, DATA_FILE)

def read_transactions():
    """Read all transactions from the data file."""
    with open(DATA_FILE, mode='r') as file:
        reader = csv.reader(file)
        return list(reader)[1:]  # Skip header

def display_transactions(transactions):
    """Display all transactions in a formatted way."""
    print("\nTransactions:")
    for index, row in enumerate(transactions):
        print(f"{index}: Type: {row[0]}, Category: {row[1]}, Amount: ${row[2]}, Description: {row[3]}")

def generate_report():
    """Generate a report of total income, expenses, and savings."""
    income = 0.0
    expenses = 0.0
    transactions = read_transactions()
    
    for row in transactions:
        amount = float(row[2])
        if row[0] == 'income':
            income += amount
        elif row[0] == 'expense':
            expenses += amount
    
    savings = income - expenses
    print(f"\nTotal Income: ${income:.2f}")
    print(f"Total Expenses: ${expenses:.2f}")
    print(f"Savings: ${savings:.2f}")

def main():
    initialize_data_file()
    while True:
        print("\nBudget Tracker")
        print("1. Add Transaction")
        print("2. Update Transaction")
        print("3. Delete Transaction")
        print("4. Generate Report")
        print("5. Exit")
        choice = input("Choose an option: ")

        if choice == '1':
            transaction_type = input("Enter transaction type (income/expense): ").strip().lower()
            if transaction_type not in ['income', 'expense']:
                print("Invalid transaction type. Please enter 'income' or 'expense'.")
                continue
            
            category = input("Enter category: ").strip()
            amount = input("Enter amount: ")
            try:
                amount = float(amount)
                if amount <= 0:
                    raise ValueError("Amount must be a positive number.")
            except ValueError as e:
                print(f"Invalid amount: {e}")
                continue
            
            description = input("Enter description: ").strip()
            add_transaction(transaction_type, category, amount, description)
        
        elif choice == '2':
            transactions = read_transactions()
            display_transactions(transactions)
            try:
                index = int(input("Enter transaction index to update: "))
                if index < 0 or index >= len(transactions):
                    raise IndexError("Index out of range.")
                transaction_type = input("Enter transaction type (income/expense): ").strip().lower()
                if transaction_type not in ['income', 'expense']:
                    print("Invalid transaction type. Please enter 'income' or 'expense'.")
                    continue
                
                category = input("Enter category: ").strip()
                amount = input("Enter amount: ")
                amount = float(amount)
                if amount <= 0:
                    raise ValueError("Amount must be a positive number.")
                
                description = input("Enter description: ").strip()
                update_transaction(index, transaction_type, category, amount, description)
            except (ValueError, IndexError) as e:
                print(f"Error: {e}")
        
        elif choice == '3':
            transactions = read_transactions()
            display_transactions(transactions)
            try:
                index = int(input("Enter transaction index to delete: "))
                if index < 0 or index >= len(transactions):
                    raise IndexError("Index out of range.")
                delete_transaction(index)
            except (ValueError, IndexError) as e:
                print(f"Error: {e}")
        
        elif choice == '4':
            generate_report()
        
        elif choice == '5':
            print("Exiting the Budget Tracker. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
