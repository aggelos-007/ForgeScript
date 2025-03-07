"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voiceState_1 = require("../properties/voiceState");
const structures_1 = require("../structures");
exports.default = new structures_1.NativeFunction({
    name: "$oldState",
    version: "1.0.0",
    description: "Retrieves old data from an event whose context was a voice state instance",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "property",
            description: "The property to pull",
            rest: false,
            type: structures_1.ArgType.Enum,
            enum: voiceState_1.VoiceStateProperty,
            required: true,
        },
        {
            name: "separator",
            description: "The separator to use in case of array",
            rest: false,
            type: structures_1.ArgType.String,
        },
    ],
    execute(ctx, [prop, sep]) {
        return structures_1.Return.success(voiceState_1.VoiceStateProperties[prop](ctx.states?.voiceState?.old, sep));
    },
});
//# sourceMappingURL=oldState.js.map