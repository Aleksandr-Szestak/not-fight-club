// общие настройки и параметры игры
const MAX_HEALTH = 150;

export const createState = () => ({
    protectionAmount: 2,
    maxHealth: MAX_HEALTH,
    myHealth: MAX_HEALTH,
    enemyHealth: MAX_HEALTH,
    forceAttack: 10,
    forceProtection: 10,
    forceCriticalDamage: 1.5,
    probablityCriticalDamage: 0.3,
    enemyNumber: null,
    attackFlag: '',
    protectionFlag: []
});

export const state = createState();

export const enemies = [

    {
        'name': 'Jason',
        'file': 'bad1.png',
        'amountAttackArea': 1,
        'amountProtectionArea': 2,
        'forceAttack': 20,
        'forceProtection': 20
    },

    {
        'name': 'Myers',
        'file': 'bad2.png',
        'amountAttackArea': 2,
        'amountProtectionArea': 1,
        'forceAttack': 25,
        'forceProtection': 25
    },

    {
        'name': 'AI hellgirl',
        'file': 'bad3.png',
        'amountAttackArea': 2,
        'amountProtectionArea': 1,
        'forceAttack': 10,
        'forceProtection': 25
    },

    {
        'name': 'Ghostface',
        'file': 'bad4.png',
        'amountAttackArea': 1,
        'amountProtectionArea': 4,
        'forceAttack': 30,
        
        'forceProtection': 10
    }

];

export const arrVulnerability = [
    'head',
    'body',
    'lefthand',
    'righthand',
    'leftleg',
    'rightleg'
];