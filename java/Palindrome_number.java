
public class Palindrome_number {
    public static void main(String[] args) {
      Palindrome_number obj = new Palindrome_number();
      boolean ans = obj.palindrome(121);
      System.out.println(ans);
    }

      public boolean palindrome(int num) {
        if(num<0){    //if number is less than zero then return false;
          return false;
        }
        int rev=0;   //define a varible rev. for reveses number.        
        int original=num;  //redefined the value of num.
        while(num>0){       //while loop upto the num greater than 0
          rev=rev*10+num%10;   //this is logic for reverse the number.
          num=num/10;  //last digit deleted.
        } 
        return rev==original;  // check 
      }
}


//👉🏻👉🏻👉🏻 time complexity=constant. O(1)
//👉🏻👉🏻👉🏻spacd complexity=constant. O(1);

//👉🏻👉🏻👉🏻 logic.- (rev = rev * 10 + x % 10; and x = x / 10;)
//Modulo operator (%) is used to extract the last digit of the number.
// division (/) is used to remove the last digit of the number.
//Palindrome property: A number is a palindrome if it reads the same forward and backward.

