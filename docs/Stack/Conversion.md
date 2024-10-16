---
id: conversions-using-stack
title: Conversions
sidebar_label: Introduction to conversions in Infix, Postfix and Prefix
description: 'Converting between infix, postfix, and prefix notations involves understanding how operators and operands are organized.'
tags: [dsa, data-structures, Conversions , C language]
---

### Header Files

    ```text
        #include<stdio.h>
        #include<conio.h>
        #include<string.h>
        #include<ctype.h>
    ```
### Operations on Stack

**Structure of stack**

    ```text
        typedef struct stack
        {
            char a[max];
            int top;
        }stack;
    ```

**Initialise**
    ```text
        void init(stack*s)
        {
            s->top=-1;
        }   
    ```
**Pop**
    ```text
        void init(stack*s)
        {
            s->top=-1;
        }   
    ```
**Push**
    ```text
        void push(stack*s,char x)
        {
            if(!full(s))
            {
                s->top++;
                s->a[s->top]=x;
            }
            else
            printf("OVERFLOW");
        }  
    ```
**Check Full**
    ```text
        int full(stack*s)
        {
            if(s->top==max-1)
            return(1);
            else
            return(0);
        }   
    ```
**Check Empty**
    ```text
        int empty(stack*s)
        {
            if(s->top==-1)
            return(1);
            else
            return(0);
        }
    ```

**Precedence function**
    ```text
        int prec(char x)
        {
        if(x=='*'||x=='/'||x=='%')
        return(2);
        if(x=='+'||x=='-')
        return(1);
        if(x=='(')
        return(0);
        return(-1);
        }
    ```

### Infix to Postfix Conversion

```text
    void ITP(char infix[],char postfix[])
    {
        stack*n;
        init(n);
        char t,x;
        int i,j;
        j=0;
        for(i=0;infix[i]!='\0';i++)
        {
            t=infix[i];
            if(t=='(')
            push(n,'(');
            else
            if(t==')')
            {
                while((x=pop(n))!='(')
                postfix[j++]=x;
            }
            else
            if(isalnum(t))
            postfix[j++]=t;
            else{
                while(prec(t)<=prec(top(n)))
                postfix[j++]=pop(n);
                push(n,t);
            }
        }
        while(!empty(n))
        postfix[j++]=pop(n);
        postfix[j++]='\0';
        printf("\npostfix expression is...\n");
        puts(postfix);
    }

```

### Infix to Prefix Conversion
```text
    void ITPr(char infix[],char prefix[])
    {
        stack*s1,*s2;init(s1);init(s2);
        int i,j;
        char t,x;
        j=0;
        for(i=(strlen(infix)-1);i>=0;i--)
        {
            t=infix[i];
            if(isalnum(t))
            push(s1,t);
            else
            if(t==')')
            push(s2,')');
            else
            if(t=='(')
            {
                x=pop(s2);
                push(s1,x);
            }
            else
            {
                if(empty(s2))
                push(s2,t);
                else
                //if(prec(t)>=prec(s2->top))
                {
                    x=pop(s2);
                    push(s1,x);
                    push(s2,t);
                }
                //else
                //push(s2,t);
            }
        }
        while(!empty(s2))
        {
            x=pop(s2);
            push(s1,x);
        }
        while(!empty(s1))
        {
            if((x=pop(s1))!=')')
            prefix[j++]=x;
        }
        prefix[j++]='\0';
        printf("\nprefix expression is...\n");
        puts(prefix);
    }
```
### Postfix to Infix Conversion
```text
    char stack[max][20];
    int top;
    void PTI(char postfix[],char infix[])
    {
        int i,j;top=-1;
        char a[max],b[max],t;
        for(i=0;postfix[i]!='\0';i++)
        {
            t=postfix[i];
            if(isalnum(t))
            {
                a[0]=t;
                a[1]='\0';
                top++;
                strcpy(stack[top],a);
            }
            else
            {
                a[0]='(';
                a[1]='\0';
                strcat(a,stack[top-1]);
                b[0]=t;
                b[1]='\0';
                strcat(a,b);
                strcat(a,stack[top]);
                b[0]=')';
                b[1]='\0';
                strcat(a,b);
                top--;
                strcpy(stack[top],a);
            }
        }
        strcpy(infix,stack[top]);
        printf("\npostfix to infix expression is....\n");
        puts(infix);
    }
```

### Prefix to Infix Conversion
```text
    void PrTI(char prefix[],char infix[])
    {
        int i;
        char t,a[max],b[max];
        top=-1;
        for(i=(strlen(prefix)-1);i>=0;i--)
        {
            t=prefix[i];
            if(isalnum(t))
            {
                a[0]=t;
                a[1]='\0';
                top++;
                strcpy(stack[top],a);
            }
            else
            {
                a[0]='(';
                a[1]='\0';
                strcat(a,stack[top]);
                b[0]=t;
                b[1]='\0';
                strcat(a,b);
                top--;
                strcat(a,stack[top]);
                b[0]=')';
                b[1]='\0';
                strcat(a,b);
                strcpy(stack[top],a);
            }
        }
        strcpy(infix,stack[top]);
        printf("\nprefix to infix expression...\n");
        puts(infix);
    }

```

### Postfix to Prefix Conversion
```text
    void PoTPr(char postfix[],char prefix[])
    {
        int i;
        char a[max],t;
        top=-1;
        for(i=0;postfix[i]!='\0';i++)
        {
            t=postfix[i];
            if(isalnum(t))
            {
                a[0]=t;
                a[1]='\0';
                top++;
                strcpy(stack[top],a);
            }
            else
            {
                a[0]=t;
                a[1]='\0';
                strcat(a,stack[top-1]);
                strcat(a,stack[top]);
                top--;
                strcpy(stack[top],a);
            }
        }
        strcpy(prefix,stack[top]);
        printf("\npostfix to prefix expression...\n");
        puts(prefix);
    }
 
```

### Prefix to Postfix Conversion
```text
    void PrTPo(char prefix[],char postfix[])
    {
        int i;
        top=-1;
        char a[max],b[max],t;
        for(i=(strlen(prefix)-1);i>=0;i--)
        {
            t=prefix[i];
            if(isalnum(t))
            {
                a[0]=t;
                a[1]='\0';
                top++;
                strcpy(stack[top],a);
            }
            else
            {
                strcpy(a,stack[top]);
                top--;
                strcat(a,stack[top]);
                b[0]=t;
                b[1]='\0';
                strcat(a,b);
                strcpy(stack[top],a);
            }
        }
        strcpy(postfix,stack[top]);
        printf("\nprefix to postfix expression is...\n");
        puts(postfix);
    }
```
