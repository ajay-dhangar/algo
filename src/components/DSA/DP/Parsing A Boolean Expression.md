---
id: boolean-expression-parser
title: Boolean Expression Parser
sidebar_label: Boolean Expression Parser
sidebar_position: 1
description: A Java program that parses and evaluates a boolean expression represented as a string, using a stack-based approach to handle operations.
tags: [java, dynamic progrmming, data structure]
---

## * Description*
A Java program that parses and evaluates a boolean expression represented as a string, using a stack-based approach to handle operations like AND (&), OR (|), and NOT (!).

## *Approach*

- *Steps :*
Initialize Stack: Use a stack to manage characters.
Process Characters:
Ignore commas.
Push all characters except ')' onto the stack.
Evaluate on ')':
Use a temporary buffer stack to gather values until '(' is reached.
Pop '(' and the operator before it from the stack.
Apply Operator:
For &: Set result = true and perform AND on all values in buffer.
For |: Set result = false and perform OR on all values in buffer.
For !: Apply NOT to the single value in buffer.
Push Result: Push the result ('t' or 'f') back onto the stack.
Final Result: Return the top of the stack as the result.

## *java implementation *

```java
import java.util.Stack;

public class BooleanExpressionParser {
    public static boolean parseBoolExpr(String expression) {
        Stack<Character> stack = new Stack<>();

        for (char ch : expression.toCharArray()) {
            if (ch == ',') {
                continue; // ignore commas
            } else if (ch != ')') {
                stack.push(ch); // push any character other than ')'
            } else {
                // We've encountered ')', start evaluating
                Stack<Character> buffer = new Stack<>();
                while (stack.peek() != '(') {
                    buffer.push(stack.pop());
                }
                stack.pop(); // Remove '('

                // The operator before '(' determines what kind of operation to perform
                char operator = stack.pop();
                boolean result;

                if (operator == '&') {
                    result = true;
                    while (!buffer.isEmpty()) {
                        result &= buffer.pop() == 't';
                    }
                } else if (operator == '|') {
                    result = false;
                    while (!buffer.isEmpty()) {
                        result |= buffer.pop() == 't';
                    }
                } else { // operator == '!'
                    result = buffer.pop() == 'f';
                }

                // Push result back onto the stack
                stack.push(result ? 't' : 'f');
            }
        }

        return stack.pop() == 't';
    }

    public static void main(String[] args) {
        String expression1 = "&(|(f))";
        System.out.println(parseBoolExpr(expression1)); // Output: false

        String expression2 = "|(f,f,f,t)";
        System.out.println(parseBoolExpr(expression2)); // Output: true

        String expression3 = "!(|(f,t))";
        System.out.println(parseBoolExpr(expression3)); // Output: false
    }
}
```

Output:

```
For expression1 = "&(|(f))", output is false.
For expression2 = "|(f,f,f,t)", output is true.
For expression3 = "!(|(f,t))", output is false.
```

### Time Complexity
- $O(n)$, where n is the length of the expression, as each character is processed once.

### Space Complexity
- $O(n)$, due to the stack usage for storing characters and intermediate results.

## Conclusion
The parser efficiently evaluates boolean expressions with operators &, |, and ! using stack-based processing for expressions of reasonable length.
