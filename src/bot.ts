import { Client, Collection, REST, Routes } from "discord.js";
import { config } from "./config";
import path from "path";
import fs from "fs";
import { isNewable } from "./util/Newable";
import Command from "./types/Command";
import Logger from "./util/Logger";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

const commands = new Collection<string, Command>();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith(".ts"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath).default;
        if (!isNewable(command)) continue; 
        let builtCommand = new command(client) as Command;
        if (!(builtCommand instanceof Command)) continue;
		commands.set(builtCommand.data.name, builtCommand);
        Logger.info("Registered command {}", builtCommand.data.name);
	}
}

if (commands.size == 0) {
	Logger.warn("No commands registered");
}

const rest = new REST().setToken(config.DISCORD_TOKEN);
(async () => {
	try {

		await rest.put(
			Routes.applicationCommands(config.DISCORD_CLIENT_ID),
			{ body: Array.from(commands.values()).map(command => command.data.toJSON()) },
		);

		Logger.success(`Successfully reloaded commands.`);
		
	} catch (error) {
		
		Logger.fatal("Error reloading commands: {}", error);
		
	}
})();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on("interactionCreate", async interaction => {
    
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    const command = commands.get(commandName);
    if (command) {
        await command.execute(interaction);
    } else {
		Logger.warn("Cannot find command {}", commandName);
	}

})

client.on("ready", async (client) => {
	
	Logger.success("Bot is ready.");
	
	(await client.guilds.fetch()).forEach(guild => {
		rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guild.id), { body: [] });
	})
	
});

client.login(config.DISCORD_TOKEN);

