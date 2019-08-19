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
	let currLocation = splitCommand[1] //current location of user
	let direction = splitCommand[2] //direction user wants to move in
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	if (primaryCommand == "RESET")
	{
		message.channel.send("Restarting")
		bot.destroy()
		bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.XQPRYA.07KBOaou5W9tYj8reGoe0ob6hFI")
	}
	else if (primaryCommand == "KILL")
	{
		message.channel.send("Restart me manually please")
		bot.destroy()
	}
	else if (primaryCommand == "a1-down")
	{
		 //make a placeholder string to perform the functions on
		 var str = new String()
		 str = primaryCommand.toString();
		 
		 //grab the location of the char to increment 
		 var replacement = str.charAt(0);
		 var newValue = String.fromCharCode(replacement.charCodeAt(0) + 1)
		 
		 var newCommand = str.replace(replacement, newValue)
		 
		 message.channel.send(newCommand)
	}
	
	else if (primaryCommand == "north")
	{
			var currentLocation = message.channel.name.toString()
			var str = currentLocation.substring(0, 3)
			
			//grab the location of the char to increment 
			var replacement = str.substring(1)
					
			//check if player is on north most edge so cannot move north more
			if (replacement == "01")
			{
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(3000)}).catch
			}
					
			//check if player is south of a boma wall. Cannot walk through wall
			else if (str == "b06" || str == "c06" || str == "d06" || str == "e06" || str == "i13" || str == "j13" || str == "k13" || str == "l13")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(3000)}).catch
			}
			else if (str == "b02" || str == "c02" || str == "d02" || str == "e02" || str == "i09" || str == "j09" || str == "k09" || str == "l09")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(3000)}).catch
			}
					
			//if player can move north, then perform the move
			else
			{
				//this is done since actual integer math cannot be done. Checks if player is in row 10
				if (replacement.charAt(1) == "0")
				{
					var newCommand = currLocation.replace(replacement, "09")
					message.channel.send(newCommand)
				}
						
				//if not 10, can subtract no problem
				else
				{
					//create new value
					var firstDigit = replacement.charAt(0)
					var secondDigit = String.fromCharCode(replacement.charCodeAt(1) - 1)
					var newValue = firstDigit.concat(secondDigit)
		 
					var newCommand = str.replace(replacement, newValue)
						
					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
				}
			}
	}
	
	else if (primaryCommand == "east")
	{
			var currentLocation = message.channel.name.toString()
			var str = currentLocation.substring(0, 3)
			
			//grab the location of the char to increment 
			var replacement = str.charAt(0);
					
			//check if player is on east most edge so cannot move east more
			if (replacement == 'm')
			{
				message.reply("You cannot move in that direction from here.").then(msg => {msg.delete(3000)}).catch
			}
					
			//check if player is west of a boma wall. Cannot walk through wall (minus samburu boma entrance)
			else if (str == "h09" || str == "h11" || str == "h12" || str == "a02" || str == "a03" || str == "a04" || str == "a05")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(3000)}).catch
			}
			else if (str == "e02" || str == "e03" || str == "e05" || str == "l09" || str == "l10" || str == "l11" || str == "l12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(3000)}).catch
			}
					
			else
			{
				//create new value
				var newValue = String.fromCharCode(replacement.charCodeAt(0) + 1)
				var newCommand = str.replace(replacement, newValue)
		
				//change players permissions. IE move them
				movePlayer(message, newCommand)
				deleteMessages(message, newCommand)
			}
	}
	
	else if (primaryCommand == "south")
	{
			var currentLocation = message.channel.name.toString()
			var str = currentLocation.substring(0, 3)
							
			//grab the location of the char to increment 
			var replacement = str.substring(1)
					
			//check if player is on south most edge so cannot move south more
			if (replacement == "13")
			{
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(3000)}).catch
			}
					
			//check if player is north of a boma wall. Cannot walk through wall
			else if (str == "i08" || str == "j08" || str == "k08" || str == "l08" || str == "b01" || str == "c01" || str == "d01" || str == "e01")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(3000)}).catch
			}
			else if (str == "b05" || str == "c05" || str == "d05" || str == "e05" || str == "i12" || str == "j12" || str == "k12" || str == "l12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(3000)}).catch
			}
					
			else
			{
				//this is done since actual integer math cannot be done. Checks if player is in row 10
				if (replacement.charAt(1) == "9")
				{
					var newCommand = currentLocation.replace(replacement, "10")
					message.channel.send(newCommand)
				}
						
				//if not 10, can add no problem
				else
				{
					//create new value
					var firstDigit = replacement.charAt(0)
					var secondDigit = String.fromCharCode(replacement.charCodeAt(1) + 1)
					var newValue = firstDigit.concat(secondDigit)
		 
					var newCommand = str.replace(replacement, newValue)

					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
				}
			}
	}

	else if (primaryCommand == "west")
	{
			var currentLocation = message.channel.name.toString()
			var str = currentLocation.substring(0, 3)
			
			//grab the location of the char to increment 
			var replacement = str.charAt(0);
					
			//check if player is on west most edge so cannot move west more
			if (replacement == 'a')
			{
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(3000)}).catch
			}
					
			//check if player is east of a boma wall. Cannot walk through wall (minus boran boma entrance)
			else if (str == "f02" || str == "f03" || str == "f05" || str == "m09" || str == "m10" || str == "m11" || str == "m12")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(3000)}).catch
			}
			else if (str == "b02" || str == "b03" || str == "b04" || str == "b05" || str == "i09" || str == "i11" || str == "i12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(3000)}).catch
			}
					
			else
			{
				//create new value
				var newValue = String.fromCharCode(replacement.charCodeAt(0) - 1)
		 
				var newCommand = str.replace(replacement, newValue)

				//change players permissions. IE move them
				movePlayer(message, newCommand)
				deleteMessages(message, newCommand)
			}
	}	
	
};

bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.XQPRYA.07KBOaou5W9tYj8reGoe0ob6hFI")


function movePlayer(message, newCommand)
{
	const destination = message.guild.channels.find(c => c.name.includes(newCommand));
	
	//checks if command is run in a safari channel
	if(!destination)
	{
	}
	else
	{
	//change players permissions. IE move them
	message.channel.overwritePermissions(message.author, 
	{
		VIEW_CHANNEL: false,
		SEND_MESSAGES: false
	});

	const destination = message.guild.channels.find(c => c.name.includes(newCommand));
	destination.overwritePermissions(message.author,
	{
		VIEW_CHANNEL: true,
		SEND_MESSAGES: true
	});
	}
}

function deleteMessages(message, newCommand)
{
	//set the person who's messages need to be deleted to the person who used the command
	const user = message.author
	
	//checks if command is run in a safari channel
	const destination = message.guild.channels.find(c => c.name.includes(newCommand));
	if(!destination)
	{
	}
	
	else
	{
	//fetch those messages
	message.channel.fetchMessages({limit: 100,}).then((messages) => {
	if (user) {
	const filterBy = user ? user.id : Client.user.id;
	//delete those messages
	messages = messages.filter(m => m.author.id === filterBy).array().slice(0, 100);
	}
	message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	})
	}
}

