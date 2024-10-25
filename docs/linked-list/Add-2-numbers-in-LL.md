---
id: Add 2 numbers 
title: Add two numbers in a Linked List
sidebar_label: Leetcode 2
tags: [Leetcode,Linked List, DSA]
description: Two numbers are given in the form of 2 linked list , we have to add these numbers and store the resultant number in a third linked list.
---
# Add two numbers (Leetcode #2)

## Description
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Problem Definition
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

## Approach
Since the digits are stored in reverse order, reverse the numbers first to get the original number and then add them as → 9999999 + 9999 = 8999001.

Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of the list, which contains the least significant digit.

### Steps
1. Create a dummy node which is the head of new linked list.
2. Create a node temp, initialise it with dummy.
3. Initialize carry to 0.
4. Loop through lists l1 and l2 until you reach both ends, and until carry is present.
5. Set sum=l1.val+ l2.val + carry.
6. Update carry=sum/10.
7. Create a new node with the digit value of (sum%10) and set it to temp node's next, then advance temp node to next.
8. Advance both l1 and l2.
9. Return dummy's next node.

**Note:** That we use a dummy head to simplify the code. Without a dummy head, you would have to write extra conditional statements to initialize the head's value.

## Implementation

## Java
```java
public class ListNode {
      int val;
      ListNode next;
      ListNode() {}
      ListNode(int val) { this.val = val; }
      ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode answer =new ListNode();
        ListNode temp=answer;
        int carry=0;
        while(l1!=null || l2!=null || carry==1){
            int sum=0;
            if(l1!=null){
                sum+=l1.val;
                l1=l1.next;
            }
             if(l2!=null){
                sum+=l2.val;
                l2=l2.next;
            }
            sum+=carry;
            carry=sum/10;

            ListNode node=new ListNode(sum%10);
            temp.next=node;
            temp=temp.next;
        }
        return answer.next;
    }
}
```

## C++
```C++
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
  };
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *dummy = new ListNode(); 
        ListNode *temp = dummy; 
        int carry = 0;
        while( (l1 != NULL || l2 != NULL) || carry) {
            int sum = 0; 
            if(l1 != NULL) {
                sum += l1->val; 
                l1 = l1 -> next; 
            }
            
            if(l2 != NULL) {
                sum += l2 -> val; 
                l2 = l2 -> next; 
            }
            
            sum += carry; 
            carry = sum / 10; 
            ListNode *node = new ListNode(sum % 10); 
            temp -> next = node; 
            temp = temp -> next; 
        }
        return dummy -> next; 
    }
};
```

