---
id: logistic-regression  
title: Logistic Regression Algorithm  
sidebar_label: Logistic Regression  
description: "In this post, we'll explore the Logistic Regression Algorithm, a widely used classification model in machine learning."  
tags: [machine learning, algorithms, logistic regression, classification]

---

### Definition:
**Logistic Regression** is a supervised learning algorithm primarily used for **binary classification** tasks (where the target variable has two categories). It models the relationship between the independent variables (features) and the probability of a particular outcome (class). Unlike linear regression, logistic regression predicts the **probability** that a given input belongs to a specific class using the **logistic function** (also known as the sigmoid function).

### Characteristics:
- **Classification Model**:  
  Although it contains "regression" in its name, logistic regression is a **classification** algorithm used to assign observations to discrete categories.
  
- **Probabilistic Output**:  
  The model outputs a probability value between 0 and 1, which is then thresholded to classify data points.
  
- **Linear Decision Boundary**:  
  It assumes a linear relationship between the features and the log-odds of the outcome.

### Types of Logistic Regression:
1. **Binary Logistic Regression**:  
   Used when the target variable has two classes (e.g., yes/no, spam/ham).
   
2. **Multinomial Logistic Regression**:  
   Used when the target variable has more than two classes but they are not ordinal (e.g., types of fruits).

3. **Ordinal Logistic Regression**:  
   Used when the target variable has more than two categories that follow a natural order (e.g., ranking systems like low/medium/high).

### Logistic Function:
The logistic function, also called the **sigmoid function**, is the mathematical function used to map any real-valued number into the [0, 1] range. It’s expressed as:

![image](https://github.com/user-attachments/assets/acf5be45-0958-4690-82a7-1c625da800c4)


Where:
- \( z \) is a linear combination of input features ![image](https://github.com/user-attachments/assets/bbcb200b-70f8-4382-a81a-88d8745f298a)

- ![image](https://github.com/user-attachments/assets/4aa2ba43-52c0-4335-a353-23814ac64404)
 is the predicted probability that the given input belongs to class 1 ![image](https://github.com/user-attachments/assets/b4b0c5fb-c213-4e9c-959e-e7c0ba2dfa8a)


### How Logistic Regression Works:
1. **Linear Model**:  
   The model starts by calculating a weighted sum of the input features plus a bias term. This is similar to linear regression:

  ![image](https://github.com/user-attachments/assets/565ec3e9-903c-4899-a3d8-71769063d786)


2. **Sigmoid Transformation**:  
   The linear output \( z \) is passed through the sigmoid function to produce a probability:
 
 ![image](https://github.com/user-attachments/assets/f14f0028-0e70-4695-beb9-223e02a6d210)

   where ![image](https://github.com/user-attachments/assets/7b28ac13-1992-40ec-80e6-944db5890bbd)
 is the predicted probability that the data point belongs to the positive class (class 1).

3. **Classification**:  
   A threshold (commonly 0.5) is applied to the predicted probability to determine the class label:

![image](https://github.com/user-attachments/assets/d58eb745-7d6d-4ca4-b58d-6acb4f470a22)


4. **Model Training**:  
   Logistic regression is trained by **maximum likelihood estimation** (MLE), which optimizes the model parameters (weights) to maximize the likelihood of correctly classifying the data.

### Problem Statement:
Given a dataset with features and a binary target variable, the goal is to learn a logistic regression model that can **classify** new data points into one of two categories by predicting the probability of each category.

### Key Concepts:
- **Odds**:  
  The odds of an event is the ratio of the probability of the event occurring to the probability of it not occurring:

![image](https://github.com/user-attachments/assets/d40a0cd4-d56a-49af-8785-0effc31b0f47)


- **Log-Odds (Logit)**:  
  Logistic regression models the log-odds of the target variable as a linear function of the input features:

![image](https://github.com/user-attachments/assets/88fe176a-2cee-4d85-96b7-93cd0577c02e)


### Loss Function:
The **loss function** for logistic regression is the **log loss** (also known as the negative log-likelihood or binary cross-entropy). It’s given by:

![image](https://github.com/user-attachments/assets/5d3f5412-545d-4eff-82cd-0bdde328c843)


Where:
- ![image](https://github.com/user-attachments/assets/1f48df37-fe70-4430-96fd-2e8b2aa08703)
 is the actual label of the \(i\)-th data point
- ![image](https://github.com/user-attachments/assets/49b0688a-3005-4199-989a-a1cf859747a1)
 is the predicted probability of class 1 for the \(i\)-th data point
- \( n \) is the total number of samples

### Time Complexity:
- **Best, Average, and Worst Case: $O(n)$**  
  The time complexity for training logistic regression is linear with respect to the number of samples \( n \) and features \( p \), making it efficient for large datasets.

### Space Complexity:
- **Space Complexity: $O(p)$**  
  The space complexity depends on the number of features, as the model needs to store a weight for each feature plus a bias term.

### Example:
Consider a dataset for predicting whether a user will click on an ad based on their **age** and **daily time spent on site**:

- Dataset:
  ```  
  | Age   | Daily Time Spent | Clicked (Yes/No) |  
  |-------|------------------|------------------|  
  | 25    | 65.5             | Yes              |  
  | 45    | 80.3             | No               |  
  | 35    | 45.2             | Yes              |  
  | 22    | 50.1             | No               |  
  ```

Step-by-Step Execution:

1. **Fit the model**:  
   Logistic regression will learn the relationship between features (Age, Daily Time Spent) and the target (Clicked or not).
   
2. **Sigmoid transformation**:  
   The linear combination of the features is transformed into a probability using the sigmoid function.
   
3. **Predict class**:  
   A threshold (e.g., 0.5) is applied to classify whether the user will click the ad (Yes or No).

### Python Implementation:
Here is a basic implementation of Logistic Regression in Python using **scikit-learn**:

```python
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
import numpy as np

# Load dataset
iris = load_iris()
X, y = iris.data, (iris.target == 2).astype(np.int)  # Convert to binary classification (target=2 vs rest)

# Create logistic regression model
clf = LogisticRegression()

# Train model
clf.fit(X, y)

# Make predictions
predictions = clf.predict(X)

# Display the model's coefficients
print(f"Model coefficients: {clf.coef_}")
```

### Summary:
The **Logistic Regression Algorithm** is a simple yet powerful method for binary classification tasks. It is widely used in scenarios where interpretability is important, as the model outputs probabilities for each class. Logistic regression is suitable for linearly separable datasets, but it may struggle with non-linear patterns. **Regularization techniques** like L1 and L2 can help prevent overfitting in logistic regression.

--- 
