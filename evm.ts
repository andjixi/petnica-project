import { Blockchain } from '@ethereumjs/blockchain'
import { Common, Hardfork, Chain } from '@ethereumjs/common'
import { EVM } from '@ethereumjs/evm'
import { DefaultStateManager } from '@ethereumjs/statemanager'
import { bytesToHex, hexToBytes, Address } from '@ethereumjs/util'

import type { PrefixedHexString } from '@ethereumjs/util'
import { IAVLPlus } from './iavl/iavl'

const TEST_ADDRESS = Address.fromString("0x388C818CA8B9251b393131C08a736A67ccB19297")

const main = async () => {
	const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.Shanghai })
	const stateManager = new DefaultStateManager()
	const blockchain = await Blockchain.create()

	const evm = await EVM.create({
	common,
	stateManager,
	blockchain,
	})


	stateManager.modifyAccountFields(TEST_ADDRESS, { balance: BigInt("10000000000000000000") })

	const STOP = '00'
	const ADD = '01'
	const PUSH1 = '60'
	const SSTORE = '55'
	const SLOAD = '54'
	let iavlStateTree = new IAVLPlus()
	// Note that numbers added are hex values, so '20' would be '32' as decimal e.g.
	const code = [PUSH1, '03', PUSH1, '07', SSTORE, PUSH1, '03', SLOAD, STOP]

	evm.events.on('step', function (data) {
	// Note that data.stack is not immutable, i.e. it is a reference to the vm's internal stack object
	console.log(`Opcode: ${data.opcode.name}\tStack: ${data.stack}	`)

	

	if (data.opcode.name == "SSTORE") {
		iavlStateTree.put(data.stack[0].toString(), Number(data.stack[1]))
	}
	if (data.opcode.name == "SLOAD") {
		iavlStateTree.get(data.stack[0].toString())
	}

	iavlStateTree.print()

	})

	const results = await evm.runCode({
	code: hexToBytes(('0x' + code.join('')) as PrefixedHexString),
	gasLimit: BigInt(0xffff),
	to: TEST_ADDRESS
	})

	let stateRoot = await stateManager.getStateRoot()
	let stateRootHex = bytesToHex(stateRoot)

	console.log(`State root: ${stateRootHex}`)
	console.log(`Returned: ${bytesToHex(results.returnValue)}`)
	console.log(`gasUsed: ${results.executionGasUsed.toString()}`)


}

main()
