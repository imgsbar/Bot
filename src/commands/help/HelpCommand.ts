import {
  Interaction,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
export default class TestCommand extends BaseCommand {
  constructor() {
    super('help', 'help', 'Gives help about command', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const embed = new MessageEmbed().setTitle('Help menu');
    client.commands.forEach(value => {
      embed.addField(
        `${client.prefix}${value.getName()}`,
        `\`\`\`${value.getDescription()}\`\`\``
      );
    });

    const button = new MessageButton()
      .setLabel('Trole')
      .setStyle('LINK')
      .setURL('https://imgs.bar');

    const row = new MessageActionRow().addComponents(button);
    message.channel.send({
      embeds: [embed],
      components: [row],
    });
  }
}
