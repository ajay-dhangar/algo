\---

id: r-programming-notes

title: R Programming Notes

sidebar\_label: R Programming Notes

sidebar\_position: 2

description: "Comprehensive beginner to advanced R programming guide covering fundamentals, data structures, visualization, statistics, and data analysis workflows."

tags: \[r, r-programming, data-science, statistics, data-analysis]

\---



\# R Programming Language Notes



This structured guide covers R from beginner to advanced levels, focusing on data analysis and statistical computing.



\## Introduction to R and Ecosystem



R is a language and environment for statistical computing and graphics. It is widely used in data science, statistics, and research.



\*\*Core Strengths:\*\*

\- Statistical analysis

\- Data visualization

\- Reproducible research



\*\*Popular Packages:\*\*

\- `tidyverse` — Data manipulation (dplyr, ggplot2, tidyr, etc.)

\- `data.table` — Fast data manipulation

\- `shiny` — Interactive web apps

\- `caret` / `tidymodels` — Machine Learning



\---



\## Installation and Environment Setup



Download R from \[CRAN](https://cran.r-project.org/).



Recommended: Install \*\*RStudio\*\* as your IDE.



```r title="Basic commands in console"

version

getwd()           # Current working directory

setwd("\~/path")   # Change directory

```



```r title="Install and load packages"

install.packages("tidyverse")

library(tidyverse)

```



\---



\## Variables and Data Types



```r

\# Assignment

x <- 42

name <- "Alice"

is\_active <- TRUE



\# Data types

class(x)          # numeric

class(name)       # character

class(is\_active)  # logical

```



\*\*Main Types:\*\*

\- Numeric (integer, double)

\- Character

\- Logical

\- Factor (categorical)

\- Date / POSIXct



\---



\## Operators and Expressions



```r

\# Arithmetic

5 + 3

10 / 2

3 \*\* 2     # Power



\# Comparison

5 > 3

x == 42



\# Logical

TRUE \& FALSE

TRUE | FALSE

```



\---



\## Control Flow Statements



\### If-Else



```r

score <- 85



if (score >= 90) {

&#x20; print("A")

} else if (score >= 75) {

&#x20; print("B")

} else {

&#x20; print("C")

}

```



\### Switch



```r

day <- "Monday"



switch(day,

&#x20; Monday = "Start of week",

&#x20; Friday = "End of week",

&#x20; "Mid week"

)

```



\---



\## Loops



```r

\# For loop

for (i in 1:5) {

&#x20; print(i)

}



\# While loop

count <- 0

while (count < 3) {

&#x20; print(count)

&#x20; count <- count + 1

}

```



\---



\## Functions



```r

add\_numbers <- function(a, b = 0) {

&#x20; return(a + b)

}



add\_numbers(5, 3)

```



\*\*Scope:\*\* Variables inside functions are local unless using `<<-`.



\---



\## Data Structures



\### Vectors



```r

numbers <- c(1, 2, 3, 4, 5)

fruits <- c("apple", "banana", "cherry")



\# Operations

numbers \* 2

mean(numbers)

```



\### Matrices



```r

mat <- matrix(1:9, nrow = 3, ncol = 3)

mat

```



\### Lists



```r

my\_list <- list(name = "John", age = 30, scores = c(85, 90))

my\_list$name

```



\### Data Frames



```r

df <- data.frame(

&#x20; Name = c("Alice", "Bob"),

&#x20; Age = c(25, 30),

&#x20; Score = c(88, 92)

)



head(df)

```



\---



\## String Manipulation



```r

text <- "Hello World"

toupper(text)

tolower(text)

nchar(text)

strsplit(text, " ")

```



\*\*Using stringr (tidyverse):\*\*



```r

library(stringr)

str\_detect(text, "Hello")

str\_replace(text, "World", "R")

```



\---



\## File Handling and Data I/O



```r

\# Read CSV

df <- read.csv("data.csv")



\# Write CSV

write.csv(df, "output.csv", row.names = FALSE)



\# Using readr (tidyverse)

library(readr)

df <- read\_csv("data.csv")

```



\---



\## Data Visualization



\### Base R



```r

plot(x = 1:10, y = (1:10)^2, type = "b", main = "Quadratic")

hist(rnorm(1000), breaks = 30)

```



\### ggplot2



```r

library(ggplot2)



ggplot(mtcars, aes(x = wt, y = mpg)) +

&#x20; geom\_point() +

&#x20; geom\_smooth(method = "lm") +

&#x20; theme\_minimal()

```



\---



\## Statistical Analysis



```r

\# Summary statistics

summary(mtcars$mpg)



\# Correlation

cor(mtcars$wt, mtcars$mpg)



\# Linear model

model <- lm(mpg \~ wt + hp, data = mtcars)

summary(model)

```



\---



\## Data Wrangling with dplyr



```r

library(dplyr)



df %>%

&#x20; filter(Age > 25) %>%

&#x20; select(Name, Score) %>%

&#x20; arrange(desc(Score)) %>%

&#x20; mutate(Grade = ifelse(Score >= 90, "A", "B"))

```



\---



\## Error Handling and Debugging



```r

tryCatch({

&#x20; result <- 10 / 0

}, error = function(e) {

&#x20; print(paste("Error:", e$message))

})

```



Use `browser()`, `traceback()`, and `debug()` for debugging.



\---



\## Package Management



```r

install.packages("package\_name")

remove.packages("package\_name")

update.packages()

```



\*\*renv\*\* for project-specific environments.



\---



\## Best Practices and Coding Conventions



\- Use meaningful variable names

\- Prefer `<-` for assignment

\- Follow tidyverse style guide

\- Comment your code

\- Use R Markdown / Quarto for reports

\- Version control with Git



\---



\## Practical Examples \& Exercises



\*\*Exercise 1:\*\* Create a function that calculates mean and standard deviation of a vector.



\*\*Exercise 2:\*\* Load a dataset and create a scatter plot using ggplot2.



\*\*Real-world Case:\*\* Exploratory Data Analysis (EDA) on built-in `iris` dataset.



```r

data(iris)

summary(iris)

ggplot(iris, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +

&#x20; geom\_point()

```



\---



\*\*References\*\*

\- \[R Documentation](https://www.rdocumentation.org/)

\- \[R for Data Science](https://r4ds.hadley.nz/)

\- \[CRAN](https://cran.r-project.org/)



Happy coding with R! 🚀

```

