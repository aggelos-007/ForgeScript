import { ArgType, NativeFunction } from "../structures/NativeFunction"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$delete",
    version: "1.0.0",
    description: "Deletes a keyword",
    unwrap: true,
    args: [
        {
            name: "key",
            description: "The key name",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    brackets: true,
    execute(ctx, [name]) {
        return Return.success(ctx.deleteKeyword(name))
    },
})
