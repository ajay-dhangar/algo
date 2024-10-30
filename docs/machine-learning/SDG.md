---
id: stochastic-gradient-descent  
title: "Stochastic Gradient Descent (SGD)"
sidebar_label: SGD  
description: "Stochastic Gradient Descent (SGD) is an optimization algorithm used to minimize the loss function in machine learning and deep learning models."  
tags: [optimization, machine learning, deep learning]

---

### Overview
Stochastic Gradient Descent (SGD) is an optimization algorithm used to minimize the loss function in machine learning and deep learning models. Unlike standard gradient descent, which calculates the gradient of the loss function for the entire dataset, SGD updates the model parameters for each training example one at a time, making it faster and more suitable for large datasets.

### How It Works

1. **Initialize Parameters**: Start with some initial values for the model parameters (weights and biases).
2. **Shuffle Data**: Randomly shuffle the training data.
3. **Parameter Update**:
   - For each training example \( x_i \), compute the gradient of the loss function with respect to the model parameters.
   - Update the parameters using the formula:
     $\[\theta = \theta - \eta \cdot \nabla J(\theta; x_i, y_i)\]$
   where:
   - \( \theta \) represents the model parameters (weights and biases).
   - \( \eta \) is the learning rate (step size).
   - \( \nabla J(\theta; x_i, y_i) \) is the gradient of the loss function for the training example \( (x_i, y_i) \).

4. **Repeat**: Continue this process for multiple epochs (iterations over the entire dataset).

### Advantages and Disadvantages

#### Advantages
- **Faster convergence for large datasets**: Because SGD updates parameters for each training example, it can converge faster than batch gradient descent.
- **Better generalization**: The noisy updates can help escape local minima, potentially leading to better generalization on test data.

#### Disadvantages
- **Noisy updates**: The parameter updates can be noisy because they are based on a single example, which can cause the loss function to fluctuate.
- **Sensitive to learning rate**: Choosing the right learning rate is crucial for proper convergence.

### Example Code in Python

Below is an example implementation of SGD to minimize a simple quadratic loss function using NumPy.

#### Quadratic Loss Function Example

Let's say we have a simple linear model \( y = wx + b \), and we want to minimize the mean squared error loss function.

```python
import numpy as np

# Generate some synthetic data
np.random.seed(0)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Hyperparameters
learning_rate = 0.01
n_iterations = 1000

# Initialize weights (w) and bias (b)
w = np.random.randn(1)
b = np.random.randn(1)

# Stochastic Gradient Descent
for iteration in range(n_iterations):
    # Randomly select one data point
    random_index = np.random.randint(0, len(X))
    x_i = X[random_index:random_index+1]
    y_i = y[random_index:random_index+1]

    # Compute the prediction
    y_pred = w * x_i + b

    # Compute the gradients
    gradient_w = 2 * (y_pred - y_i) * x_i
    gradient_b = 2 * (y_pred - y_i)

    # Update weights and bias
    w -= learning_rate * gradient_w
    b -= learning_rate * gradient_b

    # Print the progress every 100 iterations
    if iteration % 100 == 0:
        loss = np.mean((y - (w * X + b)) ** 2)
        print(f"Iteration {iteration}: Loss = {loss}")

print(f"Trained weight: {w[0]}, Trained bias: {b[0]}")
```
