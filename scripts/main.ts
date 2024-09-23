// Інтерфейси для даних від JSONPlaceholder API
interface Post {
    id: number;
    title: string;
    body: string;
}

// Модальне вікно
const modal: HTMLElement = document.getElementById('modal')!;
const modalContent: HTMLElement = document.getElementById('modalContent')!;
const closeModalBtn: HTMLElement = document.getElementById('closeModal')!;

// Відкриття та закриття модального вікна
function openModal(content: string): void {
    modal.style.display = 'block';
    modalContent.innerHTML = content;
}

function closeModal(): void {
    modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);

// Закриття модального вікна при кліку поза його межами
window.addEventListener('click', (event: MouseEvent) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fetch даних з JSONPlaceholder і відображення у модальному вікні
async function fetchPosts(): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();

    const postList: HTMLElement = document.getElementById('postList')!;
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
    const scrollPos: number = window.scrollY;
    const header: HTMLElement = document.getElementById('header')!;

    if (scrollPos > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Обробка події click для кнопки отримання даних
const fetchPostsBtn: HTMLElement = document.getElementById('fetchPostsBtn')!;
fetchPostsBtn.addEventListener('click', fetchPosts);

// Анімація при скролі
const animateOnScroll = (element: HTMLElement) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
        element.classList.add('animate');
    }
};

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
window.addEventListener('scroll', () => {
    elementsToAnimate.forEach((el) => animateOnScroll(el as HTMLElement));
});
