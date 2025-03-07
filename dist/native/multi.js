"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$multi",
    version: "1.0.0",
    description: "Multiplies multiple numbers",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "numbers",
            description: "Numbers to multiply",
            rest: true,
            type: structures_1.ArgType.Number,
            required: true,
        },
    ],
    execute(_, [numbers]) {
        return structures_1.Return.success(numbers.reduce((x, y) => x * y));
    },
});
//# sourceMappingURL=multi.js.map