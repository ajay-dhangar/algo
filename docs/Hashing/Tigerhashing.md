# Tiger Hashing Algorithm

## Overview
The **Tiger Hashing Algorithm** is a cryptographic hash function developed by Ross Anderson and Eli Biham in 1995. It is optimized for 64-bit platforms and is known for its fast performance and security. Tiger is often used in applications where both speed and security are critical, such as file integrity checking, digital signatures, and password hashing.

## Features
- **Block size**: 512 bits
- **Digest size**: 192 bits (can also produce 160 or 128-bit digests through truncation)
- **Optimized for**: 64-bit platforms
- **Security**: Resistant to most cryptographic attacks like collision and pre-image attacks (as of its time of development)
- **Speed**: Fast hash function compared to others like MD5 or SHA-1, especially on 64-bit systems

## Algorithm Overview
The Tiger Hash function takes an input message and processes it in blocks of 512 bits to produce a 192-bit hash value. It uses three 64-bit state variables (A, B, C) and operates in three main steps:

1. **Message Padding**: 
   - The input message is padded so that its length is congruent to 448 modulo 512. Padding consists of a '1' bit followed by '0' bits, and the last 64 bits represent the length of the original message.
   
2. **Processing Block-by-Block**:
   - The message is divided into 512-bit blocks, and each block is processed through a series of operations that update the internal state (A, B, C).
   - The core of the algorithm uses a combination of XOR, bitwise shifts, and additions with a set of S-boxes (lookup tables) to mix and diffuse the input data across the state variables.

3. **Final Transformation**:
   - After processing all blocks, the final hash value is derived from the three state variables and concatenated to form the final 192-bit (or truncated) output.

## Pseudocode

```plaintext
Input: Message M
Output: 192-bit Hash Value

1. Pad the message M to make its length a multiple of 512 bits.
2. Initialize three 64-bit variables: A, B, C with predefined values.
3. For each 512-bit block of the padded message:
   a. Perform a series of transformations on A, B, and C using the block and S-boxes.
   b. Update A, B, and C after processing each block.
4. After processing all blocks, concatenate A, B, and C to produce the final 192-bit hash.
