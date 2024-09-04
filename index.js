// Ініціалізація змінних
/** @type {number} */
let minNumber = 1; // Мінімальне число для вгадування

/** @type {number} */
let maxNumber = 100; // Максимальне число для вгадування

// Генерація випадкового числа, яке потрібно вгадати
/** @type {number} */
let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

/** @type {number} */
let attempts = 0; // Лічильник спроб

/** @type {number} */
let maxAttempts = 10; // Максимальна кількість спроб

/** @type {boolean} */
let gameOver = false; // Стан гри: завершена чи ні

// Функція для отримання введення користувача
/**
 * @returns {number} 
 */
function getUserGuess() {
    // Запитуємо у користувача число
    /** @type {string} */
    let userInput = prompt(`Введіть число від ${minNumber} до ${maxNumber}:`);
    
    // Перетворюємо введене значення на ціле число
    return parseInt(userInput);
}

// Функція для перевірки числа, введеного користувачем
/**
 * @param {number} userGuess 
 */
function checkGuess(userGuess) {
    // Збільшуємо лічильник спроб
    attempts++;

    // Перевірка, чи вгадав користувач число
    if (userGuess === randomNumber) {
        // Якщо число вгадано правильно
        alert(`Вітаємо! Ви вгадали число ${randomNumber} за ${attempts} спроб.`);
        
        // Завершення гри
        gameOver = true;
    } 
    // Якщо число більше загаданої
    else if (userGuess > randomNumber) {
        // Підказка для користувача
        alert("Загадане число менше.");
    } 
    // Якщо число менше загаданої
    else {
        // Підказка для користувача
        alert("Загадане число більше.");
    }

    // Якщо спроби закінчилися і гра не завершена успіхом
    if (attempts >= maxAttempts && !gameOver) {
        // Повідомлення про завершення гри
        alert(`Гра закінчена! Ви не вгадали число. Загадане число було: ${randomNumber}`);
        
        // Завершення гри
        gameOver = true;
    }
}

// Функція для перезапуску гри
function resetGame() {
    // Генерація нового випадкового числа
    randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    // Скидання лічильника спроб
    attempts = 0; 
    
    // Скидання стану гри
    gameOver = false; 
}

// Функція для відображення інформації про поточний стан гри
function displayGameState() {
    // Виведення інформації про спроби
    console.log(`Кількість спроб: ${attempts}/${maxAttempts}`);
    
    // Виведення інформації про межі вгадування
    console.log(`Вгадайте число між ${minNumber} та ${maxNumber}`);
}

// Функція для виведення правил гри
function displayRules() {
    // Виведення повідомлення з правилами гри
    console.log("Правила гри:");
    console.log("1. Ви повинні вгадати випадкове число від 1 до 100.");
    console.log("2. У вас є максимум 10 спроб.");
    console.log("3. Після кожної спроби ви отримаєте підказку.");
}

// Основна функція гри
function startGame() {
    // Виведення привітального повідомлення
    alert("Ласкаво просимо до гри 'Угадай число'!");
    
    // Виведення правил гри
    displayRules();
    
    // Основний ігровий цикл
    while (!gameOver) {
        // Виведення стану гри
        displayGameState();
        
        // Отримання введеного числа від користувача
        let userGuess = getUserGuess(); 
        
        // Перевірка, чи введене число є коректним
        if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
            // Виведення повідомлення про помилку
            alert(`Будь ласка, введіть коректне число від ${minNumber} до ${maxNumber}.`);
        } 
        // Якщо введене число є коректним
        else {
            // Перевірка введеного числа
            checkGuess(userGuess); 
        }
    }

    // Пропозиція зіграти ще раз
    let playAgain = confirm("Бажаєте зіграти ще раз?");
    
    // Якщо користувач хоче зіграти ще раз
    if (playAgain) {
        // Перезапуск гри
        resetGame(); 
        
        // Початок нової гри
        startGame(); 
    } 
    // Якщо користувач не хоче грати ще раз
    else {
        // Повідомлення про завершення гри
        alert("Дякуємо за гру!"); 
    }
}

// Допоміжна функція для форматування рядків
/**
 * @param {string} str 
 * @returns {string}
 */
function formatString(str) {
    // Видалення пробілів на початку і в кінці рядка
    return str.trim();
}

// Функція для перевірки, чи є число парним
/**
 * @param {number} num 
 * @returns {boolean}
 */
function isEvenNumber(num) {
    // Перевірка на парність
    return num % 2 === 0;
}

// Функція для перевірки, чи є число простим
/**
 * @param {number} num 
 * @returns {boolean}
 */
function isPrimeNumber(num) {
    // Перевірка на простоту
    if (num <= 1) return false;
    if (num === 2) return true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Функція для генерації випадкового числа в заданому діапазоні
/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function generateRandomNumber(min, max) {
    // Генерація випадкового числа
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція для відображення повідомлення про спробу
/**
 * @param {number} attempts 
 * @param {number} maxAttempts 
 */
function displayAttemptMessage(attempts, maxAttempts) {
    console.log(`Це ваша спроба номер ${attempts} з ${maxAttempts}`);
}

// Функція для визначення, чи досягнуто межі спроб
/**
 * @param {number} attempts 
 * @param {number} maxAttempts 
 * @returns {boolean}
 */
function hasExceededAttempts(attempts, maxAttempts) {
    // Перевірка, чи перевищено кількість спроб
    return attempts >= maxAttempts;
}

// Функція для відображення повідомлення про завершення гри
function displayEndGameMessage() {
    console.log("Гра завершена. Дякуємо за участь!");
}

// Функція для відображення повідомлення про початок гри
function displayStartGameMessage() {
    console.log("Починаємо гру. Успіхів!");
}

// Запуск гри
startGame();

// Виведення повідомлення про початок гри
displayStartGameMessage();

// Виведення повідомлення про завершення гри
displayEndGameMessage();
