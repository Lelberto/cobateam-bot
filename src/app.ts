import * as Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Discord.Client();
bot.on('ready', () => console.log('Connected to Discord'));
bot.on('guildMemberAdd', async user => {
    await user.roles.add(await user.guild.roles.fetch(process.env.DEFAULT_ROLE));
    console.log(`${user.nickname} join the server`);
});

bot.login(process.env.TOKEN);
