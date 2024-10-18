
<h1>Strings and StringBuilder in Java</h1>

<h2>Introduction</h2>
<p>
    This README introduces two important concepts in Java: <strong>Strings</strong> and <strong>StringBuilder</strong>. Both are used to handle sequences of characters but differ in their mutability and performance. Understanding how and when to use each is essential for efficient string manipulation in Java.
</p>

<hr>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#introduction-to-strings">Introduction to Strings</a></li>
    <li><a href="#characteristics-of-strings">Characteristics of Strings</a></li>
    <li><a href="#common-operations-on-strings">Common Operations</a></li>
    <li><a href="#advanced-string-operations">Advanced String Operations</a></li>
    <li><a href="#example-code-for-strings">Example Code for Strings</a></li>
    <li><a href="#introduction-to-stringbuilder">Introduction to StringBuilder</a></li>
    <li><a href="#characteristics-of-stringbuilder">Characteristics of StringBuilder</a></li>
    <li><a href="#common-operations-with-stringbuilder">Common Operations</a></li>
    <li><a href="#advanced-stringbuilder-operations">Advanced StringBuilder Operations</a></li>
    <li><a href="#example-code-for-stringbuilder">Example Code for StringBuilder</a></li>
    <li><a href="#conclusion">Conclusion</a></li>
</ul>

<hr>

<h2 id="introduction-to-strings">Introduction to Strings</h2>
<p>
    In Java, a <strong>String</strong> is a sequence of characters used to represent text. Strings in Java are immutable, meaning that once created, their values cannot be changed. Each modification creates a new <code>String</code> object, which can be less efficient when dealing with frequent updates or concatenation.
</p>

<h3 id="characteristics-of-strings">Characteristics of Strings</h3>
<ul>
    <li><strong>Immutable:</strong> Once created, a <code>String</code> cannot be changed.</li>
    <li><strong>String Pool:</strong> Java optimizes memory by storing string literals in a special memory region called the <strong>string pool</strong>.</li>
    <li><strong>Methods:</strong> The <code>String</code> class comes with many built-in methods like <code>substring()</code>, <code>length()</code>, <code>concat()</code>, <code>replace()</code>, etc.</li>
</ul>

<h3 id="common-operations-on-strings">Common Operations on Strings</h3>
<ul>
    <li><strong>Creating a String:</strong>
        <pre><code>String str1 = "Hello";
String str2 = new String("World");</code></pre>
    </li>
    <li><strong>Concatenation:</strong>
        <pre><code>String fullName = "John" + " " + "Doe";</code></pre>
    </li>
    <li><strong>Finding the Length:</strong>
        <pre><code>int len = str1.length();  // Output: 5</code></pre>
    </li>
    <li><strong>Substring Extraction:</strong>
        <pre><code>String sub = fullName.substring(0, 4);  // Output: John</code></pre>
    </li>
    <li><strong>Replacing Characters:</strong>
        <pre><code>String replaced = fullName.replace('J', 'D');  // Output: Donn Doe</code></pre>
    </li>
    <li><strong>Comparing Strings:</strong>
        <pre><code>boolean isEqual = str1.equals("Hello");  // Output: true</code></pre>
    </li>
</ul>

<h3 id="advanced-string-operations">Advanced String Operations</h3>
<ul>
    <li><strong>Converting String to Char Array:</strong>
        <pre><code>char[] charArray = fullName.toCharArray();
for (char c : charArray) {
    System.out.println(c);
}</code></pre>
    </li>
    <li><strong>Converting Primitive Data Types to Strings:</strong>
        <pre><code>String intStr = String.valueOf(123);
String boolStr = String.valueOf(true);</code></pre>
    </li>
    <li><strong>Splitting Strings:</strong>
        <pre><code>String sentence = "This is a sentence.";
String[] words = sentence.split(" ");
for (String word : words) {
    System.out.println(word);
}</code></pre>
    </li>
    <li><strong>Trimming Whitespace:</strong>
        <pre><code>String withSpaces = "  Java  ";
String trimmed = withSpaces.trim();  // Output: "Java"</code></pre>
    </li>
    <li><strong>Changing Case:</strong>
        <pre><code>String lower = fullName.toLowerCase();
String upper = fullName.toUpperCase();</code></pre>
    </li>
    <li><strong>Checking if String Contains a Substring:</strong>
        <pre><code>boolean contains = fullName.contains("John");  // Output: true</code></pre>
    </li>
</ul>

<h3 id="example-code-for-strings">Example Code for Strings</h3>
<pre><code>public class StringExample {
    public static void main(String[] args) {
        String greeting = "Hello";
        String name = new String("Java");

        // Concatenation
        String combined = greeting + " " + name;
        System.out.println("Combined: " + combined);

        // Length
        System.out.println("Length: " + combined.length());

        // Substring
        System.out.println("Substring: " + combined.substring(0, 5));

        // Replace
        System.out.println("Replace: " + combined.replace('H', 'J'));

        // Converting to char array
        char[] chars = combined.toCharArray();
        System.out.println("Char Array: ");
        for (char c : chars) {
            System.out.print(c + " ");
        }

        // Converting integer to String
        int num = 2024;
        String numStr = String.valueOf(num);
        System.out.println("\nConverted Number: " + numStr);
    }
}
</code></pre>

<hr>

<h2 id="introduction-to-stringbuilder">Introduction to StringBuilder</h2>
<p>
    The <strong>StringBuilder</strong> class in Java is used for creating mutable strings. This means that you can modify the content of a <code>StringBuilder</code> object without creating new objects. It is more efficient than <code>String</code> for scenarios that involve heavy modifications, such as appending, inserting, or deleting characters.
</p>

<h3 id="characteristics-of-stringbuilder">Characteristics of StringBuilder</h3>
<ul>
    <li><strong>Mutable:</strong> The content of a <code>StringBuilder</code> can be modified after creation.</li>
    <li><strong>No New Objects:</strong> Unlike <code>String</code>, <code>StringBuilder</code> modifies the existing object.</li>
    <li><strong>Not Thread-Safe:</strong> <code>StringBuilder</code> is not synchronized. Use <code>StringBuffer</code> for thread-safe operations.</li>
</ul>

<h3 id="common-operations-with-stringbuilder">Common Operations with StringBuilder</h3>
<ul>
    <li><strong>Creating a StringBuilder:</strong>
        <pre><code>StringBuilder sb = new StringBuilder("Hello");</code></pre>
    </li>
    <li><strong>Appending to a StringBuilder:</strong>
        <pre><code>sb.append(" World");</code></pre>
    </li>
    <li><strong>Inserting at a Specific Position:</strong>
        <pre><code>sb.insert(6, "Beautiful ");</code></pre>
    </li>
    <li><strong>Replacing a Substring:</strong>
        <pre><code>sb.replace(6, 15, "Amazing");</code></pre>
    </li>
    <li><strong>Deleting Characters:</strong>
        <pre><code>sb.delete(6, 13);</code></pre>
    </li>
    <li><strong>Reversing the Sequence:</strong>
        <pre><code>sb.reverse();</code></pre>
    </li>
    <li><strong>Converting to String:</strong>
        <pre><code>String result = sb.toString();</code></pre>
    </li>
</ul>

<h3 id="advanced-stringbuilder-operations">Advanced StringBuilder Operations</h3>
<ul>
    <li><strong>Setting Length of StringBuilder:</strong>
        <pre><code>sb.setLength(5);  // Truncate or pad with null characters</code></pre>
    </li>
    <li><strong>Capacity of StringBuilder:</strong>
        <pre><code>int capacity = sb.capacity();  // Default capacity is 16 + string length
System.out.println("Capacity: " + capacity);</code></pre>
    </li>
    <li><strong>Ensure Minimum Capacity:</strong>
        <pre><code>sb.ensureCapacity(50);  // Increases capacity if less than specified</code></pre>
    </li>
    <li><strong>Using CharAt and SetCharAt:</strong>
        <pre><code>char ch = sb.charAt(0);  // Get char at index 0
sb.setCharAt(0, 'Y');  // Set char at index 0 to 'Y'</code></pre>
    </li>
</ul>

<h3 id="example-code-for-stringbuilder">Example Code for StringBuilder</h3>
<pre><code>public class StringBuilderExample {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");

        // Append to StringBuilder
        sb.append(" World");
        System.out.println("After Append: " + sb);

        // Insert into StringBuilder
        sb.insert(6, "Beautiful ");
        System.out.println("After Insert: " + sb);

        // Replace part of StringBuilder
        sb.replace(6, 15, "Amazing");
        System.out.println("After Replace: " + sb);

        // Delete part of StringBuilder
        sb.delete(6, 13);
        System.out.println("After Delete: " + sb);

        // Reverse the StringBuilder
        sb.reverse();
        System.out.println("After Reverse: " + sb);

        // Convert StringBuilder to String
        String result = sb.toString();
        System.out.println("Final String: " + result);

        // Check capacity and ensure minimum capacity
        System.out.println("Capacity before: " + sb.capacity());
        sb.ensureCapacity(100);
        System.out.println("Capacity after: " + sb.capacity());
    }
}
</code></pre>

<hr>

<h2 id="conclusion">Conclusion</h2>
<p>
    Understanding the differences between <code>String</code> and <code>StringBuilder</code> in Java is crucial for effective string manipulation. While <code>String</code> is best for cases where immutability is preferred, <code>StringBuilder</code> is ideal for scenarios that require frequent modifications to the string content.
</p>


</body>
</html>
