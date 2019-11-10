class Castaway
{
	constructor(name)
	{
		this.name = name;
		this.woodCarried = 0;
		this.waterCarried = 0;
		this.foodCarried = 0;
		this.woodLimit = 10;
		this.waterLimit = 5;
		this.foodLimit = 15;
		this.strength = 10;
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
		message.channel.send("You are now carrying " + x + " wood on you")
		
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
		message.channel.send("You are now carrying " + x + " food on you")
		
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
		message.channel.send("You are now carrying " + x + " water on you")
		
	}
	
	setStrength(x, message)
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
		message.channel.send("You are now carrying " + x + " wood on you")
		
	}
}
module.exports.Castaway = Castaway;