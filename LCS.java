public class LCS {
    public static void main(String[] args) {
        String s1 = new String("Hillfinger"); // First string to compare
        String s2 = new String("Hilfiger"); // Second string to compare
        int n = s1.length(); // Length of the first string
        int m = s2.length(); // Length of the second string
        int[][] SMatrix = new int[n+1][m+1]; // Create a 2D matrix to store the LCS lengths

        // Initialize the first row and column of the matrix to 0
        for (int i = 0; i < n; i++) {
            SMatrix[i][0] = 0;
        }
        for (int i = 0; i < m; i++) {
            SMatrix[0][i] = 0;
        }

        // Fill in the rest of the matrix using the LCS recurrence relation
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                int max1, max2, max3;
                max1 = SMatrix[i - 1][j]; // If the current character in s1 is not matched
                max2 = SMatrix[i][j - 1]; // If the current character in s2 is not matched
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    max3 = SMatrix[i - 1][j - 1] + 1; // If the current characters match, add 1 to the previous LCS length
                } else {
                    max3 = SMatrix[i - 1][j - 1];
                }
                int tmp = Math.max(max1, max2); // Find the maximum of max1 and max2
                SMatrix[i][j] = Math.max(tmp, max3); // Find the maximum of tmp and max3
            }
        }

        // The length of the longest common subsequence is stored in the bottom right cell of the matrix
        System.out.println("Length of the longest continuous subsequence: " + SMatrix[n][m]);
    }
}
