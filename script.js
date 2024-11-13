"use strict";
// Крок 1: Створення типів товарів
// Крок 2: Створення функцій для пошуку товарів
/**
 * Знаходить товар за id.
 * @param products - Масив товарів типу T
 * @param id - Ідентифікатор товару
 * @returns Товар або undefined, якщо товар не знайдено
 */
const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
/**
 * Фільтрує товари за ціною.
 * @param products - Масив товарів типу T
 * @param maxPrice - Максимальна ціна
 * @returns Масив товарів, ціна яких не перевищує maxPrice
 */
const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};
/**
 * Додає товар у кошик.
 * @param cart - Масив елементів кошика типу CartItem<T>
 * @param product - Товар типу T
 * @param quantity - Кількість товару
 * @returns Оновлений масив елементів кошика
 */
const addToCart = (cart, product, quantity) => {
    return [...cart, { product, quantity }];
};
/**
 * Обчислює загальну вартість товарів у кошику.
 * @param cart - Масив елементів кошика типу CartItem<T>
 * @returns Загальна вартість товарів
 */
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
// Крок 4: Використання функцій
// Створення тестових даних
const electronics = [
    { id: 1, name: "Телефон", price: 10000, category: 'electronics', warranty: '2 роки' }
];
const clothing = [
    { id: 2, name: "Футболка", price: 500, category: 'clothing', size: 'L' }
];
// Тестування функцій
const testFunctions = () => {
    const phone = findProduct(electronics, 1);
    if (phone) {
        let cart = addToCart([], phone, 1);
        console.log("Кошик після додавання товару:", cart);
        const total = calculateTotal(cart);
        console.log("Загальна вартість:", total);
        const affordableItems = filterByPrice(electronics, 15000);
        console.log("Товари в межах бюджету:", affordableItems);
    }
};
// Запуск тестування по кліку
document.getElementById("testButton")?.addEventListener("click", testFunctions);
