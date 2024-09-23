"use strict";
// Модальне вікно
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
// Відкриття та закриття модального вікна
function openModal(content) {
    modal.style.display = 'block';
    modalContent.innerHTML = content;
}
function closeModal() {
    modal.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal);
// Закриття модального вікна при кліку поза його межами
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
// Fetch даних з JSONPlaceholder і відображення у модальному вікні
async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; // Очистка попереднього вмісту
    posts.slice(0, 5).forEach((post) => {
        const postItem = document.createElement('li');
        postItem.innerText = post.title;
        postItem.classList.add('post-item');
        postItem.addEventListener('click', () => openModal(post.body));
        postList.appendChild(postItem);
    });
}
// Обробка події scroll для додавання анімації
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const header = document.getElementById('header');
    if (scrollPos > 100) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
});
// Обробка події click для кнопки отримання даних
const fetchPostsBtn = document.getElementById('fetchPostsBtn');
fetchPostsBtn.addEventListener('click', fetchPosts);
// Анімація при скролі
const animateOnScroll = (element) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
        element.classList.add('animate');
    }
};
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
window.addEventListener('scroll', () => {
    elementsToAnimate.forEach((el) => animateOnScroll(el));
});
