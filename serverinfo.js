const botconfig = require('./botconfig.json');
const colors = require('./colors.json');

module.exports.run = async (bot, message, args) => {
        let sEmbed = new Discord.RichEmbed()
        .setColor(colors.green)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Server Name:**", `${message.guild.name}`, true)
        .addField("**Server Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter(`SlowBot | Footer`, bot.user.displayAvatarURL);
        message.channel.send({sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "serverdesc"]
}