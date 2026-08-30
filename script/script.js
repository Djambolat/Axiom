// Бургер-меню на мобилках
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const menuClose = document.querySelector('.header__menu-close');

// на страницах без бургера скрипт ничего не делает
if (burger && menu) {
  function openMenu() {
    menu.classList.add('header__menu--open');
    // блокируем скролл страницы под меню
    document.documentElement.classList.add('is-menu-open');
  }

  function closeMenu() {
    menu.classList.remove('header__menu--open');
    document.documentElement.classList.remove('is-menu-open');
  }

  burger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // клик по тёмному фону тоже закрывает меню
  menu.addEventListener('click', (event) => {
    if (event.target === menu) {
      closeMenu();
    }
  });

  // на пк меню не нужно: если окно стало широким, закрываем его
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}
