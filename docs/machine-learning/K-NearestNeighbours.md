---
id: k-nearest-neighbors  
title: k-Nearest Neighbors Algorithm  
sidebar_label: k-Nearest Neighbors  
description: "In this post, we'll explore the k-Nearest Neighbors (k-NN) Algorithm, one of the simplest and most intuitive algorithms in machine learning."  
tags: [machine learning, algorithms, classification, regression, k-NN]
---

**k-Nearest Neighbors (k-NN)** is a simple and widely used supervised learning algorithm. It can be applied to both classification and regression tasks. The algorithm classifies or predicts a data point based on how closely it resembles its neighbours. k-NN does not have an explicit training phase; instead, it stores the entire dataset and makes predictions by finding the **k nearest neighbours** of a given input and using their majority class (for classification) or average value (for regression) to make predictions.

## Characteristics:

- **Instance-Based Learning**:  
  k-NN is a **lazy learner**, meaning it stores all training instances and delays computation until prediction time.
  
- **Non-Parametric**:  
  It makes no assumptions about the underlying data distribution, making it highly flexible but sensitive to noisy data.
  
- **Distance-Based**:  
  The algorithm relies on a **distance metric** (e.g., Euclidean distance) to measure the data points' proximity or similarity.

## How k-NN Works:

1. **Data Collection**:  
   k-NN requires a labelled dataset of examples, where each example consists of feature values and a corresponding label (for classification) or continuous target (for regression).
   
2. **Prediction**:  
   To predict the label or value for a new, unseen data point:
   - Measure the distance between the new point and all points in the training set using a distance metric.
   - Select the **k nearest neighbours** based on the shortest distances.
   - For classification, assign the most frequent class (majority voting) among the k neighbours. For regression, calculate the average of the k neighbours’ values.

## Distance Metrics:
The most commonly used distance metrics in k-NN are:

### 1. Euclidean Distance

Euclidean Distance is the most common distance metric, defined as the straight-line distance between two points in Euclidean space.

$$
d(x, y) = \sqrt{\sum_{i=1}^{n} (x_i - y_i)^2}
$$

where:
- $x_i$ and $y_i$ are the coordinates of the points in $n$-dimensional space.

## 2. Manhattan Distance

Manhattan Distance is the sum of the absolute differences between the coordinates of the points. It is also known as the L1 distance or taxicab distance.

$$
d(x, y) = \sum_{i=1}^{n} |x_i - y_i|
$$

where:
- $x_i$ and $y_i$ are the coordinates of the points in $n$-dimensional space.

## 3. Minkowski Distance

Minkowski Distance is a generalized metric that can be seen as a generalization of both the Euclidean and Manhattan distances.

$$
d(x, y) = \left( \sum_{i=1}^{n} |x_i - y_i|^p \right)^{\frac{1}{p}}
$$

where:
- \$p$ is a parameter that defines the distance metric:
  - $p = 1$ gives the Manhattan distance.
  - $p = 2$ gives the Euclidean distance.
- $x_i$ and $y_i$ are the coordinates of the points in $n$-dimensional space.

## 4. Hamming Distance

Hamming Distance is used for categorical data and is defined as the number of positions at which the corresponding elements are different.

$$
d(x, y) = \sum_{i=1}^{n} \delta(x_i, y_i)
$$

**where:**
$$
\delta(x_i, y_i) = 
\begin{cases}
1 & \text{if } x_i \neq y_i \\
0 & \text{if } x_i = y_i
\end{cases}
$$

## Choosing k:
- **Small k**:  
  A smaller k (e.g., k=1 or k=3) makes the model sensitive to noise and can lead to **overfitting** because it considers fewer neighbors.
  
- **Large k**:  
  A larger k provides a more generalized prediction but may lead to **underfitting** if it includes too many neighbors from different classes.
  
- **Optimal k**:  
  The ideal value of k is often found through experimentation or by using techniques like **cross-validation**.

### Classification with k-NN:
In classification tasks, k-NN assigns the class label based on the majority class among the k-nearest neighbours. Each neighbour votes for its class, and the most frequent class becomes the prediction.

**Example**:  
Suppose we are classifying an unknown data point based on three nearest neighbours (k=3), and the classes of these neighbours are:
- Neighbor 1: Class A
- Neighbor 2: Class A
- Neighbor 3: Class B

Since Class A occurs more frequently, the new point is assigned to **Class A**.

## Regression with k-NN:
In regression tasks, k-NN predicts the target value based on the **average** of the values of its k nearest neighbours.

**Example**:  
To predict the price of a house, k-NN will find k houses with similar features (square footage, number of rooms) and return the average price of those k houses as the predicted price.

### Steps in k-NN Algorithm:
1. **Data Storage**:  
   k-NN stores the entire dataset of training examples.
   
2. **Distance Calculation**:  
   For a new input data point, compute the distance between the input and every point in the training set using a chosen distance metric.
   
3. **Identify Neighbors**:  
   Sort the distances and identify the k-nearest neighbours.
   
4. **Prediction**:
   - For classification, count the occurrences of each class among the k neighbours and assign the class with the majority votes.
   - For regression, take the average of the k neighbours' target values.

## Problem Statement:
Given a dataset with labelled examples (for classification) or continuous targets (for regression), the goal is to classify or predict new input data points by finding the k most similar data points in the training set and using them to infer the output.

### Key Concepts:
- **Lazy Learning**:  
  k-NN is called a lazy learner because it doesn’t explicitly learn a model during training but simply stores the training dataset.
  
- **Similarity**:  
  The similarity between data points is quantified by calculating the distance between their feature vectors.
  
- **Majority Voting**:  
  For classification, the class of a new data point is determined by the majority class among its k nearest neighbours.
  
- **Averaging**:  
  For regression, the predicted value is the average of the k nearest neighbour's target values.

### Time Complexity:
- **Training Time Complexity: $O(1)$**  
  k-NN doesn’t require a training phase, so it takes constant time.
  
- **Prediction Time Complexity: $O(n \cdot d)$**  
  Predicting the class or value for a new data point requires computing the distance between the new point and all n training points, each of which has d dimensions.

### Space Complexity:
- **Space Complexity: $O(n \cdot d)$**  
  The algorithm stores the entire dataset, which consists of n points in d dimensions.

### Example:
Consider a simple k-NN classification example for predicting whether a fruit is an apple or an orange based on its features (weight and colour):

- Dataset:
  ```  
  | Weight (g) | Color (scale 1-10) | Fruit   |  
  |------------|--------------------|---------|  
  | 150        | 8                  | Apple   |  
  | 170        | 7                  | Apple   |  
  | 130        | 6                  | Orange  |  
  | 140        | 5                  | Orange  |  
  ```

**Step-by-Step Execution**:

1. **Store Dataset**:  
   Store the dataset as-is.
   
2. **Calculate Distances**:  
   For a new fruit with a weight of 160g and colour value of 7, compute the distance from this point to all existing data points.

3. **Find k Nearest Neighbors**:  
   If k=3, identify the 3 closest fruits to the new one based on the shortest distances.

4. **Make Prediction**:  
   Count the class occurrences (Apple or Orange) among the 3 nearest neighbours and assign the new fruit to the most frequent class.

### Python Implementation:
Here’s a simple implementation of the k-NN algorithm using **scikit-learn**:

```python
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Sample data
X = np.array([[150, 8], [170, 7], [130, 6], [140, 5]])  # Features (Weight, Color)
y = np.array(['Apple', 'Apple', 'Orange', 'Orange'])    # Target (Fruit)

# Create k-NN classifier
knn = KNeighborsClassifier(n_neighbors=3)

# Train the model
knn.fit(X, y)

# Make a prediction for a new fruit
new_fruit = np.array([[160, 7]])  # New fruit with weight 160g and color 7
predicted_fruit = knn.predict(new_fruit)
print(f"The predicted fruit is: {predicted_fruit[0]}")
```

### Summary:
The **k-Nearest Neighbors Algorithm** is a straightforward and intuitive method for both classification and regression tasks. It works by finding the k most similar examples in the training dataset and using them to predict the class or value of a new data point. While easy to implement, k-NN can be computationally expensive, especially on large datasets, as it requires calculating the distance to every training point at prediction time.
