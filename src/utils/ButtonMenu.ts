import {
  ButtonInteraction,
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageOptions,
  MessagePayload,
} from 'discord.js';

export const menus: ButtonMenu[] = [];

/**
 *Menu system for buttons
 *
 * @export
 * @class ButtonMenu
 */
export class ButtonMenu {
  messageId: string = '';
  commandMessage: Message;
  content: any;
  buttons: MessageActionRow;
  onClick: (interaction: ButtonInteraction) => void;
  creator: string;
  creatorOnly: boolean;

  /**
   * Creates an instance of ButtonMenu.
   * @param {Message} originalMessage
   * @param {*} content
   * @param {MessageActionRow} buttons
   * @param {boolean} [creatorOnly=false]
   * @param {(interaction: ButtonInteraction) => void} onClick
   * @memberof ButtonMenu
   */
  constructor(
    originalMessage: Message,
    content: any,
    buttons: MessageActionRow,
    creatorOnly = false,
    onClick: (interaction: ButtonInteraction) => void
  ) {
    this.content = content;
    this.commandMessage = originalMessage;
    this.buttons = buttons;
    this.onClick = onClick;
    this.creator = originalMessage.author.id;
    this.creatorOnly = creatorOnly;
    menus.push(this);
    this.init();
  }

  async init() {
    if (typeof this.content == 'string') {
      const message = await this.commandMessage.channel.send({
        content: this.content,
        components: [this.buttons],
      });
      this.messageId = message.id;
    } else if (this.content instanceof MessageEmbed) {
      const message = await this.commandMessage.channel.send({
        embeds: [this.content],

        components: [this.buttons],
      });
      this.messageId = message.id;
    }
  }
}
