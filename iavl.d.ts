type tip = string;
declare class Node {
    key: tip;
    value: number;
    left?: Node;
    right?: Node;
    height: number;
    constructor(key: tip, value: number);
}
export declare class IAVLPlus {
    root?: Node;
    constructor();
    print(): void;
    private isLeaf;
    printNode(node: Node): void;
    private insertNode;
    put(key: tip, value: number): void;
    private updateNode;
    private getHeight;
    private getBalance;
    private rotateRight;
    private rotateLeft;
    getNode(node: Node, key: tip): void;
    get(key: tip): void;
    del(key: tip): void;
    private getMinValueNode;
    private deleteNode;
}
export {};
