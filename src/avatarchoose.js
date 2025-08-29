export function initAvatarChoose() {
  const img_avatar = document.querySelector('.character-scores img');
  const radios = document.querySelectorAll('.image-radio-choose input');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.image-radio-choose img').forEach(img => {
        img.classList.remove('selected');
      });

      radio.nextElementSibling.classList.add('selected');

      const numberAvatar = radio.value;
      img_avatar.src = `./assets/image/good${numberAvatar}.png`;
      localStorage.setItem('storageNumberAvatar', numberAvatar);

      const img_avatar_battle = document.querySelector('#itI img');

      img_avatar_battle.src = numberAvatar == 0
        ? `./assets/image/no-avatar.png`
        : `./assets/image/good${numberAvatar}.png`;

    });
  });
}
