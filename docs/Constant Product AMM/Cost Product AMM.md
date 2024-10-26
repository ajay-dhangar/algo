# 🤖 Simple Constant Product AMM Implementation

## 🎯 Overview
This is a basic implementation of a Constant Product Automated Market Maker (AMM) in C, similar to Uniswap v1's core mechanics. The AMM uses the constant product formula `x * y = k` to create a decentralized trading system where two tokens can be exchanged without traditional order books.

<div align="center">
<img src="https://tutorials.cosmos.network/resized-images/600/academy/3-ibc/images/sourcetosink.png" alt="Constant Product AMM" width="600"/>
</div>

## 💡 How it Works (Simple Explanation)
Imagine you have a pool with two types of tokens, let's call them Token A and Token B. The pool works like this:

1. **The Basic Rule** 📐: The pool always tries to keep the multiplication of both token amounts constant. If you have 1000 of Token A and 1000 of Token B, their product is 1,000,000. This number (k) must stay the same after every trade.

https://via.placeholder.com/600x300/0d1117/ffffff?text=x+*+y+=+k)

2. **Trading** 💱: When someone wants to trade Token A for Token B, they add some amount of Token A and get back some Token B. The amount they get back is calculated to keep that magic number (k) constant.

3. **Liquidity** 💧: People can add both tokens to the pool (providing liquidity) and get "shares" in return. These shares prove they own a portion of the pool and can be used later to get their tokens back plus trading fees.

## ✨ Features
- 🏊‍♂️ Create and manage a liquidity pool
- ➕ Add liquidity and receive shares
- ➖ Remove liquidity by burning shares
- 🔄 Swap tokens while maintaining the constant product formula
- 💰 Basic price discovery

## 💻 Code Implementation

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    double token_a_reserve;
    double token_b_reserve;
    double total_shares;
} LiquidityPool;

LiquidityPool* create_pool() {
    LiquidityPool* pool = (LiquidityPool*)malloc(sizeof(LiquidityPool));
    pool->token_a_reserve = 0.0;
    pool->token_b_reserve = 0.0;
    pool->total_shares = 0.0;
    return pool;
}
```

## 🚀 Usage Example

```c
// Create a new liquidity pool
LiquidityPool* pool = create_pool();

// Add liquidity to the pool
add_liquidity(pool, 1000.0, 1000.0);

// Swap tokens
swap_a_for_b(pool, 100.0);

// Remove liquidity from the pool
remove_liquidity(pool, 100.0);  

// Free the pool when done
free(pool);
```

## 🛠 Function Explanations

### `create_pool()` 🆕
- Creates a new empty liquidity pool
- Initializes token reserves and shares to zero
- Returns a pointer to the new pool

### `add_liquidity()` ➕
- Adds tokens to the pool
- For first deposit: shares = √(token_a × token_b)
- For later deposits: shares based on proportion of existing reserves
- Returns the number of shares minted

### `remove_liquidity()` ➖
- Burns shares to withdraw tokens
- Amount withdrawn is proportional to shares burned
- Updates pool reserves and total shares

### `swap_a_for_b()` and `swap_b_for_a()` 🔄
- Performs token swaps using the constant product formula
- Calculates output amount maintaining x * y = k
- Updates pool reserves
- Returns the amount of tokens received

## 📐 Math Behind the Scenes

### Constant Product Formula
The core formula is: `x * y = k`
where:
- x is the reserve of Token A
- y is the reserve of Token B
- k is the constant product
        
### Price Calculation 📦
The price is determined by the ratio of reserves:
- Price of A in terms of B = y/x
- Price of B in terms of A = x/y

### Output Amount Calculation 🧮
For a swap of dx amount of Token A:
- dy = y - k/(x + dx)
where dy is the amount of Token B received