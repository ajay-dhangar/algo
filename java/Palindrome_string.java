public class Palindrome_string {
  public static void main(String[] args) {
    Palindrome_string obj = new Palindrome_string();
    boolean ans = obj.Palindrome_string("manad");
    System.out.println(ans);
  }

  public boolean Palindrome_string(String str) {
    int left=0;
    int right =str.length()-1;  // last character of string .
    
    while(left<right){      // Compare characters from both ends
      if(str.charAt(left)!=str.charAt(right)){
        return false;
      }
      left++;      //left increment 
      right--;     //right decrement.
    }
    return true;   //i.e all character mathes.
  }
}

//👉🏻👉🏻👉🏻 time complexity= O(n);
//👉🏻👉🏻👉🏻space complexity= O(1);
//👉🏻👉🏻👉🏻logic =
//1.The key logic is the use of two pointers (left and right) to compare characters from both ends of the string and progressively move toward the center.
//2.If all characters match, the string is a palindrome. If any pair of characters does not match, the string is not a palindrome.