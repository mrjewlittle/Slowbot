var Discord = require('discord.io');
var DiscordJS = require('discord.js');
var logger = require('winston');
var auth = require('./botconfig.json');
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js');
const actions = require('./safariActions.js');
const fs = require('fs')
//const players = require ('./players.json')
//const tribes = require ('./tribes.json')
//const time = require ('./time.json')
var path = require('path');
const readline = require('readline');

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




//Tribes
const Boran = new tribe.Tribe('boran')
const Samburu = new tribe.Tribe('samburu')
const Merge = new tribe.Tribe('merge')

let mergeRole = "585577026291761192"
let boranRole = "585576879793373207"
let samburuRole = "585576943890726912"
var boranIdolFound = false;
var samburuIdolFound = false;

var boranFireChance = 25;
var samburuFireChance =25;

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

var dayNightDate = 24
var dayNighthour = 2
var dayNightminute = 30

var fireAnimalDate = 24
var fireAnimalHour = 20
var fireAnimalMinute = 30

var backupDate = 24
var backupHour = 20
var backupMinute = 30

//var textFile1 = path.basename('C:/Users/shado/Documents/Slowbot/players.json')
//var textFile2 = path.dirname('C:/Users/shado/Documents/Slowbot/tribes.json')
//var textFile3 = path.dirname('C:/Users/shado/Documents/Slowbot/time.json')




/*fs.readFile('./players.json', 'utf-8', (err, data) => { 
    if (err) throw err; 
  
    // Converting Raw Buffer to text 
    // data using tostring function. 
    var playerText = data; 
}) */
//var playerText = fs.writeFile('players.json', null, (err) => {if (err) throw err;})
//var tribeText = fs.readFileSync(textFile2).toString().split("\n");
//var timeText = fs.readFileSync(textFile3).toString().split("\n");

/*fs.readFile('./players.json', 'utf8', (err, jsonString) => {
    if (err) {
        return
    }
    try {
        const castaway = JSON.parse(jsonString)
   
	} catch(err) {}
})

Initialize()


let getTimersID = setInterval(getTimersFunction, 300000);

function getTimersFunction()
{
	var switchDayNightTime = new Date(2020, 0, dayNightDate, dayNighthour, dayNightminute).getTime() - Date.now()
	var fireTime = new Date(2020, 0, fireAnimalDate, fireAnimalHour, fireAnimalMinute).getTime() - Date.now()
	var animalTime = new Date(2020, 0, fireAnimalDate, fireAnimalHour, fireAnimalMinute).getTime() - Date.now()
	var backupTime = new Date(2020, 0, backupDate, backupHour, backupMinute).getTime() - Date.now()
}

//let fireTimerID = setInterval(fireDecay, 3600000);
//let animalTimerID = setInterval(animalAttack, 3600000);
//let backupTimerID = setInterval(backup, 3600000);
*/


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
	var player = checkPlayer(message)
	

	
	
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
	
	else if (primaryCommand == "setBoranFireChance")
	{
		boranFireChance = argument
		message.channel.send("Boran's fire chance is now " + boranFireChance + "%").then(msg => {msg.delete(12000)}).catch
	}
	
	else if (primaryCommand == "setSamburuFireChance")
	{
		samburuFireChance = argument
		message.channel.send("Samburu's fire chance is now " + samburuFireChance + "%").then(msg => {msg.delete(12000)}).catch
	}
	
	else if (primaryCommand == "TribeDecay")
	{
		Boran.foodDecay(message)
		Boran.waterDecay(message)
		Samburu.foodDecay(message)
		Samburu.waterDecay(message)
	}
	
	else if (primaryCommand == "samburuEatAndDrink")
	{
		if (argument)
		{
			var SamburuWater = Samburu.getWaterStorage()
			var waterSubtraction = SamburuWater - (argument*5)
			
			Samburu.setWaterStorage(waterSubtraction,message)
			message.channel.send(waterSubtraction + " water has been removed from Samburu's storage")
			
			var SamburuFood = Samburu.getFoodStorage()
			var foodSubtraction = SamburuFood  - (argument*5)
			
			Samburu.setFoodStorage(foodSubtraction,message)
			message.channel.send(foodSubtraction + " food has been removed from Samburu's storage")
		}
		
		else
		{
			message.channel.send("Please include how many tribemates are on the tribe").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "boranEatAndDrink")
	{
		if (argument)
		{
			var BoranWater = Boran.getWaterStorage()
			var waterSubtraction = BoranWater - (argument*5)
			
			Boran.setWaterStorage(waterSubtraction,message)
			message.channel.send(waterSubtraction + " water has been removed from Samburu's storage")
			
			var BoranFood = Boran.getFoodStorage()
			var foodSubtraction = BoranFood  - (argument*5)
			
			Boran.setFoodStorage(foodSubtraction,message)
			message.channel.send(foodSubtraction + " food has been removed from Samburu's storage")
		}
		
		else
		{
			message.channel.send("Please include how many tribemates are on the tribe").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "SamburuWater")
	{
		Samburu.hostSetWater(argument)
	}
	else if (primaryCommand == "SamburuFire")
	{
		Samburu.hostSetFire(argument)
	}
	else if (primaryCommand == "SamburuFood")
	{
		Samburu.hostSetFood(argument)
	}
	else if (primaryCommand == "BoranWater")
	{
		Boran.hostSetWater(argument)
	}
	else if (primaryCommand == "BoranFire")
	{
		Boran.hostSetFire(argument)
	}
	else if (primaryCommand == "BoranFood")
	{
		Boran.hostSetFood(argument)
	}
	
	else if (primaryCommand == "switchDayNight")
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
		backToCamp
		bot.channels.get("607575225902825482").send("It is now night time in the safari!")
		bot.channels.get("666723791380152330").send("It is now night time in the safari!")
		bot.channels.get("666723935920062489").send("It is now night time in the safari!")
		return;
	}
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
			if (Samburu.getFireLevel() == 0 && !samburuIdolFound)
			{
				message.author.send("You pick your way through the ashes. Why? You're not quite sure until.... What is that? Something is actually under the ashes in the dirt? You wrap your hand around it and pull it out and dust it off. Hold on a second, you recognize what this is.")
				message.author.send("It is a map tube that contains something. IT IS THE HIDDEN IMMUNITY IDOL!! CONGRATULATIONS")
				message.author.send("insert picture of idol here")
				bot.channels.get("586540569099108352").send(message.member.nickname + "Has found the Samburu idol!")
				message.channel
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
	
	else if (primaryCommand == "reachIntoTank")
	{
		var currentLocation = message.channel.name.toString()
		var str = currentLocation.substring(0, 3)
		
		if (str == "b03")
		{
			if (Boran.getWaterStroage() == 50 && !boranIdolFound)
			{
				message.author.send("You can see all the way to the bottom of the tank now that all the water is drained. Wait, what is that glint? Something appears to be riveted to the side of the tank at the bottom. Now that you will not contaminate your water. You jump in and peer into what looks like a map tube" )
				message.author.send("There is something inside. IT IS THE HIDDEN IMMUNITY IDOL!! CONGRATULATIONS")
				message.author.send("insert picture of idol here")
				bot.channels.get("586540569099108352").send(message.member.nickname + "Has found the Boran idol!")
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
			if (Samburu.getWaterStroage == 0)
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
					Boran.setWaterStorage(argument, message)
					player.setWaterCarried(removeAmount,message)
				}
				else if (str == "j10")
				{
					var removeAmount = parseInt(argument) * -1
					Samburu.setWaterStorage(argument, message)
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
					Boran.setFoodStorage(argument, message)
					player.setFoodCarried(removeAmount,message)
				}
				if (str == "k12")
				{
					var removeAmount = parseInt(argument) * -1
					Samburu.setFoodStorage(argument, message)
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
		
		if (str == "j10")
		{
			var fireLevel = Samburu.getFireLevel()
			message.channel.send(fireLevel).then(msg => {msg.delete(12000)}).catch
		}
		
		if (str == "d04")
		{
			var fireLevel = Boran.getFireLevel()
			message.channel.send(fireLevel).then(msg => {msg.delete(12000)}).catch
		}
		
	}
	
	else if (primaryCommand == "checkWater")
	{
		if (str == "b03")
		{
			message.channel.send("You have " + Boran.getWaterStorage() + " water in your tank").then(msg => {msg.delete(12000)}).catch
		}
		
		else if (str == "l11")
		{
			message.channel.send("You have " + Samburu.getWaterStorage() + " water in your tank").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "checkFood")
	{
		if (str == "c02")
		{
			message.channel.send("You have " + Boran.getFoodStorage() + " food in your storage").then(msg => {msg.delete(12000)}).catch
		}
		
		else if (str == "k12")
		{
			message.channel.send("You have " + Samburu.getFoodStorage() + " food in your storage").then(msg => {msg.delete(12000)}).catch
		}
	}
	
	else if (primaryCommand == "startFire")
	{
		var samburuAttempted = 0;
		var boranAttempted = 0;
		if (str == "j10")
		{
			if (Samburu.getFireLevel() >=1)
			{
				message.channel.send("The fire is already burning, no use really in trying to start it. Maybe try to $stokeFire to bring it back up to full light").then(msg => {msg.delete(12000)}).catch
			}
				
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (samburuAttempted == 0)
			{
			if (randomChance <= samburuFireChance)
				{
					message.channel.send("You did it!! You've started a raging fire").then(msg => {msg.delete(12000)}).catch
					Samburu.setFireLevel(8);
				}
				else
				{
					message.channel.send("You fail to get anything to light. You or a tribe mate will have to try again later. Try again in 3 minutes").then(msg => {msg.delete(12000)}).catch
					samburuAttempted = 1;
					setTimeout(function() 
					{
						samburuAttempted = 0;
						message.channel.send("You can now attempt to make fire again!").then(msg => {msg.delete(12000)}).catch
					}, 180000)
				}
			}
			
		}
		
		if (str == "d04")
		{
			var randomChance = Math.floor(Math.random() * 100) + 1;
			if (boranAttempted == 0)
			{
				if (randomChance <= boranFireChance)
				{
					message.channel.send("You did it!! You've started a raging fire").then(msg => {msg.delete(12000)}).catch
					Boran.setFireLevel(8);
				}
				else
				{
					message.channel.send("You fail to get anything to light. You or a tribe mate will have to try again later. Try again in 3 minutes").then(msg => {msg.delete(12000)}).catch
					boranAttempted = 1;
					setTimeout(function() 
					{
						boranAttempted = 0;
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
			var fire = Samburu.getFireLevel()
			if (fire > 1)
			{
				Samburu.setFireLevel(8)
				message.channel.send("You stoke up the fire and now it is raging again! This should last a good amount of time").then(msg => {msg.delete(12000)}).catch
			}
			
			else
			{
				message.channel.send("There is not quite enough there to stoke up. Either the fire is very dim or it is already out").then(msg => {msg.delete(12000)}).catch
			}
		}
		
		else if (str == "d04")
		{
			var fire = Boran.getFireLevel()
			if (fire > 1)
			{
				Boran.setFireLevel(8)
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
			bot.channels.get("586540569099108352").send(message.member.nickname + "Has found a Samburu idol clue!")
		}
		
		else if (str == "h02")
		{
			message.channel.send("You dig into the termite mound for some reason, but your hand grasps something! It's a scroll!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The scroll reads: IDOL CLUE #3 You will have to REACH for what you want. Command is 3 words")
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Boran idol clue!")
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
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Samburu idol clue!")
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
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Boran idol clue!")
		}
		
		else if (str == "f08")
		{
			message.channel.send("You lift up the rock and something is inscribed underneath it!").then(msg => {msg.delete(12000)}).catch
			message.author.send("The inscription reads: IDOL CLUE #1 Water gives you life in this game. But maybe when it is gone, it gives you a second chance at life...")
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Boran idol clue!")
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
			bot.channels.get("586540569099108352").send(message.member.nickname + " Has found a Boran idol clue!")
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

let dayNightTimerID = setInterval(dayNight, 36000000);
let fireTimerID = setInterval(fireDecay, 3600000);
let animalTimerID = setInterval(animalAttack, 3600000);
let backupTimerID = setInterval(backup, 3600000);
var isNight = false;

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
	
	if (dayNighthour + 10 <= 24)
	{
		dayNighthour  = dayNighthour + 10
	}
	else
	{
		dayNighthour  = dayNighthour  - 14
		dayNightDate = dayNightDate + 1
	}
	
}

function fireDecay()
{
	var SamburuFire = Samburu.getFireLevel()
	var SNewFire = SamburuFire - 1
	var BoranFire = Boran.getFireLevel()
	var BNewFire = BoranFire - 1
	
	if (SamburuFire > 2)
	{
		Samburu.setFireLevel(SNewFire)
		bot.channels.get("608908442618560533").send("The fire has dimmed a little more").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (SamburuFire == 2)
	{
		Samburu.setFireLevel(SNewFire)
		bot.channels.get("608908442618560533").send("The fire is one hour away from going out").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (SamburuFire == 1)
	{
		Samburu.setFireLevel(SNewFire)
		bot.channels.get("608908442618560533").send("Your fire has gone out!").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (SamburuFire == 0)
	{
		bot.channels.get("608908442618560533").send("Your fire is out").then(msg => {msg.delete(3600000)}).catch
	}
		
	
	if (BoranFire > 2)
	{
		Boran.setFireLevel(BNewFire)
		bot.channels.get("608912112470851616").send("The fire has dimmed a little more").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (BoranFire == 2)
	{
		Boran.setFireLevel(BNewFire)
		bot.channels.get("608912112470851616").send("The fire is one hour away from going out").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (BoranFire == 1)
	{
		Boran.setFireLevel(BNewFire)
		bot.channels.get("608912112470851616").send("Your fire has gone out!").then(msg => {msg.delete(3600000)}).catch
	}
	
	else if (BoranFire == 0)
	{
		bot.channels.get("608912112470851616").send("Your fire is out").then(msg => {msg.delete(3600000)}).catch
	}
	
	if (dayNighthour + 1 <= 24)
	{
		dayNighthour  = dayNighthour + 1
	}
	else
	{
		dayNighthour  = 0
		dayNightDate = dayNightDate + 1
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
				Boran.emptyWaterStorage()
				Boran.emptyFoodStorage()
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
				Samburu.emptyWaterStorage()
				Samburu.emptyFoodStorage()
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
	let data = "Samburu Water storage = " + Samburu.getWaterStorage() + "\nSamburu Food storage = " + Samburu.getFoodStorage() + "\nSamburu Fire level = " +Samburu.getFireLevel() + "\nBoran Water storage = " + Boran.getWaterStorage() + "\nBoran Food storage = " + Boran.getFoodStorage() + "\nBoran Fire level = " +Boran.getFireLevel()
	fs.writeFile('Backup.txt', data, (err) => { if (err) throw err;})
		
	//bot.players ["Brennen"] = {food: Brennen.foodCarried}
	
	//fs.writeFile ("./players.json", JSON.stringify(client.players, null, 4), err => {if (err) throw err;})
	
	
	/*fs.writeFile('tribes.json', null, (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Boran.getFoodStorage(), (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Boran.getFireLevel(), (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Boran.getWaterStorage(), (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Samburu.getFoodStorage(), (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Samburu.getFireLevel(), (err) => {if (err) throw err;})
	fs.appendFile('tribes.json', Samburu.getWaterStorage(), (err) => {if (err) throw err;})
		
	fs.writeFile('players.json', JSON.stringify (Brennen.foodCarried) (err) => {if (err) throw err;}))
	fs.appendFile('players.json', Brennen.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Brennen.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Burded.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Burded.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cara.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cara.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cass.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cass.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cow.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Cow.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Desert.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Desert.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Disc.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Disc.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Evelyn.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Evelyn.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Harvey.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Harvey.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Helix.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Helix.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Jack.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Jack.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Kashing.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Kashing.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Matt.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Matt.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Matthew.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Matthew.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Monophy.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Monophy.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Panda.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Panda.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Ristarte.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Ristarte.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Saul.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Saul.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Taco.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Taco.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Tristan.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Tristan.waterCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Will.foodCarried, (err) => {if (err) throw err;})
	fs.appendFile('players.json', Will.waterCarried, (err) => {if (err) throw err;})
		
	fs.writeFile('time.json', null, (err) => {if (err) throw err;})
	fs.appendFile('time.json', date, (err) => {if (err) throw err;})
	fs.appendFile('time.json', hour, (err) => {if (err) throw err;})
	fs.appendFile('time.json', minute, (err) => {if (err) throw err;})*/
}

function Initialize()
{
		/*Brennen.foodCarried = playerText[0]
		Brennen.waterCarried = playerText[1]
		Burded.foodCarried = playerText[2]
		Burded.waterCarried = playerText[3]
		Cara.foodCarried = playerText[4]
		Cara.waterCarried = playerText[5]
		Cass.foodCarried = playerText[6]
		Cass.waterCarried = playerText[7]
		Cow.foodCarried = playerText[8]
		Cow.waterCarried = playerText[9]
		Desert.foodCarried = playerText[10]
		Desert.waterCarried = playerText[11]
		Disc.foodCarried = playerText[12]
		Disc.waterCarried = playerText[13]
		Evelyn.foodCarried = playerText[14]
		Evelyn.waterCarried = playerText[15]
		Harvey.foodCarried = playerText[16]
		Harvey.waterCarried = playerText[17]
		Helix.foodCarried = playerText[18]
		Helix.waterCarried = playerText[19]
		Jack.foodCarried = playerText[20]
		Jack.waterCarried = playerText[21]
		Kashing.foodCarried = playerText[22]
		Kashing.waterCarried = playerText[23]
		Matt.foodCarried = playerText[24]
		Matt.waterCarried = playerText[25]
		Matthew.foodCarried = playerText[26]
		Matthew.waterCarried = playerText[27]
		Monophy.foodCarried = playerText[28]
		Monophy.waterCarried = playerText[29]
		Panda.foodCarried = playerText[30]
		Panda.waterCarried = playerText[31]
		Ristarte.foodCarried = playerText[32]
		Ristarte.waterCarried = playerText[33]
		Saul.foodCarried = playerText[34]
		Saul.waterCarried = playerText[35]
		Taco.foodCarried = playerText[36]
		Taco.waterCarried = playerText[37]
		Tristan.foodCarried = playerText[38]
		Tristan.waterCarried = playerText[39]
		Will.foodCarried = playerText[40]
		Will.waterCarried = playerText[41]
		
		Boran.foodStorage = tribeText[0]
		Boran.fireLevel = tribeText[1]
		Boran.waterStorage = tribeText[2]
		Samburu.foodStorage = tribeText[3]
		Samburu.fireLevel = tribeText[4]
		Samburu.waterStorage = tribeText[5]
		
		date = timeText[0]
		hour = timeText[1]
		minute = timeText[2]*/
}
	
function tribeInitialize()
{
		Boran.foodStorage = tribeText[0]
		Boran.fireLevel = tribeText[1]
		Boran.waterStorage = tribeText[2]
		Samburu.foodStorage = tribeText[3]
		Samburu.fireLevel = tribeText[4]
		Samburu.waterStorage = tribeText[5]
}

//Samburu role ID = 585576943890726912
//Boran role ID = 585576879793373207
