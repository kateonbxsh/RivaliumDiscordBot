"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Newable_1 = require("./util/Newable");
const Command_1 = __importDefault(require("./types/Command"));
const Logger_1 = __importDefault(require("./util/Logger"));
const client = new discord_js_1.Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});
const commands = new discord_js_1.Collection();
const foldersPath = path_1.default.join(__dirname, 'commands');
const commandFolders = fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path_1.default.join(foldersPath, folder);
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith(".ts"));
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const command = require(filePath).default;
        if (!(0, Newable_1.isNewable)(command))
            continue;
        let builtCommand = new command();
        if (!(builtCommand instanceof Command_1.default))
            continue;
        commands.set(builtCommand.data.name, builtCommand);
        Logger_1.default.info("Registered command {}", builtCommand.data.name);
    }
}
if (commands.size == 0) {
    Logger_1.default.warn("No commands registered");
}
const eventsPath = path_1.default.join(__dirname, 'events');
const eventFiles = fs_1.default.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path_1.default.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    const command = commands.get(commandName);
    if (command) {
        command.execute(interaction);
    }
    else {
        Logger_1.default.warn("Cannot find command {}", commandName);
    }
});
client.on("ready", (client) => {
    Logger_1.default.success("Bot is ready.");
});
client.login(config_1.config.DISCORD_TOKEN);
