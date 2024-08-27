"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../types/Command"));
class PingCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!");
    }
    execute(interaction) {
        return interaction.reply("Pong!");
    }
}
exports.default = PingCommand;
