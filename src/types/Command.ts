import { Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export default abstract class Command {
    
    public constructor(protected client: Client){};
    
    abstract data: SlashCommandBuilder;
    abstract execute(interaction: CommandInteraction): any;
    
}
