---
id: Hash-tables-Dsa
sidebar_position: 1
title: Hash tables
sidebar_label: Hash tables
description: "In this blog post, we'll dive into the Hash tables and Hash maps , a fundamental topic in Data Structures"
tags: [dsa, Hashtables, Hashmaps]
---


## Introduction
Hashing is a technique to convert a range of key values into a range of indexes of an array. 
To get the idea of what a Hash Table is, let's try to build one from scratch, to store unique first names inside it.

We will build the Hash Set in 5 steps:

Starting with an array.
Storing names using a hash function.
Looking up an element using a hash function.
Handling collisions.
The basic Hash Set code example and simulation.

## Implementation

Basic Operations
Following are the basic primary operations of a hash table.

Search - Searches an element in a hash table.

Insert -Inserts an element in a hash table.

Delete − Deletes an element from a hash table.

1. **Search Operation:**

   Whenever an element is to be searched, compute the hash code of the key passed and locate the element using that hash code as index in the array. Use linear probing to get the element ahead if the element is not found at the computed hash code.

   ```cpp
   struct DataItem *search(int key) 
   //get the hash
   int hashIndex = hashCode(key);
	
   //move in array until an empty
   while(hashArray[hashIndex] != NULL) {
	
      if(hashArray[hashIndex]->key == key)
         return hashArray[hashIndex];
			
      //go to next cell
      ++hashIndex;
		
      //wrap around the table
      hashIndex %= SIZE;
   }

   return NULL;        

   ```

2. **Insert Operation:**

   Whenever an element is to be inserted, compute the hash code of the key passed and locate the index using that hash code as an index in the array. Use linear probing for empty location, if an element is found at the computed hash code.

   ```cpp
   void insert(int key,int data) 
   struct DataItem *item = (struct DataItem*) malloc(sizeof(struct DataItem));
   item->data = data;  
   item->key = key;     

   //get the hash 
   int hashIndex = hashCode(key);

   //move in array until an empty or deleted cell
   while(hashArray[hashIndex] != NULL && hashArray[hashIndex]->key != -1) {
      //go to next cell
      ++hashIndex;
		
      //wrap around the table
      hashIndex %= SIZE;
   }
	
   hashArray[hashIndex] = item;        

   ```

3. **Delete operation:**

   Whenever an element is to be deleted, compute the hash code of the key passed and locate the index using that hash code as an index in the array. Use linear probing to get the element ahead if an element is not found at the computed hash code. When found, store a dummy item there to keep the performance of the hash table intact.

   ```cpp
  struct DataItem* delete(struct DataItem* item) 
   int key = item->key;

   //get the hash 
   int hashIndex = hashCode(key);

   //move in array until an empty 
   while(hashArray[hashIndex] !=NULL) {
	
      if(hashArray[hashIndex]->key == key) {
         struct DataItem* temp = hashArray[hashIndex]; 
			
         //assign a dummy item at deleted position
         hashArray[hashIndex] = dummyItem; 
         return temp;
      } 		
      //go to next cell
      ++hashIndex;
		
      //wrap around the table
      hashIndex %= SIZE;
   }  
   return NULL;        

   ```




## Time complexity:

For lookup, insertion, and deletion operations, hash tables have an average-case time complexity of O(1). Yet, these operations may, in the worst case, require O(n) time, where n is the number of elements in the table.

## Applications of Hash Table:

- Hash tables are frequently used for indexing and searching massive volumes of data. A search engine might use a hash table to store the web pages that it has indexed.
- Data is usually cached in memory via hash tables, enabling rapid access to frequently used information. 
- Hash functions are frequently used in cryptography to create digital signatures, validate data, and guarantee data integrity.
- Hash tables can be used for implementing database indexes, enabling fast access to data based on key values. 