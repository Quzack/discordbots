
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                function colourBlend(c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  var r1 = parseInt(c1.substring(1, 3), 16);
  var g1 = parseInt(c1.substring(3, 5), 16);
  var b1 = parseInt(c1.substring(5, 7), 16);
  var r2 = parseInt(c2.substring(1, 3), 16);
  var g2 = parseInt(c2.substring(3, 5), 16);
  var b2 = parseInt(c2.substring(5, 7), 16);
  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ('0' + (r || 0).toString(16)).slice(-2);
  g = ('0' + (g || 0).toString(16)).slice(-2);
  b = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}

function colourRandom() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return '#' + ('00000' + num.toString(16)).substr(-6);
}


s4d.client.login('TOKEN').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('ready', async () => {

          while(s4d.client && s4d.client.token) {
              await delay(50);
                s4d.client.user.setActivity(String('chsydev.cf | r!help'));
    await delay(Number(120)*1000);
    s4d.client.user.setActivity(String('chsydev.cf | v2.3'));
    await delay(Number(120)*1000);
    s4d.client.user.setActivity(String((['chsydev.cf | ',s4d.client.ws.ping,'ms'].join(''))));
    await delay(Number(120)*1000);

              console.log('ran')
          }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'r!help') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: '☄️ Commands ☄️',
                    color: (colourBlend('#ff6600', '#ffcc33', 1)),
                    image: { url: null },

                    description: (['😺 ⇒ `r!help fun`','\n','\n','🛠️ ⇒ `r!help admin`','\n'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'r!help fun') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: '☄️ Fun Commands ☄️',
                    color: (colourBlend('#ff6600', '#ffcc33', 1)),
                    image: { url: null },

                    description: (['`r!hug <user>` ⇒ Hugs The Mentioned User','\n','\n','`r!kill <user>` ⇒ Kills The Mentioned User','\n'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'r!help admin') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: '☄️ Admin Commands ☄️',
                    color: (colourBlend('#ff6600', '#ffcc33', 1)),
                    image: { url: null },

                    description: (['`r!ban <user>` ⇒ Bans The User.','\n','\n','`r!kick <user>` ⇒ Kicks The User','\n'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if (((s4dmessage.content) || '').startsWith('r!hug' || '')) {
    s4dmessage.channel.send(String((String(s4dmessage.mentions.members.first()) + ',')));
    s4dmessage.channel.send(
            {
                embed: {
                    title: '♥ Hugs ♥',
                    color: '#ff9966',
                    image: { url: null },

                    description: ([s4dmessage.member,' Has Given ',s4dmessage.mentions.members.first(),' A Hug!'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: null }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if (((s4dmessage.content) || '').startsWith('r!kill' || '')) {
    s4dmessage.channel.send(String((String(s4dmessage.mentions.members.first()) + ',')));
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'A Wild Murderer Has Appeared...',
                    color: '#ff0000',
                    image: { url: null },

                    description: ([s4dmessage.member,' Has Killed ',s4dmessage.mentions.members.first(),'!'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: null }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((((s4dmessage.content) || '').startsWith('r!ban' || '')) && (s4dmessage.member).hasPermission('BAN_MEMBERS')) {
    (s4dmessage.mentions.members.first()).ban();
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Success!',
                    color: (colourBlend(colourRandom(), colourRandom(), 1)),
                    image: { url: null },

                    description: ('Successfully Banned The Member ' + String(s4dmessage.mentions.members.first())),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
    (s4dmessage.mentions.members.first()).send(
            {
                embed: {
                    title: 'Oh No...',
                    color: (colourBlend(colourRandom(), colourRandom(), 1)),
                    image: { url: null },

                    description: (['You Have Been Banned From ',s4dmessage.guild,'\n','\n','Reason: undefined'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent From ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((((s4dmessage.content) || '').startsWith('r!kick' || '')) && (s4dmessage.member).hasPermission('KICK_MEMBERS')) {
    (s4dmessage.mentions.members.first()).kick();
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Success!',
                    color: (colourBlend(colourRandom(), colourRandom(), 1)),
                    image: { url: null },

                    description: ('Successfully Kicked The Member ' + String(s4dmessage.mentions.members.first())),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent To ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
    (s4dmessage.mentions.members.first()).send(
            {
                embed: {
                    title: 'Oh No...',
                    color: (colourBlend(colourRandom(), colourRandom(), 1)),
                    image: { url: null },

                    description: (['You Have Been Kicked From ',s4dmessage.guild,'\n','\n','Reason: undefined'].join('')),
                    footer: { text: ('Bot By Cheesy__#2322 • Sent From ' + String(s4dmessage.guild)) },
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/849222452256702466/850570918148440095/6727_googlegun.png' }

                }
            }
        );
  }

});

                s4d;
            