function renderLoseBlock(container) {
    const img = document.createElement('img');
    img.setAttribute('src', '../img/lose.svg');
    img.classList.add('result-img');

    const subTitle = document.createElement('h2');
    subTitle.textContent = 'Вы проиграли';
    subTitle.classList.add('subTitle');

    container.appendChild(img);
    container.appendChild(subTitle);
}

window.application.blocks['lose'] = renderLoseBlock;


function renderToLobbyBlock(container) {
    const button = document.createElement('button');
    button.textContent = 'Перейти в лобби';
    button.classList.add('btn', 'btn-to-lobby');

    button.addEventListener('click', () => {
        window.application.renderScreen('lobby');
    });

    container.appendChild(button);
}
window.application.blocks['to-lobby'] = renderToLobbyBlock;



function renderLoseScreen() {
    const div = document.createElement('div');
    div.classList.add('content');
  
    APP_CONTAINER.appendChild(div);
  
    window.application.renderBlock('lose', div);
    window.application.renderBlock('to-lobby', div);
    window.application.renderBlock('start-button', div);
    
}
window.application.screens['lose'] = renderLoseScreen;
