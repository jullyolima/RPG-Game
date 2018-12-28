$(document).ready(function () {
    var chosenEnemy, randomDmg, randomDmgFlag, randomDmgRange, rawDmg, totalDmg, percentOfXpLost, percentOfGoldLost,
        stoneOutput;

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

    //sets the scene to stone quarry
    goStone = function () {
        $(".panel").hide();
        $(".building").show();
        $("#middle-header").html("Stone Quarry");
        $(".stone").show();
        $(".buildinglvl-text").html("Building Lvl: " + player.stoneLvl);
        if (player.stoneLvl === 1) {
            $(".buildingoutput-text").html("Building Output: 1-2")
        }
        if (player.stoneLvl === 2) {
            $(".buildingoutput-text").html("Building Output: 1-6")
        }
        if (player.stoneLvl === 3) {
            $(".buildingoutput-text").html("Building Output: 1-12")
        }
    }

    //sets the scene to wood cutters
    goWood = function () {
        $(".panel").hide();
        $(".building").show();
        $("#middle-header").html("Woodcutter's Hut");
        $(".wood").show();
        $(".buildinglvl-text").html("Building Lvl: " + player.woodLvl);
        if (player.woodLvl === 1) {
            $(".buildingoutput-text").html("Building Output: 1-2")
        }
        if (player.woodLvl === 2) {
            $(".buildingoutput-text").html("Building Output: 1-6")
        }
        if (player.woodLvl === 3) {
            $(".buildingoutput-text").html("Building Output: 1-12")
        }
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
            player.maxEnergy++
            player.energy = player.maxEnergy;
            $("#textbox-text").prepend("You leveled up!" + "<br>")
        }
    }

    //sets the player's current stats
    setPlayerInfo = function () {
        $("#p-level-text").html("Lv: " + player.level);
        $("#p-xp-text").html("Exp: " + player.xp + "/" + levels[player.level])
        $("#p-health-text").html("Health: " + player.health + "/" + player.maxHealth);
        $("#p-energy-text").html("Energy: " + player.energy + "/" + player.maxEnergy);
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

    //checks if the enemy has been killed
    checkIfEnemyKilled = function (itemIndex) {
        if (chosenEnemy.health <= 0) {
            player.xp += chosenEnemy.xpReward;
            player.inventory[itemIndex].qty += chosenEnemy.loot[itemIndex].drop;
            $("#textbox-text").prepend("Loot: " + chosenEnemy.loot[itemIndex].name + " x" + chosenEnemy.loot[itemIndex].drop + "<br>");
            $("#textbox-text").prepend("You've gained " + chosenEnemy.xpReward + " Exp!" + "<br>");
            $("#textbox-text").prepend("You've killed the " + chosenEnemy.name + "!" + "<br>");
            $(".backButton").show();
            if (chosenEnemy.health <= 0) { $(".attackBtn").prop("disabled", true); }

        }
    }

    //checks if the player has been killed
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

    //checks the players stone level
    checkStoneLvl = function () {
        if (player.stoneLvl === 1) {
            stoneOutput = Math.floor(Math.random() * 2) + 1;
            player.inventory[1].qty += stoneOutput;
        }
        if (player.stoneLvl === 2) {
            stoneOutput = Math.floor(Math.random() * 6) + 1;
            player.inventory[1].qty += stoneOutput;
        }
        if (player.stoneLvl === 3) {
            stoneOutput = Math.floor(Math.random() * 12) + 1;
            player.inventory[1].qty += stoneOutput;
        }


    }

    //checks the players stone level
    checkWoodLvl = function () {
        if (player.woodLvl === 1) {
            woodOutput = Math.floor(Math.random() * 2) + 1;
            player.inventory[2].qty += woodOutput;
        }
        if (player.woodLvl === 2) {
            woodOutput = Math.floor(Math.random() * 6) + 1;
            player.inventory[2].qty += woodOutput;
        }
        if (player.woodLvl === 3) {
            woodOutput = Math.floor(Math.random() * 12) + 1;
            player.inventory[2].qty += woodOutput;
        }


    }















    //when the game is first booted
    goHome();
    setPlayerInfo();
    $("#textbox-text").prepend("Your stomach grumbles...you're hungry!" + "<br>")
    $("#textbox-text").prepend("You've woken up at your camp, with everything destroyed around you." + "<br>")


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
        checkIfEnemyKilled(0);
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
            player.health += 30;
            player.energy += 1;
            if (player.health > player.maxHealth) {
                player.health = player.maxHealth;
            }
            if (player.energy > player.maxEnergy) {
                player.energy = player.maxEnergy;
            }
            setPlayerInfo();
            setInvInfo();
        }
        else {
            $("#textbox-text").prepend("You don't have any meat left!" + "<br>");
            setInvInfo();
        }
    });

    //go to the quarry
    $(".goStoneBtn").on("click", function () {
        goStone();
    });

    //go to the woodcutters
    $(".goWoodBtn").on("click", function () {
        goWood();
    });

    //mine stone button
    $(".stoneBtn").on("click", function () {
        //if the player has 3 energy or more
        if (player.energy >= 3) {
            player.energy -= 3;
            player.xp += player.level * 10;
            checkStoneLvl();
            $("#textbox-text").prepend("You mined " + stoneOutput + " stone!" + "<br>");
        }
        else {
            $("#textbox-text").prepend("You don't have enough Energy!" + "<br>");
        }
        checkIfLvldUp();
        setPlayerInfo();
        setInvInfo();


    });

    //cut wood button
    $(".woodBtn").on("click", function () {
        //if the player has 2 energy or more
        if (player.energy >= 2) {
            player.energy -= 2;
            player.xp += player.level * 8;
            checkWoodLvl();
            $("#textbox-text").prepend("You cut " + woodOutput + " wood!" + "<br>");
        }
        else {
            $("#textbox-text").prepend("You don't have enough Energy!" + "<br>");
        }
        checkIfLvldUp();
        setPlayerInfo();
        setInvInfo();


    });

    //upgrade stone building
    $(".upgradeStoneBtn").on("click", function () {
        //upgrade to level 2
        if (player.stoneLvl === 1) {
            if (player.inventory[1].qty >= 15 && player.inventory[2].qty >= 10) {
                player.stoneLvl = 2;
                $("#textbox-text").prepend("Stone Quarry has been upgraded to level 2!" + "<br>");
                goStone();
                return
            }
            else {
                $("#textbox-text").prepend("You need 15 stone and 10 wood to upgrade!" + "<br>");
            }
        }

        //upgrade to level 3
        if (player.stoneLvl === 2) {
            if (player.inventory[1].qty >= 85 && player.inventory[2].qty >= 75) {
                player.stoneLvl = 3;
                $("#textbox-text").prepend("Stone Quarry has been upgraded to level 3!" + "<br>");
                goStone();

            }
            else {
                $("#textbox-text").prepend("You need 85 stone and 75 wood to upgrade!" + "<br>");
            }
        }

        //hide if lvl 3
        if (player.stoneLvl === 3) {
            $(".upgradeStoneBtn").hide();
        }
    });

    //upgrade wood building
    $(".upgradeWoodBtn").on("click", function () {
        //upgrade to level 2
        if (player.woodLvl === 1) {
            if (player.inventory[1].qty >= 15 && player.inventory[2].qty >= 10) {
                player.woodLvl = 2;
                $("#textbox-text").prepend("Woodcutter's Hut has been upgraded to level 2!" + "<br>");
                goWood();
                return
            }
            else {
                $("#textbox-text").prepend("You need 15 stone and 10 wood to upgrade!" + "<br>");
            }
        }

        //upgrade to level 3
        if (player.woodLvl === 2) {
            if (player.inventory[1].qty >= 85 && player.inventory[2].qty >= 75) {
                player.woodLvl = 3;
                $("#textbox-text").prepend("Woodcutter's Hut has been upgraded to level 3!" + "<br>");
                goWood();

            }
            else {
                $("#textbox-text").prepend("You need 85 stone and 75 wood to upgrade!" + "<br>");
            }
        }

        //hide if lvl 3
        if (player.woodLvl === 3) {
            $(".upgradeWoodBtn").hide();
        }
    });


















});    