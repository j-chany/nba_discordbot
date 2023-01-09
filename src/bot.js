import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
dotenv.config();
import { getPlayer, getLiveGames } from "./functions/index.js";
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

  // test if bot is online
  if (cmd === "test") {
    msg.channel.send("BOT IS WORKING!");
  }
  // greet the server 
  if (cmd === "hi" || cmd === "hey") {
    msg.channel.send(getPlayer(msg));
  }
  // get live score for current live games
  if (cmd === "live") {
    const getGames = async () => {
      const data = await getLiveGames();
      console.log(data);
      for (const game in data) {
        msg.channel.send(
          `${game}  Score: ${data[game].score} Current Quarter: ${data[game].currentP}`
        );
      }
    };
    const result = getGames();
    console.log("RESULT: ", result);
  }


});
//make sure this line is the last line
client.login(token);
