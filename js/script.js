const backURL = 'https://skypro-rock-scissors-paper.herokuapp.com/';

const APP_CONTAINER = document.querySelector('.app');

window.application = {
  blocks: {},
  screens: {},
  timers: [],

  renderScreen: function (screenName) {
    // сброс всех таймеров
    window.application.timers.forEach(id => {
      clearInterval(id);
    });
    
    console.log(screenName);
    if (window.application.screens[screenName]) {
      // очищаем контейнер перед отрисовкой экрана
        APP_CONTAINER.innerHTML = '';
        window.application.screens[screenName]();
    } else {
      console.warn(`Блока ${screenName} не существует`);
    }
  },

  renderBlock: function (blockName, container) {
    console.log(blockName, container);
    if (window.application.blocks[blockName]) {
        window.application.blocks[blockName](container);
    } else {
      console.warn(`Блока ${blockName} не существует`);
    }
  },
};
