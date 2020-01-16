class Castaway
{
	constructor(name)
	{
		this.name = name;
		this.woodCarried = 0;
		this.waterCarried = 0;
		this.foodCarried = 0;
		this.woodLimit = 5;
		this.waterLimit = 5;
		this.foodLimit = 15;
		this.strength = 10;
		this.challengeBuff = 0;
	}
	
	getWoodCarried()
	{
		return this.woodCarried;
	}
	
	getWaterCarried()
	{
		return this.waterCarried;
	}
	
	getFoodCarried()
	{
		return this.foodCarried;
	}
	
	getStrength()
	{
		return this.strength;
	}
	
	getChallengeBuff()
	{
		return this.challengeBuff;
	}
	
	setWoodCarried(x, message)
	{
		if (this.woodCarried + x > this.woodLimit)
		{
			while(this.woodCarried < this.woodLimit)
			{
				this.woodCarried = this.woodCarried + 1;
			}
			message.channel.send("You can only pick up some wood until your maximum you can carry")
			message.channel.send("You are now carrying " + this.woodCarried + " wood")
			return;
		}
		this.woodCarried = this.woodCarried + x
		message.channel.send("You are now carrying " + this.woodCarried + " wood on you")
	}
	
	setFoodCarried(x, message)
	{
		if (this.foodCarried + x > this.foodLimit)
		{
			while(this.foodCarried < this.foodLimit)
			{
				this.foodCarried = this.foodCarried + 1;
			}
			message.channel.send("You can only pick up some food until your maximum you can carry")
			message.channel.send("You are now carrying " + this.foodCarried + " food")
			return;
		}
		this.foodCarried = this.foodCarried + x
		message.channel.send("You are now carrying " + this.foodCarried + " food on you")
	}
	
	setWaterCarried(x, message)
	{
		if (this.waterCarried + x > this.waterLimit)
		{
			while(this.waterCarried < this.waterLimit)
			{
				this.waterCarried = this.waterCarried + 1;
			}
			message.channel.send("You can only pick up some water until your maximum you can carry")
			message.channel.send("You are now carrying " + this.waterCarried + " water")
			return;
		}
		this.waterCarried = this.waterCarried + x
		message.channel.send("You are now carrying " + this.waterCarried + " water on you")
	}
	
	setStrength(x, message)
	{
		this.strength = this.strength + x
		message.channel.send("With this tool. Your strength is now " + this.strength)
		return;
	}
	
	setChallengeBuff (x, message)
	{
		this.challengeBuff = this.challengeBuff + x
		message.channel.send("You new challenge buff score is " + this.challengeBuff + "%!")
		return;
	}
}
module.exports.Castaway = Castaway;