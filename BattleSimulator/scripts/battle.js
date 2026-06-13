function attack() {
    playerTurn("normal");
}

function heavyAttack() {
    playerTurn("heavy");
}

function defend() {
    if(gameOver) {
        return;
    }

    player.defending = true;
    addLog("You raise your guard. The next enemy hit will be reduced.", "defense");
    enemyTurn();
}

function playerTurn(attackType) {
    if(gameOver) {
        return;
    }

    pulseAction();
    const result = getPlayerAttackResult(attackType);

    if(result.missed) {
        addLog("Your heavy attack misses. That one hurts emotionally.", "warning");
        enemyTurn();
        return;
    }

    damageEnemy(result.damage);
    flashTarget("enemy");
    addLog(result.message, result.critical ? "critical" : "normal");

    if(enemy.health <= 0) {
        defeatEnemy();
        return;
    }

    enemyTurn();
}

function getPlayerAttackResult(attackType) {
    const isHeavy = attackType === "heavy";
    const missed = isHeavy && Math.random() < 0.25;

    if(missed) {
        return { missed: true };
    }

    let damage = getRandomDamage(player.attackPower);
    const critical = Math.random() < player.critChance / 100;

    if(isHeavy) {
        damage = Math.floor(damage * 1.8);
    }

    if(critical) {
        damage = Math.floor(damage * 1.75);
    }

    const attackName = isHeavy ? "heavy attack" : "attack";
    const critText = critical ? " Critical hit!" : "";

    return {
        damage,
        critical,
        missed: false,
        message: `Your ${attackName} hits ${enemy.name} for ${damage} damage.${critText}`,
    };
}

function enemyTurn() {
    if(gameOver || enemy.health <= 0) {
        return;
    }

    const result = getEnemyAttackResult();
    damagePlayer(result.damage);
    flashTarget("player");
    addLog(result.message, result.blocked ? "defense" : "danger");

    if(player.health <= 0) {
        player.health = 0;
        updatePlayerStats();
        gameOver = true;
        showDefeatModal();
    }
}

function getEnemyAttackResult() {
    let damage = getRandomDamage(enemy.attackPower);
    let blocked = false;

    damage = Math.max(1, damage - player.armor);

    if(player.defending) {
        damage = Math.ceil(damage * 0.45);
        player.defending = false;
        blocked = true;
    }

    return {
        damage,
        blocked,
        message: blocked
            ? `You block hard. ${enemy.name} only deals ${damage} damage.`
            : `${enemy.name} strikes you for ${damage} damage.`,
    };
}

function damageEnemy(damage) {
    enemy.health = Math.max(0, enemy.health - damage);
    updateEnemyStats();
}

function damagePlayer(damage) {
    player.health = Math.max(0, player.health - damage);
    updatePlayerStats();
}

function defeatEnemy() {
    const stolenGold = enemy.gold;
    const xpReward = enemy.xpReward;
    const defeatedBoss = enemy.isBoss;

    player.gold += stolenGold;
    player.xp += xpReward;
    game.enemiesDefeated++;
    game.wave++;

    const leveledUp = levelUp();

    if(defeatedBoss) {
        player.potions++;
        player.critChance += 2;
    }

    updatePlayerStats();
    updateGameStats();
    addLog(getVictoryMessage(stolenGold, xpReward, defeatedBoss, leveledUp), "reward");
    spawnNewEnemy();
}

function getVictoryMessage(gold, xp, defeatedBoss, leveledUp) {
    let message = `Victory. You gained ${xp} XP and stole ${gold} gold.`;

    if(defeatedBoss) {
        message += " Boss bonus: +1 potion and +2% crit chance.";
    }

    if(leveledUp) {
        message += " You leveled up and healed to full.";
    }

    return message;
}

function spawnNewEnemy() {
    const isBossWave = game.wave % BOSS_WAVE_INTERVAL === 0;
    const template = isBossWave ? getRandomItem(bossTypes) : getRandomItem(enemyTypes);
    const scale = 1 + (game.wave - 1) * 0.13;
    const bossScale = isBossWave ? 1.25 : 1;

    enemy.name = template.name;
    enemy.weapon = template.weapon;
    enemy.level = game.wave;
    enemy.maxHealth = getScaledValue(template.health, scale * bossScale);
    enemy.health = enemy.maxHealth;
    enemy.attackPower = getScaledValue(template.attackPower, scale * bossScale);
    enemy.gold = getRandomInt(template.gold[0], template.gold[1]) + game.wave * 8;
    enemy.xpReward = template.xp + game.wave * 3;
    enemy.isBoss = isBossWave;
    enemy.image = `${template.image}&sig=${game.wave}`;

    updateEnemyStats();
    updateGameStats();

    if(isBossWave) {
        addLog(`${enemy.name} enters the arena. Boss wave. Good luck.`, "danger");
    }
}

function levelUp() {
    if(player.xp < player.xpToNextLvl) {
        return false;
    }

    player.level++;
    player.xp -= player.xpToNextLvl;
    player.xpToNextLvl = Math.floor(player.xpToNextLvl * 1.45);
    player.baseAttackPower = Math.floor(player.baseAttackPower * 1.18);
    player.attackPower = Math.floor(player.attackPower * 1.12);
    player.maxHealth = Math.floor(player.maxHealth * 1.18);
    player.health = player.maxHealth;

    return true;
}

function restartGame() {
    resetPlayer();
    game.wave = 1;
    game.enemiesDefeated = 0;
    gameOver = false;

    elements.log.innerHTML = "";
    closeModal();
    spawnNewEnemy();
    updateAllStats();
    addLog("A new run begins. Survive as many waves as you can.", "reward");
}

function resetPlayer() {
    player.health = STARTING_HEALTH;
    player.maxHealth = STARTING_HEALTH;
    player.baseAttackPower = STARTING_ATTACK_POWER;
    player.attackPower = STARTING_ATTACK_POWER;
    player.armor = 0;
    player.critChance = 15;
    player.gold = 0;
    player.level = 1;
    player.xp = 0;
    player.xpToNextLvl = 30;
    player.potions = STARTING_POTIONS;
    player.weapon = "Training sword";
    player.defending = false;
}
