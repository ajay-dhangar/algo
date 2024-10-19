---
id: Palindrome_number
sidebar_position: 1
title:check  palindrome number.
sidebar_label:palindrom number.
description: "This document explains the check is it Palindrome or not , including its description, approach, and implementation."
tags: [java, problem-solving]
---

# Palindrome number.

## Description
Given a number , check is it palindrome or not , and return answer in boolean. Palindrome is when we read it from left to right and right to left it same. ex-121.

## Approach

(rev = rev * 10 + x % 10; and x = x / 10;)
//Modulo operator (%) is used to extract the last digit of the number.
// division (/) is used to remove the last digit of the number.
//Palindrome property: A number is a palindrome if it reads the same forward and backward.

### Steps:

1. **Initialize**:  
   - initialize the rev 0 for storing the value in reverse order.

2. **Iterate**:  
   - by using % operator we get last digit and store it.
   - by multiply by 10 and store last digit we get the number in reverse format.
   - divide by 10 so that last digit get remove.

3. **Return**:  
   - original digit is equal to rev.

## java Implementation 

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


** 👉🏻👉🏻👉🏻 time complexity=constant. O(1)**
👉🏻👉🏻👉🏻spacd complexity=constant. O(1);

** 👉🏻👉🏻👉🏻 logic.-**
(rev = rev * 10 + x % 10; and x = x / 10;)
Modulo operator (%) is used to extract the last digit of the number.
 division (/) is used to remove the last digit of the number.
Palindrome property: A number is a palindrome if it reads the same forward and backward.

## Conclusion 

In this article, we learned about the Palindrome in number  . Palindroem is a when you read from left to right and right to left is same  that basically a palindrome. The time complexit is O(n) and the space complexity is O(1). 