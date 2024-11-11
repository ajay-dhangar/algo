---

id: homomorphic-encryption-algo  
sidebar_position: 6 
title: Homomorphic Encryption  
sidebar_label: Homomorphic Encryption  

---

### Definition:

Homomorphic encryption is an encryption scheme that allows computations to be performed on ciphertext without needing to decrypt it first. This enables data to remain encrypted while still allowing operations such as addition or multiplication to be executed. Once the encrypted result is decrypted, it matches the result of operations as if they were performed on the plaintext.

### Characteristics:

- **Computation on Encrypted Data**:
  - Homomorphic encryption allows specific operations (such as addition or multiplication) to be performed directly on encrypted data without decrypting it.

- **Privacy-Preserving**:
  - It enables secure data processing by third parties without exposing the actual data. This is especially useful in cloud computing and privacy-preserving machine learning.

- **Performance Overhead**:
  - Homomorphic encryption tends to be slower and more resource-intensive compared to traditional encryption methods like symmetric or asymmetric encryption due to its complex mathematical operations.

- **Common Algorithms**:
  - Popular homomorphic encryption schemes include Paillier encryption (supporting additive homomorphism) and the Brakerski-Gentry-Vaikuntanathan (BGV) scheme (supporting both addition and multiplication).

### Time Complexity:

- **Encryption/Decryption Time**: $O(n^2)$  
  The time complexity for homomorphic encryption depends on the specific algorithm and the complexity of the homomorphic operations, often quadratic or higher.

- **Computation Time**: $O(n^2)$ or higher  
  The time required to perform operations on ciphertexts is typically more complex than plaintext operations due to the need for special encryption techniques.

### Space Complexity:

- **Space Complexity**: $O(n)$ to $O(n^2)$  
  Homomorphic encryption schemes often require larger ciphertexts, leading to greater space complexity than standard encryption methods.

### Types of Homomorphic Encryption:

1. **Paillier Encryption**:
   - Paillier encryption is a probabilistic asymmetric algorithm that supports homomorphic addition, where multiplying two ciphertexts results in the encrypted sum of the plaintexts.

2. **BFV and BGV Schemes**:
   - Brakerski-Fan-Vercauteren (BFV) and Brakerski-Gentry-Vaikuntanathan (BGV) schemes support both additive and multiplicative homomorphisms, making them fully homomorphic encryption (FHE) schemes.

3. **CKKS (Cheon-Kim-Kim-Song)**:
   - CKKS is a leveled homomorphic encryption scheme designed for approximate arithmetic, allowing computations over encrypted real numbers.

### C++ Implementation of Homomorphic Encryption (Paillier Example):

```cpp
#include <iostream>
#include <gmp.h> // GMP library for large integers
#include <gmpxx.h>

class Paillier {
public:
    mpz_class n, nsquared, g, lambda, mu;

    Paillier() {
        // Set up values for Paillier encryption (key generation)
        mpz_class p, q;
        generate_primes(p, q);
        n = p * q;
        nsquared = n * n;
        g = n + 1; // Simple choice for g
        lambda = (p - 1) * (q - 1);
        mu = invert(lambda, n);
    }

    mpz_class encrypt(mpz_class m) {
        mpz_class r;
        mpz_urandomm(r.get_mpz_t(), state, n.get_mpz_t()); // Random r < n
        mpz_class c = (powmod(g, m, nsquared) * powmod(r, n, nsquared)) % nsquared;
        return c;
    }

    mpz_class decrypt(mpz_class c) {
        mpz_class l = (powmod(c, lambda, nsquared) - 1) / n;
        mpz_class m = (l * mu) % n;
        return m;
    }

    // Add two encrypted values
    mpz_class add(mpz_class c1, mpz_class c2) {
        return (c1 * c2) % nsquared;
    }

private:
    gmp_randstate_t state;

    void generate_primes(mpz_class &p, mpz_class &q) {
        gmp_randinit_default(state);
        mpz_urandomb(p.get_mpz_t(), state, 512); // Generate random prime p
        mpz_urandomb(q.get_mpz_t(), state, 512); // Generate random prime q
        mpz_nextprime(p.get_mpz_t(), p.get_mpz_t());
        mpz_nextprime(q.get_mpz_t(), q.get_mpz_t());
    }

    mpz_class powmod(mpz_class base, mpz_class exp, mpz_class mod) {
        mpz_class result;
        mpz_powm(result.get_mpz_t(), base.get_mpz_t(), exp.get_mpz_t(), mod.get_mpz_t());
        return result;
    }

    mpz_class invert(mpz_class a, mpz_class mod) {
        mpz_class inv;
        mpz_invert(inv.get_mpz_t(), a.get_mpz_t(), mod.get_mpz_t());
        return inv;
    }
};

int main() {
    Paillier paillier;
    
    mpz_class m1 = 12345; // Plaintext message 1
    mpz_class m2 = 67890; // Plaintext message 2

    // Encrypt both messages
    mpz_class c1 = paillier.encrypt(m1);
    mpz_class c2 = paillier.encrypt(m2);

    // Add encrypted values
    mpz_class c_sum = paillier.add(c1, c2);

    // Decrypt result
    mpz_class m_sum = paillier.decrypt(c_sum);

    std::cout << "Decrypted sum: " << m_sum << std::endl; // Output: 80235

    return 0;
}
```

### Summary:

Homomorphic encryption is an advanced cryptographic method that allows computation on encrypted data, enabling privacy-preserving applications such as secure cloud computing and confidential machine learning. Although it incurs higher computational and space costs than symmetric or asymmetric encryption, its ability to process data without decryption makes it a powerful tool in modern cryptography.

Common homomorphic encryption algorithms like Paillier and BGV provide flexibility for secure data processing, offering solutions to data privacy challenges in various industries.