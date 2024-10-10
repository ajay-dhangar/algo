import java.util.Scanner;

public class Levenshtein{
    public static void main(String[] args) {
        String s1, s2;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Insert first string:");
        s1 = scanner.next();
        System.out.println("Insert second string:");
        s2 = scanner.next();

        int n, m;
        n = s1.length();
        m = s2.length();

        // Matrix of substring edit distances
        // example: distance[a][b] is the edit distance
        // of the first a letters of s1 and b letters of s2
        int[][] distance = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            distance[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            distance[0][j] = j;
        }

        // Variables for storing potential values of current edit distance
        int e1, e2, e3, min;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                e1 = distance[i - 1][j] + 1;
                e2 = distance[i][j - 1] + 1;
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    e3 = distance[i - 1][j - 1];
                } else {
                    e3 = distance[i - 1][j - 1] + 1;
                }
                min = Math.min(e1, e2);
                min = Math.min(min, e3);
                distance[i][j] = min;
            }

        }

        System.out.println("Edit distance of s1 and s2 is: " + distance[n][m]);
    }
}