public class knapsack {
    
    // Method to solve the 0/1 Knapsack problem
    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = values.length;
        int[][] dp = new int[n + 1][capacity + 1]; // Create a DP table

        // Build table dp[][] in a bottom-up manner
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (i == 0 || w == 0) {
                    dp[i][w] = 0; // Base case: no item or zero capacity
                } else if (weights[i - 1] <= w) {
                    // Maximize value by either taking the item or not taking it
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    // If weight of the item exceeds the capacity, do not include the item
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        // The last cell of dp table will have the answer: max value for the given capacity
        return dp[n][capacity];
    }

    public static void main(String[] args) {
        // Example inputs
        int[] values = {60, 100, 120}; // Values of the items
        int[] weights = {10, 20, 30};  // Weights of the items
        int capacity = 50; // Maximum capacity of the knapsack

        // Call knapsack method and print the result
        int maxValue = knapsack(weights, values, capacity);
        System.out.println("Maximum value that can be obtained = " + maxValue);
    }
}
