import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
dotenv.config();
import { getPlayer } from "./functions/index.js";
const { token } = process.env;

const prefix = "/";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("Get NBA Stats", { type: "WATCHING" });
});

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const cmd = msg.content.slice(1);

  if (cmd === "test") {
    msg.channel.send("BOT IS WORKING!");
  }
  if (cmd === "hi" || cmd === "hey") {
    msg.channel.send(getPlayer(msg));
  }
});
//make sure this line is the last line
client.login(token);
