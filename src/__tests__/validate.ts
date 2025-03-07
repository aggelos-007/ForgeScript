import { FunctionManager } from "../managers"
import { ArgType } from "../structures"

// eslint-disable-next-line no-undef
FunctionManager.load(__dirname + "/../native")

for (const [, fn] of FunctionManager["Functions"]) {
    if (fn.data.args?.length) {
        for (const arg of fn.data.args) {
            if (
                arg.pointer === undefined &&
                [ArgType.Role, ArgType.Member, ArgType.Message, ArgType.GuildEmoji, ArgType.GuildSticker].includes(
                    arg.type
                )
            ) {
                console.error(`${arg.name} requires pointer for function ${fn.name}`)
            }
        }
    }
}
