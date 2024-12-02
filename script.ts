// Крок 1: Створення типів товарів

type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description: string; // додаткове поле
};

type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number; // в місяцях
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: string; // розмір (S, M, L тощо)
    material: string;
};

// Крок 2: Створення функцій для пошуку товарів

/**
 * Знаходить товар за його ID.
 * @param products - Масив товарів
 * @param id - ID потрібного товару
 * @returns Знайдений товар або undefined
 */
const findProduct = <T extends BaseProduct>(
    products: T[],
    id: number
): T | undefined => {
    return products.find((product) => product.id === id);
};

/**
 * Фільтрує товари за максимальною ціною.
 * @param products - Масив товарів
 * @param maxPrice - Максимальна ціна
 * @returns Масив товарів, що відповідають умовам
 */
const filterByPrice = <T extends BaseProduct>(
    products: T[],
    maxPrice: number
): T[] => {
    return products.filter((product) => product.price <= maxPrice);
};

// Крок 3: Створення кошика

type CartItem<T> = {
    product: T;
    quantity: number;
};

/**
 * Додає товар до кошика.
 * @param cart - Поточний кошик
 * @param product - Товар, який потрібно додати
 * @param quantity - Кількість товару
 * @returns Оновлений кошик
 */
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    return cart;
};

/**
 * Розраховує загальну вартість товарів у кошику.
 * @param cart - Кошик з товарами
 * @returns Загальна вартість
 */
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
};

// Крок 4: Використання функцій

// Тестові дані
const electronics: Electronics[] = [
    {
        id: 1,
        name: 'Телефон',
        price: 10000,
        description: 'Смартфон з AMOLED-дисплеєм',
        category: 'electronics',
        warrantyPeriod: 24,
    },
    {
        id: 2,
        name: 'Ноутбук',
        price: 30000,
        description: 'Легкий та продуктивний ноутбук',
        category: 'electronics',
        warrantyPeriod: 36,
    },
];

const clothing: Clothing[] = [
    {
        id: 3,
        name: 'Футболка',
        price: 500,
        description: 'Бавовняна футболка',
        category: 'clothing',
        size: 'M',
        material: 'Бавовна',
    },
    {
        id: 4,
        name: 'Куртка',
        price: 2000,
        description: 'Зимова куртка',
        category: 'clothing',
        size: 'L',
        material: 'Поліестер',
    },
];

// Використання
const phone = findProduct(electronics, 1);
console.log('Знайдений товар:', phone);

const cheapClothing = filterByPrice(clothing, 1000);
console.log('Дешевий одяг:', cheapClothing);

let cart: CartItem<BaseProduct>[] = [];
if (phone) {
    cart = addToCart(cart, phone, 2);
}

console.log('Кошик після додавання товарів:', cart);

const total = calculateTotal(cart);
console.log('Загальна вартість кошика:', total);
