import { CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export default abstract class Command {
    
    abstract data: SlashCommandBuilder;
    abstract execute(interaction: CommandInteraction): any;
    
}
