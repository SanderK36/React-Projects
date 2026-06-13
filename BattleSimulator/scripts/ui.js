const elements = {
    playerName: document.querySelector(".player"),
    playerBox: document.querySelector(".leftBox"),
    playerPortrait: document.querySelector(".playerPortrait"),
    playerHealth: document.querySelector(".hp"),
    playerHealthFill: document.querySelector(".playerHealthFill"),
    playerAttackPower: document.querySelector(".playerAp"),
    playerGold: document.querySelector(".playerGold"),
    playerXp: document.querySelector(".playerXp"),
    playerLevel: document.querySelector(".playerLevel"),
    playerWeapon: document.querySelector(".playerWeapon"),
    playerArmor: document.querySelector(".playerArmor"),
    playerPotions: document.querySelector(".playerPotions"),
    enemyName: document.querySelector(".enemy"),
    enemyBox: document.querySelector(".rightBox"),
    enemyPortrait: document.querySelector(".enemyPortrait"),
    enemyHealth: document.querySelector(".enemyHp"),
    enemyHealthFill: document.querySelector(".enemyHealthFill"),
    enemyAttackPower: document.querySelector(".enemyAp"),
    enemyGold: document.querySelector(".enemyGold"),
    enemyLevel: document.querySelector(".enemyLevel"),
    enemyWeapon: document.querySelector(".enemyWeapon"),
    wave: document.querySelector(".wave"),
    defeated: document.querySelector(".defeated"),
    log: document.querySelector(".dmgLog"),
    modal: document.getElementById("modal"),
    modalText: document.querySelector(".modalText"),
    confirmButton: document.querySelector(".confirmButton"),
    denyButton: document.querySelector(".denyButton"),
    shopItems: document.querySelector(".shopItems"),
}

function updateAllStats() {
    updatePlayerStats();
    updateEnemyStats();
    updateGameStats();
}

function updatePlayerStats() {
    elements.playerHealth.innerHTML = `Health: ${player.health}/${player.maxHealth}`;
    elements.playerHealthFill.style.width = `${getHealthPercent(player.health, player.maxHealth)}%`;
    elements.playerAttackPower.innerHTML = `Attack power: ${player.attackPower}`;
    elements.playerGold.innerHTML = `Gold: ${player.gold}`;
    elements.playerXp.innerHTML = `XP: ${player.xp}/${player.xpToNextLvl}`;
    elements.playerLevel.innerHTML = `Level: ${player.level}`;
    elements.playerWeapon.innerHTML = `Weapon: ${player.weapon}`;
    elements.playerArmor.innerHTML = `Armor: ${player.armor}`;
    elements.playerPotions.innerHTML = `Potions: ${player.potions}`;
}

function updateEnemyStats() {
    elements.enemyName.innerHTML = enemy.isBoss ? `${enemy.name} - BOSS` : enemy.name;
    elements.enemyPortrait.src = enemy.image;
    elements.enemyPortrait.alt = enemy.name;
    elements.enemyHealth.innerHTML = `Health: ${enemy.health}/${enemy.maxHealth}`;
    elements.enemyHealthFill.style.width = `${getHealthPercent(enemy.health, enemy.maxHealth)}%`;
    elements.enemyAttackPower.innerHTML = `Attack power: ${enemy.attackPower}`;
    elements.enemyGold.innerHTML = `Gold: ${enemy.gold}`;
    elements.enemyLevel.innerHTML = `Level: ${enemy.level}`;
    elements.enemyWeapon.innerHTML = `Weapon: ${enemy.weapon}`;
}

function updateGameStats() {
    elements.wave.innerHTML = `Wave ${game.wave}`;
    elements.defeated.innerHTML = `Defeated: ${game.enemiesDefeated}`;
}

function getHealthPercent(health, maxHealth) {
    return Math.max(0, Math.min(100, Math.round((health / maxHealth) * 100)));
}

function openModal(message, confirmText, confirmAction, showDenyButton = false) {
    elements.modal.style.display = "block";
    elements.modalText.innerHTML = message;
    elements.confirmButton.innerHTML = confirmText;
    elements.confirmButton.onclick = confirmAction;
    elements.denyButton.style.display = showDenyButton ? "inline-block" : "none";
    elements.shopItems.innerHTML = "";
}

function closeModal() {
    elements.modal.style.display = "none";
    elements.shopItems.innerHTML = "";
}

function showGiveUpModal() {
    openModal("Leave the arena and start over?", "Yes, give up", restartGame, true);
}

function showDefeatModal() {
    openModal(
        `You fell on wave ${game.wave}. You defeated ${game.enemiesDefeated} enemies.`,
        "Restart",
        restartGame
    );
}

function addLog(message, type = "normal") {
    const latestAction = elements.log.querySelector(".latest");

    if(latestAction) {
        latestAction.classList.remove("latest");
        latestAction.classList.add("past");
    }

    elements.log.innerHTML += `<span class="logEntry latest ${type}">${message}</span>`;

    while(elements.log.querySelectorAll(".logEntry").length > 3) {
        elements.log.querySelector(".logEntry").remove();
    }
}

function flashTarget(target) {
    const element = target === "enemy" ? elements.enemyBox : elements.playerBox;

    element.classList.remove("hitFlash");
    void element.offsetWidth;
    element.classList.add("hitFlash");
}

function pulseAction() {
    document.body.classList.remove("actionPulse");
    void document.body.offsetWidth;
    document.body.classList.add("actionPulse");
}
