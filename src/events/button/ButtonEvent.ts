import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import {ButtonInteraction, Interaction} from 'discord.js';
import {menus} from '../../utils/ButtonMenu';
export default class ButtonEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, button: Interaction) {
    if (button instanceof ButtonInteraction) {
      const menu = menus.find(value => value.messageId === button.message.id);
      if (menu) {
        if (button.user.id !== menu.creator && menu.creatorOnly) {
          return;
        }
        menu.onClick(button);
      }
    }
  }
}
