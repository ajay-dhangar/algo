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
To get started, import the library and use the `create_tree` and `create_sankey` functions:

```python
import d_treevis as dtv
``` 

Next, fit a sklearn Decision Tree Classifier on your dataset and pass it to the `create_tree` function:

```python
from sklearn.tree import DecisionTreeClassifier
    
# Fit a Decision Tree Classifier on your dataset
tree_model = DecisionTreeClassifier()
tree_model.fit(X, y)

# Visualize the decision tree
visualizer.visualize(tree_model)
```

You can also customize the target names and colors for better visualization:

```python
# Define target names and colors
target_names = ['Survived', 'Not Survived']
target_colors = ['red', 'yellow']

# Visualize the decision tree with custom target names and colors
visualizer.visualize(tree_model, target_names=target_names, target_colors=target_colors)
```

## 📧 **Contact**
If you have any questions or suggestions, feel free to reach the main author at [Yash Kumar Saini](https://github.com/yashksaini-coder).