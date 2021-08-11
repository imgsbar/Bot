import {
  Interaction,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import {ButtonMenu} from '../../utils/ButtonMenu';
export default class TestCommand extends BaseCommand {
  constructor() {
    super('testmenu', 'test', 'Gives help about command', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const embed = new MessageEmbed()
      .setAuthor('Test menu')
      .setDescription('Will this work?');

    const button1 = new MessageButton()
      .setEmoji('✅')
      .setStyle('SUCCESS')
      .setCustomId('first-yes');

    const button2 = new MessageButton()
      .setEmoji('❌')
      .setStyle('SECONDARY')
      .setCustomId('first-no');

    const row = new MessageActionRow().addComponents(button1, button2);

    new ButtonMenu(message, embed, row, false, async interaction => {
      interaction.reply({
        content: `I received ${interaction.customId}`,
        ephemeral: true,
      });
    });
  }
}
