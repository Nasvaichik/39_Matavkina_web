class Block {
    constructor(data, type) {
        this.data = data;
        this.type = type;
    }
    getHTML() {
        return '';
    }
    getEditHTML() {
        return '';
    }
}

class TextBlock extends Block {
    constructor(data) {
        super(data, 'text');
    }
    getHTML() {
        return `<div class="block text-block">
                    <p>${this.data}</p>
                    <button class="edit-button" onclick="editBlock(this)">✏️</button>
                    <button class="delete-button" onclick="deleteBlock(this)">🗑️</button>
                </div>`;
    }
    getEditHTML() {
        return `<div class="block text-block">
                    <textarea>${this.data}</textarea>
                </div>`;
    }
}

class ImageBlock extends Block {
    constructor(data) {
        super(data, 'image');
    }
    getHTML() {
        return `<div class="block image-block">
                    <img src="${this.data}" alt="Image" onerror="this.src='https://via.placeholder.com/150'">
                    <button class="edit-button" onclick="editBlock(this)">✏️</button>
                    <button class="delete-button" onclick="deleteBlock(this)">🗑️</button>
                </div>`;
    }
    getEditHTML() {
        return `<div class="block image-block">
                    <input type="text" value="${this.data}" placeholder="Введите URL изображения">
                </div>`;
    }
}

class ListBlock extends Block {
    constructor(data) {
        super(data, 'list');
    }
    getHTML() {
        const items = this.data.map(item => `<li>${item}</li>`).join('');
        return `<div class="block list-block">
                    <ul>${items}</ul>
                    <button class="edit-button" onclick="editBlock(this)">✏️</button>
                    <button class="delete-button" onclick="deleteBlock(this)">🗑️</button>
                </div>`;
    }
    getEditHTML() {
        const items = this.data.join('\n');
        return `<div class="block list-block">
                    <textarea>${items}</textarea>
                </div>`;
    }
}

let blocks = [];

function loadBlocks() {
    try {
        const savedBlocks = JSON.parse(localStorage.getItem('blocks'));
        if (savedBlocks && Array.isArray(savedBlocks)) {
            blocks = savedBlocks.map(block => {
                if (block && block.type && block.data) {
                    switch (block.type) {
                        case 'text':
                            return new TextBlock(block.data);
                        case 'image':
                            return new ImageBlock(block.data);
                        case 'list':
                            return new ListBlock(block.data);
                        default:
                            return null;
                    }
                }
                return null;
            }).filter(block => block !== null);
        } else {
            // Если блоков нет, создаем несколько по умолчанию
            blocks = [
                new TextBlock("Привет, как тебя зовут"),
                new ImageBlock("https://via.placeholder.com/150"),
                new ListBlock(["расскажи", "о", "себе"])
            ];
            saveBlocks();
        }
    } catch (error) {
        console.error('Ошибка при загрузке блоков:', error);
        blocks = [
            new TextBlock("Привет, как тебя зовут"),
            new ImageBlock("https://via.placeholder.com/150"),
            new ListBlock(["расскажи", "о", "себе"])
        ];
        saveBlocks();
    }
}

// Функция для сборки страницы
function buildPage() {
    const content = document.getElementById('content');
    content.innerHTML = blocks.map(block => block.getHTML()).join('');
}

function toggleEditAll() {
    const content = document.getElementById('content');
    content.innerHTML = blocks.map(block => block.getEditHTML()).join('');
    document.querySelector('.edit-controls button:nth-child(1)').style.display = 'none'; 
    document.querySelector('.edit-controls button:nth-child(2)').style.display = 'inline-block'; 
}

function saveAll() {
    const content = document.getElementById('content');
    const blockElements = content.querySelectorAll('.block');

    blockElements.forEach((blockElement, index) => {
        const block = blocks[index];
        if (block.type === 'text') {
            block.data = blockElement.querySelector('textarea').value;
        } else if (block.type === 'image') {
            block.data = blockElement.querySelector('input').value;
        } else if (block.type === 'list') {
            block.data = blockElement.querySelector('textarea').value.split('\n');
        }
    });

    saveBlocks();
    buildPage();
    document.querySelector('.edit-controls button:nth-child(1)').style.display = 'inline-block'; 
    document.querySelector('.edit-controls button:nth-child(2)').style.display = 'none'; 
}

function deleteBlock(button) {
    const blockElement = button.closest('.block');
    const index = Array.from(blockElement.parentElement.children).indexOf(blockElement);
    blocks.splice(index, 1);
    saveBlocks();
    buildPage();
}

function editBlock(button) {
    const blockElement = button.closest('.block');
    const index = Array.from(blockElement.parentElement.children).indexOf(blockElement);
    const block = blocks[index];
    
    blockElement.outerHTML = block.getEditHTML();
}

function addBlock(type, data) {
    let newBlock;
    switch (type) {
        case 'text':
            newBlock = new TextBlock(data);
            break;
        case 'image':
            newBlock = new ImageBlock(data);
            break;
        case 'list':
            newBlock = new ListBlock(data);
            break;
    }
    blocks.push(newBlock);
    saveBlocks();
    buildPage();
}

function saveBlocks() {
    const blocksToSave = blocks.map(block => ({
        type: block.type,
        data: block.data
    }));
    localStorage.setItem('blocks', JSON.stringify(blocksToSave));
}

function loadLocalBlocks() {
    loadBlocks();
    buildPage();
}

// API для фактов о котах (локальная реализация)
class CatFactsApi {
    constructor() {
        this.facts = [
            {text: "Кошки могут поворачивать уши на 180 градусов.", type: "fact"},
            {text: "У кошек 32 мышцы в каждом ухе.", type: "fact"},
            {text: "Кошки спят около 70% своей жизни.", type: "fact"},
            {text: "Самый старый кот в мире прожил 38 лет.", type: "fact"},
            {text: "Кошки не чувствуют сладкого вкуса.", type: "fact"},
            {text: "Кошки могут прыгать на высоту в 5 раз больше своего роста.", type: "fact"},
            {text: "У кошек уникальный отпечаток носа, как у людей отпечатки пальцев.", type: "fact"},
            {text: "Кошки могут издавать около 100 различных звуков.", type: "fact"},
            {text: "В Древнем Египте кошек считали священными животными.", type: "fact"},
            {text: "Кошка может бежать со скоростью до 50 км/ч на короткие дистанции.", type: "fact"}
        ];
    }

    async getFacts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.facts);
            }, 500); // Имитация задержки сети
        });
    }
}

// API для шуток (используем работающий API)
class JokesApi {
    async getRandomJokes() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?amount=5');
            if (!response.ok) throw new Error('Ошибка загрузки шуток');
            const data = await response.json();
            return data.jokes || [data];
        } catch (error) {
            console.error('Error loading jokes:', error);
            // Возвращаем локальные шутки в случае ошибки
            return [
                {setup: "Почему программисты путают Хэллоуин и Рождество?", delivery: "Потому что Oct 31 == Dec 25", category: "Programming"},
                {joke: "Я рассказывал шутки про MVC, но модель не смеялась, представление выглядело смущенным, а контроллер просто потерялся.", category: "Programming"},
                {setup: "Как называют программиста, который боится женщин?", delivery: "Гик-офоб", category: "Programming"},
                {joke: "Компьютер не дает мне советов по жизни... только команды.", category: "Programming"},
                {setup: "Почему программист всегда холодный?", delivery: "Потому что он постоянно работает с Windows", category: "Programming"}
            ];
        }
    }
}

// Инициализация API
const catFactsApi = new CatFactsApi();
const jokesApi = new JokesApi();

// Функции для работы с API
async function loadCatFacts() {
    try {
        document.getElementById('loading').style.display = 'flex';
        const facts = await catFactsApi.getFacts();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="api-content">
                <h2>Факты о котах</h2>
                ${facts.slice(0, 10).map(fact => `
                    <div class="api-item">
                        <p>${fact.text}</p>
                        <small>Тип: ${fact.type}</small>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        showError('Не удалось загрузить факты о котах. Пожалуйста, попробуйте позже.');
        console.error('Error loading cat facts:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

async function loadJokes() {
    try {
        document.getElementById('loading').style.display = 'flex';
        const jokes = await jokesApi.getRandomJokes();
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="api-content">
                <h2>Случайные шутки</h2>
                ${jokes.slice(0, 5).map(joke => `
                    <div class="api-item">
                        ${joke.setup ? `<p><strong>${joke.setup}</strong></p>` : ''}
                        ${joke.delivery ? `<p>${joke.delivery}</p>` : ''}
                        ${joke.joke ? `<p>${joke.joke}</p>` : ''}
                        <small>Категория: ${joke.category || 'Any'}</small>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        showError('Не удалось загрузить шутки. Пожалуйста, попробуйте позже.');
        console.error('Error loading jokes:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// Вспомогательные функции
function showError(message) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = 'Ошибка';
    document.getElementById('modal-body').innerHTML = `<p>${message}</p>`;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadBlocks();
    buildPage();
});