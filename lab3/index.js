// Функция для запуска игры
function startGame() {
    // Загадываем случайное число от 1 до 100
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let isGameOver = false;

    alert("Добро пожаловать в игру 'Угадай число'! Я загадал число от 1 до 100. Попробуй угадать его!");

    while (!isGameOver) {
        // Запрашиваем у пользователя число
        let userInput = prompt("Введите число от 1 до 100:");

        // Обработка отмены ввода
        if (userInput === null) {
            let shouldQuit = confirm("Вы уверены, что хотите выйти из игры?");
            if (shouldQuit) {
                alert("Игра завершена. Загаданное число было: " + secretNumber);
                isGameOver = true;
            }
            continue;
        }

        // Преобразуем ввод в число
        let userGuess = parseInt(userInput);

        // Проверка на корректность ввода
        if (isNaN(userGuess)) {
            alert("Пожалуйста, введите число!");
            continue;
        }
        if (userGuess < 1 || userGuess > 100) {
            alert("Число должно быть от 1 до 100!");
            continue;
        }

        attempts++;

        // Проверка угадал ли пользователь число
        if (userGuess === secretNumber) {
            alert(`Поздравляю! Вы угадали число за ${attempts} попыток!`);
            isGameOver = true;
        } else if (userGuess < secretNumber) {
            alert("Загаданное число больше. Попробуйте еще раз!");
        } else {
            alert("Загаданное число меньше. Попробуйте еще раз!");
        }
    }

    // Предложение сыграть еще раз
    let playAgain = confirm("Хотите сыграть еще раз?");
    if (playAgain) {
        startGame();
    } else {
        alert("Спасибо за игру! До встречи!");
    }
}

// Убедитесь, что функция startGame не запускается автоматически
// Она будет вызвана только при нажатии на кнопку