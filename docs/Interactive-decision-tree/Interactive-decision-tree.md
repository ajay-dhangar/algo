---
id: Interactive-decision-tree
title: Interactive Decision Tree
sidebar_label: Interactive Decision Tree
sidebar_position: 2
description: This library allows you to visualize sklearn Decision Tree Classifiers with ease.
tags: [Decision Tree, Visualization]
---

# 📚🔍🎨 **Decision Tree Visualizer**

## **Introduction**
The Decision Tree Visualizer is a powerful library that allows you to visualize sklearn Decision Tree Classifiers with ease. It provides functions for extracting useful information about the tree structure and rules, and generates HTML files for visualizing the decision tree.

## 📊 **Features**
- 🌳 Visualize sklearn Decision Tree Classifiers using HTML templates
- 🔍 Extract useful information about the tree structure and rules
- 📊 Generate output HTML files for visualization
- 🎨 Customize target names and colors for better visualization

## 🔧 **Usage**
To install the library, use pip:

```
pip install d-treevis
```

## 📖 **Usage**


You can use this library during the development phase of your decision tree model to visualize your decision tree.

```python
# Create and train the decision tree model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)


# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')


# Create and train the decision tree model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)


# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')
```

### **Using the Library** 🚀

First, you need to import the library:

```python
import d_treevis as dtv
```

Then, you can call the `create_tree` function to visualize your decision tree:

```python
# Visualize the decision tree
dtv.create_tree(tree_model)
```

You can also customize the target names and colors for better visualization:

```python
# Define target names and colors
target_names = ['Survived', 'Not Survived']
target_colors = ['red', 'yellow']

# Visualize the decision tree with custom target names and colors
dtv.create_tree(tree_model, target_names=target_names, target_colors=target_colors)
```

## 📈 **Example**

- To create a tree diagram, you can use the `create_tree` function:

```python
dtv.create_tree(tree_model=model,
                X=X_train,
                target_names=['Not Survived', 'Survived'],
                target_colors=['red', 'green'],
                save_path='titanic-tree.html')
```

- To create a sankey diagram, you can use the `create_sankey` function:
```python
dtv.create_sankey(tree_model=model,
                X=X_train,
                target_names=['Not Survived', 'Survived'],
                target_colors=['red', 'green'],
                save_path='titanic-sankey.html')
```

> [!TIP]
> It is recommended to use this library during the development phase of your decision tree model to visualize your decision tree. Also best if it used in the Jupyter Notebook, for a pruned tree, you can use the `max_depth` parameter.

## 📧 **Contact**
If you have any questions or suggestions, feel free to reach the main author at [Yash Kumar Saini](https://github.com/yashksaini-coder).