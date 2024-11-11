---

id: symmetric-encryption-algo  
sidebar_position: 1  
title: Symmetric Encryption  
sidebar_label: Symmetric Encryption  

---

### Definition:

Symmetric encryption is a type of encryption where the same key is used for both encryption and decryption. This means that the sender and the receiver must both possess the secret key and keep it secure. Symmetric encryption is widely used for data confidentiality in various applications.

### Characteristics:

- **Single Key**:
  - Both the encryption and decryption processes use the same key, which must be kept secret. This key is crucial for ensuring the security of the encrypted data.

- **Speed**:
  - Symmetric encryption algorithms are generally faster than asymmetric algorithms, making them suitable for encrypting large amounts of data.

- **In-Place**:
  - Some symmetric algorithms can operate directly on the data without requiring additional memory for storing the ciphertext.

- **Common Algorithms**:
  - Well-known symmetric encryption algorithms include Advanced Encryption Standard (AES), Data Encryption Standard (DES), and Triple DES (3DES).

### Time Complexity:

- **Encryption/Decryption Time**: $O(n)$  
  The time complexity for symmetric encryption and decryption is generally linear, dependent on the length of the data being processed. However, it may vary based on the algorithm and implementation.

### Space Complexity:

- **Space Complexity**: $O(1)$  
  Symmetric encryption typically requires a constant amount of additional space, as the same key is used for both encryption and decryption, and the input data is transformed into ciphertext in place.

### Common Symmetric Encryption Algorithms:

1. **Advanced Encryption Standard (AES)**:
   - A widely used symmetric encryption standard, AES supports key sizes of 128, 192, and 256 bits and operates on fixed-size blocks of 128 bits.

2. **Data Encryption Standard (DES)**:
   - An older symmetric encryption standard that uses a 56-bit key and operates on 64-bit blocks. DES is considered insecure due to its small key size.

3. **Triple DES (3DES)**:
   - An enhancement of DES that applies the DES algorithm three times to each data block, providing a stronger level of security.

### C++ Implementation of Symmetric Encryption (AES Example):

```cpp
#include <iostream>
#include <openssl/aes.h>
#include <openssl/rand.h>

void encrypt(const unsigned char *input, unsigned char *output, const unsigned char *key) {
    AES_KEY encryptKey;
    AES_set_encrypt_key(key, 128, &encryptKey);
    AES_encrypt(input, output, &encryptKey);
}

int main() {
    unsigned char key[16] = "0123456789abcdef"; // 128-bit key
    unsigned char input[16] = "Hello, World!123"; // 128-bit block
    unsigned char output[16];

    encrypt(input, output, key);

    std::cout << "Encrypted Output: ";
    for (int i = 0; i < 16; i++) {
        std::cout << std::hex << (int)output[i];
    }
    std::cout << std::endl;

    return 0;
}
```

### Summary:

Symmetric encryption is a crucial aspect of modern cryptography, providing a fast and efficient means of securing data. While it requires both the sender and receiver to share the same secret key, its performance advantages make it ideal for encrypting large datasets. Common algorithms like AES offer robust security features, making symmetric encryption a foundational technology in data protection.
