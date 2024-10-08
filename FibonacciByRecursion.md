```java
public class FibonacciByRecursion {

    public static int printFibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return printFibonacci(n - 1) + printFibonacci(n - 2);
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
