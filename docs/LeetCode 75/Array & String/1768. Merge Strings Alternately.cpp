class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string result = "";  // Resultant merged string
        int i = 0, j = 0;    // Indices for word1 and word2

        // Alternating merge until one of the words is exhausted
        while (i < word1.size() && j < word2.size()) {
            result += word1[i++];  // Add from word1
            result += word2[j++];  // Add from word2
        }

        // Append any remaining characters from word1
        while (i < word1.size()) {
            result += word1[i++];
        }

        // Append any remaining characters from word2
        while (j < word2.size()) {
            result += word2[j++];
        }

        return result;
    }
};