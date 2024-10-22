---
id: support-vector-machine  
title: Support Vector Machine Algorithm  
sidebar_label: Support Vector Machine  
description: "In this post, we’ll explore the Support Vector Machine (SVM) Algorithm, a powerful supervised learning model used for both classification and regression tasks, known for its effectiveness in high-dimensional spaces."  
tags: [machine learning, algorithms, support vector machine, classification, regression]  

---

### Definition:
The **Support Vector Machine (SVM)** algorithm is a supervised learning model used for both **classification** and **regression** tasks. It works by finding a hyperplane that best separates data points into different classes. SVMs are particularly effective in high-dimensional spaces and are commonly used for problems where the data is not linearly separable by transforming the input data using **kernels**.

### Characteristics:
- **Hyperplane Decision Boundary**:  
  SVM seeks to find the optimal hyperplane that maximizes the margin between the closest data points of different classes, known as support vectors.
  
- **Kernels**:  
  To handle non-linearly separable data, SVM can use different kernel functions (e.g., linear, polynomial, radial basis function), which map the data into higher-dimensional space where it becomes separable.

- **Margin Maximization**:  
  SVM tries to maximize the margin between the hyperplane and the nearest data points (support vectors), improving the model’s generalization ability.

### Types of SVM:
1. **Classification SVM**:  
   Used when the task is to classify data points into discrete categories. The algorithm finds a hyperplane that separates data points of different classes.
   
2. **Regression SVM (SVR)**:  
   Used for continuous target values. In SVR, the algorithm aims to find a function that deviates from the actual target values by a threshold and minimizes error while maintaining a margin.

### Steps Involved:
1. **Input the Data**:  
   The algorithm starts by receiving the training data, with labeled examples for classification or continuous values for regression.
   
2. **Choose a Kernel**:  
   A suitable kernel function (linear, polynomial, or radial basis function) is selected to transform the data if it’s not linearly separable.
   
3. **Find the Optimal Hyperplane**:  
   For classification, the algorithm finds a hyperplane that separates the data points of different classes with the largest possible margin. In regression, it finds a line that fits within a margin of error.
   
4. **Support Vectors**:  
   Only the data points closest to the hyperplane (called support vectors) are used in defining the hyperplane. These points directly influence the decision boundary.
   
5. **Make Predictions**:  
   For classification tasks, the SVM predicts the class based on which side of the hyperplane the data point falls. For regression, it predicts the value based on the fitting line.

### Problem Statement:
Given a dataset with features and target values, the goal is to build an SVM model that can classify data points or predict continuous values by finding the optimal hyperplane or decision boundary.

### Key Concepts:
- **Kernel Trick**:  
  The kernel trick allows SVM to transform the data into higher-dimensional space to make it linearly separable. The most common kernels include:
  - **Linear Kernel**: Used for linearly separable data.
  - **Polynomial Kernel**: Maps data into a polynomial space.
  - **Radial Basis Function (RBF) Kernel**: Used for complex, non-linearly separable data.
  
- **Soft Margin (C-parameter)**:  
  SVM allows some misclassification for better generalization. The **C-parameter** controls the trade-off between maximizing the margin and minimizing the classification error. A small C leads to a wider margin with more errors, while a large C tries to classify all data points correctly with a narrower margin.

- **Support Vectors**:  
  These are the data points that are closest to the hyperplane and play a critical role in determining the position and orientation of the hyperplane.

### Split Criteria:
- **Maximizing the Margin**:  
  In classification, the hyperplane is chosen to maximize the distance (margin) between the support vectors and the decision boundary.
  
- **Epsilon-Insensitive Loss**:  
  In regression, the SVM model uses an **epsilon-insensitive loss function**, where errors within a certain threshold (epsilon) are ignored.

### Time Complexity:
- **Training Complexity**:  
  The time complexity of SVM is highly dependent on the choice of kernel and the size of the dataset. For `n` data points and `d` dimensions, the time complexity can range from $O(n^2 \cdot d)$ for linear kernel to higher complexities for non-linear kernels.
  
- **Prediction Complexity**:  
  The complexity for prediction is $O(n)$, as it depends on the number of support vectors used in determining the decision boundary.

### Space Complexity:
- **Space Complexity**:  
  The space complexity of SVM is mainly dependent on the number of support vectors and the dimensionality of the transformed feature space.

### Example:
Consider a binary classification problem to determine whether a customer will churn based on their activity and account balance:

- Dataset:
| Activity | Account Balance | Churned |
|----------|-----------------|---------|
| Active   | High            | No      |
| Inactive | Low             | Yes     |
| Active   | Medium          | No      |
| Inactive | Medium          | Yes     |

Step-by-Step Execution:

1. **Input Data**:  
   The data is fed into the SVM model for training.
   
2. **Choose Kernel**:  
   Based on the data’s distribution, the RBF kernel is chosen to handle non-linearity.

3. **Find Hyperplane**:  
   The SVM algorithm identifies the optimal hyperplane that maximizes the margin between churned and non-churned customers.

4. **Identify Support Vectors**:  
   The closest data points (support vectors) influence the position of the decision boundary.

5. **Make Predictions**:  
   The SVM predicts whether new customers will churn based on which side of the hyperplane they fall on.

### Python Implementation:
Here is a basic implementation of an SVM in Python using **scikit-learn**:

```python
from sklearn.datasets import load_iris
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create SVM classifier with RBF kernel
clf = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)

# Train model
clf.fit(X_train, y_train)

# Predict
y_pred = clf.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
```
