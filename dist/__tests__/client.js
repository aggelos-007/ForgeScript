"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ForgeClient_1 = require("../core/ForgeClient");
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const client = new ForgeClient_1.ForgeClient({
    intents: [
        "Guilds",
        "MessageContent",
        "GuildMessages",
        "GuildMembers",
        "DirectMessages",
        "GuildInvites",
        "GuildModeration",
        "GuildMessageReactions",
    ],
    events: [
        "guildAuditLogEntryCreate",
        "ready",
        "messageCreate",
        "messageReactionAdd",
        "guildMemberAdd",
        "interactionCreate",
    ],
    useInviteSystem: true,
    prefixes: ["!"],
    restrictions: {
        userIDs: ["1096285761365610576"],
    },
    optionalGuildID: true,
    extensions: [],
});
console.log("Started");
client.commands.add({
    type: discord_js_1.Events.MessageReactionAdd,
    code: "$sendMessage[1148816643447865415;hello] $log[$guildID bro]",
});
client.commands.add({
    type: discord_js_1.Events.InteractionCreate,
    code: `$onlyIf[$isButton]
    $title[hello!]
    $interactionUpdate
    `
});
client.commands.add({
    type: discord_js_1.Events.GuildAuditLogEntryCreate,
    code: `
    $sendMessage[1148787451490476092;
        Executor Id: $auditLog[executorID]
        Target Id: $auditLog[targetID]
        Action Type: $auditLog[actionType]
        Target Type: $auditLog[targetType]
        Changes: $auditLog[changes]
        Extras: $auditLog[extra]
    ]
    `,
});
client.commands.add({
    type: discord_js_1.Events.GuildMemberAdd,
    code: "$sendMessage[1146874219515346984;<@$authorID> has joined using invite code $inviterCode by <@$inviterID>]",
});
client.commands.add({
    type: discord_js_1.Events.ClientReady,
    code: `$log[Ready on client $username[$botID]]
    $setStatus[online;Custom;hi bro;hi bro]`,
});
client.commands.add({
    name: "eval",
    aliases: ["ev"],
    type: "messageCreate",
    code: "$eval[$message;true]",
});
client.commands.add({
    name: "djs",
    type: "messageCreate",
    code: "$djsEval[$message]",
});
client.commands.add({
    type: "interactionCreate",
    code: `$onlyIf[$isAutocomplete]
    $log[Command name: $commandName | Focused option name: $focusedOptionName - $focusedOptionValue]
    $addChoice[tmr;land]
    `,
});
client.commands.load("dist/__tests__/commands");
client.applicationCommands.load("dist/__tests__/app");
// eslint-disable-next-line no-undef
client.login(process.env.TOKEN);
//# sourceMappingURL=client.js.map