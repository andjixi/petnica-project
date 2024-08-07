"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("@ethereumjs/blockchain");
const common_1 = require("@ethereumjs/common");
const evm_1 = require("@ethereumjs/evm");
const statemanager_1 = require("@ethereumjs/statemanager");
const util_1 = require("@ethereumjs/util");
const main = async () => {
    const common = new common_1.Common({ chain: common_1.Chain.Mainnet, hardfork: common_1.Hardfork.Shanghai });
    const stateManager = new statemanager_1.DefaultStateManager();
    const blockchain = await blockchain_1.Blockchain.create();
    const evm = await evm_1.EVM.create({
        common,
        stateManager,
        blockchain,
    });
    const STOP = '00';
    const ADD = '01';
    const PUSH1 = '60';
    // Note that numbers added are hex values, so '20' would be '32' as decimal e.g.
    const code = [PUSH1, '03', PUSH1, '05', ADD, STOP];
    evm.events.on('step', function (data) {
        // Note that data.stack is not immutable, i.e. it is a reference to the vm's internal stack object
        console.log(`Opcode: ${data.opcode.name}\tStack: ${data.stack}`);
    });
    const results = await evm.runCode({
        code: (0, util_1.hexToBytes)(('0x' + code.join(''))),
        gasLimit: BigInt(0xffff),
    });
    console.log(`Returned: ${(0, util_1.bytesToHex)(results.returnValue)}`);
    console.log(`gasUsed: ${results.executionGasUsed.toString()}`);
};
main();
//# sourceMappingURL=evm.js.map