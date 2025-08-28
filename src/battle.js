export function initBattle() {

    const savedNumberAvatar = localStorage.getItem('storageNumberAvatar');
    let numberAvatar = +savedNumberAvatar;
    console.log('>>>>', numberAvatar);

    const img_avatar_battle = document.querySelector('#itI img');
    img_avatar_battle.src = numberAvatar == 0
        ? `./assets/image/no-avatar.png`
        : `./assets/image/good${numberAvatar}.png`;

    const savedName = localStorage.getItem('username');    
    document.getElementById('name-player-1').textContent = `${savedName || ""}`;


    const checkboxes = document.querySelectorAll('input[name="attack"]');
    const limit = 2; // максимум 2 выбора

    checkboxes.forEach(cb => cb.addEventListener('change', updateCheckboxes));

    function updateCheckboxes() {
        const checked = document.querySelectorAll('input[name="attack"]:checked');
        if (checked.length >= limit) {
        checkboxes.forEach(cb => {
            if (!cb.checked) cb.disabled = true; // блокируем лишние
        });
        } else {
        checkboxes.forEach(cb => cb.disabled = false); // снимаем блокировку
        }
    }

}
