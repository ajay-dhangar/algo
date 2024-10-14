#include <iostream>
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

//function for inserting element in BST
Node *Insert(int element, Node *root)
{
    Node *ptr = NULL;
    if (root == NULL)
    {
        ptr = new Node;
        ptr->data = element;
        ptr->left = ptr->right = NULL;

        return ptr;
    }

    if (element < root->data)
        root->left = Insert(element, root->left);
    else if (element > root->data)
        root->right = Insert(element, root->right);

    return root;
}

int main()
{
    system("cls");
    Node *root = NULL;
    root = Insert(20, root);
    root = Insert(11, root);
    root = Insert(30, root);
    root = Insert(5, root);
    root = Insert(6, root);
    root = Insert(25, root);
    root = Insert(35, root);
    root = Insert(35, root);
    //it ignores duplicate elements automatically

    //smaller elements on left and larger on right
    //
    //         20
    //       /   \
    //     11    30
    //   /      /  \
    //  5     25   35
    //   \
    //    6

    display(root);
}