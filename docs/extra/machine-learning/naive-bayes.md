---
id: naive-bayes-theorem  
title: Naive Bayes Algorithm  
sidebar_label: Naive Bayes  
description: "In this post, we’ll explore the Naive Bayes Theorem, a fundamental probabilistic algorithm used for classification tasks based on Bayes' Theorem and the assumption of conditional independence."  
tags: [machine learning, algorithms, naive bayes, classification, bayes theorem, probability]
---

### Definition:
The **Naive Bayes** algorithm is a probabilistic classifier based on **Bayes' Theorem** with the assumption that the features are conditionally independent given the class label. Despite the "naive" assumption of feature independence, it is highly effective for various real-world applications such as spam filtering, text classification, and recommendation systems.

<AdsComponent />

### Characteristics:
- **Probabilistic Model**:  
  Naive Bayes predicts the class label by calculating the posterior probability of each class based on the input features and selecting the class with the highest probability.
  
- **Conditional Independence Assumption**:  
  Naive Bayes assumes that each feature is independent of others given the class label, which simplifies the calculation of probabilities but may not always hold in practice.

- **Efficient and Scalable**:  
  Naive Bayes is computationally efficient and can scale well to large datasets with multiple features.

### Types of Naive Bayes:
1. **Gaussian Naive Bayes**:  
   Used when the features are continuous and follow a Gaussian (normal) distribution. Commonly applied in cases where the data can be assumed to be normally distributed.
   
2. **Multinomial Naive Bayes**:  
   Used for discrete data, often applied in text classification, where the features represent counts or frequencies of words (e.g., spam detection).
   
3. **Bernoulli Naive Bayes**:  
   Applied to binary data, where the features take on binary values (e.g., presence or absence of a word in text classification).

<Ads />

### Steps Involved:
1. **Input the Data**:  
   The algorithm receives labelled training data, where each example consists of a set of features and a corresponding class label.
   
2. **Calculate Prior Probabilities**:  
   The prior probability of each class is computed based on the frequency of each class in the training data.

3. **Calculate Likelihood**:  
   For each feature and class, the likelihood is calculated by determining how likely it is to observe a particular feature value given the class.

4. **Apply Bayes' Theorem**:  
   Using Bayes' Theorem, the posterior probability of each class is calculated based on the priors and likelihoods:
   
   $$
   P(y|X) = \frac{P(X|y) \cdot P(y)}{P(X)}
   $$

   where $P(y|X)$ is the posterior probability of the class given the feature vector, $P(X|y)$ is the likelihood, $P(y)$ is the prior, and $P(X)$ is the evidence.

5. **Classify New Data**:  
   For a new data point, the algorithm computes the posterior probability for each class and assigns the label of the class with the highest probability.

<AdsComponent />

### Problem Statement:
Given a dataset with multiple features and corresponding class labels, the objective is to train a Naive Bayes classifier that can predict the class label for new, unseen data based on the calculated probabilities.

### Key Concepts:
- **Bayes' Theorem**:  
  Bayes' Theorem is a mathematical formula used to calculate conditional probabilities. It is expressed as:
  
  $$
  P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
  $$

  where:
  - $P(A|B)$ is the posterior probability of event $A$ given that $B$ is true.
  - $P(B|A)$ is the likelihood of observing $B$ given that $A$ is true.
  - $P(A)$ is the prior probability of event $A$.
  - $P(B)$ is the total probability of event $B$.

- **Prior Probability**:  
  The prior probability represents the initial belief about the class labels before considering any feature values, based on the distribution of classes in the training data.
  
- **Likelihood**:  
  The likelihood is the probability of observing the feature values given a specific class label.

- **Posterior Probability**:  
  The posterior probability is the probability of a class label after considering the observed feature values, which is what Naive Bayes uses to make predictions.

- **Naive Assumption**:  
  Naive Bayes assumes that all features are independent given the class, simplifying the probability calculations. This assumption, although unrealistic in many cases, allows for efficient computation and often leads to good results.

<Ads />

### Split Criteria:
Naive Bayes splits data based on the **highest posterior probability** for each class, assigning the class label that maximizes this probability.

### Time Complexity:
- **Training Complexity**:  
  Training involves calculating probabilities for each feature and class, resulting in a time complexity of $ O(n \cdot k) $, where $ n $ is the number of features and $ k $ is the number of classes.
  
- **Prediction Complexity**:  
  For predicting the class of a new data point, the time complexity is $ O(n \cdot k) $, as it requires computing the posterior probability for each class.

### Space Complexity:
- **Space Complexity**:  
  The space complexity is mainly determined by storing the calculated probabilities, which depends on the number of features, classes, and their possible values.

### Example:
Consider a spam detection system that classifies emails as "spam" or "not spam" based on features such as the presence of certain words (binary features).

**Dataset:**

| Word 'Free' | Word 'Money' | Spam |
|-------------|--------------|------|
| Yes         | Yes          | Yes  |
| Yes         | No           | No   |
| No          | Yes          | Yes  |
| No          | No           | No   |

Step-by-Step Execution:

1. **Input Data**:  
   The model receives training data with features (words) and labels (spam/not spam).

2. **Calculate Priors**:  
   The prior probabilities of the classes (spam and not spam) are calculated based on the class distribution:
   
   $$
   P(\text{Spam}) = \frac{\text{Number of spam emails}}{\text{Total number of emails}}
   $$
   
   $$
   P(\text{Not Spam}) = \frac{\text{Number of non-spam emails}}{\text{Total number of emails}}
   $$

3. **Calculate Likelihoods**:  
   For each word (feature) and class, the likelihood is calculated. For example:
   
   $$
   P(\text{Free}|\text{Spam}) = \frac{\text{Number of spam emails containing 'Free'}}{\text{Total number of spam emails}}
   $$

4. **Apply Bayes' Theorem**:  
   Using Bayes' Theorem, the posterior probabilities for new emails are calculated.

5. **Make Predictions**:  
   The class with the highest posterior probability is predicted (spam or not spam).

<AdsComponent />

### Python Implementation:
Here is a basic implementation of Naive Bayes using **scikit-learn**:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create Gaussian Naive Bayes model
nb = GaussianNB()

# Train model
nb.fit(X_train, y_train)

# Predict
y_pred = nb.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
```
