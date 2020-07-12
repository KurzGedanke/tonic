function initHeader() {
  let headerButton = document.getElementById('header__button');
  let header = document.getElementById('header');
  let navigation = document.getElementsByClassName('nav');

  headerButton.onclick = function () {

    if (header.classList.contains('header__nav-open')) {
      header.classList.remove('header__nav-open');
      navigation[0].classList.remove('nav__open');
      navigation[0].setAttribute('aria-expanded', 'false');
    } else {
      header.classList.add('header__nav-open');
      navigation[0].classList.add('nav__open');
      navigation[0].setAttribute('aria-expanded', 'true');
    }
  };
}

function initCloseHeader() {
  let header = document.getElementById('header');
  let navigation = document.getElementsByClassName('nav');

  function closeHeader() {
    if (header.classList.contains('header__nav-open')) {
      if (window.innerWidth >= 768) {
        header.classList.remove('header__nav-open');
        navigation[0].classList.remove('nav__open');
        navigation[0].setAttribute('aria-expanded', 'false');
      }
    }
  }

  window.addEventListener('resize', closeHeader);
}
