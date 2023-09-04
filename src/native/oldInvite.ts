import { InviteProperties, InviteProperty } from "../properties/invite"
import { RoleProperties, RoleProperty } from "../properties/role"
import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$oldInvite",
    version: "1.0.3",
    description: "Retrieves old data from an event whose context was a invite instance",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "property",
            description: "The property to pull",
            rest: false,
            type: ArgType.Enum,
            enum: InviteProperty,
            required: true
        },
        {
            name: "separator",
            description: "The separator to use in case of array",
            rest: false,
            type: ArgType.String
        }
    ],
    execute(ctx, [ prop, sep ]) {
        return Return.success(
            InviteProperties[prop](ctx.states?.invite?.old, sep)
        )
    },
})