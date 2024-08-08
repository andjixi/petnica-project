"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iavl_1 = require("./iavl");
function main() {
    let tree = new iavl_1.IAVLPlus();
    tree.put(12, 32);
    tree.put(18, 36);
    tree.put(28, 36);
    tree.put(38, 36);
    tree.put(48, 36);
    tree.put(58, 36);
    tree.print();
    tree.get(18);
    tree.del(18);
    tree.get(18);
}
main();
//# sourceMappingURL=test.js.map