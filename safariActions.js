var DiscordBot = require('./testbot.js')
var later = require('later');
var tribe = require('./tribe.js');
var castaway = require('./castaway.js')


module.exports = {

layInSun: function(message, user)
{
	message.channel.send("Really? You don’t think you’re getting enough sun as it is? Either way you lay down for a few minutes")
	return 600000; //returning this makes a lockout of 10 minutes
}, //timeout player 600000 = 10 Minutes

climbTallerTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 75)//75% chance to do this action
	{
		message.channel.send("You try to climb the tall tree, but the branches are very high and you expend all your energy failing to get a grab on one.")
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (25% chance)
	{
		message.channel.send("You just manage to get a grip on one of the tree branches and pull yourself up to get a gorgeous view of the jungle floor that you haven’t seen before. However, the only notable thing in sight is the camp boma.")
		return 300000; //returning this makes a lockout of 5 minutes
	}
},

climbSmallerTree: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 50) //50% chance to do this action
	{
		message.channel.send("You try to climb the tree, but struggle to get any solid footing and fall back to the ground, slightly dazed. ")
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (50% chance)
	{
		message.channel.send("You are able to find a solid branch to secure yourself onto, but are disappointed by not finding anything of value.")
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

digInSand: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 60) //60 percent chance to do this action
	{
		message.channel.send("You dig through the sand, but are unable to find anything except for the sand itself.")
		return 600000; //returning this makes a lockout of 10 minutes
	}
	
	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("You start to dig through the sand and come across a sand crab, who scuffles away after being discovered.")
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

whistleWithGrass: function(message, user)
{
	var randomChance = Math.floor(Math.random() * 100) + 1; //creates a random number from 1 to 100. Use for percent chance
	if (randomChance <= 80) //80 percent chance to do this action
	{
		message.channel.send("It’s not working. You’re blowing wrong, or something.")
		return 300000; //returning this makes a lockout of 5 minutes
	}
	
	else //remaining chance to do this action (40% chance)
	{
		message.channel.send("Ahh you did it! It made the whistle sound, see?... *whistle*")
		return 300000; //returning this makes a lockout of 5 minutes
	}
	return;
},

};