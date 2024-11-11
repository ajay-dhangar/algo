---

id: advanced-encryption-standard  
sidebar_position: 4  
title: Advanced Encryption Standard (AES)  
sidebar_label: Advanced Encryption Standard  

---

### Definition:

The Advanced Encryption Standard (AES) is a symmetric encryption algorithm established by the U.S. National Institute of Standards and Technology (NIST) in 2001. AES is widely used for secure data transmission and is recognized for its strength and efficiency.

### Characteristics:

- **Symmetric Key Algorithm**:
  - AES uses the same key for both encryption and decryption, making key management essential. The security of AES relies on the secrecy of the key.

- **Block Cipher**:
  - AES operates on fixed-size blocks of data. It encrypts data in 128-bit blocks, using keys of 128, 192, or 256 bits, offering different levels of security.

- **Efficient Performance**:
  - AES is designed for efficiency on both hardware and software platforms, making it suitable for a wide range of applications, from small devices to large-scale data centers.

- **Strong Security**:
  - AES is considered secure against all known practical attacks, including brute force, making it a standard choice for sensitive data encryption.

### Time Complexity:

- **Encryption/Decryption Time**: $O(n)$  
  The time complexity for AES operations is linear in relation to the number of blocks being processed.

### Space Complexity:

- **Space Complexity**: $O(n)$  
  AES requires space proportional to the block size (128 bits) and additional space for key management, depending on the implementation.

### AES Modes of Operation:

1. **ECB (Electronic Codebook)**:
   - The simplest mode, where each block is encrypted independently. It is not recommended for encrypting large amounts of data due to patterns in identical plaintext blocks.

2. **CBC (Cipher Block Chaining)**:
   - Each block of plaintext is XORed with the previous ciphertext block before being encrypted. It enhances security by making identical plaintext blocks encrypt to different ciphertexts.

3. **CFB (Cipher Feedback)**:
   - Similar to CBC, but it allows encryption of data in smaller increments (e.g., bytes). It is suitable for streaming applications.

4. **GCM (Galois/Counter Mode)**:
   - A mode that combines counter mode encryption with Galois mode authentication, providing both confidentiality and integrity.

### C++ Implementation of AES (Using OpenSSL):

```cpp
#include <iostream>
#include <openssl/aes.h>
#include <openssl/rand.h>
#include <cstring>

void aesEncrypt(const unsigned char *key, const unsigned char *plaintext, unsigned char *ciphertext) {
    AES_KEY encryptKey;
    AES_set_encrypt_key(key, 128, &encryptKey);
    AES_encrypt(plaintext, ciphertext, &encryptKey);
}

void aesDecrypt(const unsigned char *key, const unsigned char *ciphertext, unsigned char *plaintext) {
    AES_KEY decryptKey;
    AES_set_decrypt_key(key, 128, &decryptKey);
    AES_decrypt(ciphertext, plaintext, &decryptKey);
}

int main() {
    unsigned char key[16]; // AES key size is 128 bits (16 bytes)
    unsigned char plaintext[16] = "Hello, World!!!"; // Must be 16 bytes for AES
    unsigned char ciphertext[16], decryptedtext[16];

    // Generate random AES key
    RAND_bytes(key, sizeof(key));

    // Encrypt
    aesEncrypt(key, plaintext, ciphertext);
    std::cout << "Ciphertext: ";
    for (int i = 0; i < 16; ++i) {
        std::cout << std::hex << static_cast<int>(ciphertext[i]);
    }
    std::cout << std::endl;

    // Decrypt
    aesDecrypt(key, ciphertext, decryptedtext);
    std::cout << "Decrypted text: " << decryptedtext << std::endl;

    return 0;
}
```

### Summary:

The Advanced Encryption Standard (AES) is a robust and efficient symmetric encryption algorithm widely used across various applications for secure data transmission. With support for different key lengths and various modes of operation, AES provides a flexible solution for protecting sensitive information against unauthorized access. Its strong security and performance characteristics make it a standard choice in the field of cryptography.
