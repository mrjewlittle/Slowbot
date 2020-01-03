var Discord = require('discord.io');
var DiscordJS = require('discord.js');
var logger = require('winston');
var auth = require('./botconfig.json');
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js');
const actions = require('./safariActions.js');
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
	if (message.content.startsWith("$") && message.member.roles.find(r => r.name === 'Slowbot'))
	{
		processCommand(message)
	}
});

const Boran = new tribe.Tribe('boran')
const Samburu = new tribe.Tribe('samburu')
let boranRole = "585576879793373207"
let samburuRole = "585576943890726912"


function processCommand(message)
{
	let fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
	let argument = splitCommand[1] //current location of user
	let direction = splitCommand[2] //direction user wants to move in
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	if (primaryCommand == "RESET")
	{
		message.channel.send("Restarting")
		bot.destroy()
	}
	else if (primaryCommand == "KILL")
	{
		message.channel.send("Restart me manually please")
		bot.destroy()
	}
	
	else if (primaryCommand == "dummy")
	{
		lockout(message.member, message)
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
			
			else if (str == "e04" && isNight == true)
			{
				message.channel.send("You cannot leave the boma at night").then(msg => {msg.delete(3000)}).catch
			}
			else if (str == "h10")
			{
				if (message.member.roles.find(r => r.name === 'Samburu'))
				{
					//create new value
					var newValue = String.fromCharCode(replacement.charCodeAt(0) + 1)
					var newCommand = str.replace(replacement, newValue)
		
					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
				}
				
				else
				{
					message.channel.send("You cannot enter the other tribe's boma")
				}
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
			
			else if (str == "i10" && isNight == true)
			{
				message.channel.send("You cannot leave the boma at night").then(msg => {msg.delete(3000)}).catch
			}
			
			else if (str == "f04")
			{
				if (message.member.roles.find(r => r.name === 'Boran'))
				{
					//create new value
					var newValue = String.fromCharCode(replacement.charCodeAt(0) + 1)
					var newCommand = str.replace(replacement, newValue)
		
					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
				}
				
				else
				{
					message.channel.send("You cannot enter the other tribe's boma")
				}
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
	
	else if (primaryCommand == "storeWood")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			if (str == "b02")
			{
				Boran.setWoodStorage(argument, message)
			}
			else if (str == "l12")
			{
				Samburu.setWoodStorage(argument, message)
			}
			
			else 
			{
				message.channel.send("You are not at your tribe's wood storage location")
			}
		}
		
		else
		{
			message.channel.send("Please include how much wood you want to store")
		}
	}
	
	else if (primaryCommand == "storeWater")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			if (str == "b03")
			{
				Boran.setWaterStorage(argument, message)
			}
			else if (str == "l11")
			{
				Samburu.setWaterStorage(argument, message)
			}
			else 
			{
				message.channel.send("You are not at your tribe's water storage location")
			}
		}
		
		else
		{
			message.channel.send("Please include how much wwater you want to store")
		}
	}
	
	else if (primaryCommand == "storeFood")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			if (str == "c02")
			{
				Boran.setFoodStorage(argument, message)
			}
			if (str == "k12")
			{
				Samburu.setFoodStorage(argument, message)
			}
			else 
			{
				message.channel.send("You are not at your tribe's water storage location")
			}
		}
		
		else
		{
			message.channel.send("Please include how much food you want to store")
		}
	}
	
	else if (primaryCommand == "wood")
	{
		var woodnumber = Samburu.getWoodStorage()
		
		message.channel.send(woodnumber)
	}
	
	else if (primaryCommand == "climbBigTree")
	{
		var lockoutTime = actions.climbTallerTree(message);
		lockout(message.member, message, lockoutTime);
	}
	
};

bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.Xg55pA.enBCN4Fj81i49WGMHl8ctOkUO6Y")


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
	if (user) 
	{
		const filterBy = user ? user.id : Client.user.id;
		//delete those messages
		messages = messages.filter(m => m.author.id === filterBy).array().slice(0, 100);
	}
	message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	})
	}
}

function lockout(user, message, lockoutTime)
{
	var stuckTime = (lockoutTime / 60000)
	message.channel.send("@" + message.member.nickname + " you are now locked for " + stuckTime + " minutes and cannot move from this location")
	user.removeRole('617816630721904654')
	var interval = setTimeout (function () 
	{
            // use the message's channel (TextChannel) to send a new message
            message.channel.send("@" + message.member.nickname + " you can now move again")
            .catch(console.error); // add error handling here
			user.addRole('617816630721904654')
    }, 1 * lockoutTime); 
}

var textSched = later.parse.text('every 10 hours');
var timer2 = later.setInterval(dayNight, textSched);
var isNight = true;

function dayNight()
{
	if (isNight)
	{
		isNight = false;
		bot.channels.get("607575225902825482").send("It is now day time in the safari!")
		return;
	}
	
	else
	{
		isNight = true;
		nightTimeShutdown();
		backToCamp();
		bot.channels.get("607575225902825482").send("It is now night time in the safari!")
		//bot.channels.get("608908853731524608").send("It is now night time in the safari!")
		//bot.channels.get("608911889749114910").send("It is now night time in the safari!")
		return;
	}
}

function backToCamp()
{
	let boranRole = "585576879793373207"
	let samburuRole = "585576943890726912"
	const slowvivor = bot.guilds.get("572085179154300930")
	const boranTribe = slowvivor.roles.get(boranRole).members.map(m => m.id)
	const samburuTribe = slowvivor.roles.get(samburuRole).members.map(m => m.id)
	
	function setPermsBoran(id)
	{
		const player = slowvivor.members.get(id)
		slowvivor.channels.get("608911889749114910").overwritePermissions(player,
		{
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true
		});
	}
	function setPermsSamburu(id)
	{
		const player = slowvivor.members.get(id)
		slowvivor.channels.get("608908853731524608").overwritePermissions(player,
		{
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true
		});
	}
		
	boranTribe.forEach(setPermsBoran)
	samburuTribe.forEach(setPermsSamburu)
}

function nightTimeShutdown()
{
	const slowvivor = bot.guilds.get("572085179154300930")
	const samburuBomaZones = slowvivor.channels.get("608038938623606803").children.map(c => c.id)
	const boranBomaZones = slowvivor.channels.get("608038915126984705").children.map(c => c.id)
	const savannaZones = slowvivor.channels.get("608038662248071206").children.map(c => c.id)
	const desertZones = slowvivor.channels.get("608907525802426368").children.map(c => c.id)
	const congoZones = slowvivor.channels.get("608905863620460564").children.map(c => c.id)
	const highlandsZones = slowvivor.channels.get("608038739121406025").children.map(c => c.id)
		
	function lock(id)
	{
		const spot = slowvivor.channels.get(id)
		spot.lockPermissions()
	}
		
	samburuBomaZones.forEach(lock)
	boranBomaZones.forEach(lock)
	savannaZones.forEach(lock)
	desertZones.forEach(lock)
	congoZones.forEach(lock)
	highlandsZones.forEach(lock)
}


//Samburu role ID = 585576943890726912
//Boran role ID = 585576879793373207
