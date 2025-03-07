import { ArgType, NativeFunction, Return } from "../structures"

const Formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
})

export default new NativeFunction({
    name: "$abbreviateNumber",
    version: "1.0.0",
    description: "Abbreviates given number",
    unwrap: true,
    args: [
        {
            name: "number",
            description: "The number to abbreviate",
            rest: false,
            required: true,
            type: ArgType.Number,
        },
    ],
    brackets: true,
    execute(_, [n]) {
        return Return.success(Formatter.format(n))
    },
})
