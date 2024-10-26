#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct {
    double token_a_reserve;
    double token_b_reserve;
    double total_shares;
} LiquidityPool;

LiquidityPool* create_pool() {
    LiquidityPool* pool = (LiquidityPool*)malloc(sizeof(LiquidityPool));
    pool->token_a_reserve = 0;
    pool->token_b_reserve = 0;
    pool->total_shares = 0;
    return pool;
}

double get_token_b_amount(LiquidityPool* pool, double token_a_amount) {
    return pool->token_b_reserve * token_a_amount / pool->token_a_reserve;
}

double add_liquidity(LiquidityPool* pool, double token_a_amount, double token_b_amount) {
    double shares;
    
    if (pool->total_shares == 0) {
        shares = sqrt(token_a_amount * token_b_amount);
    } else {
        double shares_a = (token_a_amount * pool->total_shares) / pool->token_a_reserve;
        double shares_b = (token_b_amount * pool->total_shares) / pool->token_b_reserve;
        
        shares = shares_a < shares_b ? shares_a : shares_b;
    }
    
    pool->token_a_reserve += token_a_amount;
    pool->token_b_reserve += token_b_amount;
    pool->total_shares += shares;
    
    return shares;
}

void remove_liquidity(LiquidityPool* pool, double shares, double* token_a_out, double* token_b_out) {
    double share_ratio = shares / pool->total_shares;
    
    *token_a_out = pool->token_a_reserve * share_ratio;
    *token_b_out = pool->token_b_reserve * share_ratio;
    
    pool->token_a_reserve -= *token_a_out;
    pool->token_b_reserve -= *token_b_out;
    pool->total_shares -= shares;
}

double swap_a_for_b(LiquidityPool* pool, double token_a_in) {
    double k = pool->token_a_reserve * pool->token_b_reserve;
    
    double new_token_a_reserve = pool->token_a_reserve + token_a_in;
    
    double new_token_b_reserve = k / new_token_a_reserve;
    
    double token_b_out = pool->token_b_reserve - new_token_b_reserve;
    
    pool->token_a_reserve = new_token_a_reserve;
    pool->token_b_reserve = new_token_b_reserve;
    
    return token_b_out;
}

double swap_b_for_a(LiquidityPool* pool, double token_b_in) {
    double k = pool->token_a_reserve * pool->token_b_reserve;
    
    double new_token_b_reserve = pool->token_b_reserve + token_b_in;
    
    double new_token_a_reserve = k / new_token_b_reserve;
    
    double token_a_out = pool->token_a_reserve - new_token_a_reserve;
    
    pool->token_a_reserve = new_token_a_reserve;
    pool->token_b_reserve = new_token_b_reserve;
    
    return token_a_out;
}

int main() {
    LiquidityPool* pool = create_pool();
    
    double initial_shares = add_liquidity(pool, 1000, 1000);
    printf("Initial shares: %.2f\n", initial_shares);
    printf("Pool reserves: %.2f token A, %.2f token B\n\n", 
           pool->token_a_reserve, pool->token_b_reserve);
    
    double token_b_received = swap_a_for_b(pool, 100);
    printf("Received %.2f token B\n", token_b_received);
    printf("New pool reserves: %.2f token A, %.2f token B\n\n", 
           pool->token_a_reserve, pool->token_b_reserve);
    
    double token_a_out, token_b_out;
    remove_liquidity(pool, initial_shares / 2, &token_a_out, &token_b_out);
    printf("Received %.2f token A and %.2f token B\n", token_a_out, token_b_out);
    printf("Final pool reserves: %.2f token A, %.2f token B\n", 
           pool->token_a_reserve, pool->token_b_reserve);
    
    free(pool);
    return 0;
}