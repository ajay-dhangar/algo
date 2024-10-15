---
id: 2D-Arrays
title: Arrays
sidebar_label: About 2D arrays
sidebar_position: 1
description: 2D arrays store data in rows and columns, making them perfect for scenarios where you need to manage more complex data structures, like matrices in math or tables in databases.
tags: [basic-dsa, data-structures, 2D-Arrays]
---

# 2D Arrays

## Input and Output a 2D Array

To input & output a 2D array, we need to define the dimensions (rows and columns) and then populate it with data.

## How to get the largest & smallest element

To find the largest and smallest elements in a 2D array, iterate through each element and compare it with the current largest or smallest value.

## Implementation in JAVA

```java
import java.util.*;
public class TwoDArrays {

	//largest
	public static int getLargest(int marks[][]) {
		int largest = Integer.MIN_VALUE;
		for(int i=0; i<marks.length; i++) {
			for(int j=0; j<marks[0].length; j++) {
		        if(largest < marks[i][j]) {
			        largest = marks[i][j];
		        }
		    }
	    }
		return largest;
	}

	//smallest
	public static int getSmallest(int marks[][]) {		
		int smallest = Integer.MAX_VALUE;
		for(int i=0; i<marks.length; i++) {
			for(int j=0; j<marks[0].length; j++) {
				if(smallest > marks[i][j]) {
					smallest = marks[i][j];
				}
			}
		}
		return smallest;
	}

	public static void main(String[] args) {

		//Input a 2D array
		System.out.println("Insert 3*3 2D array element: ");
		int marks[][] = new int[3][3];
        int n = marks.length, m = marks[1].length;    //or n=3, m=3

		Scanner sc = new Scanner(System.in);
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				marks[i][j] = sc.nextInt();
			}
		}

		//Output
		System.out.println("Output: ");
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				System.out.print(marks[i][j] + " ");
			}
			System.out.println();
		}
		
		System.out.println("largest : " + getLargest(marks));
		System.out.println("smallest : " + getSmallest(marks));
	}
}
```
## Output

![Screenshot 2024-10-15 105911](https://github.com/user-attachments/assets/49984cbd-4d37-4248-a413-d697fd7cf632)
