import { IAVLPlus } from "./iavl"

function main(): void {
    let tree: IAVLPlus = new IAVLPlus()
    tree.put("12",32)
    tree.put("13",36)
    tree.put("11",46)
    
    tree.print()

    tree.get("13")
    tree.get("12")
    tree.get("11")
    tree.del("12")
    tree.del("13")
    tree.del("11")
    tree.print()
    tree.get("11")
    tree.get("12")
    tree.get("13")
    tree.get("12")
    tree.print()
}

main()