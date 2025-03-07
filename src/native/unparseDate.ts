import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$unparseDate",
    version: "1.2.0",
    description: "Unparses given date to ms",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "date",
            description: "The date to get its ms",
            type: ArgType.Date,
            rest: false,
            required: true
        }
    ],
    execute(ctx, [ date ]) {
        return Return.success(date.getTime())
    },
})