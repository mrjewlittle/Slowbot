var DiscordBot = require('./testbot.js')
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js')


module.exports = {

layInSun: function(message, user)
{
	message.channel.send("Really? You don’t think you’re getting enough sun as it is? Either way you lay down for a few minutes").then(msg => {msg.delete(12000)}).catch
	return 600000; //returning this makes a lockout of 10 minutes
}, //timeout player 600000 = 10 Minutes

climbTallerTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 75)//75% chance to do this action
	{
		message.channel.send("You try to climb the tall tree, but the branches are very high and you expend all your energy failing to get a grab on one.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (25% chance)
	{
		message.channel.send("You just manage to get a grip on one of the tree branches and pull yourself up to get a gorgeous view of the jungle floor that you haven’t seen before. However, the only notable thing in sight is the camp boma.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
},

climbSmallerTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50% chance to do this action
	{
		message.channel.send("You try to climb the tree, but struggle to get any solid footing and fall back to the ground, slightly dazed. ").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You are able to find a solid branch to secure yourself onto, but are disappointed by not finding anything of value.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

digInSand: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //60 percent chance to do this action
	{
		message.channel.send("You dig through the sand, but are unable to find anything except for the sand itself.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("You start to dig through the sand and come across a sand crab, who scuffles away after being discovered.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

whistleWithGrass: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("It’s not working. You’re blowing wrong, or something").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("Ahh you did it! It made the whistle sound, see?... *whistle*").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

watchLion: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("The lion seems to be resting. Interacting with it might not be a good idea").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("The lion looks like its observing the savannah. It seems to have already acknowledged your presence.").then(msg => {msg.delete(12000)}).catch
		message.channel.send("Now you can try using the command to $approachLion or $hideFromLion").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

approachLion: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //20 percent chance to do this action
	{
		message.channel.send("The lion doesn't seem threatened, as it just continues to rest.").then(msg => {msg.delete(12000)}).catch
		message.channel.send("Now you can try using the command to $petLion").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (80% chance)
	{
		message.channel.send("The lion stares you down as you come closer. You wonder if you should back away.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

petLion: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("The lion bites at you and you manage to escape rather unscathed, and you chastise yourself for trying to pet a dangerous animal").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("Before you even take a step closer, the lion moves farther away. Maybe that's a sign.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

hideFromLion: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 75) //75 percent chance to do this action
	{
		message.channel.send("You decide to hide in a bush from the lion. It doesn't seem to want to do anything while you're not around, because it just stays in its place.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else //remaining chance to do this action (15% chance)
	{
		message.channel.send("After you hide, the lion begins to walk around the area, before resting in the same place it once was.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 5 minutes
	}
	return;
},


lookAround: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 40)
	{
		message.channel.send("Other than the pride of lions and a couple trees, there isn't much to look at here.").then(msg => {msg.delete(12000)}).catch
		message.channel.send("Maybe you can try to approach the pride with $approachPride after your lockout").then(msg => {msg.delete(12000)}).catch
		return 300000;
	}
	
	else if (randomChance > 40 && randomChance < 80)
	{
		message.channel.send("You look around best you can, but you don't really see anything of note").then(msg => {msg.delete(12000)}).catch
		return 300000;
	}
	
	else
	{
		message.channel.send("You watch as the pride approaches the lone lion. They get up, leading you to believe they're getting ready to hunt. Best to stay out of the way").then(msg => {msg.delete(12000)}).catch
		return 300000;
	}
	return;
},

approachPride: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 75)
	{
		message.channel.send("You creep ever so slowly up. The pride consists of 3 cubs, and a male. It's a smaller pride than others, but you assume that the lion by itself is also a part of the pride.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	
	else
	{
		message.channel.send("The male puts himself between you and the cubs. He obviously sees you as a threat. Best to back up").then(msg => {msg.delete(12000)}).catch
		return 300000;
	}
	return;
},

digInSand: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 75)
	{
		message.channel.send("You dig through the sand, but are unable to find anything except for the sand itself.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	
	else
	{
		message.channel.send("You start to dig through the sand and come across a sand crab, who scuffles away after being discovered.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	return;
},

drinkFromWateringHole: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	message.channel.send("This REALLY should have been boiled first. Now your stomach doesn't feel too good. Uh-oh").then(msg => {msg.delete(12000)}).catch
	return 180000;

},

imitateTheElephant: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	message.channel.send("It wouldn’t fool anybody, but your amateur imitation of the elephant’s walk and trunk movements keep you entertained for a few minutes. Bravo Frank.").then(msg => {msg.delete(12000)}).catch
	return 60000;

},

throwRocksAtTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60)
	{
		message.channel.send("You miss, and it wasn’t even close.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	
	else
	{
		message.channel.send("Nice shot. One of the berries is hit hard enough to fall down to the ground for you to grab. You get some food!").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	return;
},

stickArmInBoma: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	message.channel.send("These sticks are pretty sharp all you’re doing is hurting your arm and ruining the boma.").then(msg => {msg.delete(12000)}).catch
	return 30000;

},

addSticksToBoma: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	message.channel.send("You make this section of the boma a little thicker. Now the lions will never get through it!").then(msg => {msg.delete(12000)}).catch
	return 30000;

},

climbTheLeftTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You made it to the top, congrats! Unfortunately, there isn’t anything of interest up here. Decent view though.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("You lost your grip and fell this time. Maybe just try and enjoy the view from down here.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
},

climbTheMiddleTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You made it to the top, congrats! Unfortunately, there isn’t anything of interest up here. Decent view though.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("You lost your grip and fell this time. Maybe just try and enjoy the view from down here.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
},

climbTheRightTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You made it to the top, congrats! Unfortunately, there isn’t anything of interest up here. Decent view though.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("You lost your grip and fell this time. Maybe just try and enjoy the view from down here.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
},

WaveToAWildebeest: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The wildebeest looks at you and sniffs. It does not wave back.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("The wildebeest does nothing to acknowledge your existence.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},


napUnderATree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //20 percent chance to do this action
	{
		message.channel.send("Hey that one kinda looks like an elephant ain’t that neat? Fitting.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 20 && randomChance <= 40)//20 percent chance to do this action
	{
		message.channel.send("That cloud’s a bit like a boat if you turn your head sideways. As if it’s sinking.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 40 && randomChance <= 60)//20 percent chance to do this action
	{
		message.channel.send("Oh that cloud looks like Goku from Dragon Ball. Just a little bit. Maybe. if you squint.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 60 && randomChance <= 80)//20 percent chance to do this action
	{
		message.channel.send("You swear that cloud looks just like the discord logo. Crazy.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("In this moment it turns out you have no imagination. All these clouds just look like clouds.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

kickARock: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("That rock was lodged in the ground better than you thought… hurt your toe a bit.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("Guess this is what we do when we’re bored.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

searchTermiteMound: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("Don’t bother. You’d have to eat a lot of these bugs for it to actually make a difference to your stomach.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("Ew, bugs are icky.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

goToTheOasisOffInTheDistance: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("You walk forward, and keep walking, but the oasis never seems to get any closer.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (30% chance)
	{
		message.channel.send("You take a few steps before realizing that this is probably just a mirage, and yeah, it is.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

throwRocksDownCliffs: function(message, user)
{
	
		message.channel.send("Down it goes all the way to the bottom like a rolling stone. Look at it go... Well that was a nice little bit of entertainment.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

screamOutToTheHighlands: function(message, user)
{
	
		message.channel.send("You hear your voice echo through the highlands. Who knows how far it went.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	
},

lickWaterOffTreeLeaves: function(message, user)
{
	
		message.channel.send("This isn’t much but it’s at least something.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	
},

liftTheMiddleRock: function(message, user)
{
	
		message.channel.send("Nothing but dirt under this one.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	
},

liftTheRockOnTheRight: function(message, user)
{
	
		message.channel.send("You see a bunch of bugs underneath! But now they’re all crawling away.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	
},

liftTheRockOnTheLeft: function(message, user)
{
	
		message.channel.send("This one’s too heavy, maybe try another one.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

liftTheRockOnTheLeft: function(message, user)
{
	
		message.channel.send("This one’s too heavy, maybe try another one.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

buryYourselfInSand: function(message, user)
{
	
		message.channel.send("You sure there isn’t a better way to spend your time?").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	
},

stareAtSun: function(message, user)
{
	
		message.channel.send("It’s pretty, but hurts your eyes. Shoulda brought sunglasses.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

stareOutAtSavanna: function(message, user)
{
	
		message.channel.send("Beautiful isn’t it? Nice to stop and appreciate where you are once in a while.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

digUnderBoma: function(message, user)
{
	
		message.channel.send("Look, all you’re doing is adding a way for the animals to get in and kill you all!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

};