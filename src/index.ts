import {config} from 'dotenv';
import {registerCommands, registerEvents} from './utils/registry';
import DiscordClient from './client/client';
import {Intents} from 'discord.js';
const client = new DiscordClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

config();

(async () => {
  client.prefix = process.env.prefix!;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.TOKEN);
})();
