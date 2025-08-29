import {state, enemies, arrVulnerability} from "./state.js";

export function initBattle() {

    // аватар игрока
    const savedNumberAvatar = localStorage.getItem('storageNumberAvatar');
    let numberAvatar = +savedNumberAvatar;

    const img_avatar_battle = document.querySelector('#itI img');
    img_avatar_battle.src = numberAvatar == 0
        ? `./assets/image/no-avatar.png`
        : `./assets/image/good${numberAvatar}.png`;

    // имя игрока
    const savedName = localStorage.getItem('username');
    document.getElementById('name-player-1').textContent = `${savedName || ""}`;

    // состояние здоровья игрока
    document.getElementById('state-player-1').textContent = `Health ${state.myHealth} / ${state.maxHealth}`;

    //-----------------------------------------------------------------------------------

    const amountEnemies = enemies.length;
    const numberEnemy = getRandomInt(amountEnemies);
    state.enemyNumber = numberEnemy;
    // console.log(numberEnemy, enemies[numberEnemy]);

    // имя противника
    document.getElementById('name-player-2').textContent = `${enemies[numberEnemy].name || ""}`;

    // аватар противника
    /*
    console.log(numberEnemy,
                enemies[numberEnemy].name,
                enemies[numberEnemy].file);
    */
    document.querySelector('#enemy img').src = numberEnemy >= amountEnemies
        ? `./assets/image/no-avatar.png`
        : `./assets/image/${enemies[numberEnemy].file}`;

    // состояние здоровья противника
    document.getElementById('state-player-2').textContent =
       `Health ${state.enemyHealth} / ${state.maxHealth}`;

    //-----------------------------------------------------------------------------------
    // радиокнопки для выбора точки атаки
    const radiobuttons = document.querySelectorAll('input[name="attack"]');
    radiobuttons.forEach(rb => rb.addEventListener('change', updateRadiobuttons));

    function updateRadiobuttons() {
        const checked = document.querySelector('input[name="attack"]:checked');
        if (checked) {
            state.attackFlag = checked.value;
            console.log("Attack:", state.attackFlag);
        } else {
            state.attackFlag = '';
        }

        updatePlayButton();
    }
    //-----------------------------------------------------------------------------------
    // чекбоксы для выбора точек защиты
    const checkboxes = document.querySelectorAll('input[name="protection"]');
    const limit = state.protectionAmount; // ограничение количества точек защиты

    checkboxes.forEach(cb => cb.addEventListener('change', updateCheckboxes));

    function updateCheckboxes() {
        const checked = document.querySelectorAll('input[name="protection"]:checked');

        state.protectionFlag = Array.from(checked).map(cb => cb.value);

        if (checked.length >= limit) {
            checkboxes.forEach(cb => {
                if (!cb.checked)
                    cb.disabled = true;       // блокировка
            });
        } else {
            checkboxes.forEach(cb => cb.disabled = false); // отмена блокировки
        }

        updatePlayButton();

        console.log("Protection:", state.protectionFlag);
    }
    //-----------------------------------------------------------------------------------
    // кнопка Play!
    const playBtn = document.getElementById('playBtn');

    function updatePlayButton() {
        if (state.attackFlag && state.protectionFlag.length === 2) {
            playBtn.disabled = false;
        } else {
            playBtn.disabled = true;
        }
    }

    playBtn.addEventListener('click', () => {
        const currentAttackArea = enemies[numberEnemy].amountAttackArea;
        const currentProtectionArea = enemies[numberEnemy].amountProtectionArea;
        const currentForceAttack = enemies[numberEnemy].forceAttack;
        const currentForceProtection = enemies[numberEnemy].forceProtection;

        // console.log(currentAttackArea);
        // console.log(currentProtectionArea);
        // console.log(currentForceAttack);
        // console.log(currentForceProtection);

        // console.log(state.attackFlag);
        // console.log(state.protectionFlag);

        let arrAttackArea = randomNumbers(5, currentAttackArea);
        let arrProtectionArea = randomNumbers(5, currentProtectionArea);

        // console.log('arrAttackArea', arrAttackArea);
        arrAttackArea.forEach((value, index, array) => {
            array[index] = arrVulnerability[value];
        });
        // console.log('arrAttackArea', arrAttackArea);

        // console.log('arrProtectionArea', arrProtectionArea);
        arrProtectionArea.forEach((value, index, array) => {
            array[index] = arrVulnerability[value];
        });
        // console.log('arrProtectionArea', arrProtectionArea);

        


    });
}


//-----------------------------------------------------------------------------------
// ф-ия выбора случ. числа по заданному максимуму
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


// ф-ия оценки шанса
function chance(probability) {
  return Math.random() < probability;
}

// return array random numbers ------------------------------
function randomNumbers (endInterval, amount) {

let arrNumbers = [];
let randomFromInterval;


for (let i = 0; i < amount; i++) {
    while (arrNumbers[i] === undefined) {
        randomFromInterval = Math.floor(Math.random() * (endInterval + 1));
        if (arrNumbers.indexOf(randomFromInterval) === -1) {
            arrNumbers[i] = randomFromInterval;
        }
    }
}

return arrNumbers;
}
