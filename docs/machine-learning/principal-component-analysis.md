---
id: principal-component-analysis
title: "Principal Component Analysis (PCA)"
sidebar_label: PCA
description: "In this post, we’ll explore Principal Component Analysis, a fundamental technique in unsupervised learning used for dimensionality reduction and data visualization."
tags: [machine learning, algorithms, unsupervised learning, PCA]
---

### Definition:
**Principal Component Analysis (PCA)** is an unsupervised learning algorithm for dimensionality reduction. It transforms data into a new coordinate system where the greatest variance by any projection lies on the first coordinate (called the first principal component), the second greatest variance on the second coordinate, and so on.

<AdsComponent />

### Characteristics:
- **Dimensionality Reduction**:  
  PCA reduces the number of features in a dataset while retaining as much variability as possible.

- **Variance Maximization**:  
  The principal components are chosen such that they maximize the variance of the projected data.

- **Linear Transformation**:  
  PCA is a linear transformation technique that projects data onto a lower-dimensional space.

### Steps Involved:
1. **Standardize the Data**:  
   Center the data by subtracting the mean and scaling to unit variance if necessary.

2. **Compute the Covariance Matrix**:  
   Calculate the covariance matrix to understand how variables relate to one another.

3. **Calculate Eigenvalues and Eigenvectors**:  
   Determine the eigenvalues and eigenvectors of the covariance matrix to identify principal components.

4. **Sort Eigenvalues and Eigenvectors**:  
   Sort the eigenvalues in descending order and select the top k eigenvectors corresponding to the largest eigenvalues.

5. **Transform the Data**:  
   Project the original data onto the new feature space defined by the selected eigenvectors.

<Ads />

### Problem Statement:
Given a high-dimensional dataset, PCA aims to reduce its dimensionality while preserving as much information (variance) as possible. This is particularly useful for visualization and reducing computational costs in subsequent analyses.

### Key Concepts:
- **Eigenvalue**:  
  A scalar that indicates how much variance is captured by each principal component.

- **Eigenvector**:  
  A direction in which a particular transformation acts; in PCA, it represents a principal component.

- **Explained Variance Ratio**:  
  The proportion of variance explained by each principal component, is useful for determining how many components to retain.

<AdsComponent />

### Split Criteria:
PCA does not involve splitting data like supervised learning; instead, it focuses on transforming all available data into a lower-dimensional space based on variance maximization.

### Time Complexity:
- **Training Complexity**:  
  Computing PCA typically involves matrix operations that can have a time complexity of $O(n^2 \cdot p)$, where $n$ is the number of samples and $p$ is the number of features.
  
- **Prediction Complexity**:  
  The complexity for projecting new data points is $O(k \cdot p)$, where $k$ is the number of principal components retained.

### Space Complexity:
- **Space Complexity**:  
  The space complexity primarily depends on storing covariance matrices and eigenvectors, which can be $O(p^2)$.

### Example:
Consider a scenario where we want to reduce features from a dataset containing measurements of different attributes of flowers (e.g., sepal length, sepal width, petal length, petal width).

**Dataset Example:**

| Sepal Length | Sepal Width | Petal Length | Petal Width |
|---------------|-------------|--------------|-------------|
| 5.1           | 3.5         | 1.4          | 0.2         |
| 4.9           | 3.0         | 1.4          | 0.2         |
| 4.7           | 3.2         | 1.3          | 0.2         |
| 4.6           | 3.1         | 1.5          | 0.2         |

Step-by-Step Execution:

1. **Input Data**:  
   The model receives training data with multiple features (sepal length, width, etc.).

2. **Standardize Data**:  
   Center and scale each feature to have zero mean and unit variance.

3. **Compute Covariance Matrix**:  
   Calculate how features vary together.

4. **Calculate Eigenvalues/Eigenvectors**:  
   Find eigenvalues and eigenvectors from the covariance matrix.

5. **Select Principal Components**:  
   Choose top k components based on explained variance.

6. **Transform Data**:  
   Project original data onto selected principal components for reduced representation.

<AdsComponent />

### Python Implementation:
Here’s a basic implementation of PCA using **scikit-learn**:

```python
from sklearn.decomposition import PCA
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt

# Load dataset
iris = load_iris()
X = iris.data

# Create PCA model
pca = PCA(n_components=2)

# Fit model and transform data
X_reduced = pca.fit_transform(X)

# Visualize results
plt.scatter(X_reduced[:, 0], X_reduced[:, 1], c=iris.target)
plt.title('PCA of Iris Dataset')
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.colorbar()
plt.show()
```
