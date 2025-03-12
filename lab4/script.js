import { setCookie, getCookie } from './cookie.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (getCookie('theme') === 'dark') {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        setCookie('theme', body.classList.contains('dark-theme') ? 'dark' : 'light', 365);
    });
    
    let reviews = getCookie('reviews') ? JSON.parse(getCookie('reviews')) : [
        { name: 'Иван П.', text: 'Эти носки спасли мой брак!', rating: 5, image: '' },
        { name: 'Мария Л.', text: 'О нет, теперь я встаю на работу быстрее!', rating: 4, image: '' },
        { name: 'Антон С.', text: 'Как я жил без них раньше?', rating: 5, image: '' }
    ];

    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const sortAsc = document.getElementById('sort-asc');
    const sortDesc = document.getElementById('sort-desc');
    const filterButton = document.getElementById('filter-button');
    const filterName = document.getElementById('filter-name');
    
    function renderReviews(reviewsArray = reviews) {
        reviewsList.innerHTML = '';
        reviewsArray.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <blockquote>
                    "${review.text}"
                    <footer>– ${review.name} (Оценка: ${review.rating})</footer>
                </blockquote>
                ${review.image ? `<img src="${review.image}" alt="Изображение отзыва" style="max-width: 100px; margin-top: 10px;">` : ''}
            `;
            reviewsList.appendChild(reviewElement);
        });
    }
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const text = document.getElementById('text').value;
        const rating = parseInt(document.getElementById('rating').value);
        const image = document.getElementById('image').value;

        if (name && text && rating >= 1 && rating <= 5) {
            reviews.push({ name, text, rating, image });
            setCookie('reviews', JSON.stringify(reviews), 365); 
            renderReviews();
            reviewForm.reset();
        } else {
            alert('Пожалуйста, заполните все поля корректно.');
        }
    });
    
    sortAsc.addEventListener('click', () => {
        const sortedReviews = [...reviews].sort((a, b) => a.rating - b.rating);
        renderReviews(sortedReviews);
    });
    
    sortDesc.addEventListener('click', () => {
        const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
        renderReviews(sortedReviews);
    });
   
    filterButton.addEventListener('click', () => {
        const filteredReviews = reviews.filter(review =>
            review.name.toLowerCase().includes(filterName.value.toLowerCase())
        );
        renderReviews(filteredReviews);
    });
   
    renderReviews();
});