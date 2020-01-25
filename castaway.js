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
		this.hasDrank = 0;
		this.hasEaten = 0;
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
			message.channel.send("You can only pick up some wood until your maximum you can carry").then(msg => {msg.delete(12000)}).catch
			message.channel.send("You are now carrying " + this.woodCarried + " wood").then(msg => {msg.delete(12000)}).catch
			return;
		}
		this.woodCarried = this.woodCarried + x
		message.channel.send("You are now carrying **" + this.woodCarried + " wood on you**").then(msg => {msg.delete(12000)}).catch
	}
	
	setFoodCarried(x, message)
	{
		if (this.foodCarried + x > this.foodLimit)
		{
			while(this.foodCarried < this.foodLimit)
			{
				this.foodCarried = this.foodCarried + 1;
			}
			message.channel.send("You can only pick up some food until your maximum you can carry").then(msg => {msg.delete(12000)}).catch
			message.channel.send("You are now carrying **" + this.foodCarried + " food**").then(msg => {msg.delete(12000)}).catch
			return;
		}
		this.foodCarried = this.foodCarried + x
		message.channel.send("You are now carrying " + this.foodCarried + " food on you").then(msg => {msg.delete(12000)}).catch
	}
	
	setWaterCarried(x, message)
	{
		if (this.waterCarried + x > this.waterLimit)
		{
			while(this.waterCarried < this.waterLimit)
			{
				this.waterCarried = this.waterCarried + 1;
			}
			message.channel.send("You can only pick up some water until your maximum you can carry").then(msg => {msg.delete(12000)}).catch
			message.channel.send("You are now carrying **" + this.waterCarried + " water**").then(msg => {msg.delete(12000)}).catch
			return;
		}
		this.waterCarried = this.waterCarried + x
		message.channel.send("You are now carrying " + this.waterCarried + " water on you").then(msg => {msg.delete(12000)}).catch
	}
	
	setStrength(x, message)
	{
		this.strength = this.strength + x
		message.channel.send("With this tool. Your strength is now " + this.strength).then(msg => {msg.delete(12000)}).catch
		return;
	}
	
	setChallengeBuff (x, message)
	{
		this.challengeBuff = this.challengeBuff + x
		message.channel.send("You new challenge buff score is " + this.challengeBuff + "%!").then(msg => {msg.delete(12000)}).catch
		return;
	}
}
module.exports.Castaway = Castaway;