function openShop() {
    openModal(`Arena merchant - your gold: ${player.gold}`, "Close", closeModal);
    elements.shopItems.innerHTML = `
        <h3>Weapons</h3>
        ${shop.weapons.map(createWeaponShopItem).join("")}
        <h3>Armor</h3>
        ${shop.armor.map(createArmorShopItem).join("")}
        <h3>Potions</h3>
        ${shop.potions.map(createPotionShopItem).join("")}
    `;
}

function createWeaponShopItem(weapon, index) {
    const owned = player.weapon === weapon.name;
    const label = owned ? "Owned" : "Buy";

    return `
        <div class="shopItem">
            <span>${weapon.name}<small>+${weapon.attackBonus} attack - ${weapon.price} gold</small></span>
            <button onclick="buyWeapon(${index})" ${owned ? "disabled" : ""}>${label}</button>
        </div>
    `;
}

function createArmorShopItem(armor, index) {
    const owned = player.armor >= armor.armor;
    const label = owned ? "Owned" : "Buy";

    return `
        <div class="shopItem">
            <span>${armor.name}<small>${armor.armor} armor - ${armor.price} gold</small></span>
            <button onclick="buyArmor(${index})" ${owned ? "disabled" : ""}>${label}</button>
        </div>
    `;
}

function createPotionShopItem(potion, index) {
    return `
        <div class="shopItem">
            <span>${potion.name}<small>+${potion.amount} potion${potion.amount > 1 ? "s" : ""} - ${potion.price} gold</small></span>
            <button onclick="buyPotion(${index})">Buy</button>
        </div>
    `;
}

function canAfford(item) {
    if(player.gold >= item.price) {
        return true;
    }

    addLog(`You need ${item.price} gold to buy ${item.name}.`, "warning");
    return false;
}

function buyWeapon(weaponIndex) {
    const weapon = shop.weapons[weaponIndex];

    if(player.weapon === weapon.name || !canAfford(weapon)) {
        return;
    }

    player.gold -= weapon.price;
    player.weapon = weapon.name;
    player.attackPower = player.baseAttackPower + weapon.attackBonus;

    updatePlayerStats();
    openShop();
    addLog(`You bought ${weapon.name}. Your attacks feel nastier.`, "reward");
}

function buyArmor(armorIndex) {
    const armor = shop.armor[armorIndex];

    if(player.armor >= armor.armor || !canAfford(armor)) {
        return;
    }

    player.gold -= armor.price;
    player.armor = armor.armor;

    updatePlayerStats();
    openShop();
    addLog(`You equipped ${armor.name}. Incoming damage is reduced.`, "reward");
}

function buyPotion(potionIndex) {
    const potion = shop.potions[potionIndex];

    if(!canAfford(potion)) {
        return;
    }

    player.gold -= potion.price;
    player.potions += potion.amount;

    updatePlayerStats();
    openShop();
    addLog(`You bought ${potion.amount} potion${potion.amount > 1 ? "s" : ""}.`, "reward");
}

function usePotion() {
    if(gameOver) {
        return;
    }

    if(player.potions <= 0) {
        addLog("You reach for a potion, but your belt is empty.", "warning");
        return;
    }

    if(player.health >= player.maxHealth) {
        addLog("You are already at full health.", "warning");
        return;
    }

    player.potions--;
    player.health = Math.min(player.health + POTION_HEAL_AMOUNT, player.maxHealth);
    updatePlayerStats();
    addLog(`You drink a potion and recover ${POTION_HEAL_AMOUNT} HP.`, "reward");
    enemyTurn();
}
