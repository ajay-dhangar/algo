
Decision Making in Python
=========================

# Python Decision Making


Python provides several types of decision-making statements that allow you to execute a block of code based on certain conditions.
## 1. If Statements


The simplest structure for making decisions is an if statement, which only permits the execution of a code block if a predetermined condition is met.  
```python  
num = 8  
if num > 0:  
    print('The number is positive.')  
```
## 2. If-Else Statements


If the condition in the if block evaluates to false, the if-else statement executes an alternate block of code.  
```python  
num = 11  
if num % 2 == 0:  
    print('The number is even.')  
else:  
    print('The number is odd.')  
```
## 3. Elif Statements


The elif keyword is used to check multiple expressions for TRUE and execute a block of code as soon as one of the conditions is true.  
```python  
num = 15  
if num > 20:  
    print('The number is greater than 20.')  
elif num == 15:  
    print('The number is 15.')  
else:  
    print('The number is less than 20.')  
```
## 4. Nested If Statements


You can use one if or if-else statement inside another if or if-else statement(s).  
```python  
num = 10  
if num > 5:  
    if num == 10:  
        print('The number is 10.')  
    else:  
        print('The number is greater than 5 but not 10.')  
else:  
    print('The number is 5 or less.')  
```