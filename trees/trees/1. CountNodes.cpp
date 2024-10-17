#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *left;
    Node *right;
};

//function for counting nodes
int count(Node *root)
{
    if (root == NULL)
        return 0;

    return 1 + count(root->left) + count(root->right);
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

    //        10
    //       /   \
    //     20    30
    //   /  \   /  \
    //  40  50 60  70

    cout << count(root);
}