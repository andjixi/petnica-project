"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAVLPlus = void 0;
class Node {
    constructor(key, value) {
        this.height = 1;
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class IAVLPlus {
    constructor() {
        this.root = null;
    }
    print() {
        this.printNode(this.root);
    }
    printNode(node) {
        if (node == null)
            return;
        console.log(node.key, node.value);
        this.printNode(node.left);
        this.printNode(node.right);
    }
    insertNode(node, key, value) {
        if (node === null) {
            return new Node(key, value);
        }
        if (key < node.key) {
            node.left = this.insertNode(node.left, key, value);
        }
        else if (key > node.key) {
            node.right = this.insertNode(node.right, key, value);
        }
        else {
            // Duplicate keys are not allowed, update the value instead
            node.value = value;
            return node;
        }
        // Update height and balance the tree
        this.updateNode(node);
        // Check the balance factor and perform rotations if necessary
        const balance = this.getBalance(node);
        // Left heavy
        if (balance > 1 && key < node.left.key) {
            return this.rotateRight(node);
        }
        // Right heavy
        if (balance < -1 && key > node.right.key) {
            return this.rotateLeft(node);
        }
        // Left-right heavy
        if (balance > 1 && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        // Right-left heavy
        if (balance < -1 && key < node.right.key) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
    put(key, value) {
        this.root = this.insertNode(this.root, key, value);
    }
    updateNode(node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    // Get the height of a node
    getHeight(node) {
        return node ? node.height : 0;
    }
    // Get the balance factor of a node
    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateNode(y);
        this.updateNode(x);
        return x;
    }
    // Rotate left
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateNode(x);
        this.updateNode(y);
        return y;
    }
    getNode(node, key) {
        if (node === null) {
            console.log('nema kljucaa');
            return;
        }
        if (node.key == key) {
            console.log(`vrednost je ${node.value}`);
        }
        else if (node.key > key) {
            this.getNode(node.left, key);
        }
        else {
            this.getNode(node.right, key);
        }
    }
    get(key) {
        this.getNode(this.root, key);
    }
    del(key) {
        this.root = this.deleteNode(this.root, key);
    }
    getMinValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    // Private method to delete a node and balance the tree
    deleteNode(node, key) {
        if (node === null) {
            return null;
        }
        // Perform standard BST delete
        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        }
        else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
        }
        else {
            // Node to be deleted found
            // Case 1: Node with only one child or no child
            if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            // Case 2: Node with two children
            // Get the inorder successor (smallest in the right subtree)
            const temp = this.getMinValueNode(node.right);
            node.key = temp.key;
            node.value = temp.value;
            // Delete the inorder successor
            node.right = this.deleteNode(node.right, temp.key);
        }
        // Update height and balance the tree
        this.updateNode(node);
        // Check the balance factor and perform rotations if necessary
        const balance = this.getBalance(node);
        // Left heavy
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // Left-right heavy
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        // Right heavy
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // Right-left heavy
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
}
exports.IAVLPlus = IAVLPlus;
//# sourceMappingURL=iavl.js.map