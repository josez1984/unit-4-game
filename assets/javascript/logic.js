$(document).ready(function() {
    hideAllDivs();

    var app = new App();
    var charactersObj = characters();
    app.characters = charactersObj;

    pageLoad(app);
    app.gameInProgress = 0;

    $("#new-game").on("click", function() {
        startNewGame(app);
    });

    $("#nav-home-link").on("click", function() {
        homePage();
    });

    $("#player1-start-over-btn").on("click", function() {
        restart(app);
    });
});

function hideAllDivs() {
    $(".home-page").hide();
    $(".character-select").hide();
    $(".battlefield").hide();
    $("#player1-attack-status-div").hide();
    $("#player1-start-over-div").hide();
}

function navHomeLinkClick(app) {
    if(app.gameInProgress === 1) {

    } else {

    }
}

function setBackground() {
    var bkurls = backgrounds();
    $("#background-image").css('background-image', 'url(' + bkurls[randN(bkurls.length, 0)] + ')');
}

function randN(multiplier, plus) {
    return Math.floor(Math.random() * multiplier) + plus;
}

function checkIfGameIsRunning(app) {
    if(app.gameInProgress == 1) {
        showAlert("A game is currently in progress.", 1, 2500);
    } else {
        startNewGame(app);      
    }
}  

function startNewGame(app) {
    characterSelect();
    $.each(app.characters, function(key, value) {
        value.alreadyPlayed = 0;
    });
}

function restart(app) {
    location.reload(true);
}

function showAlert(message, autoClose, autoCloseTime) {
    var alertId = "alert" + randN(100000, 1);
    $('#alert-placeholder').prepend('<div id="' + alertId + '" class="alert alert-custom alert-dismissible fade show bg-dark"><a id="alert-text" class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    if(autoClose == 1) {
        setTimeout(function() { 
            $("#" + alertId ).alert('close');
        }, autoCloseTime);
    };
    return alertId;
};

function clearAllAlerts() {
    $(".alert").alert('close');
}

function confirmWindow() {
    bootbox.confirm({
        message: "There is a game already going on. Do you want to start a new game?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
        }
    });
}

function displayDiv(divClass, show) {
    if(show === 1) {
        $(divClass).slideDown( "slow" );
    } else {
        $(divClass).slideUp( "slow" );
    }
};

function pageLoad(app) {
    homePage(app);
    loadCharacterSelectScreen(app);
}

function homePage() {
    displayDiv(".home-page", 1);
    displayDiv(".test-hide-page", 0);
    displayDiv(".character-select", 0); 
    displayDiv(".battlefield", 0); 
    window.scrollTo(0, 0);
    setBackground();
}

function characterSelect() {
    showAlert("Select a character", 1, 2500);    
    displayDiv(".home-page", 0);
    displayDiv(".battlefield", 0); 
    displayDiv(".character-select", 1); 
    window.scrollTo(0, 0);
    setBackground();
}

function showBattleField() {
    displayDiv(".home-page", 0);
    displayDiv(".character-select", 0); 
    displayDiv(".battlefield", 1);
    window.scrollTo(0, 0);
    setBackground();
}

function battleField(app, players) {
    app.gameInProgress = 1;    
    setBackground();
    showBattleField()
    showAlert("Battle begin!", 1, 2500);    
    $(".player1-attack").on("click", function() {
        attack(app, players);
    });
}

function setupEnemies(app) {
    $('#enemy-select-row').empty();
    $.each(app.characters, function(key, value) {
        if(value.player1 !== 1) {
            var buttonSelector = 'enemy-select-button' + value.characterId;
            var imageSelector = 'enemy-select-image' + value.characterId;
            var htmlString = enemySelectHtml(value, buttonSelector, imageSelector);

            $('#enemy-select-row').append(htmlString);
            $("#attack-button-div").slideUp(350);

            $("#" + buttonSelector).on("click", function() {
                if(value.alreadyPlayed === 1) {
                    showAlert(value.name + " Has already played", 1, 2500);    
                } else {
                    showAlert("Fighting " + value.name, 1, 2500);

                    $("#battlefield-player2-image").slideUp(350, function() {
                        $("#battlefield-player2-image").attr("src",value.imageUrl);
                    }).slideDown(350);

                    $( "#" + imageSelector ).fadeTo( "slow" , 0.2);

                    $(".player2-div").find(".card-header").text(value.name);
                    $("#player2-status-header").text(value.name);
                    
                    value.player2 = 1;
                    value.alreadyPlayed = 1;
                    app.player2Key = key;
                    value.attackPower = undefined;

                    updateStats(app.characters);

                    $("#enemy-select-row-container").slideUp(350);
                    $("#attack-button-div").slideDown(350);  
                    $("#" + app.currentMessageId).alert('close');

                    setTimeout(setBackground(), 1000);
                }
            });
        }
    });
}

function enemySelectHtml(player, buttonSelector, imageSelector) {
    return '<div class="col-4">'
            + '<img id="' + imageSelector + '" class="fade-in-out category-banner img-fluid" src="' + player.imageUrl + '">'
            + '<button id="' + buttonSelector + '" type="button" class="click-gloss-effect btn btn-dark btn-sm box-clear-dark">' + player.name + '</button>'
        + '</div>';
}

function loadCharacterSelectScreen(app) {
    console.log(app.characters);
    $.each( app.characters, function( key, value ) {
        var card = htmlCard(value, 'character-select-button' + value.characterId);

        $(".character-select-row").append(card);
        $("#character-select-button" + value.characterId).on("click", function() {
            showAlert(value.name, 1, 2500);

            $("#battlefield-player1-image").slideUp(350, function() {
                $("#battlefield-player1-image").attr("src",value.imageUrl);
            }).slideDown(350);

            $(".player1-div").find(".card-header").text(value.name);
            $("#player1-status-header").text(value.name);

            value.player1 = 1;
            app.player1Key = key;

            setupEnemies(app, app.characters);
            battleField(app, app.characters);
            updateStats(app.characters);

            $("#battlefield-player2-image").slideDown(350, function() {
                $("#battlefield-player2-image").attr("src",app.characterPlaceholderImgUrl);
            }).slideDown(350);
        });
    });
}

function setNextEnemy(players) {
    $.each(players, function(key, value) {
        if(value.player1 !== 1) {
            if(value.player2 !==1) {
                if(value.alreadyPlayed !== 1) {
                    value.player2 = 1;
                    value.alreadyPlayed = 1;

                    $("#battlefield-player2-image").attr('src', value.imageUrl);
                    $(".player2-div").find(".card-header").text(value.name);

                    return false;
                }
            }
        }
    });
}

function htmlCard(player, buttonSelector) {
    return '<div class="col-sm p-2">'
        + '<div class="card box-clear-dark">'
            + '<img class="card-img-top" src="' + player.imageUrl + '" alt="Card image cap">'
                + '<div class="card-body">'
                    + '<div class="text-center">'
                        + '<button id="' + buttonSelector + '"class="click-gloss-effect btn btn-block btn-dark">' + player.name  + '</button>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</div>';
}

function gameLost(app, enemyName) {
    // For now...
    // bootbox.alert({
    //     message: "You were defeated by " + enemyName + ". Thanks for playing.",
    //     className: 'box-clear-dark'
    // });
    startOverStatus(app, "You've lost the game.");
}

function gameWon(app) {
    // For now...
    // bootbox.alert({
    //     message: "You won the game. Thanks for playing.",
    //     className: 'box-clear-dark'
    // });
    startOverStatus(app, "You've won the game.");
}

function enemiesLeft(app) {
    var enemiesLeft = 0;
    $.each(app.characters, function(key, value) {
        if(value.alreadyPlayed === 0 && value.player1 !== 1) { 
            enemiesLeft = enemiesLeft + 1; 
        }
    });
    return enemiesLeft;
}

function startOverStatus(app, message) {
    displayDiv("#attack-button-div", 0);
    displayDiv("#player1-start-over-div", 1);
    $("#player1-start-over-div p").text(message);
    $("#" + app.currentMessageId).alert('close');
}

function gameStatusCheck(app) {
    var enemiesLeftN = enemiesLeft(app);
    if(enemiesLeftN === 0) {
        gameWon(app);
    } else if(app.characters[app.player1Key].healthPoints <= 0) {
        gameLost(app);
    } else if(app.characters[app.player2Key].healthPoints <= 0) {
        bootbox.alert({
            message: "You have defeated " + app.characters[app.player2Key].name + ". Please choose another enemy.",
            className: 'box-clear-dark'
        });        
    }
}

function attack(app, players) {
    if(app.player2Key.length > 0) {
        showAlert("Attacking the opponent!", 1, 1000); 

        app.characters[app.player2Key].decreaseHealthPoints(app.characters[app.player1Key].attackPower);
        app.characters[app.player1Key].increaseAttackPower();
        updateStats(app.characters);

        if(app.characters[app.player2Key].healthPoints <= 0) {
            $(".player2-div").find(".card-header").text("Choose an enemy");
            showAlert("You have won this battle.", 1, 1000); 

            $("#battlefield-player2-image").slideUp(350, function() {
                $("#battlefield-player2-image").attr("src",app.characterPlaceholderImgUrl);
            }).slideDown(350);

            app.currentMessageId = showAlert("Please choose another enemy player.", 0, 0);

            $("#enemy-select-row-container").slideDown(350);
            $("#attack-button-div").slideUp(350);
            $("#battlefield-player2-image").slideDown(350, function() {
                $("#battlefield-player2-image").attr("src",app.characterPlaceholderImgUrl);
            }).slideDown(350);

            gameStatusCheck(app);

            app.characters[app.player2Key].player2 = 0;
            app.player2Key = "";
        } else {
            displayDiv("#player1-attack-div", 0);
            displayDiv("#player1-attack-status-div", 1);

            $("#player1-attack-status-text").text("Waiting on enemy attack.");
            
            // Enemy attack sequence start
            setTimeout(function() {

                $("#player1-attack-status-text").text(app.characters[app.player2Key].name + " is attacking back");
                showAlert(app.characters[app.player2Key].name + " Is attacking back", 1, 1000); 

                setTimeout(function() {
                    var damage = Math.ceil(app.characters[app.player2Key].getCounterAttack());
                    $("#player1-attack-status-text").text(app.characters[app.player2Key].name + " attacked back and caused " + damage + " HP damage.");
                    showAlert("- " + damage + " HP.", 1, 1000);
                    
                    setTimeout(function() {
                        app.characters[app.player1Key].decreaseHealthPoints(damage);
                        updateStats(app.characters);
                        displayDiv("#player1-attack-status-div", 0);
                        displayDiv("#player1-attack-div", 1);
                    }, 2000);

                }, 1000);

            }, randN(1000, 1000));
            
            gameStatusCheck(app);
        }
    } else {
        showAlert("Select an enemy before attacking.", 1, 2500); 
        $("#enemy-select-row-container").slideDown(350);
    }
}

var attackBtnAction = function(btn, status, message) {
    displayDiv("#player1-attack-div", btn);
    displayDiv("#player1-attack-status-div", status);
    $("#player1-attack-status-text").text(message);
    
}

function actionCard() {
    return '<div class="col-sm p-2">'
    + '<div class="card box-clear-dark">'
        + '<img class="card-img-top" src="' + player.imageUrl + '" alt="Card image cap">'
            + '<div class="card-body">'
                + '<div class="text-center">'
                    + '<button id="' + buttonSelector + '"class="click-gloss-effect btn btn-block btn-dark">' + player.name  + '</button>'
                + '</div>'
            + '</div>'
        + '</div>'
    + '</div>';
}

function updateStats(players) {
    $.each(players, function(key, value) {
        var key = '';
        if(value.player1 === 1) {
            key = 'player1';
        } else if (value.player2 === 1) {
            key = 'player2';
        } else {
            return;
        }
        $(".health-power").find("." + key).text(value.healthPoints);
        $(".attack-power").find("." + key).text(value.attackPower);
        $(".counter-attack").find("." + key).text(value.counterAttack);
    });
}

function findPlayer(playerN, players) {
    var obj = {};
    $.each(players, function(key, value) {
        if(playerN === 1 && players.player1 === 1) {
            obj = value;
        } else if (playerN === 2 && players.player2 === 1) {
            return value;
        }
    });
}

function newAlertDelayed(message, delayTime) {
    setTimeout(function(messageString){
        showAlert(messageString, 1, 2500);    
    }, delayTime, message);
};

