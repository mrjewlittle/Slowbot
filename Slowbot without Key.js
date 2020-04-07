var Discord = require('discord.io');
var DiscordJS = require('discord.js');
var logger = require('winston');
var auth = require('./botconfig.json');
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js');
const actions = require('./safariActions.js');
const fs = require('fs')
const players = require ('./players.json')
const tribes = require ('./tribes.json')
const time = require ('./time.json')
var path = require('path');
const readline = require('readline');
const prefix = "a."

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
	if (message.content.startsWith(prefix) && message.member.roles.find(r => r.name === 'Slowbot'))
	{
		processCommand(message)
	}
});



//Tribes
const maraamu = new tribe.Tribe('maraamu')
const rotu = new tribe.Tribe('rotu')
const soliantu = new tribe.Tribe('soliantu')
const Merge = new tribe.Tribe('merge')

let mergeRole = "608911889749114910"
let soliantuRole = "672601843305676820"
let maraamuRole = "672601844551254037"
let rotuRole = "672601844362510377"
var soliantuIdolFound = false;
var rotuIdolFound = false;
var maraamuIdolFound = false;

var maraamuFireChance = 25;
var rotuFireChance =25;

//Player variables
const Brennen = new castaway.Castaway('Brennen')
const Burded = new castaway.Castaway('Burded')
const Cara = new castaway.Castaway('Cara')
const Cass = new castaway.Castaway('Cass')
const Cow = new castaway.Castaway('Cow')
const Desert = new castaway.Castaway('Desert')
const Disc = new castaway.Castaway('Disc')
const Evelyn = new castaway.Castaway('Evelyn')
const Harvey = new castaway.Castaway('Harvey')
const Helix = new castaway.Castaway('Helix')
const Jack = new castaway.Castaway('Jack')
const Kashing = new castaway.Castaway('Kashing')
const Matt  = new castaway.Castaway('Matt ')
const Matthew = new castaway.Castaway('Matthew')
const Monophy = new castaway.Castaway('Monophy')
const Panda = new castaway.Castaway('Panda')
const Ristarte = new castaway.Castaway('Ristarte')
const Saul = new castaway.Castaway('Saul')
const Taco = new castaway.Castaway('Taco')
const Tristan = new castaway.Castaway('Tristan')
const Will = new castaway.Castaway('Will')

var dayNightDate = 25
var dayNighthour = 17
var dayNightminute = 50

var fireAnimalDate = 25
var fireAnimalHour = 20
var fireAnimalMinute = 30

var backupDate = 25
var backupHour = 20
var backupMinute = 30

var switchDayNightTime = 500000
var fireTime = 500000
var animalTime = 500000
var backupTime = 500000


Initialize()
//getTimersFunction()


//let getTimersID = setInterval(getTimersFunction, 300000);

/*function getTimersFunction()
{
	switchDayNightTime = new Date(2020, 0, 25, 17, 50, 0).getTime() - Date.now()
	fireTime = new Date(2020, 0, fireAnimalDate, fireAnimalHour, fireAnimalMinute).getTime() - Date.now()
	animalTime = new Date(2020, 0, fireAnimalDate, fireAnimalHour, fireAnimalMinute).getTime() - Date.now()
	backupTime = new Date(2020, 0, backupDate, backupHour, backupMinute).getTime() - Date.now()
}*/




function processCommand(message)
{
	let fullCommand = message.content.substr(2) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
	let argument = splitCommand[1] //current location of user
	let direction = splitCommand[2] //direction user wants to move in
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
	
	var currentLocation = message.channel.name.toString()
	var str = currentLocation.substring(0, 3)
	var player = checkPlayer(message)
	

	
	
/////////////////////////////////////////////////////////////////////////////// HOST COMMANDS ////////////////////////////////////////////////////////////////////	
	if (primaryCommand == "RESET")
	{
		var lockoutTime = actions.kicktree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "check")
	{
		message.channel.send(switchDayNightTime)
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
	
	else if (primaryCommand == "setMaraamuFireChance")
	{
		maraamuFireChance = argument
		message.channel.send("Maraamu's fire chance is now " + maraamuFireChance + "%").then(msg => {msg.delete(12000)}).catch
	}
	
	else if (primaryCommand == "setRotuFireChance")
	{
		rotuFireChance = argument
		message.channel.send("Rotu's fire chance is now " + rotuFireChance + "%").then(msg => {msg.delete(12000)}).catch
	}
	
	else if (primaryCommand == "TribeDecay")
	{
		maraamu.foodDecay(message)
		maraamu.waterDecay(message)
		rotu.foodDecay(message)
		rotu.waterDecay(message)
	}
	
	else if (primaryCommand == "RotuEatAndDrink")
	{
		if (argument)
		{
			var rotuWater = rotu.getWaterStorage()
			var waterSubtraction = rotuWater - (argument*5)
			
			rotu.setWaterStorage(waterSubtraction,message)
			message.channel.send(waterSubtraction + " water has been removed from Rotu's storage")
			
			var rotuFood = rotu.getFoodStorage()
			var foodSubtraction = rotuFood  - (argument*5)
			
			rotu.setFoodStorage(foodSubtraction,message)
			message.channel.send(foodSubtraction + " food has been removed from Rotu's storage")
		}
		
		else
		{
			message.channel.send("Please include how many tribemates are on the tribe").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "eatAndDrink")
	{
		var player = checkPlayer(message)
		if (player.waterCarried >= 5 && player.foodCarried >= 5)
		{
			message.channel.send("You have ate and drank for this challenge")
			player.setWaterCarried(-5,message)
			player.setFoodCarried(-5,message)
		}
		
		else
		{
			message.channel.send("You do not have either enough food or water to eat and drink this challenge. Please find more")
		}
	}
	
	else if (primaryCommand == "RotuWater")
	{
		rotu.hostSetWater(argument)
	}
	else if (primaryCommand == "RotuFire")
	{
		rotu.hostSetFire(argument)
	}
	else if (primaryCommand == "RotuFood")
	{
		rotu.hostSetFood(argument)
	}
	else if (primaryCommand == "MaraamuWater")
	{
		maraamu.hostSetWater(argument)
	}
	else if (primaryCommand == "MaraamuFire")
	{
		maraamu.hostSetFire(argument)
	}
	else if (primaryCommand == "MaraamuFood")
	{
		maraamu.hostSetFood(argument)
	}
	
	else if (primaryCommand == "switchDayNight")
	{
		if (isNight)
	{
		isNight = false;
		
		return;
	}
	
	else
	{
		isNight = true;
		nightTimeShutdown();
		backToCamp
		bot.channels.get("607575225902825482").send("It is now night time in the safari!")
		bot.channels.get("671145910872309770").send("It is now night time in the safari!")
		bot.channels.get("674402031594766346").send("It is now night time in the safari!")
		return;
	}
	}
	
	
	
	
/////////////////////////////////////////////////////////////////////// MOVEMENT COMMANDS //////////////////////////////////////////////////////////////////////////////
	else if (primaryCommand == "n")
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
			else if (str == "g08" || str == "b13" || str == "c12" || str == "d11" || str == "e10" || str == "f09" || str == "h06" || str == "i05" || str == "j04" || str == "k03" || str == "l02")
			{
				message.channel.send("That crosses into the other tribe's tribal territory. Production says you shouldn't do that").then(msg => {msg.delete(12000)}).catch
			}
			
			//if player can move north, then perform the move
			else
			{
				//this is done since actual integer math cannot be done. Checks if player is in row 10
				if (replacement.charAt(1) == "0")
				{
					var firstDigit = "0"
					var secondDigit = "9"
					var newValue = firstDigit.concat(secondDigit)
		 
					var newCommand = str.replace(replacement, newValue)
						
					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
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
	
	else if (primaryCommand == "e")
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
					
			//check if player is west of a boma wall. Cannot walk through wall (minus rotu boma entrance)
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
				if (message.member.roles.find(r => r.name === 'Rotu'))
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
	
	else if (primaryCommand == "s")
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
			else if (str == "g06" || str == "b12" || str == "c11" || str == "d10"|| str == "e09" || str == "f08" || str == "h05" || str == "i04" || str == "j03" || str == "k02" || str == "l01")
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
					var firstDigit = "1"
					var secondDigit = "0"
					var newValue = firstDigit.concat(secondDigit)
		 
					var newCommand = str.replace(replacement, newValue)
						
					//change players permissions. IE move them
					movePlayer(message, newCommand)
					deleteMessages(message, newCommand)
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

	else if (primaryCommand == "w")
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
					
			//check if player is east of a boma wall. Cannot walk through wall (minus maraamu boma entrance)
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
				if (message.member.roles.find(r => r.name === 'Jumanji'))
				{
					//create new value
					var newValue = String.fromCharCode(replacement.charCodeAt(0) - 1)
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
			if (rotu.getFireLevel() == 0 && !rotuIdolFound)
			{
				message.author.send("You pick your way through the ashes. Why? You're not quite sure until.... What is that? Something is actually under the ashes in the dirt? You wrap your hand around it and pull it out and dust it off. Hold on a second, you recognize what this is.")
				message.author.send("It is a map tube that contains something. IT IS THE HIDDEN IMMUNITY IDOL!! CONGRATULATIONS")
				message.author.send("insert picture of idol here")
				bot.channels.get("606270820389748738").send(message.member.nickname + "Has found the Rotu idol!")
				message.channel
				rotuIdolFound = true;
			}
			
			else if (rotu.getFireLevel() == 0 && rotuIdolFound)
			{
				message.author.send("You pick your way through the ashes. Why? You're not quite sure until.... What is that? Something is actually under the ashes in the dirt? You wrap your hand around it and pull it out and dust it off. Hold on a second, you recognize what this is.")
				message.author.send("It seems to just be an empty map tube. Was something here before?")
			}
			
			else if (rotu.getFireLevel() != 0)
			{
				message.channel.send("What in the hell do you think you're doing?! The fire is still raging and you burned your hand. Congrats dingus").then(msg => {msg.delete(12000)}).catch
				lockout(message.member, message, 1800000)
			}
		}
		
		else if (str == "d04")
		{
			if (maraamu.getFireLevel() == 0)
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
	
	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////// COMMON PLAYER ACTIONS //////////////////////////////////////////////////////////////////////////////////////////////
	else if (primaryCommand == "storeWood")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			if (str == "b02")
			{
				maraamu.setWoodStorage(argument, message)
			}
			else if (str == "l12")
			{
				rotu.setWoodStorage(argument, message)
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
		var player = checkPlayer(message)
		if (argument)
		{
			if (argument > player.getWaterCarried())
			{
				message.channel.send("You are not carrying that much water").then(msg => {msg.delete(12000)}).catch
			}
			
			else
			{
				if (str == "d04")
				{
					var removeAmount = parseInt(argument) * -1
					if ((maraamu.waterStorage * 1) + parseInt(argument) > 150)
					{
						message.channel.send("The water storage does not have enough space. Please put less into the storage container").then(msg => {msg.delete(12000)}).catch
					}
					
					message.channel.send("Added " + argument + " water to storage").then(msg => {msg.delete(12000)}).catch
					maraamu.waterStorage = (maraamu.waterStorage * 1) + parseInt(argument)
					player.setWaterCarried(removeAmount,message)
				}
				
				else if (str == "j10")
				{
					var removeAmount = parseInt(argument) * -1
					if ((rotu.waterStorage * 1) + parseInt(argument) > 150)
					{
						message.channel.send("The water storage does not have enough space. Please put less into the storage container").then(msg => {msg.delete(12000)}).catch
					}
					
					message.channel.send("Added " + argument + " water to storage").then(msg => {msg.delete(12000)}).catch
					rotu.waterStorage = (rotu.waterStorage * 1) + parseInt(argument)
					player.setWaterCarried(removeAmount,message)
				}
				else 
				{
					message.channel.send("You can not boil your water here. You need to head to your fire pit").then(msg => {msg.delete(12000)}).catch
				}
			}
		}
		
		else
		{
			message.channel.send("Please include how much wwater you want to boil as '$boilWater X'").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "storeFood")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (argument)
		{
			
			if (argument > player.getFoodCarried())
			{
				message.channel.send("You are not carrying that much food").then(msg => {msg.delete(12000)}).catch
			}
			
			else
			{
				if (str == "c02")
				{
					var removeAmount = parseInt(argument) * -1
					if ((maraamu.foodStorage * 1) + parseInt(argument) > 150)
					{
						message.channel.send("The food storage does not have enough space. Please put less into the storage container").then(msg => {msg.delete(12000)}).catch
					}
					
					message.channel.send("Added " + argument + " food to storage").then(msg => {msg.delete(12000)}).catch
					maraamu.foodStorage = (maraamu.foodStorage * 1) + parseInt(argument)
					player.setFoodCarried(removeAmount,message)
				}
				
				else if (str == "k12")
				{
					var removeAmount = parseInt(argument) * -1
					if ((rotu.foodStorage * 1) + parseInt(argument) > 150)
					{
						message.channel.send("The food storage does not have enough space. Please put less into the storage container").then(msg => {msg.delete(12000)}).catch
					}
					
					message.channel.send("Added " + argument + " food to storage").then(msg => {msg.delete(12000)}).catch
					rotu.foodStorage =(rotu.foodStorage * 1) + parseInt(argument)
					player.setFoodCarried(removeAmount,message)
				}
				
				else 
				{
					message.channel.send("You are not at your tribe's food storage location").then(msg => {msg.delete(12000)}).catch
				}
			}
		}
		
		else
		{
			message.channel.send("Please include how much food you want to store as '$storeFood X'").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "checkFireLevel")
	{
		
		if (str == "f05")
		{
			var fireLevel = rotu.getFireLevel()
			message.channel.send(fireLevel).then(msg => {msg.delete(12000)}).catch
		}
		
		if (str == "d04")
		{
			var fireLevel = maraamu.getFireLevel()
			message.channel.send(fireLevel).then(msg => {msg.delete(12000)}).catch
		}
		
	}
	
	else if (primaryCommand == "checkWater")
	{
		if (str == "b03")
		{
			message.channel.send("You have " + maraamu.getWaterStorage() + " water in your tank").then(msg => {msg.delete(12000)}).catch
		}
		
		else if (str == "l11")
		{
			message.channel.send("You have " + rotu.getWaterStorage() + " water in your tank").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "checkFood")
	{
		if (str == "c02")
		{
			message.channel.send("You have " + maraamu.getFoodStorage() + " food in your storage").then(msg => {msg.delete(12000)}).catch
		}
		
		else if (str == "k12")
		{
			message.channel.send("You have " + rotu.getFoodStorage() + " food in your storage").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "startFire")
	{
		var rotuAttempted = 0;
		var maraamuAttempted = 0;
		if (str == "j10")
		{
			if (rotu.getFireLevel() >=1)
			{
				message.channel.send("The fire is already burning, no use really in trying to start it. Maybe try to $stokeFire to bring it back up to full light").then(msg => {msg.delete(12000)}).catch
			}
				
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (rotuAttempted == 0)
			{
			if (randomChance <= rotuFireChance)
				{
					message.channel.send("You did it!! You've started a raging fire").then(msg => {msg.delete(12000)}).catch
					rotu.setFireLevel(8);
				}
				else
				{
					message.channel.send("You fail to get anything to light. You or a tribe mate will have to try again later. Try again in 3 minutes").then(msg => {msg.delete(12000)}).catch
					rotuAttempted = 1;
					setTimeout(function() 
					{
						rotuAttempted = 0;
						message.channel.send("You can now attempt to make fire again!").then(msg => {msg.delete(12000)}).catch
					}, 180000)
				}
			}
			
		}
		
		if (str == "d04")
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (maraamuAttempted == 0)
			{
				if (randomChance <= maraamuFireChance)
				{
					message.channel.send("You did it!! You've started a raging fire").then(msg => {msg.delete(12000)}).catch
					maraamu.setFireLevel(8);
				}
				else
				{
					message.channel.send("You fail to get anything to light. You or a tribe mate will have to try again later. Try again in 3 minutes").then(msg => {msg.delete(12000)}).catch
					maraamuAttempted = 1;
					setTimeout(function() 
					{
						maraamuAttempted = 0;
						message.channel.send("You can now attempt to make fire again!")
					}, 180000)
				}
			}
			
		}
	}
	
	else if (primaryCommand == "stokeFire")
	{
		if (str == "j10")
		{
			var fire = rotu.getFireLevel()
			if (fire > 1)
			{
				rotu.setFireLevel(8)
				message.channel.send("You stoke up the fire and now it is raging again! This should last a good amount of time").then(msg => {msg.delete(12000)}).catch
			}
			
			else
			{
				message.channel.send("There is not quite enough there to stoke up. Either the fire is very dim or it is already out").then(msg => {msg.delete(12000)}).catch
			}
		}
		
		else if (str == "d04")
		{
			var fire = maraamu.getFireLevel()
			if (fire > 1)
			{
				maraamu.setFireLevel(8)
				message.channel.send("You stoke up the fire and now it is raging again! This should last a good amount of time").then(msg => {msg.delete(12000)}).catch
			}
			
			else
			{
				message.channel.send("There is not quite enough there to stoke up. Either the fire is very dim or it is already out").then(msg => {msg.delete(12000)}).catch
			}
		}
	}
	
	else if (primaryCommand == "checkMyWater")
	{
		message.channel.send(player.getWaterCarried()).then(msg => {msg.delete(12000)}).catch(message)
	}
	
	else if (primaryCommand == "checkMyFood")
	{
		checkMyFood(message)
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
		if (str == "e12")
		{
			message.channel.send("You go to lay down under the tree for a few Zs. After a minute though a squirrel drops something on your head! It's a little scroll!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The scroll reads: IDOL CLUE #3 You will have to REACH for what you want. Command is 3 words")
			bot.channels.get("606270820389748738").send(message.member.nickname + "Has found a Rotu idol clue!")
		}
		
		else if (str == "h02")
		{
			message.channel.send("You dig into the termite mound for some reason, but your hand grasps something! It's a scroll!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The scroll reads: IDOL CLUE #3 You will have to REACH for what you want. Command is 3 words")
			bot.channels.get("606270820389748738").send(message.member.nickname + " Has found a Maraamu idol clue!")
		}
		
		else
		{
			var lockoutTime = actions.napUnderATree(message);
			lockout(message.member, message, lockoutTime);
		}
	}
	else if (primaryCommand == "kickARock")
	{
		var lockoutTime = actions.kickARock(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchTermiteMound")
	{
		if (str == "m12")
		{
			message.channel.send("You lift up the rock and something is inscribed underneath it!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The inscription reads: IDOL CLUE #2 To get ahead individually, you might need to leave your tribe in the PIT")
			bot.channels.get("606270820389748738").send(message.member.nickname + " Has found a Rotu idol clue!")
		}
		
		else
		{
			var lockoutTime = actions.searchTermiteMound(message);
			lockout(message.member, message, lockoutTime);
		}
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
		
		if (str == "h06")
		{
			message.channel.send("You lift up the rock and something is inscribed underneath it!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The inscription reads: IDOL CLUE #1 Fire represents your life in this game. When it goes out, maybe it actually gives you a second chance...")
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Maraamu idol clue!")
		}
		
		else if (str == "f08")
		{
			message.channel.send("You lift up the rock and something is inscribed underneath it!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The inscription reads: IDOL CLUE #1 Water gives you life in this game. But maybe when it is gone, it gives you a second chance at life...")
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Maraamu idol clue!")
		}
		
		else
		{
			var lockoutTime = actions.liftTheRockOnTheLeft(message);
			lockout(message.member, message, lockoutTime);
		}
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
	else if (primaryCommand == "chopAtWall")
	{
		var lockoutTime = actions.chopAtWall(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "drawInSand")
	{
		var lockoutTime = actions.drawInSand(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "sharpenMachete")
	{
		var lockoutTime = actions.sharpenMachete(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "layInSun")
	{
		var lockoutTime = actions.layInSun(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "kickRock")
	{
		var lockoutTime = actions.kickRock(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "chaseTumbleweed")
	{
		var lockoutTime = actions.chaseTumbleweed(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stareAtZebra")
	{
		var lockoutTime = actions.stareAtZebra(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "feedLionFruit")
	{
		var lockoutTime = actions.feedLionFruit(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "chaseLizard")
	{
		var lockoutTime = actions.chaseLizard(message);
		if (lockoutTime == 300000)
		{
			player.setFoodCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbFruitTree")
	{
		var lockoutTime = actions.climbFruitTree(message);
		if (lockoutTime == 300000)
		{
			player.setFoodCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "gatherWater")
	{
		var lockoutTime = actions.gatherWater(message);
		if (lockoutTime == 600000)
		{
			player.setWaterCarried(2 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "birdWatch")
	{
		var lockoutTime = actions.birdWatch(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digThroughElephantDung")
	{
		var lockoutTime = actions.digThroughElephantDung(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchThroughGrass")
	{
		if (str == 'f03' || str == 'h11')
		{
			message.channel.send("You have found a piece of paper hidden in a very dense group of sticks. You pull it out and read it to yourself").then(msg => {msg.delete(12000)}).catch
			message.author.send("The paper reads: This safari is massive, and clues can be found anywhere. If you have found this, you'll know that things can be even hidden in plain sight. Leave no bush unchecked and no rock unturned- you might find something very valuable in this game.")
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a safari idol clue!")
			lockout(message.member, message, 600000)
		}
			
		else
		{
			var lockoutTime = actions.searchThroughGrass(message);
			lockout(message.member, message, lockoutTime);
		}
	}
	else if (primaryCommand == "gatherNuts")
	{
		var lockoutTime = actions.gatherNuts(message);
		player.setFoodCarried(4 , message)
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "forageBushes")
	{
		var lockoutTime = actions.forageBushes(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(1 , message)
		}
		else if (lockoutTime == 600002)
		{
			player.setFoodCarried(3 , message)
		}
		else if (lockoutTime == 600003)
		{
			player.setWaterCarried(1 , message)
		}
		else if (lockoutTime == 900000)
		{
			player.setFoodCarried(8 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchEmptyBoma")
	{
		var lockoutTime = actions.searchEmptyBoma(message);
		if (lockoutTime == 900001)
		{
			player.setFoodCarried(2 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachStream")
	{
		var lockoutTime = actions.approachStream(message);
		if (lockoutTime == 300000)
		{
			player.setWaterCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "harvestWaterFromPlants")
	{
		var lockoutTime = actions.harvestWaterFromPlants(message);
		player.setWaterCarried(3 , message)
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "tryToReachCave")
	{
		var lockoutTime = actions.tryToReachCave(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "runWithGazelles")
	{
		var lockoutTime = actions.runWithGazelles(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "squakAtToucan")
	{
		var lockoutTime = actions.squakAtToucan(message);
		if (lockoutTime == 300001)
		{
			player.setFoodCarried(2 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "followGoat")
	{
		var lockoutTime = actions.followGoat(message);
		if (lockoutTime == 600001)
		{
			player.setWaterCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkBirdNest")
	{
		var lockoutTime = actions.checkBirdNest(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(2 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "swimInPond")
	{
		var lockoutTime = actions.swimInPond(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "weaveGrassBasket")
	{
		var lockoutTime = actions.weaveGrassBasket(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkForTracks")
	{
		var lockoutTime = actions.checkForTracks(message);
		if (lockoutTime == 900000)
		{
			player.setWaterCarried(3 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lookForVultures")
	{
		var lockoutTime = actions.lookForVultures(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(8 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "sniffFlowers")
	{
		var lockoutTime = actions.sniffFlowers(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "gatherFlowers")
	{
		var lockoutTime = actions.gatherFlowers(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "catchRainWater")
	{
		var lockoutTime = actions.catchRainWater(message);
		player.setWaterCarried(2 , message)
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchLeftBush")
	{
		var lockoutTime = actions.searchLeftBush(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchMiddleBush")
	{
		var lockoutTime = actions.searchMiddleBush(message);
		if (lockoutTime == 600001)
		{
			player.setWaterCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchRightBush")
	{
		var lockoutTime = actions.searchRightBush(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(1 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchLeftTree")
	{
		if (str == "a02")
		{
			message.channel.send("You dig look around the roots of the tree. Your hand grasps something! It's a scroll!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The scroll reads: IDOL CLUE #2 To get ahead individually, you might have to TANK your tribe")
			bot.channels.get("606270820389748738").send(message.member.nickname + " Has found a Maraamu idol clue!")
		}
		var lockoutTime = actions.searchLeftTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchMiddleTree")
	{
		var lockoutTime = actions.searchMiddleTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchRightTree")
	{
		var lockoutTime = actions.searchRightTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digInNorthDirt")
	{
		var lockoutTime = actions.digInNorthDirt(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digInSouthDirt")
	{
		var lockoutTime = actions.digInSouthDirt(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digInEastDirt")
	{
		var lockoutTime = actions.digInEastDirt(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digInWestDirt")
	{
		var lockoutTime = actions.digInWestDirt(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "uprootPlants")
	{
		var lockoutTime = actions.uprootPlants(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "putSandInPocket")
	{
		var lockoutTime = actions.putSandInPocket(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stickHandInHole")
	{
		var lockoutTime = actions.stickHandInHole(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(3 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pullGrass")
	{
		var lockoutTime = actions.pullGrass(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "peelTreeBark")
	{
		var lockoutTime = actions.peelTreeBark(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(2 , message)
		}
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pickUpPoop")
	{
		var lockoutTime = actions.pickUpPoop(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "standInShadow")
	{
		var lockoutTime = actions.standInShadow(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachGiraffes")
	{
		var lockoutTime = actions.approachGiraffes(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachElephants")
	{
		var lockoutTime = actions.approachElephants(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "takeABreak")
	{
		var lockoutTime = actions.takeABreak(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkShrubbery")
	{
		var lockoutTime = actions.checkShrubbery(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pickUpTreeBranch")
	{
		var lockoutTime = actions.pickUpTreeBranch(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "danceInPlain")
	{
		var lockoutTime = actions.danceInPlain(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "runUpHill")
	{
		var lockoutTime = actions.runUpHill(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stickHandInWater")
	{
		var lockoutTime = actions.stickHandInWater(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "runHandThroughGrass")
	{
		var lockoutTime = actions.runHandThroughGrass(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "tryToCatchBugs")
	{
		var lockoutTime = actions.tryToCatchBugs(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "yell")
	{
		var lockoutTime = actions.yell(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stompGrass")
	{
		var lockoutTime = actions.stompGrass(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachAardvark")
	{
		var lockoutTime = actions.approachAardvark(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "tryToStartFire")
	{
		var lockoutTime = actions.tryToStartFire(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "hideInGrass")
	{
		var lockoutTime = actions.hideInGrass(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "yawnLoudly")
	{
		var lockoutTime = actions.yawnLoudly(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stompInMud")
	{
		var lockoutTime = actions.stompInMud(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "crawlOnGround")
	{
		var lockoutTime = actions.crawlOnGround(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lookForAnimals")
	{
		var lockoutTime = actions.lookForAnimals(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pickALuckyClover")
	{
		var lockoutTime = actions.pickALuckyClover(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "cloudgaze")
	{
		var lockoutTime = actions.cloudgaze(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "huntForBugs")
	{
		var lockoutTime = actions.huntForBugs(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "rollDownTheHill")
	{
		var lockoutTime = actions.rollDownTheHill(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "goInsane")
	{
		var lockoutTime = actions.goInsane(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "breakBranch")
	{
		var lockoutTime = actions.breakBranch(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "liftRocks")
	{
		var lockoutTime = actions.liftRocks(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "performABackHandsrping")
	{
		var lockoutTime = actions.performABackHandsrping(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "tryToBeTallerThanTheGiraffe")
	{
		var lockoutTime = actions.tryToBeTallerThanTheGiraffe(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "throwRocks")
	{
		var lockoutTime = actions.throwRocks(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "dragFootThroughSand")
	{
		var lockoutTime = actions.dragFootThroughSand(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "gazeIntoHorizon")
	{
		var lockoutTime = actions.gazeIntoHorizon(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "searchForPebbles")
	{
		var lockoutTime = actions.searchForPebbles(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "hopeForRain")
	{
		var lockoutTime = actions.hopeForRain(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "makeSandAngel")
	{
		var lockoutTime = actions.makeSandAngel(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "sunbathe")
	{
		var lockoutTime = actions.sunBathe(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "collectSnow")
	{
		var lockoutTime = actions.collectSnow(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "yellAtPeople")
	{
		var lockoutTime = actions.yellAtPeople(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "eatSnow")
	{
		var lockoutTime = actions.eatSnow(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "walkOnDune")
	{
		var lockoutTime = actions.walkOnDune(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "runDownHillFast")
	{
		var lockoutTime = actions.runDownHillFast(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "approachGoats")
	{
		var lockoutTime = actions.approachGoats(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "throwBottleAtGoats")
	{
		var lockoutTime = actions.throwBottleAtGoats(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "chaseGoats")
	{
		var lockoutTime = actions.chaseGoats(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "followPrints")
	{
		var lockoutTime = actions.followPrints(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "tryToCoverPrints")
	{
		var lockoutTime = actions.tryToCoverPrints(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "walkToTheOtherShore")
	{
		var lockoutTime = actions.walkToTheOtherShore(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stareAtWater")
	{
		var lockoutTime = actions.stareAtWater(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbRightWall")
	{
		var lockoutTime = actions.climbRightWall(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "grabWallVine")
	{
		var lockoutTime = actions.grabWallVine(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "standUnderWaterfall")
	{
		var lockoutTime = actions.standUnderWaterfall(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkForMarkings")
	{
		var lockoutTime = actions.checkForMarkings(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbCliffs")
	{
		var lockoutTime = actions.climbCliffs(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "chaseBirds")
	{
		var lockoutTime = actions.chaseBirds(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "throwRockAtBirds")
	{
		var lockoutTime = actions.throwRockAtBirds(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "peerThroughWindow")
	{
		var lockoutTime = actions.peerThroughWindow(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "runHandOverWall")
	{
		var lockoutTime = actions.runHandOverWall(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "digThroughRubble")
	{
		var lockoutTime = actions.digThroughRubble(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkBasement")
	{
		var lockoutTime = actions.checkBasement(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "inspectLeaves")
	{
		var lockoutTime = actions.inspectLeaves(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "shakeBranches")
	{
		var lockoutTime = actions.shakeBranches(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lickMoss")
	{
		var lockoutTime = actions.lickMoss(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "whistle")
	{
		var lockoutTime = actions.whistle(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "walkInCircles")
	{
		var lockoutTime = actions.walkInCircles(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "lookAtBug")
	{
		var lockoutTime = actions.lookAtBug(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "brushOver")
	{
		var lockoutTime = actions.brushOver(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "checkForTreeHoles")
	{
		var lockoutTime = actions.checkForTreeHoles(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "swingOnVines")
	{
		var lockoutTime = actions.swingOnVines(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "kickTree")
	{
		var lockoutTime = actions.kickTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pokeSnake")
	{
		var lockoutTime = actions.pokeSnake(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "climbOverBranch")
	{
		var lockoutTime = actions.climbOverBranch(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "stareAtSnake")
	{
		var lockoutTime = actions.stareAtSnake(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "makeFaces")
	{
		var lockoutTime = actions.makeFaces(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pickUpSnake")
	{
		var lockoutTime = actions.pickUpSnake(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "crushPlants")
	{
		var lockoutTime = actions.crushPlants(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "crawlOnTheJungleFloor")
	{
		var lockoutTime = actions.crawlOnTheJungleFloor(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "jumpInTheAir")
	{
		var lockoutTime = actions.jumpInTheAir(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "inspectWeirdTree")
	{
		var lockoutTime = actions.inspectWeirdTree(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "chewOnFlowers")
	{
		var lockoutTime = actions.chewOnFlowers(message);
		lockout(message.member, message, lockoutTime);
	}
	else if (primaryCommand == "pickBerries")
	{
		var lockoutTime = actions.pickBerries(message);
		if (lockoutTime == 600001)
		{
			player.setFoodCarried(3 , message)
		}
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

//let dayNightTimerID = setInterval(dayNight, 36000000);
let fireTimerID = setInterval(fireDecay, 3600000);
//let animalTimerID = setInterval(animalAttack, 3600000);
let backupTimerID = setInterval(backup, 3600000);
//var isNight = true;

/*function dayNight()
{
	if (isNight)
	{
		isNight = false;
		bot.channels.get("607575225902825482").send("It is now day time in the safari!")
		bot.channels.get("671145910872309770").send("It is now day time in the safari!")
		bot.channels.get("674402031594766346").send("It is now day time in the safari!")
		return;
	}
	
	else
	{
		isNight = true;
		nightTimeShutdown();
		backToCamp();
		bot.channels.get("607575225902825482").send("It is now night time in the safari!")
		bot.channels.get("671145910872309770").send("It is now night time in the safari!")
		bot.channels.get("674402031594766346").send("It is now night time in the safari!")
		return;
	}
	
	if (dayNighthour + 10 <= 24)
	{
		dayNighthour  = dayNighthour + 10
	}
	else
	{
		dayNighthour  = dayNighthour  - 14
		dayNightDate = dayNightDate + 1
	}
	
}*/

function fireDecay()
{
	var rotuFire = rotu.getFireLevel()
	var RNewFire = rotuFire - 1
	var maraamuFire = maraamu.getFireLevel()
	var MNewFire = maraamuFire - 1
	
	if (rotuFire > 2)
	{
		rotu.setFireLevel(RNewFire)
		bot.channels.get("694213220075831369").send("The fire has dimmed a little more").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (rotuFire == 2)
	{
		rotu.setFireLevel(RNewFire)
		bot.channels.get("694213220075831369").send("The fire is one hour away from going out").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (rotuFire == 1)
	{
		rotu.setFireLevel(RNewFire)
		bot.channels.get("694213220075831369").send("Your fire has gone out!").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (rotuFire == 0)
	{
		bot.channels.get("694213220075831369").send("Your fire is out").then(msg => {msg.delete(3600000)}).catch
	}
		
	
	if (maraamuFire > 2)
	{
		maraamu.setFireLevel(MNewFire)
		bot.channels.get("608912112470851616").send("The fire has dimmed a little more").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (maraamuFire == 2)
	{
		maraamu.setFireLevel(MNewFire)
		bot.channels.get("608912112470851616").send("The fire is one hour away from going out").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (maraamuFire == 1)
	{
		maraamu.setFireLevel(MNewFire)
		bot.channels.get("608912112470851616").send("Your fire has gone out!").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (maraamuFire == 0)
	{
		bot.channels.get("608912112470851616").send("Your fire is out").then(msg => {msg.delete(3600000)}).catch
	}
	
	/*if (dayNighthour + 1 <= 24)
	{
		dayNighthour  = dayNighthour + 1
	}
	else
	{
		dayNighthour  = 0
		dayNightDate = dayNightDate + 1
	}*/
}

/*function animalAttack()
{
	if (isNight)
	{
		var rotuFire = rotu.getFireLevel()
		var maraamuFire = maraamu.getFireLevel()
		
		if (maraamuFire == 0)
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (randomChance <= 10)
			{
				bot.channels.get("674402031594766346").send("A lion has gotten into your boma!!!")
				bot.channels.get("674402031594766346").send("While your tribe cowers in fear, it wreaks havoc! It destorys both your food and water supplies.")
				bot.channels.get("674402031594766346").send("The lion eventually stalks away. Upon investigation, the tribe no longer has any food or water stored")
				maraamu.emptyWaterStorage()
				maraamu.emptyFoodStorage()
			}
		}
		
		if (rotuFire == 0)
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (randomChance <= 10)
			{
				bot.channels.get("671145910872309770").send("A lion has gotten into your boma!!!")
				bot.channels.get("671145910872309770").send("While your tribe cowers in fear, it wreaks havoc! It destorys both your food and water supplies.")
				bot.channels.get("671145910872309770").send("The lion eventually stalks away. Upon investigation, the tribe no longer has any food or water stored")
				rotu.emptyWaterStorage()
				rotu.emptyFoodStorage()
			}
		}
	}
}*/

/*function backToCamp()
{
	let mergeRole = "585577026291761192"
	let rotuRole = "671144978155831330"
	const slowvivor = bot.guilds.get("572085179154300930")
	const maraamuTribe = slowvivor.roles.get(maraamuRole).members.map(m => m.id)
	const rotuTribe = slowvivor.roles.get(rotuRole).members.map(m => m.id)
	
	function setPermsmaraamu(id)
	{
		const player = slowvivor.members.get(id)
		slowvivor.channels.get("608911889749114910").overwritePermissions(player,
		{
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true
		});
	}
	function setPermsrotu(id)
	{
		const player = slowvivor.members.get(id)
		slowvivor.channels.get("608908853731524608").overwritePermissions(player,
		{
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true
		});
	}
		
	maraamuTribe.forEach(setPermsmaraamu)
	rotuTribe.forEach(setPermsrotu)
}

function nightTimeShutdown()
{
	const slowvivor = bot.guilds.get("572085179154300930")
	const rotuBomaZones = slowvivor.channels.get("608038938623606803").children.map(c => c.id)
	const maraamuBomaZones = slowvivor.channels.get("608038915126984705").children.map(c => c.id)
	const savannaZones = slowvivor.channels.get("608038662248071206").children.map(c => c.id)
	const desertZones = slowvivor.channels.get("608907525802426368").children.map(c => c.id)
	const congoZones = slowvivor.channels.get("608905863620460564").children.map(c => c.id)
	const highlandsZones = slowvivor.channels.get("608038739121406025").children.map(c => c.id)
		
	function lock(id)
	{
		const spot = slowvivor.channels.get(id)
		spot.lockPermissions()
	}
		
	rotuBomaZones.forEach(lock)
	maraamuBomaZones.forEach(lock)
	savannaZones.forEach(lock)
	desertZones.forEach(lock)
	congoZones.forEach(lock)
	highlandsZones.forEach(lock)
}*/


function checkMyWater(message)
{
	if (message.member.roles.find(r => r.name === 'Brennen'))
	{
		message.channel.send(Brennen.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Birb'))
	{
		message.channel.send(Birb.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cara'))
	{
		message.channel.send(Cara.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cass'))
	{
		message.channel.send(Cass.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cow'))
	{
		message.channel.send(Cow.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Desert'))
	{
		message.channel.send(Desert.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Dischead'))
	{
		message.channel.send(Disc.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Evelyn'))
	{
		message.channel.send(Evelyn.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Harvey'))
	{
		message.channel.send(Harvey.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Helix'))
	{
		message.channel.send(Helix.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Jack'))
	{
		message.channel.send(Jack.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Kashing'))
	{
		message.channel.send(Kashing.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Matt'))
	{
		message.channel.send(Matt.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Matthew'))
	{
		message.channel.send(Matthew.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Monophy'))
	{
		message.channel.send(Monophy.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Panda'))
	{
		message.channel.send(Panda.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Ristarte'))
	{
		message.channel.send(Ristarte.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Saul'))
	{
		message.channel.send(Saul.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Taco'))
	{
		message.channel.send(Taco.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Tristan'))
	{
		message.channel.send(Tristan.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === '10th'))
	{
		message.channel.send(Will.getWaterCarried()).then(msg => {msg.delete(12000)}).catch
	}
}

function checkMyFood(message)
{
	if (message.member.roles.find(r => r.name === 'Brennen'))
	{
		message.channel.send(Brennen.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Birb'))
	{
		message.channel.send(Birb.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cara'))
	{
		message.channel.send(Cara.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cass'))
	{
		message.channel.send(Cass.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Cow'))
	{
		message.channel.send(Cow.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Desert'))
	{
		message.channel.send(Desert.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Dischead'))
	{
		message.channel.send(Disc.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Evelyn'))
	{
		message.channel.send(Evelyn.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Harvey'))
	{
		message.channel.send(Harvey.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Helix'))
	{
		message.channel.send(Helix.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Jack'))
	{
		message.channel.send(Jack.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Kashing'))
	{
		message.channel.send(Kashing.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Matt'))
	{
		message.channel.send(Matt.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Matthew'))
	{
		message.channel.send(Matthew.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Monophy'))
	{
		message.channel.send(Monophy.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Panda'))
	{
		message.channel.send(Panda.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Ristarte'))
	{
		message.channel.send(Ristarte.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Saul'))
	{
		message.channel.send(Saul.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Taco'))
	{
		message.channel.send(Taco.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === 'Tristan'))
	{
		message.channel.send(Tristan.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
	else if (message.member.roles.find(r => r.name === '10th'))
	{
		message.channel.send(Will.getFoodCarried()).then(msg => {msg.delete(12000)}).catch
	}
}

function checkPlayer(message)
{
	if (message.member.roles.find(r => r.name === 'Brennen'))
	{
		return Brennen
	}
	else if (message.member.roles.find(r => r.name === 'Birb'))
	{
		return Burded
	}
	else if (message.member.roles.find(r => r.name === 'Cara'))
	{
		return Cara
	}
	else if (message.member.roles.find(r => r.name === 'Cass'))
	{
		return Cass
	}
	else if (message.member.roles.find(r => r.name === 'Cow'))
	{
		return Cow
	}
	else if (message.member.roles.find(r => r.name === 'Desert'))
	{
		return Desert
	}
	else if (message.member.roles.find(r => r.name === 'Dischead'))
	{
		return Disc
	}
	else if (message.member.roles.find(r => r.name === 'Evelyn'))
	{
		return Evelyn
	}
	else if (message.member.roles.find(r => r.name === 'Harvey'))
	{
		return Harvey
	}
	else if (message.member.roles.find(r => r.name === 'Helix'))
	{
		return Helix
	}
	else if (message.member.roles.find(r => r.name === 'Jack'))
	{
		return Jack
	}
	else if (message.member.roles.find(r => r.name === 'Kashing'))
	{
		return Kashing
	}
	else if (message.member.roles.find(r => r.name === 'Matt'))
	{
		return Matt
	}
	else if (message.member.roles.find(r => r.name === 'Matthew'))
	{
		return Matthew
	}
	else if (message.member.roles.find(r => r.name === 'Monophy'))
	{
		return Monophy
	}
	else if (message.member.roles.find(r => r.name === 'Panda'))
	{
		return Panda
	}
	else if (message.member.roles.find(r => r.name === 'Ristarte'))
	{
		return Ristarte
	}
	else if (message.member.roles.find(r => r.name === 'Saul'))
	{
		return Saul
	}
	else if (message.member.roles.find(r => r.name === 'Taco'))
	{
		return Taco
	}
	else if (message.member.roles.find(r => r.name === 'Tristan'))
	{
		return Tristan
	}
	else if (message.member.roles.find(r => r.name === '10th'))
	{
		return Will
	}
}

function backup()
{
	let data = "Rotu Water storage = " + rotu.getWaterStorage() + "\nRotu Food storage = " + rotu.getFoodStorage() + "\nRotu Fire level = " +rotu.getFireLevel() + "\nMaraamu Water storage = " + maraamu.getWaterStorage() + "\nMaraamu Food storage = " + maraamu.getFoodStorage() + "\nMaraamu Fire level = " +maraamu.getFireLevel()
	fs.writeFile('Backup.txt', data, (err) => { if (err) throw err;})
		
	
	players.Brennen.food = Brennen.foodCarried
	players.Brennen.water = Brennen.waterCarried
	players.Burded.food = Burded.foodCarried
	players.Burded.water = Burded.waterCarried
	players.Cara.food = Cara.foodCarried
	players.Cara.water = Cara.waterCarried
	players.Cass.food = Cass.foodCarried
	players.Cass.water = Cass.waterCarried
	players.Cow.food = Cow.foodCarried
	players.Cow.water = Cow.waterCarried
	players.Desert.food = Desert.foodCarried
	players.Desert.water = Desert.waterCarried
	players.Disc.food = Disc.foodCarried
	players.Disc.water = Disc.waterCarried
	players.Evelyn.food = Evelyn.foodCarried
	players.Evelyn.water = Evelyn.waterCarried
	players.Harvey.food = Harvey.foodCarried
	players.Harvey.water = Harvey.waterCarried
	players.Helix.food = Helix.foodCarried
	players.Helix.water = Helix.waterCarried
	players.Jack.food = Jack.foodCarried
	players.Jack.water = Jack.waterCarried
	players.Kashing.food = Kashing.foodCarried
	players.Kashing.water = Kashing.waterCarried
	players.Matt.food = Matt.foodCarried
	players.Matt.water = Matt.waterCarried
	players.Matthew.food = Matthew.foodCarried
	players.Matthew.water = Matthew.waterCarried
	players.Monophy.food = Monophy.foodCarried
	players.Monophy.water = Monophy.waterCarried
	players.Panda.food = Panda.foodCarried
	players.Panda.water = Panda.waterCarried
	players.Ristarte.food = Ristarte.foodCarried
	players.Ristarte.water = Ristarte.waterCarried
	players.Saul.food = Saul.foodCarried
	players.Saul.water = Saul.waterCarried
	players.Taco.food = Taco.foodCarried
	players.Taco.water = Taco.waterCarried
	players.Tristan.food = Tristan.foodCarried
	players.Tristan.water = Tristan.waterCarried
	players.Will.food = Will.foodCarried
	players.Will.water = Will.waterCarried

	fs.writeFile('players.json', JSON.stringify(players), (err) => {
		if (err) return console.log(err);
	});
	
	tribes.maraamu.food = maraamu.foodStorage
	tribes.maraamu.fire = maraamu.fireLevel
	tribes.maraamu.water = maraamu.waterStorage
	tribes.rotu.food = rotu.foodStorage
	tribes.rotu.fire = rotu.fireLevel
	tribes.rotu.water = rotu.waterStorage
	
	fs.writeFile('tribes.json', JSON.stringify(tribes), (err) => {
		if (err) return console.log(err);
	});
	
	time.dayNight.date = dayNightDate
	time.dayNight.hour = dayNighthour
	time.dayNight.minute = dayNightminute
	time.fireAnimal.date = fireAnimalDate
	time.fireAnimal.hour = fireAnimalHour
	time.fireAnimal.minute = fireAnimalMinute
	time.backup.date = backupDate
	time.backup.hour = backupHour
	time.backup.minute = backupMinute
	
	
	fs.writeFile('time.json', JSON.stringify(time), (err) => {
		if (err) return console.log(err);
	});
}

function Initialize()
{
		Brennen.foodCarried = players.Brennen.food
		Brennen.waterCarried = players.Brennen.water
		Burded.foodCarried = players.Burded.food
		Burded.waterCarried = players.Burded.water
		Cara.foodCarried = players.Cara.food
		Cara.waterCarried = players.Cara.water
		Cass.foodCarried = players.Cass.food
		Cass.waterCarried = players.Cass.water
		Cow.foodCarried = players.Cow.food
		Cow.waterCarried = players.Cow.water
		Desert.foodCarried = players.Desert.food
		Desert.waterCarried = players.Desert.water
		Disc.foodCarried = players.Disc.food
		Disc.waterCarried = players.Disc.water
		Evelyn.foodCarried = players.Evelyn.food
		Evelyn.waterCarried = players.Evelyn.water
		Harvey.foodCarried = players.Harvey.food
		Harvey.waterCarried = players.Harvey.water
		Helix.foodCarried = players.Helix.food
		Helix.waterCarried = players.Helix.water
		Jack.foodCarried = players.Jack.food
		Jack.waterCarried = players.Jack.water
		Kashing.foodCarried = players.Kashing.food
		Kashing.waterCarried = players.Kashing.water
		Matt.foodCarried = players.Matt.food
		Matt.waterCarried = players.Matt.water
		Matthew.foodCarried = players.Matthew.food
		Matthew.waterCarried = players.Matthew.water
		Monophy.foodCarried = players.Monophy.food
		Monophy.waterCarried = players.Monophy.water
		Panda.foodCarried = players.Panda.food
		Panda.waterCarried = players.Panda.water
		Ristarte.foodCarried = players.Ristarte.food
		Ristarte.waterCarried = players.Ristarte.water
		Saul.foodCarried = players.Saul.food
		Saul.waterCarried = players.Saul.water
		Taco.foodCarried = players.Taco.food
		Taco.waterCarried = players.Taco.water
		Tristan.foodCarried = players.Tristan.food
		Tristan.waterCarried = players.Tristan.water
		Will.foodCarried = players.Will.food
		Will.waterCarried = players.Will.water
		
		maraamu.foodStorage = parseInt(tribes.maraamu.food)
		maraamu.fireLevel = parseInt(tribes.maraamu.fire)
		maraamu.waterStorage = parseInt(tribes.maraamu.water)
		rotu.foodStorage = parseInt(tribes.rotu.food)
		rotu.fireLevel = parseInt(tribes.rotu.fire)
		rotu.waterStorage = parseInt(tribes.rotu.water)
		
		dayNightDate = time.dayNight.date
		dayNighthour = time.dayNight.hour
		dayNightminute = time.dayNight.minute
		fireAnimalDate = time.fireAnimal.date
		fireAnimalHour = time.fireAnimal.hour
		fireAnimalMinute = time.fireAnimal.minute
		backupDate = time.backup.date
		backupHour = time.backup.hour
		backupMinute = time.backup.minute 
	
}



//rotu role ID = 671144978155831330
//maraamu role ID = 671144980089274399
