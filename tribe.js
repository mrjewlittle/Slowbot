class Tribe
{
	constructor(name)
	{
		this.name = name;
		this.woodStorage = 0;
		this.waterStorage = 100;
		this.foodStorage = 50;
		this.fireLevel = 0;
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
	
	getFireLevel()
	{
		return this.fireLevel;
	}

	setWoodStorage(x, message)
	{
		if (this.woodStorage + x > 100)
		{
			message.channel.send("The wood pile storage does not have enough space. Please put less into the pile").then(msg => {msg.delete(6000)}).catch
			return;
		}
		message.channel.send("Added " + x + " wood to the wood pile").then(msg => {msg.delete(6000)}).catch
		this.woodStorage = this.woodStorage + x
	}
	
	setFoodStorage(x, message)
	{
		if (this.foodStorage + x > 150)
		{
			message.channel.send("The food storage does not have enough space. Please put less into the storage container").then(msg => {msg.delete(6000)}).catch
			return;
		}
		message.channel.send("Added " + x + " food to storage").then(msg => {msg.delete(6000)}).catch
		this.foodStorage = this.foodStorage + x
	}
	
	setWaterStorage(x, message)
	{
		if (this.waterStorage + x > 300)
		{
			message.channel.send("The water tank does not have enough space. Please put less into the tank").then(msg => {msg.delete(6000)}).catch
			return;
		}
		message.channel.send("Added " + x + " water to the tank").then(msg => {msg.delete(6000)}).catch
		this.waterStorage = this.waterStorage + x
	}
	
	setFireLevel (x)
	{
		this.fireLevel = x;
		return;
	}
	
	waterDecay(message)
	{
		this.waterStorage = Math.floor(this.waterStorage * .75)
		message.channel.send("Water for " + this.name + " has been decayed").then(msg => {msg.delete(6000)}).catch
	}
	
	foodDecay()
	{
		this.foodStorage = Math.floor(this.foodStorage * .5)
		message.channel.send("Food for " + this.name + " has been decayed").then(msg => {msg.delete(6000)}).catch
	}
}
module.exports.Tribe = Tribe;