---
id: linear-regression  
title: Linear Regression Algorithm  
sidebar_label: Linear Regression  
description: "In this post, we'll explore the Linear Regression Algorithm, one of the most basic and commonly used algorithms in machine learning."  
tags: [machine learning, algorithms, linear regression, regression]

---

### Definition:
**Linear Regression** is a supervised learning algorithm used for **predictive modeling** of continuous numerical variables. It establishes a linear relationship between a dependent variable (the target) and one or more independent variables (the features). The goal of linear regression is to model this relationship using a straight line (linear equation) to predict the target values based on input features.

### Characteristics:
- **Regression Model**:  
  Unlike classification, linear regression predicts **continuous** values rather than categories.
  
- **Linear Relationship**:  
  Assumes a linear relationship between the features and the target variable, where changes in feature values proportionally affect the target.
  
- **Minimizing Error**:  
  The model minimizes the difference between the actual values and predicted values using a method called **Ordinary Least Squares** (OLS).

### Types of Linear Regression:
1. **Simple Linear Regression**:  
   Used when there is one independent variable to predict the target.  
   Example: Predicting house price based solely on square footage.
   
2. **Multiple Linear Regression**:  
   Used when there are two or more independent variables to predict the target.  
   Example: Predicting house price based on square footage, number of rooms, and age of the house.

### Linear Equation:
In linear regression, the relationship between the target \( y \) and the input features \( X \) is modeled using the equation of a straight line:

![image](https://github.com/user-attachments/assets/1875d7db-cf35-4ce7-a907-52c2366b2f94)


Where:
- \( y \) is the dependent variable (target).
- ![image](https://github.com/user-attachments/assets/e1719652-349b-456c-a1e1-e45a751bc619)
 are the independent variables (features).
- ![image](https://github.com/user-attachments/assets/63ea3e53-41fc-463d-b485-72cf47d8edcf)
 is the intercept![image](https://github.com/user-attachments/assets/20179b4e-8bbc-4c75-af5e-0c6697628740)
.
- ![image](https://github.com/user-attachments/assets/48f41c2a-c6fe-4c22-9ba5-e3c41ddd2588)
 are the coefficients (slopes), representing the change in \( y \) for a unit change in the corresponding ![image](https://github.com/user-attachments/assets/88f0e8e8-3f9b-4194-81fb-fb2e1dabef86)


### How Linear Regression Works:
1. **Data Collection**:  
   Gather a dataset with one or more features (independent variables) and the corresponding target variable (dependent variable).
   
2. **Model Training**:  
   The algorithm attempts to find the best-fitting line by optimizing the parameters (intercept and slopes). This is achieved using **Ordinary Least Squares** (OLS), which minimizes the sum of squared residuals (the differences between actual and predicted values).
   
3. **Making Predictions**:  
   Once trained, the model can predict the target value \( y \) for new data points by applying the learned linear equation.

4. **Residuals**:  
   The residual is the difference between the actual and predicted value:
![image](https://github.com/user-attachments/assets/883e638f-3a8f-49e8-abfa-46c5295dd923)

   The goal is to minimize these residuals.

### Problem Statement:
Given a dataset with independent variables (features), the objective is to learn a linear regression model that can predict the target variable based on new input values.

### Key Concepts:
- **Slope (Coefficient)**:  
  The slope represents how much the target variable changes when the corresponding feature increases by one unit. In multiple regression, each feature has its own slope.
  
- **Intercept**:  
  The intercept is the predicted value of the target when all feature values are zero.
  
- **Best-Fit Line**:  
  Linear regression aims to find the line (or hyperplane for multiple regression) that best fits the data, meaning it minimizes the overall distance between the data points and the line.

### Loss Function:
The loss function used in linear regression is the **Mean Squared Error (MSE)**, which calculates the average of the squared differences between the actual and predicted values:

![image](https://github.com/user-attachments/assets/8cfd9f8a-5473-4492-aeb3-d6cdcb10cf37)

Where:
- ![image](https://github.com/user-attachments/assets/5d2a3123-9c81-4843-b8d4-1dffec0c55a0)
 is the actual target value of the \(i\)-th data point.
- ![image](https://github.com/user-attachments/assets/c811a466-140c-4a76-8c2a-a0e5df20a57c)
 is the predicted target value.
- \( n \) is the total number of samples.

### Gradient Descent (Alternative Training Method):
Another approach to finding the best-fit line is **gradient descent**, which iteratively updates the model parameters by moving in the direction of the steepest decrease in the loss function.

- **Update rule** for each parameter:
![image](https://github.com/user-attachments/assets/99d5d6c9-fb83-4e6e-b3cf-ba19b29c9127)

  Where:
  - ![image](https://github.com/user-attachments/assets/1395eba3-d492-465c-879c-5f7ce406beb3)
 is the learning rate (controls step size).
  - ![image](https://github.com/user-attachments/assets/6493a7af-6685-47d9-b9a3-70f5cd8abc8b)
 is the loss function (MSE).
  
  The parameters are updated in each iteration to reduce the error.

### Time Complexity:
- **Best, Average, and Worst Case: $O(n)$**  
  The time complexity for training a linear regression model is linear with respect to the number of samples \( n \) and features \( p \), making it efficient for large datasets.

### Space Complexity:
- **Space Complexity: $O(p)$**  
  The space complexity is proportional to the number of features \( p \), as the model stores one coefficient per feature, plus the intercept.

### Example:
Consider a dataset for predicting the price of a house based on **square footage**:

- Dataset:
  ```  
  | Square Footage | Price ($)    |  
  |----------------|--------------|  
  | 1500           | 200,000      |  
  | 1700           | 230,000      |  
  | 1800           | 250,000      |  
  | 1900           | 270,000      |  
  ```

Step-by-Step Execution:

1. **Fit the model**:  
   Linear regression will learn the relationship between **square footage** (independent variable) and **price** (dependent variable).

2. **Equation**:  
   The model will output an equation like:
  ![image](https://github.com/user-attachments/assets/8061012e-d2b6-46be-b51b-a1889207eac8)


3. **Predict price**:  
   For a new house with 2000 square feet, the model will predict the price using the equation.

### Python Implementation:
Here is a basic implementation of Linear Regression in Python using **scikit-learn**:

```python
from sklearn.linear_model import LinearRegression
import numpy as np

# Sample data
X = np.array([[1500], [1700], [1800], [1900]])  # Features (Square Footage)
y = np.array([200000, 230000, 250000, 270000])  # Target (Price)

# Create linear regression model
model = LinearRegression()

# Train the model
model.fit(X, y)

# Make predictions
predicted_price = model.predict([[2000]])  # Predict price for 2000 square footage
print(f"Predicted price: ${predicted_price[0]:,.2f}")

# Display the model's coefficients
print(f"Intercept: {model.intercept_}")
print(f"Coefficient: {model.coef_[0]}")
```

### Summary:
The **Linear Regression Algorithm** is one of the most fundamental techniques for predicting continuous outcomes. Its simplicity and interpretability make it a powerful tool for many real-world applications, particularly in finance, economics, and engineering. However, it assumes a linear relationship between variables and may not work well for datasets with non-linear patterns.

---
