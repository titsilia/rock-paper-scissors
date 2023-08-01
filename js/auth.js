function renderAuthBlock(container) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Введите логин");
  input.classList.add("input-login");

  const button = document.createElement("button");
  button.textContent = "Войти";
  button.classList.add("btn", "btn-auth");

  button.addEventListener("click", (event) => {
    request({
      url: `${backURL}login?login=${input.value}`,
      onSuccess: (response) => {
        const { token } = response;
        if (response.status === "ok") {
          window.application.token = token;

          //проверяем статус игрока
          request({
            url: `${backURL}player-status?token=${token}`,
            onSuccess: (response) => {
              if (response.status === "ok") {
                //проверяем статус, отрисовку экрана
                if (response["player-status"].status === "lobby") {
                  window.application.renderScreen("lobby");
                } else {
                    window.application.gameId = response['player-status'].game.id;
                    window.application.renderScreen('play');
                }
              } else {
                console.warn("Не удалось получить статус игрока");
              }
            },
          });
        } else {
          console.warn("Не уадлось авторизоваться");
        }
      },
    });
  });

  container.appendChild(input);
  container.appendChild(button);
}

window.application.blocks["auth"] = renderAuthBlock;

function renderAuthScreen() {

  const h1 = document.createElement("h1");
  h1.textContent = "Камень, ножницы, бумага";
  h1.classList.add("title");

  const div = document.createElement("div");
  div.classList.add("auth-form");

  APP_CONTAINER.appendChild(h1);
  APP_CONTAINER.appendChild(div);

  window.application.renderBlock("auth", div);
}

window.application.screens["auth"] = renderAuthScreen;

window.application.renderScreen("auth");
