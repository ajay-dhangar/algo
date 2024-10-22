
# Stack Quiz Solutions

## Question 1

**Question:**

Following is C-like pseudo code of a function that takes a number as an argument, and uses a stack S to do processing.

```c
void fun(int n)
{
    Stack S;  // Say it creates an empty stack S
    while (n > 0)
    {
        push(&S, n%2);
        n = n/2;
    }

    while (!isEmpty(&S))
        printf("%d ", pop(&S));
}
```

What does the above function do in general?

**Options:**

- A) Prints binary representation of n in reverse order
- B) Prints binary representation of n
- C) Prints the value of Logn
- D) Prints the value of Logn in reverse order

**Answer:** A) Prints binary representation of n in reverse order

**Explanation:**

The first loop converts the number `n` to its binary equivalent by repeatedly dividing `n` by 2 and pushing the remainder (which is the binary digit) onto the stack. The second loop pops the stack and prints the binary digits, which results in the binary number being printed in reverse order.

---

## Question 2

**Question:**

Consider the following pseudocode that uses a stack:

```c
declare a stack of characters
while (there are more characters in the word to read)
{
    read a character
    push the character on the stack
}
while (the stack is not empty)
{
    pop a character off the stack
    write the character to the screen
}
```

What is the output for input "geeksquiz"?

**Options:**

- A) geeksquizgeeksquiz
- B) ziuqskeeg
- C) geeksquiz
- D) ziuqskeegziuqskeeg

**Answer:** B) ziuqskeeg

**Explanation:**

The first loop pushes all the characters of the word "geeksquiz" onto the stack. The second loop pops the stack, which reverses the order of the characters, resulting in "ziuqskeeg".

---

## Question 3

**Question:**

Following is an incorrect pseudocode for the algorithm which is supposed to determine whether a sequence of parentheses is balanced:

```c
declare a character stack 
while (more input is available)
{
    read a character
    if (the character is a '(' ) 
        push it on the stack
    else if (the character is a ')' and the stack is not empty)
        pop a character off the stack
    else
        print "unbalanced" and exit
}
print "balanced"
```

Which of these unbalanced sequences does the above code think is balanced?

**Options:**

- A) ((())
- B) ())(())
- C) (()())
- D) (()))()

**Answer:** D) (()))()

**Explanation:**

The code checks if each ')' has a corresponding '(' by using a stack. However, it fails to detect unbalanced sequences like `D) (()))()` because it only checks if the stack is empty at the end, and does not properly handle cases with too many closing parentheses.

---

## Question 4

**Question:**

The following postfix expression with single-digit operands is evaluated using a stack:

```
8 2 3 ^ / 2 3 * + 5 1 * -
```

The top two elements of the stack after the first `*` is evaluated are:

**Options:**

- A) 6, 1
- B) 5, 7
- C) 3, 2
- D) 1, 5

**Answer:** A) 6, 1

**Explanation:**

The postfix expression is evaluated from left to right. After the first multiplication operation (`2 * 3`), the top two elements left on the stack are `6` and `1`.

---

## Question 5

**Question:**

A single array `A[1..MAXSIZE]` is used to implement two stacks. The two stacks grow from opposite ends of the array. If the space is to be used efficiently, the condition for “stack full” is:

**Options:**

- A) (top1 = MAXSIZE/2) and (top2 = MAXSIZE/2+1)
- B) top1 + top2 + 1 = MAXSIZE
- C) (top1= MAXSIZE/2) or (top2 = MAXSIZE)
- D) top1= top2 -1

**Answer:** B) top1 + top2 + 1 = MAXSIZE

**Explanation:**

For two stacks growing from opposite ends of the array, the space is fully utilized when the sum of the indices of the top elements of both stacks equals `MAXSIZE - 1`.

---

## Question 6

**Question:**

Assume that the operators `+`, `-`, `×` are left-associative and `^` is right-associative. The order of precedence (from highest to lowest) is `^`, `×`, `+`, `-`. The postfix expression corresponding to the infix expression `a + b × c - d ^ e ^ f` is:

**Options:**

- A) `abc × + def ^ ^ -`
- B) `abc × + de ^ f ^ -`
- C) `ab + c × d - e ^ f ^`
- D) `- + a × bc ^ ^ def`

**Answer:** A) abc × + def ^ ^ -

**Explanation:**

Following the operator precedence and associativity rules, the correct postfix expression is `abc × + def ^ ^ -`.

---

## Question 7

**Question:**

The result of evaluating the postfix expression `10 5 + 60 6 / * 8 –` is:

**Options:**

- A) 284
- B) 213
- C) 142
- D) 71

**Answer:** C) 142

**Explanation:**

Evaluating the postfix expression step by step:
- `10 5 +` → 15
- `60 6 /` → 10
- `15 * 10` → 150
- `150 - 8` → 142

---

## Question 8

**Question:**

A function `f` defined on stacks of integers satisfies the following properties: `f(∅) = 0` and `f(push(S, i)) = max(f(S), 0) + i` for all stacks `S` and integers `i`. If a stack `S` contains the integers `2, -3, 2, -1, 2` in order from bottom to top, what is `f(S)`?

**Options:**

- A) 6
- B) 4
- C) 3
- D) 2

**Answer:** A) 6

**Explanation:**

Evaluating the function `f` for each push operation results in the maximum sum being 6.

---

## Question 9

**Question:**

A priority queue `Q` is used to implement a stack `S` that stores characters. `PUSH(C)` is implemented as `INSERT(Q, C, K)` where `K` is an appropriate integer key chosen by the implementation. For a sequence of operations, the keys chosen are in:

**Options:**

- A) Non-increasing order
- B) Non-decreasing order
- C) Strictly increasing order
- D) Strictly decreasing order

**Answer:** C) Strictly increasing order

**Explanation:**

For the stack to behave correctly with a priority queue, each push operation should use a key that is strictly greater than the previous one, ensuring the correct order of pop operations.

---

## Question 10

**Question:**

If the sequence of operations - `push(1)`, `push(2)`, `pop`, `push(1)`, `push(2)`, `pop`, `pop`, `pop`, `push(2)`, `pop` are performed on a stack, the sequence of popped out values is:

**Options:**

- A) 2,2,1,1,2
- B) 2,2,1,2,2
- C) 2,1,2,2,1
- D) 2,1,2,2,2

**Answer:** C) 2,1,2,2,1

**Explanation:**

Following the sequence of operations on the stack, the values are popped in the order `2,1,2,2,1`.
