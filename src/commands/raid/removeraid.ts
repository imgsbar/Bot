import {Guild, Message} from 'discord.js';
import client from '../../client/client';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class RemoveRaid extends BaseCommand {
  constructor() {
    super('removeraid', 'raid', 'Removes bots after raid', ['purge']);
  }

  async run(
    _client: client,
    message: Message,
    _args: string[] | null
  ): Promise<void> {
    if (!message.member?.permissions.has('MANAGE_GUILD')) {
      await message.reply('You do not have permission to do this.');
      return;
    }

    const guild = message.guild;
    if (!guild) {
      await message.reply('This command can only be ran in a guild.');
      return;
    }

    const count = await this.pruneMembers(guild, 1);

    await message.reply(`Removed ${count} bots for participating in a raid.`);

    console.log(
      `${message.author.tag} (${message.author.id}) removed ${count} raid bots.`
    );
    return;
  }

  //Prune members from discord guild
  async pruneMembers(guild: Guild, days: number) {
    return await guild.members.prune({
      days,
      reason: 'Removed for participating in a raid',
    });
  }
}
