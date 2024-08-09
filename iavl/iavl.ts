
type tip = string

class Node {
    key: tip
    value: number
    left?: Node
    right?: Node
    height: number = 1

    constructor(key: tip, value: number) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
    }
}

export class IAVLPlus {

    root?: Node

    constructor() {
        this.root = null
    }

    print() {
        this.printNode(this.root)
    }

    private isLeaf(node: Node) {
        return node.left === null && node.right == null
    } 

    printNode(node: Node) {
        if(node == null)
            return

        this.printNode(node.left)
        this.printNode(node.right)
    }
    
    private insertNode(node: Node | null, key: tip, value: number): Node {
        if (node === null) {
            return new Node(key, value)
        }

        if (this.isLeaf(node)) {
            if (key < node.key) {
                let newNode = new Node(node.key, -1)
                newNode.left = new Node(key, value)
                newNode.right = new Node(node.key, node.value)

                node = newNode
                return newNode
            }
            else if(key > node.key) {
                let newNode = new Node(key, -1)
                newNode.left = new Node(node.key, node.value)
                newNode.right = new Node(key, value)

                node = newNode

                return newNode
            }
            else {
                node.value = value
                return node
            }
        }

        if (key < node.key) {
            node.left = this.insertNode(node.left, key, value)
        } else {
            node.right = this.insertNode(node.right, key, value)
        }
        this.updateNode(node)
        const balance = this.getBalance(node)

        // left heavy
        if (balance > 1 && key < (node.left as Node).key) {
            return this.rotateRight(node)
        }

        // right heavy
        if (balance < -1 && key > (node.right as Node).key) {
            return this.rotateLeft(node)
        }

        // left-right heavy
        if (balance > 1 && key > (node.left as Node).key) {
            node.left = this.rotateLeft(node.left as Node)
            return this.rotateRight(node)
        }

        // right-left heavy
        if (balance < -1 && key < (node.right as Node).key) {
            node.right = this.rotateRight(node.right as Node)
            return this.rotateLeft(node)
        }

        return node
    }

    put(key: tip, value: number): void {
        this.root = this.insertNode(this.root, key, value)
    }

    private updateNode(node: Node): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
    }

    private getHeight(node: Node | null): number {
        return node ? node.height : 0
    }

    private getBalance(node: Node | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
    }

    private rotateRight(y: Node): Node {
        const x = y.left as Node
        const T2 = x.right

        x.right = y
        y.left = T2

        this.updateNode(y)
        this.updateNode(x)

        return x
    }

    private rotateLeft(x: Node): Node {
        const y = x.right as Node
        const T2 = y.left

        y.left = x
        x.right = T2

        this.updateNode(x)
        this.updateNode(y)

        return y
    }

    getNode(node: Node, key: tip) {
        if(node === null) {
            console.log('no key found!')
            return
        }

        if (this.isLeaf(node) && node.key == key) {
            if (node.value == -1){
                console.log('no key found!')
                this.del(key)
            }
            else {
                console.log(`the value associated with the key ${key} is ${node.value}`)
            }
        }
        else if(node.key > key) {
            this.getNode(node.left, key)
        }
        else {
            this.getNode(node.right, key)
        }
    }

    get(key: tip) {
        this.getNode(this.root, key)
    }

    del(key: tip): void {
        this.root = this.deleteNode(this.root, key)
    }

    private getMinValueNode(node: Node): Node {
        let current = node
        while (current.left !== null) {
            current = current.left
        }
        return current
    }

    private deleteNode(node: Node | null, key: tip): Node | null {
        if (node === null) {
            return null
        }

        if (this.isLeaf(node) && node.key != key) {
            return null
        }

        if (this.isLeaf(node) && node.key == key) {
            // node with only one child or no child
            if (node.left === null) {
                return node.right
            } else if (node.right === null) {
                return node.left
            }

            // node with two children
            const temp = this.getMinValueNode(node.right)
            node.key = temp.key
            node.value = temp.value
            node.right = this.deleteNode(node.right, temp.key)
        }

        if (key < node.key) {
            node.left = this.deleteNode(node.left, key)
        } else {
            node.right = this.deleteNode(node.right, key)
        }

        this.updateNode(node)
        const balance = this.getBalance(node)

        // left heavy
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node)
        }

        // left-right heavy
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left as Node)
            return this.rotateRight(node)
        }

        // right heavy
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node)
        }

        // right-left heavy
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right as Node)
            return this.rotateLeft(node)
        }

        return node
    }
}
