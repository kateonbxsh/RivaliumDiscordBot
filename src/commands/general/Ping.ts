import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../types/Command";

export default class PingCommand extends Command {
    
    override data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!");
    
    override execute(interaction: CommandInteraction) {
        return interaction.reply("Pong!");
    }
    
}
