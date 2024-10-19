---
id: introduction-to-2D-Arrays
title: Matrix Algorithms
sidebar_label: Introduction to Matrix Algorithm
sidebar_position: 1
description: 'A 2D array, or two-dimensional array, is a data structure that represents a grid-like collection of elements, organized in rows and columns. Each element in a 2D array can be accessed using two indices: one for the row and one for the column.'
tags: [basic-dsa, data-structures, Matrix Algorithm , Sparse Matrix]
---

### Introduction
A 2D array, also known as a two-dimensional array, is a collection of elements arranged in a grid format
consisting of rows and columns. This structure allows for the representation of data in a tabular manner
making it particularly useful for applications that require systematic organization and manipulation of data.

### Structure and Syntax
A 2D array can be visualized as a matrix, where each element is accessed via a pair of indices: the first
index denotes the row, and the second index denotes the column. For example, in a 2D array defined as **array[i][j]**, i refers to the row number and j refers to the column number.
 example:
    - int array[3][4];

### Characteristics
 - **Fixed Size**: In many programming languages, the size of a 2D array is fixed upon creation, meaning that the number of rows and columns cannot be changed dynamically.

 - **Homogeneous Elements**: All elements in a 2D array are typically of the same data type (e.g., integers, floats), which allows for efficient storage and access.

 - **Memory Layout**: In C , 2D arrays are often stored in contiguous memory locations, which can enhance performance due to better cache locality.

### Code

**1-Creation**

   ```text
    void create(int a[][10],int m,int n)
    {
        int i,j;
        for(i=0;i<m;i++)
        for(j=0;j<n;j++)
        {
            printf("\nEnter no. in row=%d column=%d\n",i,j);
            scanf("%d",&a[i][j]);
        }
    }

   ```
**2-Display**

   ```text
    void display(int a[][10],int m,int n)
    {
        int i,j;
        printf("\nArray is_\n");
        for(i=0;i<m;i++)
        {
            printf("\n");
            for(j=0;j<n;j++)
            printf("%d\t",a[i][j]);
        }
    }

   ```

**3-Addition of two 2D arrays**

   ```text
    void add(int a[][10],int b[][10],int m,int n)
    {
        int i,j,c[10][10];
        for(i=0;i<m;i++)
        for(j=0;j<n;j++)
        c[i][j]=a[i][j]+b[i][j];
        printf("\nAddintion of these_\n");
        display(c,m,n);
    }

   ```
**4-Subtraction of two 2D arrays**

   ```text
     void sub(int a[][10],int b[][10],int m,int n)
      {
          int i,j,c[10][10];
          for(i=0;i<m;i++)
          for(j=0;j<n;j++)
          c[i][j]=a[i][j]-b[i][j];
          printf("\nSubtraction of these_\n");
          display(c,m,n);
      }
   ```
### Sparse Matrix
 A sparse matrix is a two-dimensional array in which most of the elements are zero or, more generally, do not
 contribute to the significant properties of the matrix. Sparse matrices are commonly encountered in various
 scientific and engineering applications, particularly in areas like optimization, machine learning, and graph
 theory.

**5-Sparse Matrix to 3 tuple**

   ```text
    void sparse_3tuple(int a[][10],int c[][3],int m, int n)
      {
          int i,j,k,t;
          k=1;
          for(i=0;i<m;i++)
          for(j=0;j<n;j++){
              if(a[i][j]!=0)
              {
                  c[k][0]=i;
                  c[k][1]=j;
                  c[k][2]=a[i][j];
                  k++;
              }
          }
          c[0][0]=m;
          c[0][1]=n;
          c[0][2]=k-1;
          printf("\nSparse to 3-tuple conversion\n");
          printf("%d\t%d\t%d\t\n",c[0][0],c[0][1],c[0][2]);
          for(t=1;t<=c[0][2];t++)
          printf("%d\t%d\t%d\t\n",c[t][0],c[t][1],c[t][2]);
      }

   ```

**6-Creation of Sparse Matrix**

   ```text
     void createsparse(int b[][3],int m)
      {
          int i,x;
          printf("\nenter no. of rows, columns\n");
          scanf("%d%d",&b[0][0],&b[0][1]);
          b[0][2]=m;
          printf("\nenter row no. column no. and value at that place\n");
          for(x=1;x<=m;x++)
          scanf("%d%d%d",&b[x][0],&b[x][1],&b[x][2]);
      }
   ```
**7-Display of Sparse Matrix**

   ```text
     void display(int b[][3],int m)
      {
          int i;
          printf("\nsparse matrix representation is\n");
          for(i=0;i<=m;i++)
          printf("%d\t%d\t%d\t\n",b[i][0],b[i][1],b[i][2]);
      }

   ```
**8-Display of Sparse Matrix to 3 tuple**

   ```text
    void tuple_sparse(int a[][10],int b[][3],int m)
    {
        int i,j,k;
        k=1;
        for(i=0;i<b[0][0];i++)
        for(j=0;j<b[0][1];j++)
        {
            if(b[k][0]==i&&b[k][1]==j&&k<=m)
            {
                a[i][j]=b[k][2];
                k++;
            }
            else
                a[i][j]=0;
        }
        printf("\nconversion is\n");
        for(i=0;i<b[0][0];i++)
        {
            printf("\n");
            for(j=0;j<b[0][1];j++)
            printf("%d\t",a[i][j]);
        }
    }

   ```

### Conclusion
By leveraging the power of 2D arrays, you can tackle complex data challenges, optimize performance, and
develop more sophisticated applications. As you continue to explore programming and data structures, the
knowledge of 2D arrays will serve as a solid foundation for further learning and development.
=======
---
id: introduction-to-2D-Arrays
title: Matrix Algorithms
sidebar_label: Introduction to Matrix Algorithm
sidebar_position: 1
description: 'A 2D array, or two-dimensional array, is a data structure that represents a grid-like collection of elements, organized in rows and columns. Each element in a 2D array can be accessed using two indices: one for the row and one for the column.'
tags: [basic-dsa, data-structures, Matrix Algorithm , Sparse Matrix]
---

### Introduction
A 2D array, also known as a two-dimensional array, is a collection of elements arranged in a grid format
consisting of rows and columns. This structure allows for the representation of data in a tabular manner
making it particularly useful for applications that require systematic organization and manipulation of data.

### Structure and Syntax
A 2D array can be visualized as a matrix, where each element is accessed via a pair of indices: the first
index denotes the row, and the second index denotes the column. For example, in a 2D array defined as **array[i][j]**, i refers to the row number and j refers to the column number.
 example:
    - int array[3][4];

### Characteristics
 - **Fixed Size**: In many programming languages, the size of a 2D array is fixed upon creation, meaning that the number of rows and columns cannot be changed dynamically.

 - **Homogeneous Elements**: All elements in a 2D array are typically of the same data type (e.g., integers, floats), which allows for efficient storage and access.

 - **Memory Layout**: In C , 2D arrays are often stored in contiguous memory locations, which can enhance performance due to better cache locality.

### Code

**1-Creation**

   ```text
    void create(int a[][10],int m,int n)
    {
        int i,j;
        for(i=0;i<m;i++)
        for(j=0;j<n;j++)
        {
            printf("\nEnter no. in row=%d column=%d\n",i,j);
            scanf("%d",&a[i][j]);
        }
    }

   ```
**2-Display**

   ```text
    void display(int a[][10],int m,int n)
    {
        int i,j;
        printf("\nArray is_\n");
        for(i=0;i<m;i++)
        {
            printf("\n");
            for(j=0;j<n;j++)
            printf("%d\t",a[i][j]);
        }
    }

   ```

**3-Addition of two 2D arrays**

   ```text
    void add(int a[][10],int b[][10],int m,int n)
    {
        int i,j,c[10][10];
        for(i=0;i<m;i++)
        for(j=0;j<n;j++)
        c[i][j]=a[i][j]+b[i][j];
        printf("\nAddintion of these_\n");
        display(c,m,n);
    }

   ```
**4-Subtraction of two 2D arrays**

   ```text
     void sub(int a[][10],int b[][10],int m,int n)
      {
          int i,j,c[10][10];
          for(i=0;i<m;i++)
          for(j=0;j<n;j++)
          c[i][j]=a[i][j]-b[i][j];
          printf("\nSubtraction of these_\n");
          display(c,m,n);
      }
   ```
### Sparse Matrix
 A sparse matrix is a two-dimensional array in which most of the elements are zero or, more generally, do not
 contribute to the significant properties of the matrix. Sparse matrices are commonly encountered in various
 scientific and engineering applications, particularly in areas like optimization, machine learning, and graph
 theory.

**5-Sparse Matrix to 3 tuple**

   ```text
    void sparse_3tuple(int a[][10],int c[][3],int m, int n)
      {
          int i,j,k,t;
          k=1;
          for(i=0;i<m;i++)
          for(j=0;j<n;j++){
              if(a[i][j]!=0)
              {
                  c[k][0]=i;
                  c[k][1]=j;
                  c[k][2]=a[i][j];
                  k++;
              }
          }
          c[0][0]=m;
          c[0][1]=n;
          c[0][2]=k-1;
          printf("\nSparse to 3-tuple conversion\n");
          printf("%d\t%d\t%d\t\n",c[0][0],c[0][1],c[0][2]);
          for(t=1;t<=c[0][2];t++)
          printf("%d\t%d\t%d\t\n",c[t][0],c[t][1],c[t][2]);
      }

   ```

**6-Creation of Sparse Matrix**

   ```text
     void createsparse(int b[][3],int m)
      {
          int i,x;
          printf("\nenter no. of rows, columns\n");
          scanf("%d%d",&b[0][0],&b[0][1]);
          b[0][2]=m;
          printf("\nenter row no. column no. and value at that place\n");
          for(x=1;x<=m;x++)
          scanf("%d%d%d",&b[x][0],&b[x][1],&b[x][2]);
      }
   ```
**7-Display of Sparse Matrix**

   ```text
     void display(int b[][3],int m)
      {
          int i;
          printf("\nsparse matrix representation is\n");
          for(i=0;i<=m;i++)
          printf("%d\t%d\t%d\t\n",b[i][0],b[i][1],b[i][2]);
      }

   ```
**8-Display of Sparse Matrix to 3 tuple**

   ```text
    void tuple_sparse(int a[][10],int b[][3],int m)
    {
        int i,j,k;
        k=1;
        for(i=0;i<b[0][0];i++)
        for(j=0;j<b[0][1];j++)
        {
            if(b[k][0]==i&&b[k][1]==j&&k<=m)
            {
                a[i][j]=b[k][2];
                k++;
            }
            else
                a[i][j]=0;
        }
        printf("\nconversion is\n");
        for(i=0;i<b[0][0];i++)
        {
            printf("\n");
            for(j=0;j<b[0][1];j++)
            printf("%d\t",a[i][j]);
        }
    }

   ```
