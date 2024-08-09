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
    isLeaf(node) {
        return node.left === null && node.right == null;
    }
    printNode(node) {
        if (node == null)
            return;
        this.printNode(node.left);
        this.printNode(node.right);
    }
    insertNode(node, key, value) {
        if (node === null) {
            return new Node(key, value);
        }
        if (this.isLeaf(node)) {
            if (key < node.key) {
                let newNode = new Node(node.key, -1);
                newNode.left = new Node(key, value);
                newNode.right = new Node(node.key, node.value);
                node = newNode;
                return newNode;
            }
            else if (key > node.key) {
                let newNode = new Node(key, -1);
                newNode.left = new Node(node.key, node.value);
                newNode.right = new Node(key, value);
                node = newNode;
                return newNode;
            }
            else {
                node.value = value;
                return node;
            }
        }
        if (key < node.key) {
            node.left = this.insertNode(node.left, key, value);
        }
        else {
            node.right = this.insertNode(node.right, key, value);
        }
        this.updateNode(node);
        const balance = this.getBalance(node);
        // left heavy
        if (balance > 1 && key < node.left.key) {
            return this.rotateRight(node);
        }
        // right heavy
        if (balance < -1 && key > node.right.key) {
            return this.rotateLeft(node);
        }
        // left-right heavy
        if (balance > 1 && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        // right-left heavy
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
    getHeight(node) {
        return node ? node.height : 0;
    }
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
            console.log('no key found!');
            return;
        }
        if (this.isLeaf(node) && node.key == key) {
            if (node.value == -1) {
                console.log('no key found!');
                this.del(key);
            }
            else {
                console.log(`the value associated with the key ${key} is ${node.value}`);
            }
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
    deleteNode(node, key) {
        if (node === null) {
            return null;
        }
        if (this.isLeaf(node) && node.key != key) {
            return null;
        }
        if (this.isLeaf(node) && node.key == key) {
            // node with only one child or no child
            if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            // node with two children
            const temp = this.getMinValueNode(node.right);
            node.key = temp.key;
            node.value = temp.value;
            node.right = this.deleteNode(node.right, temp.key);
        }
        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        }
        else {
            node.right = this.deleteNode(node.right, key);
        }
        this.updateNode(node);
        const balance = this.getBalance(node);
        // left heavy
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // left-right heavy
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        // right heavy
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // right-left heavy
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
}
exports.IAVLPlus = IAVLPlus;
//# sourceMappingURL=iavl.js.map