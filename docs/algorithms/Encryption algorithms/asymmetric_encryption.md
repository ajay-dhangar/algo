---

id: asymmetric-encryption-algo  
sidebar_position: 2  
title: Asymmetric Encryption  
sidebar_label: Asymmetric Encryption  

---

### Definition:

Asymmetric encryption, also known as public-key cryptography, is a type of encryption that uses a pair of keys: a public key and a private key. The public key is used for encryption, while the private key is used for decryption. This allows secure communication without the need to share a secret key.

### Characteristics:

- **Key Pair**:
  - Asymmetric encryption uses two keys: a public key, which can be shared openly, and a private key, which must be kept secret. This separation enhances security.

- **Security**:
  - The security of asymmetric encryption relies on mathematical problems, such as factoring large integers or solving discrete logarithms, which are computationally difficult to solve.

- **Digital Signatures**:
  - Asymmetric encryption enables the creation of digital signatures, allowing a sender to verify their identity and the integrity of the message.

- **Slower Performance**:
  - Asymmetric algorithms are generally slower than symmetric algorithms, making them less suitable for encrypting large amounts of data. They are often used to encrypt a symmetric key, which is then used for bulk encryption.

### Time Complexity:

- **Encryption/Decryption Time**: $O(n²)$    
  The time complexity for asymmetric encryption and decryption can vary significantly based on the algorithm and the key size. Generally, it is slower than symmetric encryption.

### Space Complexity:

- **Space Complexity**: $O(n)$  
  Asymmetric encryption requires additional space for storing both keys (public and private), which can be proportional to the size of the data being encrypted.

### Common Asymmetric Encryption Algorithms:

1. **RSA (Rivest-Shamir-Adleman)**:
   - A widely used asymmetric algorithm that relies on the difficulty of factoring the product of two large prime numbers. RSA is commonly used for secure data transmission and digital signatures.

2. **DSA (Digital Signature Algorithm)**:
   - An algorithm used for digital signatures that relies on the mathematical concept of discrete logarithms. DSA is used in various security protocols.

3. **Elliptic Curve Cryptography (ECC)**:
   - A form of public-key cryptography based on the algebraic structure of elliptic curves over finite fields. ECC provides similar security to RSA with smaller key sizes, making it efficient for mobile and embedded systems.

### C++ Implementation of Asymmetric Encryption (RSA Example):

```cpp
#include <iostream>
#include <openssl/rsa.h>
#include <openssl/pem.h>

void generateKeyPair() {
    RSA *rsa = RSA_generate_key(2048, RSA_F4, nullptr, nullptr);
    BIO *bpPublic = BIO_new_file("public.pem", "w+");
    BIO *bpPrivate = BIO_new_file("private.pem", "w+");

    PEM_write_bio_RSAPublicKey(bpPublic, rsa);
    PEM_write_bio_RSAPrivateKey(bpPrivate, rsa, nullptr, nullptr, 0, nullptr, nullptr);

    BIO_free_all(bpPublic);
    BIO_free_all(bpPrivate);
    RSA_free(rsa);
}

int main() {
    generateKeyPair();
    std::cout << "RSA key pair generated and saved to public.pem and private.pem." << std::endl;
    return 0;
}
```

### Summary:

Asymmetric encryption is a fundamental concept in modern cryptography, enabling secure communication and data integrity without the need to share a secret key. By leveraging a public-private key pair, asymmetric algorithms like RSA, DSA, and ECC provide strong security, though they are typically slower than symmetric algorithms. Asymmetric encryption plays a crucial role in various security protocols, including SSL/TLS for secure web communications.
