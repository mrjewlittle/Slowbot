var Discord = require('discord.io');
var DiscordJS = require('discord.js');
var logger = require('winston');
var auth = require('./botconfig.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new DiscordJS.Client()
bot.on('ready', function (evt) 
{
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', (message) => 
{
	
	if (message.content.startsWith("!"))
	{
		processCommand(message)
	}
});

function processCommand(message)
{
	let fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	if (primaryCommand == "ping")
	{
		message.channel.send("Pong!")
	}
	
	else if (primaryCommand == "who-is-the-best")
	{
		message.channel.send("Will is the best!")
		message.channel.send("Just kidding, everyone is the best!")
	}
	
	else if (primaryCommand == "RESET")
	{
		message.channel.send("Restarting")
		bot.destroy()
		bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.XQPRYA.07KBOaou5W9tYj8reGoe0ob6hFI")
	}
	else if (primaryCommand == "KILL")
	{
		message.channel.send("Restart me manually please.")
		bot.destroy()
	}
	else if (primaryCommand == "sample-camp")
	{
		if (message.channel.id === "605958287112011796" || message.channel.id === "605958358058401824" || message.channel.id === "605958375704100864" || message.channel.id === "605958391214506020")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-north")
	{
		if (message.channel.id === "605958226542067715" || message.channel.id === "605958307395403796" || message.channel.id === "605958332133408778")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-northwest")
	{
		if (message.channel.id === "605958287112011796" || message.channel.id === "605958358058401824")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-northeast")
	{
		if (message.channel.id === "605958287112011796" || message.channel.id === "605958375704100864")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-west")
	{
		if (message.channel.id === "605958226542067715" || message.channel.id === "605958307395403796" || message.channel.id === "605958408096710656")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-east")
	{
		if (message.channel.id === "605958226542067715" || message.channel.id === "605958332133408778" || message.channel.id === "605958435892232222")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-south")
	{
		if (message.channel.id === "605958226542067715" || message.channel.id === "605958435892232222" || message.channel.id === "605958408096710656")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-southwest")
	{
		if (message.channel.id === "605958391214506020" || message.channel.id === "605958358058401824")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	else if (primaryCommand == "sample-southeast")
	{
		if (message.channel.id === "605958391214506020" || message.channel.id === "605958375704100864")
		{
			message.channel.overwritePermissions(message.author, 
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			});

			const destination = message.guild.channels.find(channel => channel.name === primaryCommand);
			destination.overwritePermissions(message.author,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			});
		}
		else
		{
			message.channel.send("You can not get there from here")
		}
	}
	
};

bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.XQPRYA.07KBOaou5W9tYj8reGoe0ob6hFI")
		
		
		
		
		
		/*
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') 
	{
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) 
		{
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			
			case 'who-is-the-best':
				bot.sendMessage({
					to: channelID,
					message: 'Will is the best!!'
				});
				bot.sendMessage({
					to: channelID,
					message: 'Just kidding, Ryan is obviously'
				});
			break;
			
			case 'RESET':
				bot.sendMessage
				({
					to: channelID,
					message: 'Resetting...'
				});
				process.exit(1)

			break;
			
			case 'sample-camp'
				
			break;
		}
				
            // Just add any case commands if you want to..
         
    }

});*/