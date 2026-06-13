const STARTING_HEALTH = 120;
const STARTING_ATTACK_POWER = 18;
const STARTING_POTIONS = 2;
const POTION_HEAL_AMOUNT = 45;
const BOSS_WAVE_INTERVAL = 5;

const enemyTypes = [
    {
        name: "Ash Bandit",
        weapon: "Rusty dagger",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=900&q=80",
        health: 80,
        attackPower: 16,
        gold: [18, 45],
        xp: 10,
    },
    {
        name: "Bone Knight",
        weapon: "Cracked greatsword",
        image: "https://images.unsplash.com/photo-1600081522768-cb2e80ed4491?auto=format&fit=crop&w=900&q=80",
        health: 115,
        attackPower: 20,
        gold: [25, 60],
        xp: 14,
    },
    {
        name: "Ember Witch",
        weapon: "Cinder staff",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
        health: 90,
        attackPower: 28,
        gold: [35, 75],
        xp: 16,
    },
    {
        name: "Arena Brute",
        weapon: "Spiked club",
        image: "https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=900&q=80",
        health: 150,
        attackPower: 24,
        gold: [30, 80],
        xp: 18,
    },
]

const bossTypes = [
    {
        name: "The Iron Champion",
        weapon: "Colossal hammer",
        image: "https://images.unsplash.com/photo-1600081522768-cb2e80ed4491?auto=format&fit=crop&w=900&q=80",
        health: 260,
        attackPower: 34,
        gold: [110, 180],
        xp: 45,
    },
    {
        name: "Vyrak the Gold-Eater",
        weapon: "Twin cleavers",
        image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=900&q=80",
        health: 230,
        attackPower: 42,
        gold: [150, 240],
        xp: 55,
    },
]

const player = {
    health: STARTING_HEALTH,
    maxHealth: STARTING_HEALTH,
    baseAttackPower: STARTING_ATTACK_POWER,
    attackPower: STARTING_ATTACK_POWER,
    armor: 0,
    critChance: 15,
    gold: 0,
    level: 1,
    xp: 0,
    xpToNextLvl: 30,
    potions: STARTING_POTIONS,
    weapon: "Training sword",
    defending: false,
}

const enemy = {
    name: "",
    health: 0,
    maxHealth: 0,
    image: "",
    attackPower: 0,
    gold: 0,
    level: 1,
    xpReward: 0,
    weapon: "",
    isBoss: false,
}

const game = {
    wave: 1,
    enemiesDefeated: 0,
    lastAction: "",
}

const shop = {
    weapons: [
        { name: "Iron sword", attackBonus: 18, price: 75 },
        { name: "Steel axe", attackBonus: 34, price: 160 },
        { name: "Storm spear", attackBonus: 55, price: 320 },
        { name: "Dragon blade", attackBonus: 85, price: 600 },
    ],
    armor: [
        { name: "Leather guard", armor: 4, price: 70 },
        { name: "Chainmail", armor: 9, price: 180 },
        { name: "Royal plate", armor: 16, price: 420 },
    ],
    potions: [
        { name: "HP potion", amount: 1, price: 30 },
        { name: "Potion bundle", amount: 3, price: 75 },
    ],
}

let gameOver = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(items) {
    return items[getRandomInt(0, items.length - 1)];
}

function getRandomDamage(attackPower) {
    return getRandomInt(Math.ceil(attackPower * 0.55), attackPower);
}

function getScaledValue(value, scale) {
    return Math.floor(value * scale);
}
