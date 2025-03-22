// Базовый класс Block
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

// Класс TextBlock
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

// Класс ImageBlock
class ImageBlock extends Block {
    constructor(data) {
        super(data, 'image');
    }
    getHTML() {
        return `<div class="block image-block">
                    <img src="${this.data}" alt="Image">
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

// Класс ListBlock
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

// Функция для сборки страницы
function buildPage() {
    const content = document.getElementById('content');
    content.innerHTML = blocks.map(block => block.getHTML()).join('');
}

function toggleEditAll() {
    const content = document.getElementById('content');
    content.innerHTML = blocks.map(block => block.getEditHTML()).join('');
    document.querySelector('header button:nth-child(1)').style.display = 'none'; 
    document.querySelector('header button:nth-child(2)').style.display = 'inline-block'; 
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
    document.querySelector('header button:nth-child(1)').style.display = 'inline-block'; 
    document.querySelector('header button:nth-child(2)').style.display = 'none'; 
}

function deleteBlock(button) {
    const blockElement = button.closest('.block');
    const index = Array.from(blockElement.parentElement.children).indexOf(blockElement);
    blocks.splice(index, 1);
    saveBlocks();
    buildPage();
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

document.addEventListener('DOMContentLoaded', () => {
    loadBlocks();
    buildPage();
});