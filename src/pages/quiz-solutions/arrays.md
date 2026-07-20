---
title: Array Quiz Solutions
hide_table_of_contents: true
---

<h1 class="text-center text-3xl font-bold mt-4">Array Quiz Solutions</h1>

<main className="mx-2 p-6">

1. **What will be the exact operational output of the following C++ code sequence?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[2] = { 1, 2 };
       cout << 0[arr] << ", " << 1[arr] << endl;
       return 0;
   }
   ```
   - A) 1, 2
   - B) Syntax error
   - C) Run time error
   - D) None of the above  
   **Answer:** A) 1, 2  
   **Explanation:** In C++, internal array element accesses are compiled directly using pointer arithmetic: `arr[i]` evaluates to `*(arr + i)`. Because mathematical addition is commutative, `*(arr + i)` is identical to `*(i + arr)`, meaning `i[arr]` is syntactic sugar for `arr[i]`.

2. **What will be the output or behavior when executing the code below?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[5] = { 1, 2, 3, 4, 5 };
       cout << arr[5] << endl;
       return 0;
   }
   ```
   - A) 5
   - B) 0
   - C) Garbage value
   - D) Out of bounds compilation error  
   **Answer:** C) Garbage value  
   **Explanation:** An array initialized with 5 elements maps indexes from 0 to 4. Accessing `arr[5]` goes past the allocated boundary, triggering undefined behavior by referencing unmanaged stack memory, resulting in a garbage value at runtime.

3. **What value prints to the console terminal during execution here?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[5] = { 1, 2, 3, 4, 5 };
       cout << arr[4] << endl;
       return 0;
   }
   ```
   - A) 5
   - B) 0
   - C) 4
   - D) None of the above  
   **Answer:** A) 5  
   **Explanation:** Arrays are zero-indexed. For an array of size 5, the terminal index position is size - 1, which is index 4. This references the fifth element, returning 5.

4. **What value prints to the console terminal during execution here?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[5] = { 1, 2, 3, 4, 5 };
       cout << arr[0] << endl;
       return 0;
   }
   ```
   - A) 1
   - B) 0
   - C) 5
   - D) Undefined behavior  
   **Answer:** A) 1  
   **Explanation:** Index 0 targets the initial base block memory offset of our array, returning the first stored integer element: 1.

5. **What is the true asymptotic worst-case time complexity of accessing an individual element inside an array given its valid index?**
   - A) O(1)
   - B) O(n)
   - C) O(log n)
   - D) O(n^2)  
   **Answer:** A) O(1)  
   **Explanation:** Array memory blocks are contiguous. Calculating an item address requires only one multiplication and one addition operation: `Base_Address + (Index * Element_Size)`. This constant-time calculation runs in O(1) complexity.

6. **Which of the following conceptual architectural descriptions is entirely true regarding native arrays in C++?**
   - A) The elements of an array are stored in contiguous memory locations
   - B) The elements of an array are stored in non-contiguous memory locations
   - C) The elements of an array are stored in random memory locations
   - D) Elements scale dynamically across virtual page boundaries automatically  
   **Answer:** A) The elements of an array are stored in contiguous memory locations  
   **Explanation:** By definition, native primitives group elements in unbroken, back-to-back sequential memory slots. This uniform, predictable arrangement enables fast O(1) random access operations.

7. **In C++, if a primitive local array is declared as 'int arr[5];' within a local stack frame block, what will be the default values inside its elements?**
   - A) 0
   - B) 1
   - C) Random value (Garbage)
   - D) Compile-time allocation error  
   **Answer:** C) Random value (Garbage)  
   **Explanation:** Locally scoped automatic variables declared inside block functions are not zero-initialized by C++ runtime frameworks. They inherit whatever residual binary configurations existed previously in those stack memory registers, returning garbage values until explicitly written to.

8. **What will be the output or behavior when executing the uninitialized array block below?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[5];
       cout << arr[0] << endl;
       return 0;
   }
   ```
   - A) Always 0
   - B) Always 1
   - C) Random garbage value
   - D) Segmentation faults  
   **Answer:** C) Random garbage value  
   **Explanation:** Because local stack-allocated arrays do not undergo default value cleaning loops, reading `arr[0]` fetches whatever unmanaged random garbage remains at that raw memory offset.

9. **What does the console display when attempting to print the unindexed array variable pointer label directly?**
   ```cpp
   #include <iostream>
   using namespace std;

   int main() {
       int arr[5] = { 1, 2, 3, 4, 5 };
       cout << arr << endl;
       return 0;
   }
   ```
   - A) Address of the first element
   - B) 1
   - C) 2
   - D) Hexadecimal hash of total element counts  
   **Answer:** A) Address of the first element  
   **Explanation:** In C++, the identifier label of an array decays into a pointer reference targeting its zero-index base offset address (`&arr[0]`) when compiled inside streaming operators.

</main>
