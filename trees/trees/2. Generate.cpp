#include <iostream>
#include <queue>

using namespace std;

struct Node
{
    int data;
    Node *left;
    Node *right;
};

//function for printing BT left->Parent->right
void display(Node *root)
{

    if (root == NULL)
    {
        cout << "Empty!!";
        return;
    }

    if (root->left != NULL)
        display(root->left);

    cout << root->data << " ";

    if (root->right != NULL)
        display(root->right);
}

//function for generating whole binary tree
void insert(Node **root)
{
    //initial work
    Node *rootNode = new Node;
    queue<Node *> q;

    cout << "Enter root Element: ";
    cin >> rootNode->data;

    if (rootNode->data == -1)
    {
        *root = NULL;
        return;
    }

    rootNode->left = NULL;
    rootNode->right = NULL;

    q.push(rootNode);
    *root = rootNode;

    //infinite loop until queue becomes empty
    while (!q.empty())
    {
        Node *p;
        p = q.front();
        q.pop();

        //for entering left child
        Node *lchild = new Node;
        cout << "Enter Left child of " << p->data << ": ";
        cin >> lchild->data;

        lchild->left = lchild->right = NULL;
        if (lchild->data != -1)
            q.push(lchild);
        else
            lchild = NULL;

        p->left = lchild;

        //for entering right child
        Node *rchild = new Node;
        cout << "Enter right child of " << p->data << ": ";
        cin >> rchild->data;

        rchild->left = rchild->right = NULL;
        if (rchild->data != -1)
            q.push(rchild);
        else
            rchild = NULL;

        p->right = rchild;
    }
}

int main()
{
    system("cls");

    //there is no general rule in binary tree to insert single node
    //so generally whole BT will be generated at once

    Node *root = NULL;

    insert(&root);

    cout << endl
         << "Binary Tree: ";
    display(root);
}