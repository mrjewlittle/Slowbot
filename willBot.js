var Discord = require('discord.io');
var DiscordJS = require('discord.js');
var logger = require('winston');
var auth = require('./willbotconfig.json');
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js');
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

var textFile1 = path.basename('C:/Users/shado/Documents/Slowbot/players.json')
var textFile2 = path.dirname('C:/Users/shado/Documents/Slowbot/tribes.json')
var textFile3 = path.dirname('C:/Users/shado/Documents/Slowbot/time.json')




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
	
	
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////// RANDOM ACTIONS ///////////////////////////////////////////////////////////////

	
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
