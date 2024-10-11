---  
id: decision-making-in-python  
sidebar_position: 3  
title: Decision Making in Python  
sidebar_label: Decision Making in Python
---

Hey there! In this guide, we'll explore decision-making in Python. Decision-making constructs allow you to execute code based on certain conditions. Let's dive in!

## Decision Making

* Python supports several decision-making constructs that allow you to execute code based on conditions.

* We will go over the different decision-making options available in Python.
## 1. If Statements


The simplest decision-making structure in Python is the if statement, which executes a block of code if a certain condition is met.  
```python  
num = 8                             # Initialize variable 'num' with a value of 8  
if num > 0:                          # Check if the value of 'num' is greater than 0  
    print('The number is positive.')  # Print a message if the condition is true  
```
## 2. If-Else Statements


The if-else statement allows you to execute one block of code if the condition is true, and another if the condition is false.  
```python  
num = 11                                # Initialize variable 'num' with a value of 11  
if num % 2 == 0:                        # Check if 'num' is even  
    print('The number is even.')        # Print this message if 'num' is even  
else:                                   # Otherwise, execute this block  
    print('The number is odd.')         # Print this message if 'num' is odd  
```
## 3. Else If (Elif) Statements


The elif statement (short for else if) allows you to check multiple conditions in sequence and execute the first block of code where the condition is true.  
```python  
num = 15                                  # Initialize variable 'num' with a value of 15  
if num > 20:                               # Check if 'num' is greater than 20  
    print('The number is greater than 20.') # Print this message if 'num' is greater than 20  
elif num == 15:                              # Check if 'num' is equal to 15  
    print('The number is 15.')                # Print this message if 'num' is equal to 15  
else:                                          # Otherwise, execute this block  
    print('The number is less than 20.')        # Print this message if 'num' is less than 20  
```
## 4. Nested If Statements


You can use if statements inside other if statements, known as nested if statements, to evaluate more complex conditions.  
```python  
num = 7                                                 # Initialize variable 'num' with a value of 7  
if num > 0:                                               # Check if 'num' is positive  
    if num < 10:                                            # Check if 'num' is less than 10  
        print('The number is positive and less than 10.')  # Print this message if both conditions are true  
```
## 5. Ternary Operator


Python also supports a shorthand for the if-else statement, called the ternary operator.  
```python  
age = 18                                # Initialize variable 'age' with a value of 18  
can_vote = 'Yes' if age >= 18 else 'No'  # Use the ternary operator to check if 'age' is 18 or older  
print(can_vote)                          # Output: 'Yes'  
```
## 6. Switch Statements (Python 3.10+)


From Python 3.10, the match-case statement is introduced, which works similarly to a switch statement in other languages.  
```python  
day = 2                     # Initialize variable 'day' with a value of 2  
match day:                  # Use match-case to determine the day of the week  
    case 1:  
        print('Monday')         # Execute if 'day' is 1  
    case 2:  
        print('Tuesday')        # Execute if 'day' is 2  
    case 3:  
        print('Wednesday')      # Execute if 'day' is 3  
    case _:                     # Default case  
        print('Invalid day')    # Execute if none of the above cases match  
```