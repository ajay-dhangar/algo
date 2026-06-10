---
id: r-programming-notes
title: R Programming Notes
sidebar_label: R Programming Notes
sidebar_position: 2
description: "A comprehensive beginner-to-advanced guide to the R programming language, tailored for data science, statistical workflows, and modern visualization."
tags: [r, r-programming, data-science, statistics, data-analysis]
---

Welcome to your comprehensive guide to R. This modern, structured handbook is designed to take you from writing your first line of code to executing advanced data engineering and statistical workflows.

## Introduction to the R Ecosystem

R is more than just a programming language; it is a highly specialized environment designed for data analysis, statistical computing, and stunning graphics. 

### Why Use R?
* **Built for Data:** Unlike general-purpose languages, R's core data types are tailor-made for statistical modeling.
* **The Tidyverse Ecosystem:** A powerful, cohesive collection of packages designed explicitly for data science.
* **Academic & Production Standard:** The gold standard for reproducible research, statistical benchmarking, and reporting.

### Core Ecosystem Pillars

* **`tidyverse`** — The definitive toolkit for data manipulation and visualization (`dplyr`, `ggplot2`, `tidyr`, `readr`).
* **`data.table`** — High-performance, memory-efficient data manipulation for massive datasets.
* **`shiny`** — The go-to framework for building interactive web applications directly in R.
* **`tidymodels` / `caret`** — Modern, unified frameworks for machine learning pipelines.

## Installation & Environment Setup

1. **Install R:** Download the base engine from the [Comprehensive R Archive Network (CRAN)](https://cran.r-project.org/).
2. **Install RStudio:** Download the industry-standard IDE from [Posit](https://posit.co/).

### Essential Console Commands
Get familiar with your workspace using these quick foundational commands:

```r title="Workspace Navigation"
# Check your active R version
version

# Find out where R is looking for files (Working Directory)
getwd()         

# Change your working directory to a specific path
setwd("~/my_project")  

```

### Managing Packages

Packages expand R's capabilities. You only need to install a package once, but you must load it every time you start a new R session.

```r title="Package Management"
# Download from CRAN
install.packages("tidyverse")

# Load into your current session
library(tidyverse)

```

## Variables & Basic Data Types

In R, we use the arrow operator (`<-`) for assignment. While `=` works, `<-` is the idiomatic standard that explicitly signals a directional value assignment.

```r title="Variables & Types"
# Assigning values
age <- 42
user_name <- "Alice"
is_active <- TRUE

# Checking data types
class(age)        # Returns: "numeric" (stored as a double by default)
class(user_name)  # Returns: "character"
class(is_active)  # Returns: "logical"

```

### The 5 Core Data Types

* **Numeric:** Decimals/doubles (`42.5`) and explicit integers (`42L`).
* **Character:** Text strings (`"Hello R"`).
* **Logical:** Boolean flags (`TRUE` or `FALSE`).
* **Factor:** Categorical data with pre-defined levels (e.g., `factor(c("Low", "Medium", "High"))`).
* **Dates/POSIXct:** Standard date formats and calendar times with timezones.

## Operators & Expressions

```r title="Operators"
# 1. Arithmetic Operators
5 + 3     # Addition
10 / 2    # Division
3 ^ 2     # Exponentiation (3 squared)
11 %% 3   # Modulo (Remainder of division = 2)

# 2. Comparison Operators
5 > 3     # TRUE
age == 42 # TRUE

# 3. Logical Operators
TRUE & FALSE  # Element-wise AND -> FALSE
TRUE | FALSE  # Element-wise OR  -> TRUE
!TRUE         # NOT -> FALSE

```

## Control Flow

Control flow lets your code make decisions based on data conditions.

### Conditional Logic (If-Else)

```r title="If-Else Statements"
score <- 85

if (score >= 90) {
  print("Grade: A")
} else if (score >= 75) {
  print("Grade: B")
} else {
  print("Grade: C")
}

```

### Pattern Matching (Switch)

Use `switch` as a cleaner alternative to multi-layered `if-else` blocks when matching specific strings or values.

```r title="Switch Statements"
day <- "Monday"

message <- switch(day,
  "Monday" = "Back to the grind!",
  "Friday" = "Weekend is almost here!",
  "Mid-week blues..." # Default fallback value
)

print(message)

```

## Loops

While R favors vectorized operations over explicit loops, loops are essential for iterative tasks.

```r title="For & While Loops"
# For Loop: Iterate over a defined sequence
for (i in 1:5) {
  print(paste("Iteration:", i))
}

# While Loop: Repeat as long as a condition is met
count <- 0
while (count < 3) {
  print(paste("Count is:", count))
  count <- count + 1
}

```

## Functions

Functions allow you to write reusable blocks of code. R functions automatically return the last evaluated expression, but using `return()` explicitly makes your intent clearer to others.

```r title="Defining Functions"
# Standard function with a default parameter
calculate_total <- function(price, tax_rate = 0.05) {
  total <- price + (price * tax_rate)
  return(total)
}

# Invoking the function
calculate_total(price = 100)               # Uses default tax (105)
calculate_total(price = 100, tax_rate = 0.1) # Overrides default tax (110)

```

:::warning Scope Warning
Variables created inside a function stay inside the function. If you must modify a global variable from within a function, use the global assignment operator (`<<-`), though this should be used sparingly.
:::

## Core Data Structures

R’s superpower lies in its native data structures. Mastering these is crucial for effective data manipulation.

### 1. Vectors

The foundational building block of R. They are one-dimensional arrays that **must contains the same data type**. Created using the combine function `c()`.

```r title="Vectors"
numbers <- c(1, 2, 3, 4, 5)
fruits  <- c("apple", "banana", "cherry")

# Vectorized Math: Operations are automatically applied to every element!
numbers * 2      # Returns: 2, 4, 6, 8, 10
mean(numbers)    # Returns summary statistic: 3

```

### 2. Matrices

Two-dimensional structures where all elements must be of the exact same data type.

```r title="Matrices"
# Create a 3x3 grid using numbers 1 through 9
matrix_grid <- matrix(1:9, nrow = 3, ncol = 3)
print(matrix_grid)

```

### 3. Lists

The chameleons of R. Lists can hold elements of **different types and shapes**, including other lists.

```r title="Lists"
user_profile <- list(
  name = "John", 
  age = 30, 
  scores = c(85, 90, 95)
)

# Access items using named dollar-sign notation or double brackets
user_profile$name      # "John"
user_profile[[3]][1]   # Accesses first element of scores: 85

```

### 4. Data Frames (and Tibbles)

The most common structure for data analysis. A data frame is a list of vectors of equal length, creating a traditional table with rows and columns. Columns can be different data types.

```r title="Data Frames"
employees <- data.frame(
  name = c("Alice", "Bob"),
  age = c(25, 30),
  performance_score = c(88, 92),
  stringsAsFactors = FALSE # Standard default in modern R
)

# View a snapshot of the top of the data frame
head(employees)

```

## String Manipulation

### Base R String Toolkit

```r title="Base R Strings"
phrase <- "Data Science with R"

toupper(phrase)           # UPPERCASE
tolower(phrase)           # lowercase
nchar(phrase)             # Count characters
strsplit(phrase, " ")     # Split string into a list of words

```

### Modern Text Processing with `stringr`

The tidyverse `stringr` package offers clean, predictable functions that all start with `str_`.

```r title="stringr Examples"
library(stringr)

text <- "Learn R Programming"

# Search for a pattern
str_detect(text, "Programming") # TRUE

# Replace a pattern
str_replace(text, "Learn", "Master") # "Master R Programming"

```

## Data Input/Output (File Handling)

Getting data into and out of R efficiently is the first step of any analytics pipeline.

```r title="Data I/O Workflows"
# --- Base R Approach ---
# Read standard CSV
my_data <- read.csv("raw_data.csv")
# Export data safely without row index numbers
write.csv(my_data, "clean_output.csv", row.names = FALSE)


# --- Modern Tidyverse Approach (Faster & Smart Parsing) ---
library(readr)

# Reads as a user-friendly "tibble" data frame
my_data <- read_csv("raw_data.csv")
write_csv(my_data, "clean_output.csv")

```

## Data Visualization

### 1. Quick Exploratory Visuals (Base R)

Great for instantaneous data checks directly from your console.

```r title="Base R Plots"
# Scatter plot
plot(x = 1:10, y = (1:10)^2, type = "b", main = "Quadratic Growth", xlab = "X", ylab = "X^2")

# Distribution histogram
hist(rnorm(1000), breaks = 30, col = "skyblue", main = "Normal Distribution")

```

### 2. Publication-Ready Visuals (`ggplot2`)

Built on the **Grammar of Graphics**, you build plots layer-by-layer: Data $\rightarrow$ Aesthetics (mapping variables) $\rightarrow$ Geometries (visual shapes).

```r title="ggplot2 Workflow"
library(ggplot2)

ggplot(data = mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "steelblue", size = 2) +      # Layer 1: Scatter points
  geom_smooth(method = "lm", se = FALSE, color = "red") + # Layer 2: Linear trend line
  labs(
    title = "Fuel Efficiency vs. Vehicle Weight",
    x = "Weight (1000 lbs)",
    y = "Miles Per Gallon"
  ) +
  theme_minimal()                                  # Layer 3: Clean presentation theme

```

## Data Wrangling with `dplyr`

The `dplyr` package uses the forward-pipe operator `%>%` (or the native R pipe `|>`) to chain analytical steps together in readable, logical sequences. Read it as saying **"and then"**.

```r title="dplyr Pipelines"
library(dplyr)

rank_report <- employees %>%
  # 1. Filter rows based on a condition
  filter(age >= 25) %>%
  
  # 2. Keep only specific columns
  select(name, performance_score) %>%
  
  # 3. Sort by highest score down to lowest
  arrange(desc(performance_score)) %>%
  
  # 4. Create or modify columns based on calculations
  mutate(grade = ifelse(performance_score >= 90, "Excellent", "Good"))

print(rank_report)

```

## Statistical Analysis

R was made by statisticians, for statisticians. Complex mathematical calculations take only a line or two.

```r title="Basic Modeling Workflow"
# 1. Broad Descriptive Statistics Summary
summary(mtcars$mpg)

# 2. Calculate Pearson Correlation Coefficient
cor(mtcars$wt, mtcars$mpg)

# 3. Fit a Multiple Linear Regression Model (y ~ x1 + x2)
# Formula: Predict mpg based on weight (wt) and horsepower (hp)
fit <- lm(mpg ~ wt + hp, data = mtcars)

# 4. View coefficients, p-values, and R-squared values
summary(fit)

```

## Error Handling & Debugging

Prevent your script from crashing when unexpected data anomalies occur.

### Defensive Programming (`tryCatch`)

```r title="Graceful Failure"
tryCatch({
  # Attempt an operation that might break
  bad_calculation <- log("not a number")
}, error = function(e) {
  # Execute fallback logic safely if an error triggers
  message("⚠️ Warning: Could not calculate log. Returning NA instead.")
  print(e$message)
})

```

### Essential Debugging Toolkit

* `traceback()`: Run this right after a crash to see the exact function call stack where the code failed.
* `browser()`: Insert this directly inside a custom function to pause code execution and open an interactive console environment inside the function scope.

## Coding Best Practices

* **Use Explicit Assignments:** Always use `<-` for object storage and `=` exclusively for assigning function parameters.
* **Readable Naming:** Use snake_case for your variables and function names (e.g., `clean_customer_data <- ...`).
* **Keep Code Clean:** Put spaces around mathematical operators (`+`, `-`, `==`, `<-`) to maximize scannability.
* **Leverage Notebooks:** Use **Quarto** (`.qmd`) or **R Markdown** (`.Rmd`) to blend your code execution, text commentary, and visualization outputs into beautiful HTML or PDF reports.

## Hands-On Practice & Exercises

### Exercise 1: Building a Dynamic Summary Function

**Goal:** Create a user-defined function that takes a numeric vector, strips out missing data (`NA`), and returns both the mean and standard deviation packaged inside a labeled list.

```r
calc_stats <- function(vec) {
  clean_vec <- na.omit(vec)
  
  results <- list(
    avg = mean(clean_vec),
    st_dev = sd(clean_vec)
  )
  
  return(results)
}

# Test it out
calc_stats(c(10, 20, 30, NA, 40))

```

### Exercise 2: Exploratory Case Study using `iris`

**Goal:** Load R's native historical `iris` flower dataset, view a statistical digest of its metrics, and isolate structural patterns visually using `ggplot2`.

```r title="Case Study Execution"
# Load built-in data
data(iris)

# Get baseline dimensions and metric summaries
summary(iris)

# Map features to explore differences across classifications
ggplot(iris, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +
  geom_point(size = 2.5, alpha = 0.8) +
  labs(
    title = "Fisher's Iris Dataset Analysis",
    x = "Sepal Length",
    y = "Sepal Width"
  ) +
  theme_classic()

```

## References & Resources

* [Official CRAN Manuals](https://cran.r-project.org/) — Deep-dive foundational system logic.
* [R for Data Science (2e)](https://r4ds.hadley.nz/) — The quintessential guide to modern tidyverse methodologies.
* [RDocumentation search](https://www.rdocumentation.org/) — Search package documentation across all CRAN archives.
