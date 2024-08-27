import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, Status } from "discord.js";
import Command from "../../types/Command";
import Time from "../../util/Time";

export default class StatsCommand extends Command {
    
    override data = new SlashCommandBuilder()
        .setName("stats")
        .setDescription("The boring stuff.");
    
    override async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
            .addFields(
                {name: "Status", value: Status[this.client.ws.status], inline: true},
                {name: "Ping", value: this.client.ws.ping >= 0 ? this.client.ws.ping + "ms" : "N/A", inline: true},
                {name: "Uptime", value: `${Time.format(this.client.uptime ?? 0)}`, inline: true}
            )
            .setColor(this.client.ws.status == Status.Ready ? 'Green' : 'Red')
        
        await interaction.reply({
            embeds: [embed]
        });
    }
    
}
