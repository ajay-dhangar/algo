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
