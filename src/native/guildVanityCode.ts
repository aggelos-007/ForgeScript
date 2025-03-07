import noop from "../functions/noop"
import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$guildVanityCode",
    version: "1.0.0",
    description: "Returns the guilds vanity code",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to return its vanity code",
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
    ],
    brackets: false,
    async execute(ctx, [guild]) {
        guild ??= ctx.guild!
        const vanity = await guild?.fetchVanityData().catch(noop)
        return Return.success(vanity ? vanity.code : undefined)
    },
})
