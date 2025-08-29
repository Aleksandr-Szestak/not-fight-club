// общие настройки и параметры игры
const MAX_HEALTH = 150;

export const createState = () => ({
    protectionAmount: 2,
    maxHealth: MAX_HEALTH,
    myHealth: MAX_HEALTH,
    enemyHealth: MAX_HEALTH,
    forceCriticalDamage: 1.5,
    probablityCriticalDamage: 0.1,
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
        'forceAttack': 3,
        'forceProtection': 3
    },

    {
        'name': 'Myers',
        'file': 'bad2.png',
        'amountAttackArea': 2,
        'amountProtectionArea': 1,
        'forceAttack': 2,
        'forceProtection': 2
    },

    {
        'name': 'AI hellgirl',
        'file': 'bad3.png',
        'amountAttackArea': 2,
        'amountProtectionArea': 1,
        'forceAttack': 2,
        'forceProtection': 1
    },

    {
        'name': 'Ghostface',
        'file': 'bad4.png',
        'amountAttackArea': 1,
        'amountProtectionArea': 5,
        'forceAttack': 2,
        'forceProtection': 5
    }

];