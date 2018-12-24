$(document).ready(function () {
    var chosenEnemy, randomDmg, randomDmgFlag, randomDmgRange, rawDmg, totalDmg, percentOfXpLost, percentOfGoldLost;

    var levels = [0, 150, 650, 1200, 1800, 3000, 5000, 8000]

    //sets the scene to the home screen
    goHome = function () {
        setPlayerInfo();
        $(".panel").hide();
        $(".home").show();
        $("#right-header").html("Inventory");
        $("#middle-header").html("Camp");
        $(".attackBtn").prop("disabled", false)
        setInvInfo();
        //reset stats if player returns home dead
        if (player.health <= 0) {
            player.health = player.maxHealth;
            setPlayerInfo();
        }
        //checks if you have meat...if so then show button
        if (player.inventory[0].qty > 0) {
            $(".eatBtnContainer").show();
        }
    };

    //sets the scene to combat screen
    goCombat = function () {
        $(".panel").hide();
        $(".combat").show();
        $("#right-header").html("Enemy");
        $("#middle-header").html("Combat");
    }

    //sets inventory info
    setInvInfo = function () {
        $(".inv-text").empty();
        $(".gold-text").html(player.gold.name + " x" + player.gold.qty);
        //do a for loop to check if players items quantity are greater than 0, if so show the items
        for (i = 0; i < player.inventory.length; i++) {
            if (player.inventory[i].qty > 0) {
                $(".inv-text").append(player.inventory[i].name + " x" + player.inventory[i].qty + "<br>");
            }
        }
    }

    //checks if the player has leveled up and lets the player know
    checkIfLvldUp = function () {
        if (player.xp >= levels[player.level]) {
            player.level++
            player.maxHealth = player.maxHealth + player.level * 20;
            player.health = player.maxHealth;
            $("#textbox-text").prepend("You leveled up!" + "<br>")
        }
    }

    //sets the player's current stats
    setPlayerInfo = function () {
        $("#p-level-text").html("Lv: " + player.level);
        $("#p-xp-text").html("Exp: " + player.xp + "/" + levels[player.level])
        $("#p-health-text").html("Health: " + player.health + "/" + player.maxHealth);
        $("#p-stamina-text").html("Stamina: " + player.stamina);
        $("#p-strength-text").html("Strength: " + player.strength);
    };

    //sets the enemy's current stats
    setEnemyInfo = function () {
        $("#e-name-text").html(chosenEnemy.name);
        $("#e-level-text").html("Lv: " + chosenEnemy.level);
        $("#e-health-text").html("Health : " + chosenEnemy.health + "/" + chosenEnemy.maxHealth);
        $("#e-stamina-text").html("Stamina: " + chosenEnemy.stamina);
        $("#e-strength-text").html("Strength: " + chosenEnemy.strength);
    };

    //function for player default attack
    regPlayerAttack = function () {
        //random boolean to determine if its going to be 10% dmg of positive or negative
        randomDmgFlag = Math.round(Math.random());
        //the 10% will be added on
        if (randomDmgFlag === 1) {
            rawDmg = Math.round((player.level * 3 + player.strength * 8) - (chosenEnemy.stamina * 2));
            console.log("raw dmg: " + rawDmg);
            randomDmgRange = (15.0 / 100) * rawDmg;
            console.log("rdm dmg range: " + randomDmgRange);
            randomDmg = Math.floor(Math.random() * (randomDmgRange - 0) + 0);
            console.log("random dmg: " + randomDmg);
            totalDmg = rawDmg + randomDmg;
            console.log("total dmg: " + totalDmg);
            chosenEnemy.health -= totalDmg;
            console.log("----------------");
            $("#textbox-text").prepend("You attacked the " + chosenEnemy.name + " for " + totalDmg + " damage." + "<br>");
        }
        //the 10% will be subtracted
        else {
            rawDmg = Math.round((player.level * 3 + player.strength * 8) - (chosenEnemy.stamina * 2));
            console.log("raw dmg: " + rawDmg);
            randomDmgRange = (15.0 / 100) * rawDmg;
            console.log("rdm dmg range: " + randomDmgRange);
            randomDmg = Math.floor(Math.random() * (randomDmgRange - 0) + 0);
            console.log("random dmg: " + randomDmg);
            totalDmg = rawDmg - randomDmg;
            console.log("total dmg: " + totalDmg);
            chosenEnemy.health -= totalDmg;
            console.log("----------------");
            $("#textbox-text").prepend("You attacked the " + chosenEnemy.name + " for " + totalDmg + " damage." + "<br>");
        }
    }

    //function for enemies default attack
    regEnemyAttack = function () {
        //random boolean to determine if its going to be 10% dmg of positive or negative
        randomDmgFlag = Math.round(Math.random());
        //the 10% will be added on
        if (randomDmgFlag === 1) {
            rawDmg = Math.round((chosenEnemy.level * 3 + chosenEnemy.strength * 8) - (player.stamina * 2));
            console.log("raw dmg: " + rawDmg);
            randomDmgRange = (15.0 / 100) * rawDmg;
            console.log("rdm dmg range: " + randomDmgRange);
            randomDmg = Math.floor(Math.random() * (randomDmgRange - 0) + 0);
            console.log("random dmg: " + randomDmg);
            totalDmg = rawDmg + randomDmg;
            console.log("total dmg: " + totalDmg);
            player.health -= totalDmg;
            console.log("----------------");
            $("#textbox-text").prepend(chosenEnemy.name + " attacked you for " + totalDmg + " damage." + "<br>");
        }
        //the 10% will be subtracted
        else {
            rawDmg = Math.round((chosenEnemy.level * 3 + chosenEnemy.strength * 8) - (player.stamina * 2));
            console.log("raw dmg: " + rawDmg);
            randomDmgRange = (15.0 / 100) * rawDmg;
            console.log("rdm dmg range: " + randomDmgRange);
            randomDmg = Math.floor(Math.random() * (randomDmgRange - 0) + 0);
            console.log("random dmg: " + randomDmg);
            totalDmg = rawDmg - randomDmg;
            console.log("total dmg: " + totalDmg);
            player.health -= totalDmg;
            console.log("----------------");
            $("#textbox-text").prepend(chosenEnemy.name + " attacked you for " + totalDmg + " damage." + "<br>");
        }
    }

    checkIfKilledAnimal = function () {
        if (chosenEnemy.health <= 0) {
            player.xp += chosenEnemy.xpReward;
            player.inventory[0].qty += chosenEnemy.loot[0].drop;
            $("#textbox-text").prepend("Loot: " + chosenEnemy.loot[0].name + " x" + chosenEnemy.loot[0].drop + "<br>");
            $("#textbox-text").prepend("You've gained " + chosenEnemy.xpReward + " Exp!" + "<br>");
            $("#textbox-text").prepend("You've killed the " + chosenEnemy.name + "!" + "<br>");
            $(".backButton").show();
            if (chosenEnemy.health <= 0) { $(".attackBtn").prop("disabled", true); }

        }
    }

    checkIfPlayedDied = function () {
        if (player.health <= 0) {
            setPlayerInfo();
            $(".attackBtn").prop("disabled", true);
            $(".backButton").show();
            percentOfXpLost = Math.round((30.0 / 100) * player.xp);
            player.xp -= percentOfXpLost;
            $("#textbox-text").prepend("The " + chosenEnemy.name + " has killed you!" + "<br>");



            if (player.gold.qty > 10) {
                percentOfGoldLost = Math.round((15.0 / 100) * player.gold.qty);
                player.gold.qty -= percentOfGoldLost
            }

        }
    }
















    //when the game is first booted
    goHome();
    setPlayerInfo();

    //when you click on the go hunting button
    $(".huntingBtn").on("click", function () {
        goCombat();
        chosenEnemy = animals[Math.floor(Math.random() * animals.length)];
        $("#textbox-text").prepend("You've found a " + chosenEnemy.name + " while hunting!" + "<br>");
        setEnemyInfo();
    });

    //when you click on the attack button
    $(".attackBtn").on("click", function () {
        regPlayerAttack();
        setEnemyInfo();
        //checks if you killed the different group of enemies
        checkIfKilledAnimal();
        //checks if you leveled up
        checkIfLvldUp();
        //delay
        if (chosenEnemy.health > 0) { regEnemyAttack() }
        setPlayerInfo();
        checkIfPlayedDied();

    });

    //back to camp button
    $(".campBtn").on("click", function () {
        goHome();
        chosenEnemy.health = chosenEnemy.maxHealth;
    });

    //button to eat when you have meat
    $(".eatBtn").on("click", function () {
        //if player has meat in his inventory
        if (player.inventory[0].qty > 0) {
        player.inventory[0].qty -= 1;
        player.health += 30
        if (player.health > player.maxHealth) {
            player.health = player.maxHealth;
        }
        setPlayerInfo();
        setInvInfo();
        }
        else {
        $("#textbox-text").prepend("You don't have any meat left!" + "<br>");
        setInvInfo();    
        }   
    });




















});    