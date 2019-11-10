class Tribe
{
	constructor(name)
	{
		this.name = name;
		this.woodStorage = 0;
		this.waterStorage = 100;
		this.foodStorage = 50;
	}
	
	getWoodStorage()
	{
		return this.woodStorage;
	}
	
	getWaterStorage()
	{
		return this.waterStorage;
	}
	
	getFoodStorage()
	{
		return this.foodStorage;
	}

	setWoodStorage(x, message)
	{
		if (this.woodStorage + x > 100)
		{
			message.channel.send("The wood pile storage does not have enough space. Please put less into the pile")
			return;
		}
		message.channel.send("Added " + x + " wood to the wood pile")
		this.woodStorage = this.woodStorage + x
	}
	
	setFoodStorage(x, message)
	{
		if (this.foodStorage + x > 150)
		{
			message.channel.send("The food storage does not have enough space. Please put less into the storage container")
			return;
		}
		message.channel.send("Added " + x + " food to storage")
		this.foodStorage = this.foodStorage + x
	}
	
	setWaterStorage(x, message)
	{
		if (this.waterStorage + x > 300)
		{
			message.channel.send("The water tank does not have enough space. Please put less into the tank")
			return;
		}
		message.channel.send("Added " + x + " water to the tank")
		this.waterStorage = this.waterStorage + x
	}
}
module.exports.Tribe = Tribe;