type tip = number;
declare class Node {
    key: tip;
    value: tip;
    left?: Node;
    right?: Node;
    height: tip;
    constructor(key: tip, value: tip);
}
export declare class IAVLPlus {
    root?: Node;
    constructor();
    print(): void;
    printNode(node: Node): void;
    private insertNode;
    put(key: tip, value: tip): void;
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
