---
id: k-nearest-neighbors  
title: k-Nearest Neighbors Algorithm  
sidebar_label: k-Nearest Neighbors  
description: "In this post, we'll explore the k-Nearest Neighbors (k-NN) Algorithm, one of the simplest and most intuitive algorithms in machine learning."  
tags: [machine learning, algorithms, classification, regression, k-NN]

---

### Definition:
**k-Nearest Neighbors (k-NN)** is a simple and widely used **supervised learning algorithm**. It can be applied to both **classification** and **regression** tasks. The algorithm classifies or predicts a data point based on how closely it resembles its neighbors. k-NN does not have an explicit training phase; instead, it stores the entire dataset and makes predictions by finding the **k nearest neighbors** of a given input and using their majority class (for classification) or average value (for regression) to make predictions.

### Characteristics:
- **Instance-Based Learning**:  
  k-NN is a **lazy learner**, meaning it stores all training instances and delays computation until prediction time.
  
- **Non-Parametric**:  
  It makes no assumptions about the underlying data distribution, making it highly flexible but sensitive to noisy data.
  
- **Distance-Based**:  
  The algorithm relies on a **distance metric** (e.g., Euclidean distance) to measure how close or similar the data points are.

### How k-NN Works:
1. **Data Collection**:  
   k-NN requires a labeled dataset of examples, where each example consists of feature values and a corresponding label (for classification) or continuous target (for regression).
   
2. **Prediction**:  
   To predict the label or value for a new, unseen data point:
   - Measure the distance between the new point and all points in the training set using a distance metric.
   - Select the **k nearest neighbors** based on the shortest distances.
   - For classification, assign the most frequent class (majority voting) among the k neighbors. For regression, calculate the average of the k neighbors’ values.

### Distance Metrics:
The most commonly used distance metrics in k-NN are:
- **Euclidean Distance** (default for continuous variables):  
![image](https://github.com/user-attachments/assets/3e1f84fb-7ff8-426b-b89a-b6e356784e90)

  
- **Manhattan Distance**:  
![image](https://github.com/user-attachments/assets/fe14fdcd-20c6-47eb-9225-51357cb33dd8)

  
- **Minkowski Distance** (generalization of Euclidean and Manhattan):  
![image](https://github.com/user-attachments/assets/7c6c7797-d1b9-4eab-8239-20d0691d9c85)

  
- **Hamming Distance** (used for categorical variables):  
  Measures the number of positions at which two binary strings differ.

### Choosing k:
- **Small k**:  
  A smaller k (e.g., k=1 or k=3) makes the model sensitive to noise and can lead to **overfitting** because it considers fewer neighbors.
  
- **Large k**:  
  A larger k provides a more generalized prediction but may lead to **underfitting** if it includes too many neighbors from different classes.
  
- **Optimal k**:  
  The ideal value of k is often found through experimentation or by using techniques like **cross-validation**.

### Classification with k-NN:
In classification tasks, k-NN assigns the class label based on the majority class among the k-nearest neighbors. Each neighbor votes for its class, and the most frequent class becomes the prediction.

**Example**:  
Suppose we are classifying an unknown data point based on three nearest neighbors (k=3), and the classes of these neighbors are:
- Neighbor 1: Class A
- Neighbor 2: Class A
- Neighbor 3: Class B

Since Class A occurs more frequently, the new point is assigned to **Class A**.

### Regression with k-NN:
In regression tasks, k-NN predicts the target value based on the **average** of the values of its k nearest neighbors.

**Example**:  
To predict the price of a house, k-NN will find k houses with similar features (square footage, number of rooms) and return the average price of those k houses as the predicted price.

### Steps in k-NN Algorithm:
1. **Data Storage**:  
   k-NN stores the entire dataset of training examples.
   
2. **Distance Calculation**:  
   For a new input data point, compute the distance between the input and every point in the training set using a chosen distance metric.
   
3. **Identify Neighbors**:  
   Sort the distances and identify the k-nearest neighbors.
   
4. **Prediction**:
   - For classification, count the occurrences of each class among the k neighbors and assign the class with the majority votes.
   - For regression, take the average of the k neighbors' target values.

### Problem Statement:
Given a dataset with labeled examples (for classification) or continuous targets (for regression), the goal is to classify or predict new input data points by finding the k most similar data points in the training set and using them to infer the output.

### Key Concepts:
- **Lazy Learning**:  
  k-NN is called a lazy learner because it doesn’t explicitly learn a model during training but simply stores the training dataset.
  
- **Similarity**:  
  The similarity between data points is quantified by calculating the distance between their feature vectors.
  
- **Majority Voting**:  
  For classification, the class of a new data point is determined by the majority class among its k nearest neighbors.
  
- **Averaging**:  
  For regression, the predicted value is the average of the k nearest neighbors' target values.

### Time Complexity:
- **Training Time Complexity: $O(1)$**  
  k-NN doesn’t require a training phase, so it takes constant time.
  
- **Prediction Time Complexity: $O(n \cdot d)$**  
  Predicting the class or value for a new data point requires computing the distance between the new point and all n training points, each of which has d dimensions.

### Space Complexity:
- **Space Complexity: $O(n \cdot d)$**  
  The algorithm stores the entire dataset, which consists of n points in d dimensions.

### Example:
Consider a simple k-NN classification example for predicting whether a fruit is an apple or an orange based on its features (weight and color):

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
   For a new fruit with a weight of 160g and color value 7, compute the distance from this point to all existing data points.

3. **Find k Nearest Neighbors**:  
   If k=3, identify the 3 closest fruits to the new one based on the shortest distances.

4. **Make Prediction**:  
   Count the class occurrences (Apple or Orange) among the 3 nearest neighbors and assign the new fruit the most frequent class.

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

--- 
