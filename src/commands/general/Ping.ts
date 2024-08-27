import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../types/Command";
import Time from "../../util/Time";

export default class PingCommand extends Command {
    
    override data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("What rhymes with ping?");
    
    override async execute(interaction: CommandInteraction) {
        const message = await interaction.reply("Pong!");
        await Time.wait(100);
        message.edit(`Pong! My current ping is \`${this.client.ws.ping >= 0 ? this.client.ws.ping + "ms" : "N/A"}\``);
    }
    
}
