
---
id: lasso-regression  
title: "Lasso Regression Algorithm"  
sidebar_label: Lasso Regression  
description: "In this post, we’ll explore Lasso Regression, a regularization technique in supervised learning that helps prevent overfitting by adding a penalty to the loss function."  
tags: [machine learning, algorithms, supervised learning, regression, lasso regression]
---

### Definition:
**Lasso Regression** (Least Absolute Shrinkage and Selection Operator) is a type of linear regression that uses L1 regularization to enhance the prediction accuracy and interpretability of the statistical model it produces. By adding a penalty equal to the absolute value of the magnitude of coefficients, Lasso can shrink some coefficients to zero, effectively performing variable selection.

<AdsComponent />

### Characteristics:
- **Regularization**:  
  Lasso Regression includes a penalty term in the loss function that discourages overly complex models by constraining the coefficients.

- **Feature Selection**:  
  By driving some coefficients to zero, Lasso effectively selects a simpler model that uses only a subset of the features.

- **Continuous Output**:  
  Like other regression algorithms, Lasso is used for predicting continuous outcomes.

### Steps Involved:
1. **Input the Data**:  
   The algorithm receives labeled training data consisting of features and corresponding target values.
   
2. **Preprocess the Data**:  
   Data cleaning and preprocessing steps may include handling missing values, normalizing or scaling features, and encoding categorical variables.

3. **Split the Dataset**:  
   The dataset is typically split into training and testing sets to evaluate model performance.

4. **Select a Model**:  
   Choose Lasso Regression as the appropriate regression algorithm based on the problem type and data characteristics.

5. **Train the Model**:  
   Fit the model to the training data using an optimization algorithm that minimizes error while applying L1 regularization.

6. **Evaluate Model Performance**:  
   Use metrics such as Mean Squared Error (MSE) or R² score to assess how well the model performs on unseen data.

7. **Make Predictions**:  
   Use the trained model to make predictions on new data points.

<AdsComponent />

### Problem Statement:
Given a labeled dataset with multiple features and corresponding continuous target values, the objective is to train a Lasso Regression model that can accurately predict target values for new, unseen data based on learned patterns while performing feature selection.

### Key Concepts:
- **Regularization Parameter (α)**:  
  The strength of the penalty applied to coefficients; higher values lead to more regularization and simpler models.

- **Training Set**:  
  The portion of the dataset used to train the model.

- **Test Set**:  
  The portion of the dataset used to evaluate model performance after training.

- **Overfitting and Underfitting**:  
  Overfitting occurs when a model learns noise in the training data rather than general patterns. Underfitting occurs when a model is too simple to capture underlying trends.

<Ads />

### Split Criteria:
Lasso Regression typically splits data based on minimizing prediction error while incorporating regularization effects in coefficient estimation.

### Time Complexity:
- **Training Complexity**:  
  Varies by algorithm; for Lasso Regression, it can be more computationally intensive than standard linear regression due to optimization with regularization.
  
- **Prediction Complexity**:  
Similar to linear regression; once trained, predictions are generally quick.

### Space Complexity:
- **Space Complexity**:  
Depends on how much information about the training set needs to be stored; typically lower than tree-based models because it maintains fewer parameters.

### Example:
Consider a scenario where we want to predict house prices based on features such as size, number of bedrooms, and location while also performing feature selection.

**Dataset Example:**

| Size (sq ft) | Bedrooms | Age (years) | Price ($) |
|---------------|----------|-------------|-----------|
| 1500          | 3        | 10          | 300000    |
| 2000          | 4        | 5           | 400000    |
| 1200          | 2        | 15          | 250000    |
| 1800          | 3        | 8           | 350000    |

Step-by-Step Execution:

1. **Input Data**:  
   The model receives training data with features (size, bedrooms, age) and labels (price).

2. **Preprocess Data**:  
   Handle any missing values or outliers if necessary.

3. **Split Dataset**:  
   Divide the dataset into training and testing sets (e.g., 80% train, 20% test).

4. **Select Model**:  
   Choose Lasso Regression as your regression algorithm.

5. **Train Model**:  
   Fit the model using the training set with an appropriate value for α (the regularization parameter).

6. **Evaluate Performance**:  
   Use metrics like R² score or mean squared error on the test set.

7. **Make Predictions**:  
   Predict prices for new houses based on their features.

<AdsComponent />

### Python Implementation:
Here’s a basic implementation of Lasso Regression using **scikit-learn**:

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
from sklearn.metrics import mean_squared_error

# Sample dataset
data = {
    'Size': [1500, 2000, 1200, 1800],
    'Bedrooms': [3, 4, 2, 3],
    'Age': [10, 5, 15, 8],
    'Price': [300000, 400000, 250000, 350000]
}

# Convert to DataFrame
import pandas as pd
df = pd.DataFrame(data)

# Features and target variable
X = df[['Size', 'Bedrooms', 'Age']]
y = df['Price']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create Lasso Regression model
model = Lasso(alpha=0.1) # You can adjust alpha for regularization strength

# Train model
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")
```

