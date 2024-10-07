import java.util.*;

public class Fibonacci {
    public static int printFibonacci(int n) {
        if (n == 0) {
            return 0;
        } else if (n == 1) {
            return 1;
        } else {
            int a = 0, b = 1, result = 0;
            for (int i = 2; i <= n; i++) {
                result = a + b;
                a = b;
                b = result;
            }
            return result;
        }
    }
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of terms in the fibonacci series : ");
        int n = sc.nextInt();
        System.out.println("Fibonacci series up to " + n + " terms : ");
        for (int i = 0; i <n; i++) {
            System.out.print(printFibonacci(i) + " ");
        }
        sc.close();
    }
}