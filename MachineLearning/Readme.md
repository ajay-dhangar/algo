# **Spam Detection (Text Classification)**
### **Objective**
The objective of this project is to build a machine learning model that classifies text data from three languages (English, French, and German) as either Spam or Ham (not spam).

### **Overview**
This project uses a **Logistic Regression** model for binary classification. The dataset contains text data labeled as either spam or ham, and the model aims to distinguish between the two. The process involves data preprocessing, vectorizing the text data, training the model, and then evaluating its performance.

### **Steps for Implementation**

1. **Data Collection & Exploration**  
   Load the dataset and explore it for missing values or inconsistencies.

2. **Data Preprocessing**  
   Clean the data by removing any missing values. Split the data into features (text) and labels (spam or ham), and then divide it into training and testing sets.

3. **Text Vectorization**  
   Convert the text data into numerical form using **TfidfVectorizer**, which transforms the raw text into a matrix of TF-IDF features.

4. **Model Training**  
   Train the **Logistic Regression** model on the transformed training data. Logistic Regression is well-suited for binary classification tasks like spam detection.

5. **Model Evaluation**  
   Evaluate the model using the testing data, calculating performance metrics like accuracy to assess how well the model classifies unseen text.

6. **Predicting New Inputs**  
   Once the model is trained, you can input new email text to predict whether it's spam or ham.

### **Conclusion**
This project successfully implements a spam detection system using Logistic Regression, capable of classifying multilingual text data as either spam or ham.