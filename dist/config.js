"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = __importDefault(require("./util/Logger"));
dotenv_1.default.config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    Logger_1.default.fatal("Environment variables missing.");
    process.exit(1);
}
exports.config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
};
