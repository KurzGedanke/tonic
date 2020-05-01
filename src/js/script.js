let headerButton = document.getElementById('header__button')

headerButton.onclick = function () {
  let header = document.getElementById('header')
  let navigation = document.getElementById('header__navigation')

  if(header.classList.contains('header__menu')){
    header.classList.remove('header__menu')
    navigation.classList.add('hidden')
    navigation.setAttribute('aria-expanded', 'false')
  } else {
    header.classList.add('header__menu');
    navigation.setAttribute('aria-expanded', 'true')
    navigation.classList.remove('hidden')
  }
}