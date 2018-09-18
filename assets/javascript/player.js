function Player(params) {
    this.startingHealth = params.startingHealth;
    this.buttonId = params.buttonId;
    this.name = params.name;
    this.imageUrl = params.imageUrl;
    this.cssSelector = params.cssSelector;
    this.characterId = params.characterId;
    this.alreadyPlayed = 0;
    this.Player1 = 0;
    this.Player2 = 0;
    this.healthPoints = params.healthPoints,
    this.attackPower = params.attackPower,
    this.baseAttackPower = params.attackPower,
    this.counterAttack = params.counterAttack,
    this.counterAttackPercent = params.counterAttackPercent,
    this.increaseAttackPower = function() {
        return this.attackPower = this.attackPower + this.baseAttackPower;
    },
    this.decreaseHealthPoints = function(attackValue) {
        return this.healthPoints = this.healthPoints - attackValue;
    },
    this.getCounterAttack = function() {
        var random = Math.floor(Math.random() * this.counterAttackPercent) + 1;
        var multiplier = random / 100;
        var additional = this.counterAttack * multiplier;
        
        if(this.player1 === 1) {
            return this.counterAttack;
        } else {
            return this.counterAttack + additional;
        }
    }
}