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

chopAtWall: function(message, user)
{
	
		message.channel.send("Even though your machete looks sharp, it isn’t sharp enough to cut through the dense wall yet. Maybe try sharpening it!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

drawInSand: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 40) //80 percent chance to do this action
	{
		message.channel.send("Oh look! You drew a butterfly. Very cool!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 15 minutes
	}
	
	else if (randomChance > 40 && randomChance <= 70)
	{
		message.channel.send("Clearly, art isn’t one of your skills, as nobody can really tell what you just drew.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("Just as you finish your masterpiece, a gust of wind blows sand and dirt all over your sand drawing, removing any trace that anything was drawn there.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 15 minutes
	}
	return;
},

sharpenMachete: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 10) //80 percent chance to do this action
	{
		message.channel.send("It’s extremely sharp already… why do you need to sharpen it?”").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 15 minutes
	}
	
	else if (randomChance > 40 && randomChance <= 70)
	{
		message.channel.send("You grab a rock and begin to sharpen the machete. Within minutes, it already looks sharper.").then(msg => {msg.delete(12000)}).catch
		return 600000;
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("After finishing, you take a swing with the machete and you can tell it’s ready for some serious business. Maybe now it can cut through something?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 15 minutes
	}
	return;
},
chaseTumbleweed: function(message, user)
{
	
		message.channel.send("The wind pushes the tumbleweed faster than you can run. Best to give up. Not like tumbleweed is useful anyways.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

stareAtZebra: function(message, user)
{
	
		message.channel.send("Even when it’s right in front of you, you’re still left to wonder if it’s white with black stripes, or black with white stripes?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

feedLionFruit: function(message, user)
{
	
		message.channel.send("The lion is obviously not interested. They would eat you before they eat the fruit.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

chaseLizard: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //60 percent chance to do this action
	{
		message.channel.send("These things are quick! The lizard seems to scatter off every time you think you’ll finally get it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("You just barely catch the critter before it runs off to leave you in dust. Now you can bring back this local delicacy to camp. **Player gets 1 FOOD.**").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

climbFruitTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The tree isn’t extremely tall, but you find it difficult to get a good grip and climb up.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You successfully climb the tree and pluck some fruit off before dropping down.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

gatherWater: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 90) //90 percent chance to do this action
	{
		message.channel.send("You fill your canteen with water to bring back to camp and boil.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (10% chance)
	{
		message.channel.send("Eh, the spot you chose was particularly dirty. Best to pour it out and gather water again.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

napUnderTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("You take a break the sun underneath the shade of a tree and give your eyes some of the rest they need.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (30% chance)
	{
		message.channel.send("The shade is nice but you can’t seem to get comfortable in this spot. Better to just sleep in your spot back at camp.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

birdWatch: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 30) //30 percent chance to do this action
	{
		message.channel.send("Ooh you see an African Sacred Ibis! It flies through the air before stopping to walk in the shallow water.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 30 && randomChance <= 60)//30 percent chance to do this action
	{
		message.channel.send("An Augur Buzzard can be seen scoop down to catch its prey. You wish you could get food that easily.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 60 && randomChance <= 80)//20 percent chance to do this action
	{
		message.channel.send("Squint and you can see a Pygmy Falcon. It’s the smallest bird of prey in the continent. Cute!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("A Striped Kingfisher is flying from tree to tree not too far away. Tiny bird, but it’s head seems kinda big for its body.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

digThroughElephantDung: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 30) //30 percent chance to do this action
	{
		message.channel.send("Really? Are you sure?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 30 && randomChance <= 60)//30 percent chance to do this action
	{
		message.channel.send("Seriously you don’t even have gloves do you really wanna do this?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("Okay, for whatever reason you dug through the elephant dung, and what do you find besides more elephant dung!!! That’s it. What did you expect?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

searchThroughGrass: function(message, user)
{	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //20 percent chance to do this action
	{
		message.channel.send("Darn. You scared off some birds.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 20 && randomChance <= 40)//20 percent chance to do this action
	{
		message.channel.send("Someone should really mow this it’s getting pretty tall.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 40 && randomChance <= 60)//20 percent chance to do this action
	{
		message.channel.send("The grass kinda tickles your leg. Try not to laugh.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 60 && randomChance <= 80)//20 percent chance to do this action
	{
		message.channel.send("Nope, nothing notable here. It’s just grass.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("It looks greener over there.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

gatherNuts: function(message, user)
{
	
		message.channel.send("It is tedious work, but it is a reliable source of food. If only it didn't take so long").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 30 minutes
	
},

forageBushes: function(message, user)
{
	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //20 percent chance to do this action
	{
		message.channel.send("You spend some time searching but can't find any berries you know for sure aren't poisonous. You think it is best not to risk it").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 20 && randomChance <= 40)//20 percent chance to do this action
	{
		message.channel.send("You find some berries you are positive will not kill you!").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 40 && randomChance <= 60)//20 percent chance to do this action
	{
		message.channel.send("Nice, you've gotten a good haul. This fruit could make a decent meal ").then(msg => {msg.delete(12000)}).catch
		return 600002; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 60 && randomChance <= 80)//20 percent chance to do this action
	{
		message.channel.send("You were searching for some berries or something. Instead you find a little stream you can fill up your water bottle with a little bit!").then(msg => {msg.delete(12000)}).catch
		return 600003; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("OMG you hit the motherload! You can bring back enough berries to feed the whole tribe!").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
	
},

searchEmptyBoma: function(message, user)
{
	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 40) //40 percent chance to do this action
	{
		message.channel.send("You spend some time looking around the area. Nothing really catches your eye at this point though").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	
	else if(randomChance > 40 && randomChance <= 70)//30 percent chance to do this action
	{
		message.channel.send("You find a can of beans! Don't sneak a bite though or your tribe might get angry").then(msg => {msg.delete(12000)}).catch
		return 900001; //returning this makes a lockout of 10 minutes
	}

	else if(randomChance > 70 && randomChance <= 90)//20 percent chance to do this action
	{
		message.channel.send("Digging through the remains, you find a tribal arrowhead! Doesn't do much but it could be a cool trinket").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("Something is scribbled on the inside of a wall. What does it mean? It looks like $reachIntoXXXX").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
	
},

approachStream: function(message, user)
{
	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("You bend down and fill up your water bottle a bit.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //30 percent chance to do this action
	{
		message.channel.send("OUCH something just jumped out of the water and bit you! You don't feel so good and need to sit").then(msg => {msg.delete(12000)}).catch
		return 1200000; //returning this makes a lockout of 20 minutes
	}
	return;
	
},

harvestWaterFromPlants: function(message, user)
{
	message.channel.send("You crack open some plant roots and extract water. It's tedious but it is a surefire way to get water").then(msg => {msg.delete(12000)}).catch
	return 900000; //returning this makes a lockout of 15 minutes
},

tryToReachCave: function(message, user)
{
	message.channel.send("You see a cave that goes inside the side of the cliff. You spend a loooooong time trying to get the footing to get down there. Eventually you have to give up. It's either that or get seriously hurt and be medevac'ed").then(msg => {msg.delete(12000)}).catch
	return 1800000; //returning this makes a lockout of 30 minutes
},

reachUnderTreeRoot: function(message, user)
{
	message.channel.send("You see a cave that goes inside the side of the cliff. You spend a loooooong time trying to get the footing to get down there. Eventually you have to give up. It's either that or get seriously hurt and be medevac'ed").then(msg => {msg.delete(12000)}).catch
	return 1800000; //returning this makes a lockout of 30 minutes
},

kickRock: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //30 percent chance to do this action
	{
		message.channel.send("You see a nice little rock on the ground. You boot it with all your strength and it goes flying!").then(msg => {msg.delete(12000)}).catch
		return 30000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 50 && randomChance <= 80)//30 percent chance to do this action
	{
		message.channel.send("You see a nice little rock on the ground and two sticks in the distance making goal posts. You line up and kick.... GOAAALLLLL").then(msg => {msg.delete(12000)}).catch
		return 30000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("You see a nice little rock on the ground. You wind up to kick it.... OWWWWWW half that rock was buried under ground and you might have bruised your foot").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

runWithGazelles: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //30 percent chance to do this action
	{
		message.channel.send("You run alongside them as long as you can! After awhile you are out of breath however").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 50 && randomChance <= 80)//30 percent chance to do this action
	{
		message.channel.send("You feel the wind through your hair as you let yourself go wild for a few minutes.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("Running alongside the gazelles spooks them a bit. One KICKS you in the leg").then(msg => {msg.delete(12000)}).catch
		return 1200000; //returning this makes a lockout of 20 minutes
	}
	return;
},

squakAtToucan: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //30 percent chance to do this action
	{
		message.channel.send("The toucan returns your call. SQUUAAAKKKK").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}
	
	else if(randomChance > 50 && randomChance <= 80)//30 percent chance to do this action
	{
		message.channel.send("You squak in its direction but it just ignores you").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("The toucan hears your call and flies over your head. It drops some berries into your hand!").then(msg => {msg.delete(12000)}).catch
		return 300001; //returning this makes a lockout of 5 minutes
	}
	return;
},

followGoat: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //30 percent chance to do this action
	{
		message.channel.send("The goat just kind of lounges around and doesn't do anything. This was a waste").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("The goat starts moving away a bit. However it rounds a hill and it led you to a little pond to fill your bottle!").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 5 minutes
	}
	return;
},

checkBirdNest: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //30 percent chance to do this action
	{
		message.channel.send("Mamma bird is in there and she is angry! She pecks you away").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("You see a couple eggs in the nest. You know it's bad, but you also gotta eat.").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}
	return;
},

swimInPond: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 40) //40 percent chance to do this action
	{
		message.channel.send("Ahhhh this is nice and relaxing. you feel rejuvinated coming out of the water").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}

	else //remaining chance to do this action (60% chance)
	{
		message.channel.send("You being to take a dip when all of a sudden you see a hippo get in the water from the other side. You know this is bad news bears to share the pond with a hippo. You get out as fast as you can. That was not very relaxing...").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

weaveGrassBasket: function(message, user)
{
	message.channel.send("You weave some stalks of grass over and under itself, putting together a beautiful masterpiece. Who am I kidding, this is way harder than you thought. This basket is trash").then(msg => {msg.delete(12000)}).catch
	return 900000; //returning this makes a lockout of 15 minutes

},

peelTreeBark: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 40) //40 percent chance to do this action
	{
		message.channel.send("The tree you are attempting on is too healthy to have its bark pull away that easily").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 40 && randomChance <= 80) //remaining chance to do this action (60% chance)
	{
		message.channel.send("You manage to peel off some chunks of bark from the tree. It comes apart too easily to be useful though and you see nothing behind it").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	else//remaining chance to do this action (60% chance)
	{
		message.channel.send("You manage to peel some bark off. Underneath you find some sap").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

checkForTracks: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //40 percent chance to do this action
	{
		message.channel.send("You put your nose to the ground to try and searching for tracks. Have you practiced this before even? You can't really find anything").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 60 && randomChance <=80) //remaining chance to do this action (60% chance)
	{
		message.channel.send("You manage to see some tracks, but it looks like they are a couple days old. Not worth following.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You do find some somewhat recent tracks and you decide to follow. The tracks lead you to a small watering hole! You can fill some water here.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 15 minutes
	}
	return;
},

lookForVultures: function(message, user)
{
	message.channel.send("You know circling vultures can sometimes lead to recently dead animals")
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //40 percent chance to do this action
	{
		message.channel.send("You see some in the distance and follow. Too bad it looks like the kill is already being scavanged by hyenas. Best not to interfere").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You're in luck! You see a recently dead zebra. It's sad news for the zebra but it means food for you and your tribe.").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}
	return;
},

sniffFlowers: function(message, user)
{	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //40 percent chance to do this action
	{
		message.channel.send("You stop to smell the roses. Literally. Wait there are roses in Africa?").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}

	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You bend over to sniff the flowers. All of a sudden a bee stings you for disturbing its snack! Wait there are bees in Africa?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

gatherFlowers: function(message, user)
{
	message.channel.send("You gather an armful of flowers. Then you think to yourself, *do these really do anything* so you just drop them").then(msg => {msg.delete(12000)}).catch
	return 600000; //returning this makes a lockout of 10 minutes
},

catchRainWater: function(message, user)
{
	message.channel.send("The large trees still have rain water falling from their leaves. Catching enough water takes a long time, but it could be worth it.").then(msg => {msg.delete(12000)}).catch
	return 1800000; //returning this makes a lockout of 30 minutes
},

searchLeftBush: function(message, user)
{	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //40 percent chance to do this action
	{
		message.channel.send("Nothing too much in here except OW you just got pricked by a thorn").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You push through the leaves of the bush. You found some termites! They could be a great source of protein").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}
	return;
},

searchMiddleBush: function(message, user)
{	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //40 percent chance to do this action
	{
		message.channel.send("Nothing too much in here except OW you just got pricked by a thorn").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You push through the leaves of the bush. Oh WOW there is a tiny spring behind it").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}
	return;
},

searchRightBush: function(message, user)
{	
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //40 percent chance to do this action
	{
		message.channel.send("Nothing too much in here except OW you just got pricked by a thorn").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else//remaining chance to do this action (20% chance)
	{
		message.channel.send("You dig near the base of the bush and you find some grubs! You heard they are a delicacy in these parts").then(msg => {msg.delete(12000)}).catch
		return 600001; //returning this makes a lockout of 10 minutes
	}
	return;
},
searchLeftTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("It’s a nice tree isn’t it?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (30% chance)
	{
		message.channel.send("Please try not to scare off the birds.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

searchMiddleTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("It’s a nice tree isn’t it?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (30% chance)
	{
		message.channel.send("Please try not to scare off the birds.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

searchRightTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 70) //70 percent chance to do this action
	{
		message.channel.send("It’s a nice tree isn’t it?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (30% chance)
	{
		message.channel.send("Please try not to scare off the birds.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

digInNorthDirt: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You dig through the warm dirt for a few minutes but uncover nothing of interest.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("After a small amount of digging you notice how dirty your fingernails are and can’t help but be bothered by it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

digInSouthDirt: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You dig through the warm dirt for a few minutes but uncover nothing of interest.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("After a small amount of digging you notice how dirty your fingernails are and can’t help but be bothered by it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

digInEastDirt: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You dig through the warm dirt for a few minutes but uncover nothing of interest.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("After a small amount of digging you notice how dirty your fingernails are and can’t help but be bothered by it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

digInWestDirt: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("You dig through the warm dirt for a few minutes but uncover nothing of interest.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (20% chance)
	{
		message.channel.send("After a small amount of digging you notice how dirty your fingernails are and can’t help but be bothered by it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

uprootPlants: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("You find that the roots to this plant are strangely deep in the ground. Not worth the effort.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("Why do you want to kill these plants? They’re good for the earth.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

putSandInPocket: function(message, user)
{
	
		message.channel.send("Good idea. This could be useful in case you find yourself in a scuffle later.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

stickHandInHole: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //50 percent chance to do this action
	{
		message.channel.send("You summon the courage and dive your hand into the dark hole. Hmm nothing is here though").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if (randomChance > 60 && randomChance <= 90)//remaining chance to do this action (50% chance)
	{
		message.channel.send("You summon the courage and dive your hand into the dark hole. *HISSSSSSSS* A snake bites the tip of your finger! Looks like you are going to have to take care of this before you move on").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}
	
	else
	{
		message.channel.send("You summon the courage and dive your hand into the dark hole. You grasp something moving down there! It's a little lizard that could be good roasted over a fire").then(msg => {msg.delete(12000)}).catch
		return 600001;
	}
	return;
},

pullGrass: function(message, user)
{
	
		message.channel.send("You start yanking out blades of grass. Now what?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	
},

pickUpPoop: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //50 percent chance to do this action
	{
		message.channel.send("You sure you want to do this? ").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if (randomChance > 60 && randomChance <= 90)//remaining chance to do this action (50% chance)
	{
		message.channel.send("You summon the courage and dive your hand into the dark hole. *HISSSSSSSS* A snake bites the tip of your finger! Looks like you are going to have to take care of this before you move on").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}
	
	else
	{
		message.channel.send("You summon the courage and dive your hand into the dark hole. You grasp something moving down there! It's a little lizard that could be good roasted over a fire").then(msg => {msg.delete(12000)}).catch
		return 600001;
	}
	return;
},

};