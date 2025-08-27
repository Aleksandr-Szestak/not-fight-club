export function initSettings() {

    const form = document.getElementById('settingsForm');       //<form>
    const input = document.getElementById('changeUsername');    //<input>
    const greeting = document.getElementById('greetingAgain');  //<h3>

    const savedName = localStorage.getItem('username');
    input.value = savedName;

    // Сохр. изменённого имени по нажатию кнопки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input.value.trim();
        // console.log(name);

        if (name) {
            localStorage.setItem('username', name);
            greeting.textContent = `Hello again, ${name}!`;

            document.getElementById('greeting').textContent = `Hello, ${name}!`;
            document.getElementById('name-player').textContent = `${name || ""}`;
        }

    });

}