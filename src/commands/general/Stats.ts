import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Command from "../../types/Command";
import Time from "../../util/Time";

export default class StatsCommand extends Command {
    
    override data = new SlashCommandBuilder()
        .setName("stats")
        .setDescription("The boring stuff.");
    
    override async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
            .addFields(
                {name: "Ping", value: `${this.client.ws.ping}ms`},
                {name: "Uptime", value: `${Time.format(this.client.uptime ?? 0)}`}
            )
        
        await interaction.reply({
            embeds: [embed]
        });
    }
    
}
