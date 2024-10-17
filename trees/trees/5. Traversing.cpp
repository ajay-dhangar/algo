#include <iostream>
#include <queue>

using namespace std;

struct Node
{
    int data;
    Node *left;
    Node *right;
};

//function for printing BT Parent->left->right
void PreOrderTraverse(Node *root)
{
    if (root == NULL)
    {
        cout << "Empty!!";
        return;
    }

    cout << root->data << " ";

    if (root->left != NULL)
        PreOrderTraverse(root->left);

    if (root->right != NULL)
        PreOrderTraverse(root->right);
}

//function for printing BT left->Parent->right
void InOrderTraverse(Node *root)
{

    if (root == NULL)
    {
        cout << "Empty!!";
        return;
    }

    if (root->left != NULL)
        InOrderTraverse(root->left);

    cout << root->data << " ";

    if (root->right != NULL)
        InOrderTraverse(root->right);
}

//function for printing BT right->left->Parent
void PostOrderTraverse(Node *root)
{

    if (root == NULL)
    {
        cout << "Empty!!";
        return;
    }

    if (root->right != NULL)
        PostOrderTraverse(root->right);

    if (root->left != NULL)
        PostOrderTraverse(root->left);

    cout << root->data << " ";
}

void LevelOrderTraverse(Node *root)
{
    if (root == NULL)
    {
        cout << "Empty!!";
        return;
    }

    //initial work
    queue<Node *> q;
    q.push(root);

    while (!q.empty())
    {
        Node *p = q.front();
        q.pop();

        cout << p->data << " ";

        if (p->left != NULL)
            q.push(p->left);

        if (p->right != NULL)
            q.push(p->right);
    }
}

int main()
{
    system("cls");
    Node *root = NULL;
    Node *first = new Node;
    Node *second = new Node;
    Node *third = new Node;
    Node *forth = new Node;
    Node *fifth = new Node;
    Node *sixth = new Node;
    Node *seventh = new Node;

    root = first;

    first->data = 10;
    first->left = second;
    first->right = third;

    second->data = 20;
    second->left = forth;
    second->right = fifth;

    third->data = 30;
    third->left = sixth;
    third->right = seventh;

    forth->data = 40;
    forth->left = NULL;
    forth->right = NULL;

    fifth->data = 50;
    fifth->left = NULL;
    fifth->right = NULL;

    sixth->data = 60;
    sixth->left = NULL;
    sixth->right = NULL;

    seventh->data = 70;
    seventh->left = NULL;
    seventh->right = NULL;

    
    //         10
    //       /   \
    //     20    30
    //   /  \   /  \
    //  40  50 60  70

    LevelOrderTraverse(root);
}