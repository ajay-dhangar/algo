---
id: regression  
title: "Regression Algorithm (Supervised learning)"  
sidebar_label: Regression Algorithms  
description: "In this post, we’ll explore the concept of regression in supervised learning, a fundamental approach used for predicting continuous outcomes based on input features."  
tags: [machine learning, algorithms, supervised learning, regression]
---

### Definition:
**Regression** is a type of supervised learning algorithm used to predict continuous outcomes based on one or more input features. The model learns from labeled training data to establish a relationship between the input variables and the target variable.

<AdsComponent />

### Characteristics:
- **Continuous Output**:  
  Regression algorithms are used when the output variable is continuous, such as predicting prices, temperatures, or scores.

- **Predictive Modeling**:  
  The primary goal is to create a model that can accurately predict numerical values for new, unseen data based on learned relationships.

- **Evaluation Metrics**:  
  Regression models are evaluated using metrics such as Mean Squared Error (MSE), R-squared (R²), and Root Mean Squared Error (RMSE).

### Types of Regression Algorithms:
1. **Linear Regression**:  
   A simple approach that models the relationship between one or more independent variables and a dependent variable by fitting a linear equation.
   
2. **Polynomial Regression**:  
   Extends linear regression by fitting a polynomial equation to the data, allowing for more complex relationships.

3. **Ridge and Lasso Regression**:  
   Regularization techniques that add penalties to the loss function to prevent overfitting. Ridge uses L2 regularization, while Lasso uses L1 regularization.

4. **Support Vector Regression (SVR)**:  
   An extension of Support Vector Machines (SVM) that can be used for regression tasks by finding a hyperplane that best fits the data.

5. **Decision Tree Regression**:  
   Uses decision trees to model relationships between features and target values by splitting data into subsets based on feature values.

6. **Random Forest Regression**:  
   An ensemble method that combines multiple decision trees to improve prediction accuracy and control overfitting.

<Ads />

### Steps Involved:
1. **Input the Data**:  
   The algorithm receives labeled training data consisting of features and corresponding target values.
   
2. **Preprocess the Data**:  
   Data cleaning and preprocessing steps may include handling missing values, normalizing or scaling features, and encoding categorical variables.

3. **Split the Dataset**:  
   The dataset is typically split into training and testing sets to evaluate model performance.

4. **Select a Model**:  
   Choose an appropriate regression algorithm based on the problem type and data characteristics.

5. **Train the Model**:  
   Fit the model to the training data using an optimization algorithm to minimize error.

6. **Evaluate Model Performance**:  
   Use metrics such as MSE or R² score to assess how well the model performs on unseen data.

7. **Make Predictions**:  
   Use the trained model to make predictions on new data points.

<AdsComponent />

### Problem Statement:
Given a labeled dataset with multiple features and corresponding continuous target values, the objective is to train a regression model that can accurately predict target values for new, unseen data based on learned patterns.

### Key Concepts:
- **Training Set**:  
  The portion of the dataset used to train the model.

- **Test Set**:  
  The portion of the dataset used to evaluate model performance after training.

- **Overfitting and Underfitting**:  
  Overfitting occurs when a model learns noise in the training data rather than general patterns. Underfitting occurs when a model is too simple to capture underlying trends.

- **Evaluation Metrics**:  
  Metrics used to assess model performance include MSE for regression tasks and R² score for measuring explained variance.

<Ads />

### Split Criteria:
Regression algorithms typically split data based on minimizing prediction error or maximizing explained variance in predictions.

### Time Complexity:
- **Training Complexity**:  
  Varies by algorithm; can range from linear time complexity for simple models like Linear Regression to polynomial time complexity for more complex models.
  
- **Prediction Complexity**:  
Also varies by algorithm; some algorithms allow for faster predictions after training (e.g., linear models).

### Space Complexity:
- **Space Complexity**:  
Depends on how much information about the training set needs to be stored (e.g., decision trees may require more space than linear models).

### Example:
Consider a scenario where we want to predict house prices based on features such as size, number of bedrooms, and location.

**Dataset Example:**

| Size (sq ft) | Bedrooms | Price ($) |
|---------------|----------|-----------|
| 1500          | 3        | 300000    |
| 2000          | 4        | 400000    |
| 1200          | 2        | 250000    |
| 1800          | 3        | 350000    |

Step-by-Step Execution:

1. **Input Data**:  
   The model receives training data with features (size and bedrooms) and labels (price).

2. **Preprocess Data**:  
   Handle any missing values or outliers if necessary.

3. **Split Dataset**:  
   Divide the dataset into training and testing sets (e.g., 80% train, 20% test).

4. **Select Model**:  
   Choose an appropriate regression algorithm like Linear Regression.

5. **Train Model**:  
   Fit the model using the training set.

6. **Evaluate Performance**:  
   Use metrics like R² score or mean squared error on the test set.

7. **Make Predictions**:  
   Predict prices for new houses based on their features.

<AdsComponent />

### Python Implementation:
Here’s a basic implementation of Linear Regression using **scikit-learn**:

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Sample dataset
data = {
    'Size': [1500, 2000, 1200, 1800],
    'Bedrooms': [3, 4, 2, 3],
    'Price': [300000, 400000, 250000, 350000]
}

# Convert to DataFrame
import pandas as pd
df = pd.DataFrame(data)

# Features and target variable
X = df[['Size', 'Bedrooms']]
y = df['Price']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create Linear Regression model
model = LinearRegression()

# Train model
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")
```

