"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$arrayPop",
    version: "1.0.0",
    description: "Deletes the last element of the array and returns it",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The variable that holds the array",
            rest: false,
            required: true,
            type: structures_1.ArgType.String,
        },
    ],
    brackets: true,
    execute(ctx, [name]) {
        const arr = ctx.getEnvironmentKey(name);
        if (Array.isArray(arr))
            return structures_1.Return.success(arr.pop());
        return structures_1.Return.success();
    },
});
//# sourceMappingURL=arrayPop.js.map