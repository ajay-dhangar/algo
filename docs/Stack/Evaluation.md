---
id: evaluation-in-stack
title: Evaluation
sidebar_label: Evaluation of Postfix and Prefix expression
description: 'Evaluation of expressions using a stack is a common technique, especially for handling mathematical expressions in postfix (Reverse Polish Notation) or infix notation.'
tags: [dsa, data-structures, Evaluation , C language]
---

### Postfix Evaluation
```text
    int Eval(int x,int y, char t)
    {
        if(t=='+')
        return(x+y);
        if(t=='-')
        return(x-y);
        if(t=='*')
        return(x*y);
        if(t=='/')
        return(x/y);
        return(0);
    }

```
```text
    //evaluation function
    void EvalPo(char postfix[])
    {
        stack*p;
        int i,t,x,y,temp;
        init(p);
        for(i=0;postfix[i]!='\0';i++)
        {
            t=postfix[i];
            if(isalnum(t))
            push(p,t-48);
            else
            {
                y=pop(p);
                x=pop(p);
                temp=Eval(x,y,t);
                push(p,temp);
            }
        }
        temp=pop(p);
        printf("\nEvaluation of postfix expression is..\n");
        printf("%d",temp);
    }
```

### Prefix Evaluation
```text
    void EvalPr(char prefix[])
    {
        stack*m;
        init(m);
        int i,t,x,y,temp;
        for(i=(strlen(prefix)-1);i>=0;i--)
        {
            t=prefix[i];
            if(isalnum(t))
            push(m,t-48);
            else
            {
                x=pop(m);
                y=pop(m);
                temp=Eval(x,y,t);
                push(m,temp);
            }
        }
        temp=pop(m);
        printf("\nEvaluation of prefix expression is...\n");
        printf("%d",temp);
    }
```

### main function
```text
    void main()
    {
        //max can be any value
        char prefix[max],postfix[max];
        printf("evaluation of expressions:\nEnter postfix expression..\n");
        gets(postfix);
        EvalPo(postfix);
        printf("\nEnter prefix expression...\n");
        gets(prefix);
        EvalPr(prefix);
    }

```