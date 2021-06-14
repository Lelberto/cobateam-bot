import * as Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Discord.Client();
bot.on('ready', () => console.log('Connected to Discord'));
bot.on('guildMemberAdd', async user => {
    await user.roles.add(await user.guild.roles.fetch(process.env.DEFAULT_ROLE));
    console.log(`${user.nickname} join the server`);
});

bot.on('voiceStateUpdate', async (oldState, newState) => {
    for (const voiceTextChannelId of process.env.VOICE_TEXT_CHANNELS.split(' ')) {
        const channel = await bot.channels.fetch(voiceTextChannelId) as Discord.VoiceChannel;
        if (newState.channelID !== null) {
            channel.updateOverwrite(newState.member, { SEND_MESSAGES: true });
        } else if (oldState.channelID !== null) {
            channel.permissionOverwrites.find(o => o.id === oldState.member.id)?.delete();
        }
    }
});

bot.login(process.env.TOKEN);
