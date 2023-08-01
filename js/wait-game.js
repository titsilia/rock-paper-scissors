function renderWaitGameBlock(container) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Ожидаем подключение соперника...';
    h2.classList.add('subtitle');
    container.appendChild(h2);

    const idInterval = setInterval(() => {

        request({
          url: `${backURL}game-status?token=${window.application.token}&id=${window.application.gameId}`,
          onSuccess: (response) => {
            if (response.status === 'ok') {
              if(response['game-status'].status !== 'waiting-for-start') {
                window.application.renderScreen('play');
              }
            } else {
                console.warn(response.message);
            }
          },
        });
      }, 500);
    
      window.application.timers.push(idInterval);

}
window.application.blocks['wait-game'] = renderWaitGameBlock;






function renderWaitGameScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('title');
  
    const div = document.createElement('div');
    div.classList.add('wait');
  
    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
  
  
    window.application.renderBlock('wait-game', div);
}
window.application.screens['wait-game'] = renderWaitGameScreen;