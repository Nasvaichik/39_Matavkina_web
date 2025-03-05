function startGame() {    
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let isGameOver = false;

    alert("Добро пожаловать в игру 'Угадай число'! Я загадал число от 1 до 100. Попробуй угадать его!");

    while (!isGameOver) {       
        let userInput = prompt("Введите число от 1 до 100:");
       
        if (userInput === null) {
            let shouldQuit = confirm("Вы уверены, что хотите выйти из игры?");
            if (shouldQuit) {
                alert("Игра завершена. Загаданное число было: " + secretNumber);
                isGameOver = true;
            }
            continue;
        }
        
        let userGuess = parseInt(userInput);
        
        if (isNaN(userGuess)) {
            alert("Пожалуйста, введите число!");
            continue;
        }
        if (userGuess < 1 || userGuess > 100) {
            alert("Число должно быть от 1 до 100!");
            continue;
        }

        attempts++;
        
        if (userGuess === secretNumber) {
            alert(`Поздравляю! Вы угадали число за ${attempts} попыток!`);
            isGameOver = true;
        } else if (userGuess < secretNumber) {
            alert("Загаданное число больше. Попробуйте еще раз!");
        } else {
            alert("Загаданное число меньше. Попробуйте еще раз!");
        }
    }
    
    let playAgain = confirm("Хотите сыграть еще раз?");
    if (playAgain) {
        startGame();
    } else {
        alert("Спасибо за игру! До встречи!");
    }
}