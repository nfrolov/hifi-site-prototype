var menu = document.querySelector('.menu');

if (!menu) {
  return;
}

var toggle = document.createElement('button');

toggle.type = 'button';
toggle.className = 'menu__toggle';
toggle.textContent = menu.getAttribute('aria-label');

toggle.addEventListener('click', function () {
  menu.classList.toggle('menu_active');
}, false);

menu.insertBefore(toggle, menu.firstChild);
