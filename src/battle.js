import {state, enemies, arrVulnerability} from "./state.js";
import { incWins, incLoses } from "./playerstats.js";

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

     logToConsole('\n*** START ROUND ***');  

    //-----------------------------------------------------------------------------------
    // радиокнопки для выбора точки атаки
    const radiobuttons = document.querySelectorAll('input[name="attack"]');
    radiobuttons.forEach(rb => rb.addEventListener('change', updateRadiobuttons));

    function updateRadiobuttons() {
        const checked = document.querySelector('input[name="attack"]:checked');
        if (checked) {
            state.attackFlag = checked.value;
            // console.log("Attack:", state.attackFlag);
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

        // console.log("Protection:", state.protectionFlag);
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

    //-----------------------------------------------------------------------------------
    // игровой процесс при нажатии кнопки Play!    
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

        let flagCritical = false;
        let arrAttackArea = randomNumbers(5, currentAttackArea);
        let arrProtectionArea = randomNumbers(5, currentProtectionArea);

        // console.log('arrAttackArea', arrAttackArea);
        arrAttackArea.forEach((value, index, array) => {
            array[index] = arrVulnerability[value];
        });
        console.log('Enemy Attack:', arrAttackArea);

        // console.log('arrProtectionArea', arrProtectionArea);
        arrProtectionArea.forEach((value, index, array) => {
            array[index] = arrVulnerability[value];
        });
        console.log('Enemy Protection:', arrProtectionArea);

        console.log("Attack Player:", state.attackFlag);
        console.log("Protection Player:", state.protectionFlag);

        // my choose vs enemy -----------------------------------------
        // logToConsole(state.attackFlag);
        // logToConsole(state.protectionFlag);
        //-----------------------------------------------------------------
        // Player attack
        let playerWin = false;
        flagCritical = chance(state.probablityCriticalDamage);
        // console.log('flagCritical', flagCritical);

        if (arrProtectionArea.includes(state.attackFlag)) {

            // атака игрока заблокирована
            if (flagCritical) {
                // кроме случая критического урона
                state.enemyHealth -= state.forceAttack;
                logToConsole(`Player ${savedName} attack ${enemies[numberEnemy].name} - blocked but get critical [${state.forceAttack}] damage`);

                if (state.enemyHealth <= 0) {
                    state.enemyHealth = 0;
                    logToConsole(`*** Player WIN! ***`);
                    incWins();
                    playerWin = true;

                    // playBtn.disabled = true;
                    initNewBattle();

                        playBtn.disabled = true;
                        showNextRoundButton();
                }

                document.getElementById('state-player-2').textContent =
                    `Health ${state.enemyHealth} / ${state.maxHealth}`;

            } else {
                // только выводится сообщение о блокировке
                logToConsole(`Player ${savedName} attack ${enemies[numberEnemy].name} - blocked!`);
            }
            
        } else {

            // атака игрока успешна
            if (flagCritical) {
                // критический урон
                state.enemyHealth -= Math.floor(state.forceAttack * state.forceCriticalDamage);
                logToConsole(`Player ${savedName} attack ${enemies[numberEnemy].name} - get critical [${Math.floor(state.forceAttack * state.forceCriticalDamage)}] damage`);
            } else {
                // обычный урон
                state.enemyHealth -= state.forceAttack;
                logToConsole(`Player ${savedName} attack ${enemies[numberEnemy].name} - get [${state.forceAttack}] damage`);
            }

            if (state.enemyHealth <= 0) {
                state.enemyHealth = 0;
                logToConsole(`*** Player WIN! ***`);
                // playBtn.disabled = true;
                incWins();
                playerWin = true;
                initNewBattle();

                    playBtn.disabled = true;
                    showNextRoundButton(); 
            }

            document.getElementById('state-player-2').textContent =
                `Health ${state.enemyHealth} / ${state.maxHealth}`;
            
        }
        //-----------------------------------------------------------------
        if (playerWin) 
            return; // если игрок выиграл, то ход противника не выполняется
        //-----------------------------------------------------------------
        // Enemy attack
        flagCritical = chance(state.probablityCriticalDamage);

        if (state.protectionFlag.some(r => arrAttackArea.includes(r))) {

            if (flagCritical) {
                // кроме случая критического урона
                let damage = currentForceAttack;
                state.myHealth -= damage;
                logToConsole(`Player ${enemies[numberEnemy].name} attack ${savedName} - blocked but get critical [${damage}] damage`);

                if (state.myHealth <= 0) {
                    state.myHealth = 0;
                    logToConsole(`*** Enemy WIN! ***`);
                    // playBtn.disabled = true;
                    incLoses();
                    initNewBattle();

                        playBtn.disabled = true;
                        showNextRoundButton(); 
                }

                document.getElementById('state-player-1').textContent =
                    `Health ${state.myHealth} / ${state.maxHealth}`;
            } else {

                // только выводится сообщение о блокировке
                logToConsole(`Enemy ${enemies[numberEnemy].name} attack - blocked!`);

            }
            
            
        } else {
            
            // атака противника успешна ----------------------------------
            if (flagCritical) {
                // критический урон
                state.myHealth -= Math.floor(currentForceAttack * state.forceCriticalDamage);
                logToConsole(`Player ${enemies[numberEnemy].name} attack ${savedName} - get critical [${Math.floor(currentForceAttack * state.forceCriticalDamage)}}] damage`);
            } else {
                // обычный урон
                state.myHealth -= currentForceAttack;
                logToConsole(`Player ${enemies[numberEnemy].name} attack ${savedName} - get [${currentForceAttack}] damage`);
            }
            
            if (state.myHealth <= 0) {
                state.myHealth = 0;
                logToConsole(`*** Enemy WIN! ***`);
                // playBtn.disabled = true;
                incLoses();
                initNewBattle();

                    playBtn.disabled = true;
                    showNextRoundButton();
            } 
            
            document.getElementById('state-player-1').textContent =
                `Health ${state.myHealth} / ${state.maxHealth}`;

        }

    });
}


//новая игра
function initNewBattle() {

    // сброс состояния здоровья
    state.myHealth = state.maxHealth;
    state.enemyHealth = state.maxHealth;
    document.getElementById('state-player-1').textContent = `Health ${state.myHealth} / ${state.maxHealth}`;
    document.getElementById('state-player-2').textContent = `Health ${state.enemyHealth} / ${state.maxHealth}`;
    logToConsole('\n*** NEW ROUND ***');
    // сброс выбора игрока
    state.attackFlag = '';
    state.protectionFlag = [];
    const radiobuttons = document.querySelectorAll('input[name="attack"]');
    radiobuttons.forEach(rb => rb.checked = false);
    const checkboxes = document.querySelectorAll('input[name="protection"]');
    checkboxes.forEach(cb => { cb.checked = false; cb.disabled = false; });
    document.getElementById('playBtn').disabled = true;
    // выбор нового противника
    const amountEnemies = enemies.length;
    const numberEnemy = getRandomInt(amountEnemies);
    state.enemyNumber = numberEnemy;
    console.log(numberEnemy, enemies[numberEnemy]);
    // имя противника
    document.getElementById('name-player-2').textContent = `${enemies[numberEnemy].name || ""}`;
    // аватар противника
    document.querySelector('#enemy img').src = numberEnemy >= amountEnemies
        ? `./assets/image/no-avatar.png`
        : `./assets/image/${enemies[numberEnemy].file}`;
    // состояние здоровья противника
    document.getElementById('state-player-2').textContent =
       `Health ${state.enemyHealth} / ${state.maxHealth}`;
    // сброс консоли
    // const consoleDiv = document.querySelector('.battle-logs');
    // consoleDiv.textContent = '';
    // разблокировка кнопки Play!
    document.getElementById('playBtn').disabled = true;
    //-----------------------------------------------------------------------------------
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
    //-----------------------------------------------------------------------------------
    return;
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


// вывод в консоль игры -------------------------------------------
function logToConsole(message) {
const consoleDiv = document.querySelector('.battle-logs');
consoleDiv.textContent += message + "\n";
consoleDiv.scrollTop = consoleDiv.scrollHeight;
}


// показать кнопку Next Round --------------------------------------
function showNextRoundButton() {
    if (document.querySelector(".next-round-btn")) return;

    const btn = document.createElement("button");
    btn.textContent = "Next Round";
    btn.classList.add("next-round-btn");

    btn.onclick = () => {
        // очистка логов только при нажатии
        const consoleDiv = document.querySelector('.battle-logs');
        consoleDiv.textContent = '';

        btn.remove();
        initNewBattle();
    };

    document.querySelector(".battle-logs").appendChild(btn);
}