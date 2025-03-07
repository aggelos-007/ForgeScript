import { NativeFunction } from "../structures/NativeFunction"
import { Return } from "../structures/Return"

export default new NativeFunction({
    name: "$customID",
    version: "1.0.0",
    description: "Retrieves the custom id of the interaction",
    unwrap: true,
    execute: async function (ctx) {
        return Return.success(ctx.interaction && "customId" in ctx.interaction ? ctx.interaction.customId : undefined)
    },
})
