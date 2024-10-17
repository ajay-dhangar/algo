class Solution {
public:
    string reverseVowels(string s) {
         string vowels = "";
        
        for (char c : s) {
            if (isVowel(c)) {
                vowels += c;
            }
        }       
        for (int i = 0; i < s.size(); ++i) {
            if (isVowel(s[i])) {
                s[i] = vowels.back();  
                vowels.pop_back();      
            }
        }
        return s;
    }
        bool isVowel(char c) {
        c = tolower(c);  
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
};