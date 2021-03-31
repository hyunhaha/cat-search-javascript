const COLOR_MODE_KEY = '--color-mode';


const darkModeButton = document.querySelector('.dark-mode-button');
const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);
  //--color-mode의 상테 가져오기

  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }


  return response;
};
const applySetting = (setting) => {
  let currentSetting = setting || localStorage.getItem('user-color-scheme');
  if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setButtonLable(currentSetting)
  } else {
    setButtonLable(getCSSCustomProp(COLOR_MODE_KEY))
  }

}
const setButtonLable = (currentSetting) => {
  darkModeButton.innerHTML = currentSetting === 'dark' ? '🌕' : '🌞'
}
const toggleSetting = () => {
  let currentSetting = localStorage.getItem('user-color-scheme');
  if (currentSetting === null) {
    currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
  } else if (currentSetting === 'dark') {
    currentSetting = 'light'
  } else if (currentSetting === 'light') {
    currentSetting = 'dark'
  }
  localStorage.setItem('user-color-scheme', currentSetting)
  return currentSetting
}
darkModeButton.addEventListener('click', e => {
  e.preventDefault();
  applySetting(toggleSetting());
})