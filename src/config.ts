import dotenv from "dotenv";
import Logger from "./util/Logger";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
	Logger.fatal("Environment variables missing.");
	process.exit(1);
}

export const config = {
	DISCORD_TOKEN,
	DISCORD_CLIENT_ID,
};
