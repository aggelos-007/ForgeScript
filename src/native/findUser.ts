import noop from "../functions/noop"
import { ArgType, CompiledFunction, NativeFunction, Return } from "../structures"

export const UserMentionCharRegex = /[<>@]/g

export default new NativeFunction({
    name: "$findUser",
    version: "1.0.0",
    description: "Finds a user",
    brackets: true,
    args: [
        {
            name: "query",
            description: "The id, mention or channel user to find",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "return author",
            description: "Returns the current author id if none found",
            rest: false,
            type: ArgType.Boolean,
        },
    ],
    unwrap: true,
    async execute(ctx, [q, rt]) {
        const id = q.replace(UserMentionCharRegex, "")

        if (CompiledFunction.IdRegex.test(id)) {
            const u = await ctx.client.users.fetch(id).catch(noop)
            if (u) return Return.success(u.id)
        }

        q = q.toLowerCase()

        return Return.success(
            ctx.client.users.cache.find((x) => x.id === id || x.username.toLowerCase() === q)?.id ??
                (rt ? ctx.user?.id : undefined)
        )
    },
})
