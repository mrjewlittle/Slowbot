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
	message.channel.send("You know circling vultures can sometimes lead to recently dead animals").then(msg => {msg.delete(12000)}).catch
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
standInShadow: function(message, user)
{
	
		message.channel.send("You can feel the cooler air already.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

approachGiraffes: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The giraffes stand up to their full height and you realize just how tall they are.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("The giraffes begin to get closer as well. Maybe this isn’t the best idea…").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;

},

approachElephants: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 100) //50 percent chance to do this action
	{
		message.channel.send("These animals shouldn’t be messed with. Maybe you should take a step back.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

},	

takeABreak: function(message, user)
{
	
		message.channel.send("After your break, you feel refreshed and ready to go.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

checkShrubbery: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //50 percent chance to do this action
	{
		message.channel.send("You check the shrubs and find... nothing. Absolutely nothing.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if (randomChance > 20 && randomChance <= 40)//remaining chance to do this action (50% chance)
	{
		message.channel.send("The shrubs have dark, thorny leaves, not very fun to stick your hand next to.").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 40 && randomChance <= 60)//remaining chance to do this action (50% chance)
	{
		message.channel.send("The shrubbery has some small leaves growing on all its branches.").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 60 && randomChance <= 80)//remaining chance to do this action (50% chance)
	{
		message.channel.send("It's just a large plant.").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}
	
	else
	{
		message.channel.send("There's a small lizard hanging out in the shrubs. It frantically scurries away upon noticing you.").then(msg => {msg.delete(12000)}).catch
		return 600001;
	}
	return;
},

pickUpTreeBranch: function(message, user)
{
	
		message.channel.send("You pick up the branch and lift it over your head. It's like a sword!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

danceInPlain: function(message, user)
{
	
		message.channel.send("You frolick and show up some Fortnite dance moves.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

runUpHill: function(message, user)
{
	
		message.channel.send("After finishing running up the hill, you need a quick breather.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

stickHandInWater: function(message, user)
{
	
		message.channel.send("Now your hand is wet and you don't have anything to wipe it off on. Did you really gain anything?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

runHandThroughGrass: function(message, user)
{
	
		message.channel.send("You run your hand through the grass. While some of it feels nice, most of it is coarse and dry.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

tryToCatchBugs: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("You catch a decently sized bug! Unfortunately, it's not edible.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You try your hardest, but come up empty. Maybe you should try again!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;

},

yell: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("Your loud yell startles a few birds, but not much else.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You see a lion pride all perk their head. Probably time to head out ASAP.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;

},

stompGrass: function(message, user)
{
	
		message.channel.send("You stomp and stomp and stomp, but get nowhere. Maybe the grass doesn't like you.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

approachAardvark: function(message, user)
{
	
		message.channel.send("When you approach, the aardvark runs away in fear.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

tryToStartFire: function(message, user)
{
	
		message.channel.send("Hey, this isn't the camp. Knock it off!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

hideInGrass: function(message, user)
{
	
		message.channel.send("The grass is jsut tall enough to hide you, but maybe it's not the best hiding spot ever.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

yawnLoudly: function(message, user)
{
	
		message.channel.send("How tired are you? Maybe you should take a nap.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

stompInMud: function(message, user)
{
	
		message.channel.send("Nice, you have super dirty shoes now!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

crawlOnGround: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The ground is super dirty. When you get back up, you have a bunch of mud on your shirt.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You try to crawl on the ground, but there’s some scary bugs that make you afraid to get down on the ground.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}
	return;
},

lookForAnimals: function(message, user)
{
	
		message.channel.send("You don’t see anything around you.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

pickALuckyClover: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 99) //50 percent chance to do this action
	{
		message.channel.send("The clover brings no luck; there’s a 1 in 100 chance to find something immensely important, however").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("The idols are hidden in public display; check out your fire pit or water tank and maybe you’ll find it.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes
	}
	return;
},

cloudgaze: function(message, user)
{
	
		message.channel.send("The clouds are beautiful at this time of day.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

huntForBugs: function(message, user)
{
	
		message.channel.send("There just aren’t that many bugs!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

rollDownTheHill: function(message, user)
{
	
		message.channel.send("You nearly twist your ankle rolling, and decide that this is a risky endeavor.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

goInsane: function(message, user)
{
	
		message.channel.send("The sky is calling to you… you try to hear it but it’s very quiet and hard to make out what it’s saying… eventually it becomes more clear and you can make out some words… “Wake up, idiot!” You come to and realize a production member has been yelling at you for the last few minutes. Time to get moving!").then(msg => {msg.delete(12000)}).catch
		return 1200000; //returning this makes a lockout of 10 minutes

},

breakBranch: function(message, user)
{
	
		message.channel.send("The branch snaps fairly easily and falls to the ground, useless.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes

},

liftRocks: function(message, user)
{
	
		message.channel.send("You find a smaller rock there, that looks like it has been deliberately planted there. DM Ryan for more information on the rock.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

performABackHandsrping: function(message, user)
{
	
		message.channel.send("You have the energy to do this, but not win every challenge? That’s slightly worrying.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

tryToBeTallerThanTheGiraffe: function(message, user)
{
	
		message.channel.send("??? You… do know how dumb this looks, right?").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes

},

throwRocks: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The rocks fall and eventually you lose track of them").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("Nice throw! Maybe you should become a baseball player.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

dragFootThroughSand: function(message, user)
{
	
		message.channel.send("You leave a trail similar to the footprints found elsewhere in the desert.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

gazeIntoHorizon: function(message, user)
{
	
		message.channel.send("You are able to talk in the true glory of your surroundings with just this one view.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

searchForPebbles: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("Your search comes up empty. Maybe try somewhere else!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You end your search with a handful of pebbles. What you’ll do with them is up to you.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

hopeForRain: function(message, user)
{
	
		message.channel.send("Your hope for rain comes up fruitless, but that doesn’t mean you should give up.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

makeSandAngel: function(message, user)
{
	
		message.channel.send("When you get up, the sand angel looks alright but not as good as a snow angel.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

sunBathe: function(message, user)
{
	
		message.channel.send("You get a nice tan in the sun and have a relaxed time.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 10 minutes

},

collectSnow: function(message, user)
{
	
		message.channel.send("The snow isn’t going to turn into clean water, might as well dump it out.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

yellAtPeople: function(message, user)
{
	
		message.channel.send("They turn around, wave, and then retreat farther away from you.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

eatSnow: function(message, user)
{
	
		message.channel.send("It tastes like snow! Yum?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

walkOnDune: function(message, user)
{
	
		message.channel.send("The top of the dune brings harsher winds that nearly blow you away.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

runDownHillFast: function(message, user)
{
	
		message.channel.send("You are concerned when you are very sluggish at the end. The scarce food is really taking an impact.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

approachGoats: function(message, user)
{
	
		message.channel.send("The goats all start to herd closer to each other, maybe out of fear").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

throwBottleAtGoats: function(message, user)
{
	
		message.channel.send("The bottle scares the goats who start to scatter").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

chaseGoats: function(message, user)
{
	
		message.channel.send("It becomes clear that the goats are much faster than you. You won’t catch any of them.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

followPrints: function(message, user)
{
	
		message.channel.send("The prints seem to keep going and going and going.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

tryToCoverPrints: function(message, user)
{
	
		message.channel.send("The prints aren’t noticeable at all anymore, but one gust of wind will blow the newly shifted sand off the distinct footprints.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

walkToTheOtherShore: function(message, user)
{
	
		message.channel.send("“It’s cool! The view is a lot different from this side.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

stareAtWater: function(message, user)
{
	
		message.channel.send("It’s a real life oasis and you can hardly believe your eyes. I would stare too!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

climbRightWall: function(message, user)
{
	
		message.channel.send("You get halfway up before falling, a sign that this is a wall which would prefer to remain unclimbed.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

grabWallVine: function(message, user)
{
	
		message.channel.send("The vine snaps when you pull on it.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

standUnderWaterfall: function(message, user)
{
	
		message.channel.send("It’s the highest pressure shower you’ve ever taken; isn’t it wonderful?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

checkForMarkings: function(message, user)
{
	
		message.channel.send("There’s a faint marking that you’ll need a code to decipher. Where can you find this code….").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

climbCliffs: function(message, user)
{
	
		message.channel.send("You fall while climbing. That’s an hour of no exploration for you.").then(msg => {msg.delete(12000)}).catch
		return 6000000; //returning this makes a lockout of 10 minutes

},

chaseBirds: function(message, user)
{
	
		message.channel.send("The moment the birds notice you, they fly away in a mass cluster").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

throwRockAtBirds: function(message, user)
{
	
		message.channel.send("The birds begin to swarm you before flying off. What a jerk move!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

peerThroughWindow: function(message, user)
{
	
		message.channel.send("You swear you can see someone move in front of the window… is it a ghost?").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

runHandOverWall: function(message, user)
{
	
		message.channel.send("The wall is dusty and clearly incredibly old, and you worry it might collapse with any more pressure").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

digThroughRubble: function(message, user)
{
	
		message.channel.send("You find an odd looking piece of metal. Perhaps it belongs to whoever owned the building these ruins once were.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

checkBasement: function(message, user)
{
	
		message.channel.send("You hear something drop in the pitch black… nobody should be down here besides you. Run.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 10 minutes

},

inspectLeaves: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("The leaves are extremely big and much larger than the leaves on any trees at home. Welcome to the jungle.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("Leaves! These are just like the ones at home.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

shakeBranches: function(message, user)
{
	
		message.channel.send("You think you hear something falling, but then realize it’s just another branch.").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes

},

lickMoss: function(message, user)
{
	
		message.channel.send("... Why?").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes

},

whistle: function(message, user)
{
	
		message.channel.send("Your loud whistle rings through your surroundings").then(msg => {msg.delete(12000)}).catch
		return 300000; //returning this makes a lockout of 10 minutes

},

walkInCircles: function(message, user)
{
	
		message.channel.send("After a few minutes of doing this, you realize that you’re going to get yourself lost").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

lookAtBug: function(message, user)
{
	
		message.channel.send("The bug just stares back with menacing eyes, showing that it’s not messing around.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

brushOver: function(message, user)
{
	
		message.channel.send("You need a key to open what’s in the wooden object deep in the jungle").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

checkForTreeHoles: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50 percent chance to do this action
	{
		message.channel.send("Bam! You search the hole and find that a wasp has come charging out and stung you.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("There’s nothing of note in the tree or its holes.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	return;
},

swingOnVines: function(message, user)
{
	
		message.channel.send("While it’s certainly a lot of fun, you’re no Tarzan. Maybe it’s time to go check something else out.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

kickTree: function(message, user)
{
	
		message.channel.send("The tree doesn’t budge a bit. Now all you have is a busted toe.").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 10 minutes

},

pokeSnake: function(message, user)
{
	
		message.channel.send("Are you seriously trying this? This snake looks like its about to kill you!").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

climbOverBranch: function(message, user)
{
	
		message.channel.send("You carefully and safely climb over the branch, steering clear of any dangerous hazards").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

stareAtSnake: function(message, user)
{
	
		message.channel.send("You’re losing the staring contest when all of the sudden, the snake lashes out. However, you see it blink as you duck away and you know you’re the true winner. Make sure not to become the snake’s lunch.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

makeFaces: function(message, user)
{
	
		message.channel.send("Nobody in the entire safari notices you making silly faces, so the effect is negligible at best.").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

pickUpSnake: function(message, user)
{
	
		message.channel.send("Enjoy the venom coursing through your body as you spend 2 hours paralyzed in place").then(msg => {msg.delete(12000)}).catch
		return 12000000; //returning this makes a lockout of 10 minutes

},

crushPlants: function(message, user)
{
	
		message.channel.send("Why’d you have to do that? What did the plants do to you").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

crawlOnTheJungleFloor: function(message, user)
{
	
		message.channel.send("The jungle floor is covered in grasses and moss. Be careful not to upset any of the wild creatures on the ground level").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

jumpInTheAir: function(message, user)
{
	
		message.channel.send("You have fun jumping, but quickly realize that it makes you vulnerable for a snake to swoop down and attack").then(msg => {msg.delete(12000)}).catch
		return 900000; //returning this makes a lockout of 10 minutes

},

inspectWeirdTree: function(message, user)
{
	
		message.channel.send("There’s some weird fruits hanging from the tree but they don’t look very edible").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

chewOnFlowers: function(message, user)
{
	
		message.channel.send("Yuck, these don't taste too good. Best you spit them out. ").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes

},

pickBerries: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 20) //50 percent chance to do this action
	{
		message.channel.send("Your not quite sure what is edible and what isn't. Best not to try picking any").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else if (randomChance > 20 && randomChance <= 40)//remaining chance to do this action (50% chance)
	{
		message.channel.send("You only find inedbile berries here. Aw shucks").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 40 && randomChance <= 60)//remaining chance to do this action (50% chance)
	{
		message.channel.send("It seems this bush has been picked dry").then(msg => {msg.delete(12000)}).catch
		return 600000; //returning this makes a lockout of 10 minutes
	}

	else if (randomChance > 60 && randomChance <= 80)//remaining chance to do this action (50% chance)
	{
		message.channel.send("This isn't a berry bush. It's a poison oak bush!").then(msg => {msg.delete(12000)}).catch
		return 1800000; //returning this makes a lockout of 10 minutes
	}
	
	else
	{
		message.channel.send("You manage to find some berries that look good to eat. SCORE").then(msg => {msg.delete(12000)}).catch
		return 600001;
	}
	return;
},

};