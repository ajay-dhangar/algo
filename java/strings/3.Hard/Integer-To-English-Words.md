---
id: Integer To English Words
title: Integer To English Words
sidebar_label: Integer To English Words  
description: " to convert a non-negative integer num to its English words representation."
tags: [java,dsa, algorithms,Problem solving,Strings, hard]
---

# Game Theory

**Integer To English Words** 
Convert a non-negative integer num to its English words representation.
- Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"
- Example 2:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

## Apporach
#### 1.Base Case: If the number is 0, return "Zero".
#### 2.Segmenting the Number: The number is divided into groups of three digits (thousands, millions, billions) using integer division and modulus operations.
#### 3.Mapping Numbers to Words: For each group:
- Use a helper function to convert numbers less than 1000 into words.
- Append the corresponding scale (Thousand, Million, Billion) to the result.
#### 4.Concatenation: Build the final string by concatenating the words for each group, ensuring proper spacing.
#### 5.Trimming: Remove any trailing spaces from the final result.
# Complexity:

## Time complexity:
- The time complexity of the algorithm is O(n), where n is the number of digits in the input number. Each group of three digits is processed separately, and the conversion for each group is constant time due to the fixed number of mappings.

## Space complexity:
- The space complexity is O(1) if we consider the space used for the output string as part of the result. However, if we consider the output string separately, it can be considered O(m), where m is the length of the output string.
## java Implementation 

```java

class Solution {
    public String numberToWords(int num) {
    if(num == 0)
        return "Zero";
    String[] bigString = new String[]{"Thousand","Million","Billion"};
    String result =  numberToWordsHelper(num%1000);
    num = num/1000;
    if(num > 0 && num%1000>0){
        result = numberToWordsHelper(num%1000) + "Thousand " + result;
    }
    num = num/1000;
    if(num > 0 && num%1000>0){
        result = numberToWordsHelper(num%1000) + "Million " + result;
    }
    num = num/1000;
    if(num > 0){
        result = numberToWordsHelper(num%1000) + "Billion " + result;
    }
    return result.trim();
}

public String numberToWordsHelper(int num){
    String[] digitString = new String[]{"Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
    String[] teenString = new String[]{"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen","Eighteen", "Nineteen"};
    String[] tenString = new String[]{"","","Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    String result = "";
    if(num > 99){
        result += digitString[num/100] + " Hundred ";
    }
    num = num % 100;
    if(num < 20 && num > 9){
        result += teenString[num%10]+" ";
    }else{
        if(num > 19){
            result += tenString[num/10]+" ";
        }
        num = num % 10;
        if(num > 0)
            result += digitString[num]+" ";
    }
    return result;
}
}

```



## Conclusion 
- The provided Java implementation effectively converts an integer to its English words representation. By breaking down the number into hundreds, tens, and units, and using predefined arrays for digit, teen, and ten strings, the algorithm ensures that each part of the number is processed and converted accurately. This approach is both efficient and easy to understand, making it suitable for converting any integer within the specified range.