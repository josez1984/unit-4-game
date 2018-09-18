function App(params) {
    this.backgrounds = backgrounds;
    this.gameInProgress = 0;
    this.currentEnemyId = 0;
    this.currentPage = 'home-page'; 
    this.characters = characters;   
    this.player1Key = "";
    this.player2Key = "";
    this.characterPlaceholderImgUrl = "assets/images/player_images/silhouette-d-homme-anonyme-avec-le-point-d-interrogation-39163454.jpg";
}

function backgrounds() {
    return [
        'assets/images/background_images/Force-Star-Wars-Background-for-Desktop.jpg',
        'assets/images/background_images/lego-star-wars-wallpaper-background.jpg',
        'assets/images/background_images/Star-Wars-Background-Battle.jpg',
        'assets/images/background_images/Star-Wars-Background-Sith.jpg',
        'assets/images/background_images/star-wars-wallpaper-3.jpg',
        'assets/images/background_images/Star-Wars-Wallpaper-HD-Robot.jpg',
        'assets/images/background_images/star-wars-wallpaper.jpg'
    ];
}

function characters() {
    var character1Obj = new Player({
        imageUrl: 'assets/images/player_images/star_wars__the_last_jedi_luke_skywalker__blue__by_britmodtokyo-dbx41e2_CROPPED.png',
        cssSelector: '#character1',
        name: 'Luke Skywalker',
        buttonId: 'character-select-button-1',
        characterId: 1,
        healthPoints: 400,
        attackPower: 65,
        counterAttack: 45,
        counterAttackPercent: 15
    });

    var character2Obj = new Player({
        startingHealth: 300,
        imageUrl: 'assets/images/player_images/s-l1600.jpg',
        cssSelector: '#character2',
        name: 'Darth Vader',
        buttonId: 'character-select-button-2',
        characterId: 2,
        healthPoints: 400,
        attackPower: 75,
        counterAttack: 20,
        counterAttackPercent: 12
    });

    var character3Obj = new Player({
        startingHealth: 300,
        imageUrl: 'assets/images/player_images/darth_maul_by_crystalsully-d806dst_CROPPED.jpg',
        cssSelector: '#character3',
        name: 'Darth Maul',
        buttonId: 'character-select-button-3',
        characterId: 3,
        healthPoints: 400,
        attackPower: 50,
        counterAttack: 35,
        counterAttackPercent: 50
    });

    var character4Obj = new Player({
        imageUrl: 'assets/images/player_images/Boba2_CROPPED.jpg',
        cssSelector: '#character4',
        name: 'Boba Fett',
        buttonId: 'character-select-button-4',
        characterId: 4,
        healthPoints: 300,
        attackPower: 40,
        counterAttack: 40,
        counterAttackPercent: 26
    });

    return {
        character1: character1Obj,
        character2: character2Obj,
        character3: character3Obj,
        character4: character4Obj
    };
}