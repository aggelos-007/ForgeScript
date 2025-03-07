"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$runInThread",
    description: "Runs given code in a separate thread",
    experimental: true,
    unwrap: false,
    args: [
        {
            name: "code",
            description: "The code to run",
            rest: false,
            required: true,
            type: structures_1.ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx) {
        const code = this.displayField(0);
        return structures_1.Return.success(await ctx.client.threading.run({
            code
        }));
    },
});
//# sourceMappingURL=runInThread.js.map