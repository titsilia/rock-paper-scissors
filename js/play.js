function renderPlayBlock(container) {
  const btnRock = document.createElement("button");
  btnRock.textContent = "Камень";
  btnRock.classList.add("btn", "btn-weapon", "btn-weapon-rock");
  btnRock.addEventListener("click", (event) => {
    handleMove("rock");
  });
  container.appendChild(btnRock);

  const btnScissors = document.createElement("button");
  btnScissors.textContent = "Ножницы";
  btnScissors.classList.add("btn", "btn-weapon", "btn-weapon-scissors");
  btnScissors.addEventListener("click", (event) => {
    handleMove("scissors");
  });
  container.appendChild(btnScissors);

  const btnPaper = document.createElement("button");
  btnPaper.textContent = "Бумага";
  btnPaper.classList.add("btn", "btn-weapon", "btn-weapon-paper");
  btnPaper.addEventListener("click", (event) => {
    handleMove("paper");
  });
  container.appendChild(btnPaper);

  function handleMove(move) {
    request({
      url: `${backURL}play?token=${window.application.token}&id=${window.application.gameId}&move=${move}`,
      onSuccess: (response) => {
        if (response.status === "ok") {
          const status = response["game-status"].status;
          switch (status) {
            case "waiting-for-enemy-move":
              window.application.renderScreen('wait-enemy-move');
              break;
            case "lose":
                window.application.renderScreen('lose');
              break;
            case "win":
                window.application.renderScreen('win');
              break;

            default:
              console.log("Ничья, делаем ход заново");
              break;
          }
        } else {
          console.warn(response.message);
        }
      },
    });
  }
}
window.application.blocks["play"] = renderPlayBlock;

function renderPlayScreen() {
  const h1 = document.createElement("h1");
  h1.textContent = "Игра";
  h1.classList.add("title");

  const div = document.createElement("div");
  div.classList.add("play");

  APP_CONTAINER.appendChild(h1);
  APP_CONTAINER.appendChild(div);

  window.application.renderBlock("play", div);
}
window.application.screens["play"] = renderPlayScreen;
