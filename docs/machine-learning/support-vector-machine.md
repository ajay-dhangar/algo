---

id: support-vector-machine  
title: Support Vector Machine (SVM) Algorithm  
sidebar_label: Support Vector Machine  
description: "SVM is a powerful machine learning model known for its effectiveness in classification tasks and its ability to handle high-dimensional data."  
tags: [machine learning, algorithms, SVM, classification, regression]

---

### Definition:
The **Support Vector Machine (SVM)** is a supervised machine learning algorithm commonly used for **classification** and sometimes for **regression**. It works by finding the optimal hyperplane that separates different classes in the feature space, ensuring that the margin between the nearest points (support vectors) of each class is maximized.

### Characteristics:
- **Margin Maximization**:  
  SVM aims to maximize the distance between the hyperplane and the nearest data points from each class (support vectors). This helps in achieving better generalization.

- **Kernel Trick**:  
  SVM uses kernel functions to project data into higher dimensions where a linear separation between classes may be easier to achieve. Common kernels include linear, polynomial, and radial basis function (RBF).

- **Effective in High-Dimensional Spaces**:  
  SVM is particularly effective in cases where the number of dimensions exceeds the number of samples, making it suitable for complex datasets.

### Types of SVM:
1. **Binary SVM**:  
   The most common type, where the algorithm separates data into two distinct classes.
   
2. **Multiclass SVM**:  
   By using strategies like one-vs-one or one-vs-all, SVM can handle multiple classes.

3. **Support Vector Regression (SVR)**:  
   A version of SVM that handles regression tasks by finding a margin of tolerance (epsilon) and minimizing the prediction error outside of this margin.

### Steps Involved:
1. **Select the Kernel**:  
   Choose a kernel function (e.g., linear, RBF) that can help separate the data points in the feature space.

2. **Maximize the Margin**:  
   SVM computes the hyperplane that maximizes the margin between the closest data points of each class (support vectors).

3. **Handle Non-Linearly Separable Data**:  
   If data is not linearly separable, SVM applies the **kernel trick** to project the data into higher-dimensional space where it becomes separable.

4. **Regularization**:  
   Introduce a regularization parameter (C) to control the trade-off between maximizing the margin and allowing some misclassifications (soft margin).

### Problem Statement:
Given a dataset with features and target labels, the objective of SVM is to find a hyperplane that best separates the different classes in the feature space, while maximizing the margin and minimizing classification error.

### Key Concepts:
- **Hyperplane**:  
  A decision boundary that separates different classes in the feature space.

- **Support Vectors**:  
  The data points that are closest to the hyperplane, which directly influence its position and orientation.

- **Margin**:  
  The distance between the hyperplane and the nearest data points from each class. A wider margin leads to better generalization.

### Kernel Functions:
- **Linear Kernel**:  
  Used when the data is linearly separable. The decision boundary is a straight line (or hyperplane).
  
  $$K(x, y) = x \cdot y$$
  
- **Polynomial Kernel**:  
  Creates a non-linear decision boundary by raising the dot product of input vectors to a specified degree.
  
  $$K(x, y) = (x \cdot y + c)^d$$
  
- **Radial Basis Function (RBF)**:  
  A popular kernel for non-linearly separable data, mapping data points into higher-dimensional space.
  
  $$K(x, y) = \exp(-\gamma ||x - y||^2)$$

### Time Complexity:
- **Training Time Complexity: $O(n^2)$ to $O(n^3)$**  
  Training an SVM can be computationally expensive, especially for large datasets, due to the quadratic or cubic time complexity with respect to the number of samples (n).

### Space Complexity:
- **Space Complexity: $O(n)$**  
  The space complexity depends on the number of support vectors, which are usually a subset of the data points.

### Example:
Consider a dataset of people’s heights and weights to predict whether they are athletes or not:

- Dataset:
  ```  
  | Height (cm) | Weight (kg) | Athlete |  
  |-------------|-------------|---------|  
  | 170         | 70          | Yes     |  
  | 160         | 60          | No      |  
  | 180         | 85          | Yes     |  
  | 155         | 55          | No      |  
  ```

Step-by-Step Execution:

1. **Choose the kernel**:  
   Select the appropriate kernel (e.g., linear or RBF) based on the data's distribution.

2. **Maximize the margin**:  
   SVM computes the hyperplane and support vectors, ensuring the widest possible margin between the classes (Athlete/Not Athlete).

### Python Implementation:
Here is a basic implementation of SVM in Python using **scikit-learn**:

```python
from sklearn import datasets
from sklearn.svm import SVC
import matplotlib.pyplot as plt

# Load dataset
iris = datasets.load_iris()
X, y = iris.data[:, :2], iris.target  # Using only two features for simplicity

# Create SVM classifier
clf = SVC(kernel='linear')

# Train model
clf.fit(X, y)

```

### Summary:
The **Support Vector Machine (SVM)** is a robust and versatile algorithm, particularly well-suited for classification tasks with high-dimensional data. Its ability to maximize margins and its use of kernel functions make it a powerful tool, though it can be computationally intensive for large datasets. Careful selection of kernels and regularization parameters is key to achieving good results.
