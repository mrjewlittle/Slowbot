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

bot.login("NTg5MTMxNzI2NzE5MDI1MTgy.Xh_AVQ.FZEB69c0iC-WtDBXNDmd328M_DU")

//Tribes
const Boran = new tribe.Tribe('boran')
const Samburu = new tribe.Tribe('samburu')
const Merge = new tribe.Tribe('merge')

let mergeRole = "585577026291761192"
let boranRole = "585576879793373207"
let samburuRole = "585576943890726912"
var boranIdolFound = false;
var samburuIdolFound = false;

//Player variables


function processCommand(message)
{
	let fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
	let argument = splitCommand[1] //current location of user
	let direction = splitCommand[2] //direction user wants to move in
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	var currentLocation = message.channel.name.toString()
	var str = currentLocation.substring(0, 3)
	
	
/////////////////////////////////////////////////////////////////////////////// HOST COMMANDS ////////////////////////////////////////////////////////////////////	
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
		lockout(message.member, message, 6000)
	}
	
	else if (primaryCommand == "TribeDecay")
	{
		Boran.foodDecay(message)
		Boran.waterDecay(message)
		Samburu.foodDecay(message)
		Samburu.waterDecay(message)
	}
	
	
/////////////////////////////////////////////////////////////////////// MOVEMENT COMMANDS //////////////////////////////////////////////////////////////////////////////
	else if (primaryCommand == "north")
	{
			var currentLocation = message.channel.name.toString()
			var str = currentLocation.substring(0, 3)
			
			//grab the location of the char to increment 
			var replacement = str.substring(1)
					
			//check if player is on north most edge so cannot move north more
			if (replacement == "01")
			{
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(12000)}).catch
			}
					
			//check if player is south of a boma wall. Cannot walk through wall
			else if (str == "b06" || str == "c06" || str == "d06" || str == "e06" || str == "i13" || str == "j13" || str == "k13" || str == "l13")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(12000)}).catch
			}
			else if (str == "b02" || str == "c02" || str == "d02" || str == "e02" || str == "i09" || str == "j09" || str == "k09" || str == "l09")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(12000)}).catch
			}
			
			//make sure player can't walk into challenge square
			else if (str == "g08")
			{
				message.channel.send("That crosses into the other tribe's tribal territory. Production says you shouldn't do that").then(msg => {msg.delete(12000)}).catch
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
				message.reply("You cannot move in that direction from here.").then(msg => {msg.delete(12000)}).catch
			}
					
			//check if player is west of a boma wall. Cannot walk through wall (minus samburu boma entrance)
			else if (str == "h09" || str == "h11" || str == "h12" || str == "a02" || str == "a03" || str == "a04" || str == "a05")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(12000)}).catch
			}
			else if (str == "e02" || str == "e03" || str == "e05" || str == "l09" || str == "l10" || str == "l11" || str == "l12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(12000)}).catch
			}
			
			//checks tribal lines
			else if (str == "l01" || str == "k02" || str == "j03" || str == "i04" || str == "h05" || str == "g06" || str == "f07" || str == "f08" || str == "e09" || str == "d10" || str == "c11" || str == "b12" || str == "a13")
			{
				message.channel.send("That crosses into the other tribe's tribal territory. Production says you shouldn't do that").then(msg => {msg.delete(12000)}).catch
			}
			
			else if (str == "e04" && isNight == true)
			{
				message.channel.send("You cannot leave the boma at night").then(msg => {msg.delete(12000)}).catch
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
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(12000)}).catch
			}
					
			//check if player is north of a boma wall. Cannot walk through wall
			else if (str == "i08" || str == "j08" || str == "k08" || str == "l08" || str == "b01" || str == "c01" || str == "d01" || str == "e01")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(12000)}).catch
			}
			
			
			//make sure player can't walk into challenge square
			else if (str == "g06")
			{
				message.channel.send("That crosses into the other tribe's tribal territory. Production says you shouldn't do that").then(msg => {msg.delete(12000)}).catch
			}
			
			else if (str == "b05" || str == "c05" || str == "d05" || str == "e05" || str == "i12" || str == "j12" || str == "k12" || str == "l12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(12000)}).catch
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
				message.channel.send("You cannot move in that direction from here.").then(msg => {msg.delete(12000)}).catch
			}
					
			//check if player is east of a boma wall. Cannot walk through wall (minus boran boma entrance)
			else if (str == "f02" || str == "f03" || str == "f05" || str == "m09" || str == "m10" || str == "m11" || str == "m12")
			{
				message.channel.send("You cannot walk that direction. A boma wall blocks your path").then(msg => {msg.delete(12000)}).catch
			}
			else if (str == "b02" || str == "b03" || str == "b04" || str == "b05" || str == "i09" || str == "i11" || str == "i12")
			{
				message.channel.send("You cannot leave the boma this way").then(msg => {msg.delete(12000)}).catch
			}
			
			//checks tribal line crossing
			else if (str == "b13" || str == "c12" || str == "d11" || str == "e10" || str == "f09" || str == "g08" || str == "h07" || str == "h06" || str == "i05" || str == "j04" || str == "k03" || str == "l02" || str == "m01")
			{
				message.channel.send("That crosses into the other tribe's tribal territory. Production says you shouldn't do that").then(msg => {msg.delete(12000)}).catch
			}
			
			else if (str == "i10" && isNight == true)
			{
				message.channel.send("You cannot leave the boma at night").then(msg => {msg.delete(12000)}).catch
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
	
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////// IDOL COMMANDS //////////////////////////////////////////////////////////////////////////////////////////////
	else if (primaryCommand == "reachIntoFire")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (str == "j10")
		{
			if (Samburu.getFireLevel() == 0 && !samburuIdolFound)
			{
				message.author.send("You pick your way through the ashes. Why? You're not quite sure until.... What is that? Something is actually under the ashes in the dirt? You wrap your hand around it and pull it out and dust it off. Hold on a second, you recognize what this is.")
				message.author.send("It is a map tube that contains something. IT IS THE HIDDEN IMMUNITY IDOL!! CONGRATULATIONS")
				message.author.send("insert picture of idol here")
				samburuIdolFound = true;
			}
			
			else if (Samburu.getFireLevel() == 0 && samburuIdolFound)
			{
				message.author.send("You pick your way through the ashes. Why? You're not quite sure until.... What is that? Something is actually under the ashes in the dirt? You wrap your hand around it and pull it out and dust it off. Hold on a second, you recognize what this is.")
				message.author.send("It seems to just be an empty map tube. Was something here before?")
			}
			
			else if (Samburu.getFireLevel() != 0)
			{
				message.channel.send("What in the hell do you think you're doing?! The fire is still raging and you burned your hand. Congrats dingus").then(msg => {msg.delete(12000)}).catch
				lockout(message.member, message, 1800000)
			}
		}
		
		else if (str == "d04")
		{
			if (Boran.getFireLevel() == 0)
			{
				message.author.send("You pick through the ashes of the fire. All that is left are burnt logs and ash")
			}
			
			else
			{
				message.channel.send("What in the hell do you think you're doing?! The fire is still raging and you burned your hand. Congrats dingus").then(msg => {msg.delete(12000)}).catch
				lockout(message.member, message, 1800000)
			}
		}
	}
	
	else if (primaryCommand == "reachIntoWaterTank")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (str == "b03")
		{
			if (Boran.getWaterLevel() == 0 && !boranIdolFound)
			{
				message.author.send("You can see all the way to the bottom of the tank now that all the water is drained. Wait, what is that glint? Something appears to be riveted to the side of the tank at the bottom. Now that you will not contaminate your water. You jump in and peer into what looks like a map tube" )
				message.author.send("There is something inside. IT IS THE HIDDEN IMMUNITY IDOL!! CONGRATULATIONS")
				message.author.send("insert picture of idol here")
				boranIdolFound = true;
			}
			
			else if (Samburu.getFireLevel() == 0 && boranIdolFound)
			{
				message.author.send("You can see all the way to the bottom of the tank now that all the water is drained. Wait, what is that glint? Something appears to be riveted to the side of the tank at the bottom. Now that you will not contaminate your water. You jump in and peer into what looks like a map tube")
				message.author.send("It seems to just be an empty map tube. Was something here before?")
			}
			
			else
			{
				message.author.send("You peer over the edge of the tank. There is still water in there. You can't really see anything with the way the light reflects")
			}
		}
		
		else if (str == "l11")
		{
			if (Samburu.getWaterLevel == 0)
			{
				message.author.send("You peer over the edge of the tank. You see that it is completely empty. You better refill that thing and quick")
			}
			
			else
			{
				message.author.send("You peer over the edge of the tank. There is still water in there. You can't really see anything with the way the light reflects")
			}
		}
	}
	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////// COMMON PLAYER ACTIONS //////////////////////////////////////////////////////////////////////////////////////////////
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
				message.channel.send("You are not at your tribe's wood storage location").then(msg => {msg.delete(12000)}).catch
			}
		}
		
		else
		{
			message.channel.send("Please include how much wood you want to store").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "boilWater")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			if (str == "d04")
			{
				Boran.setWaterStorage(argument, message)
			}
			else if (str == "j10")
			{
				Samburu.setWaterStorage(argument, message)
			}
			else 
			{
				message.channel.send("You can not boil your water here. You need to head to your fire pit").then(msg => {msg.delete(12000)}).catch
			}
		}
		
		else
		{
			message.channel.send("Please include how much wwater you want to boil").then(msg => {msg.delete(12000)}).catch
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
				message.channel.send("You are not at your tribe's food storage location").then(msg => {msg.delete(12000)}).catch
			}
		}
		
		else
		{
			message.channel.send("Please include how much food you want to store").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "checkFire")
	{
		var fireLevel = Samburu.getFireLevel()
		
		message.channel.send(fireLevel)
	}
	
	else if (primaryCommand == "stokeFire")
	{
		if (str == "j10")
		{
			Samburu.setFireLevel(8)
			message.channel.send("You stoke up the fire and now it is raging again! This should last a good amount of time").then(msg => {msg.delete(12000)}).catch
		}
		
		else if (str == "d04")
		{
			Boran.setFireLevel(8)
			message.channel.send("You stoke up the fire and now it is raging again! This should last a good amount of time").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "boilWater")
	{
		
	}
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////// RANDOM ACTIONS ///////////////////////////////////////////////////////////////
	else if (primaryCommand == "climbBigTree")
	{
		var lockoutTime = actions.climbTallerTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "whistleWithGrass")
	{
		var lockoutTime = actions.whistleWithGrass(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "watchLion")
	{
		var lockoutTime = actions.watchLion(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachLion")
	{
		var lockoutTime = actions.approachLion(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "petLion")
	{
		var lockoutTime = actions.petLion(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "hideFromLion")
	{
		var lockoutTime = actions.hideFromLion(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lookAround")
	{
		var lockoutTime = actions.lookAround(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachPride")
	{
		var lockoutTime = actions.approachPride(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digInSand")
	{
		var lockoutTime = actions.digInSand(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "drinkFromWateringHole")
	{
		var lockoutTime = actions.drinkFromWateringHole(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "imitateTheElephant")
	{
		var lockoutTime = actions.imitateTheElephant(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "throwRocksAtTree")
	{
		var lockoutTime = actions.throwRocksAtTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stickArmInBoma")
	{
		var lockoutTime = actions.stickArmInBoma(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "addSticksToBoma")
	{
		var lockoutTime = actions.addSticksToBoma(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "liftTheMiddleRock")
	{
		var lockoutTime = actions.liftTheMiddleRock(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbTheLeftTree")
	{
		var lockoutTime = actions.climbTheLeftTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbTheMiddleTree")
	{
		var lockoutTime = actions.climbTheMiddleTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "waveToAWildeBeast")
	{
		var lockoutTime = actions.waveToAWildeBeast(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "napUnderATree")
	{
		var lockoutTime = actions.napUnderATree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "kickARock")
	{
		var lockoutTime = actions.kickARock(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchTermiteMound")
	{
		var lockoutTime = actions.searchTermiteMound(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "goToTheOasisOffInTheDistance")
	{
		var lockoutTime = actions.goToTheOasisOffInTheDistance(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "throwRocksDownCliffs")
	{
		var lockoutTime = actions.throwRocksDownCliffs(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "screamOutToTheHighlands")
	{
		var lockoutTime = actions.screamOutToTheHighlands(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lickWaterOffTreeLeaves")
	{
		var lockoutTime = actions.lickWaterOffTreeLeaves(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "liftTheMiddleRock")
	{
		var lockoutTime = actions.liftTheMiddleRock(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "liftTheRockOnTheRight")
	{
		var lockoutTime = actions.liftTheRockOnTheRight(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "liftTheRockOnTheLeft")
	{
		var lockoutTime = actions.liftTheRockOnTheLeft(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "buryYourselfInSand")
	{
		var lockoutTime = actions.buryYourselfInSand(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stareAtSun")
	{
		var lockoutTime = actions.stareAtSun(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stareOutAtSavanna")
	{
		var lockoutTime = actions.stareOutAtSavanna(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digUnderBoma")
	{
		var lockoutTime = actions.digUnderBoma(message);
		lockout(message.member, message, lockoutTime);
	}
	
};





























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
	message.channel.send("@" + message.member.nickname + " you are now locked for " + stuckTime + " minutes and cannot move from this location").then(msg => {msg.delete(12000)}).catch
	user.removeRole('617816630721904654')
	var interval = setTimeout (function () 
	{
            // use the message's channel (TextChannel) to send a new message
            message.channel.send("@" + message.member.nickname + " you can now move again").then(msg => {msg.delete(12000)}).catch
			user.addRole('617816630721904654')
    }, 1 * lockoutTime); 
}

//var textSched = later.parse.text('every 10 hours');
//var timer2 = later.setInterval(dayNight, textSched);

let dayNightTimerID = setInterval(dayNight, 36000000);
let fireTimerID = setInterval(fireDecay, 3600000);
let animalTimerID = setInterval(animalAttack, 3600000);
var isNight = true;

function dayNight()
{
	if (isNight)
	{
		isNight = false;
		bot.channels.get("607575225902825482").send("It is now day time in the safari!")
		bot.channels.get("666723791380152330").send("It is now day time in the safari!")
		bot.channels.get("666723935920062489").send("It is now day time in the safari!")
		return;
	}
	
	else
	{
		isNight = true;
		nightTimeShutdown();
		backToCamp();
		bot.channels.get("607575225902825482").send("It is now night time in the safari!")
		bot.channels.get("666723791380152330").send("It is now night time in the safari!")
		bot.channels.get("666723935920062489").send("It is now night time in the safari!")
		return;
	}
}

function fireDecay()
{
	var SamburuFire = Samburu.getFireLevel()
	var BoranFire = Boran.getFireLevel()
	
	if (SamburuFire > 2)
	{
		Samburu.setFireLevel(Samburu.getFireLevel() - 1)
		bot.channels.get("608908442618560533").send("The fire has dimmed a little more")
	}
	
	else if (SamburuFire = 2)
	{
		Samburu.setFireLevel(Samburu.getFireLevel() - 1)
		bot.channels.get("608908442618560533").send("The fire is one hour away from going out")
	}
	
	else if (SamburuFire = 1)
	{
		Samburu.setFireLevel(Samburu.getFireLevel() - 1)
		bot.channels.get("608908442618560533").send("Your fire has gone out!")
	}
	
	else
	{
		bot.channels.get("608908442618560533").send("Your fire is out")
	}
		
	
	if (BoranFire > 2)
	{
		Boran.setFireLevel(Boran.getFireLevel() - 1)
		bot.channels.get("608912112470851616").send("The fire has dimmed a little more")
	}
	
	else if (BoranFire = 2)
	{
		Boran.setFireLevel(Boran.getFireLevel() - 1)
		bot.channels.get("608912112470851616").send("The fire is one hour away from going out")
	}
	
	else if (BoranFire = 1)
	{
		Boran.setFireLevel(Boran.getFireLevel() - 1)
		bot.channels.get("608912112470851616").send("Your fire has gone out!")
	}
	
	else
	{
		bot.channels.get("608912112470851616").send("Your fire is out")
	}
}

function animalAttack()
{
	if (isNight)
	{
		var SamburuFire = Samburu.getFireLevel()
		var BoranFire = Boran.getFireLevel()
		
		if (BoranFire == 0)
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (randomChance <= 10)
			{
				bot.channels.get("666723935920062489").send("A lion has gotten into your boma!!!")
				bot.channels.get("666723935920062489").send("While your tribe cowers in fear, it wreaks havoc! It destorys both your food and water supplies.")
				bot.channels.get("666723935920062489").send("The lion eventually stalks away. Upon investigation, the tribe no longer has any food or water stored")
				Boran.emptyWaterStorage(message)
				Boran.emptyFoodStorage(message)
			}
		}
		
		if (SamburuFire == 0)
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (randomChance <= 10)
			{
				bot.channels.get("666723791380152330").send("A lion has gotten into your boma!!!")
				bot.channels.get("666723791380152330").send("While your tribe cowers in fear, it wreaks havoc! It destorys both your food and water supplies.")
				bot.channels.get("666723791380152330").send("The lion eventually stalks away. Upon investigation, the tribe no longer has any food or water stored")
				Samburu.emptyWaterStorage(message)
				Samburu.emptyFoodStorage(message)
			}
		}
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
