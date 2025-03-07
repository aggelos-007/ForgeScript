import { NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$minSafeInteger",
    version: "1.0.6",
    description: "Returns the lowest safe integer",
    unwrap: false,
    execute() {
        return Return.success(Number.MIN_SAFE_INTEGER)
    },
})
