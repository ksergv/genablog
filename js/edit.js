// Получаем параметр из URL
var urlParams = new URLSearchParams(window.location.search);
var indexParam = urlParams.get('index');

if (indexParam) {
    var id = parseInt(indexParam);

    // Функция для загрузки данных из файла data.json
    async function loadDataAndEdit(id) {
        try {
            // Асинхронный запрос на получение данных из файла
            const response = await fetch('posts/data.json');
            const jsonData = await response.json();

            // Вызываем функцию для загрузки данных в textarea
            loadMdFile(id, jsonData);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    // Функция для загрузки данных в textarea
    async function loadMdFile(id, jsonData) {
        var editTextarea = document.getElementById('editText');
        
        // Поиск элемента по id в массиве entries
        var entry = jsonData.entries.find(entry => entry.id === id);

        // Если элемент найден
        if (entry) {
            message= 'Редактируется '+`${entry.title}`+'.md'
            document.getElementById('editName').innerHTML = message;
            try {
                // Асинхронный запрос на получение содержимого файла
                const mdResponse = await fetch(`posts/${entry.title}.md`);
                const mdContent = await mdResponse.text(); // Use .text() to get the content

                // Если содержимое файла получено, устанавливаем его в textarea
                editTextarea.value = mdContent;
            } catch (error) {
                console.error('Ошибка загрузки MD файла:', error);
                editTextarea.value = ''; // Очистить textarea в случае ошибки
            }
        }
    }


       
     // Функция для загрузки данных из файла data.json
async function loadData() {
    try {
        // Асинхронный запрос на получение данных из файла
        const response = await fetch('posts/data.json');
        const jsonData = await response.json();

        return jsonData;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        throw error;
    }
}

// Функция для сохранения MD файла
function saveMdFile() {
    try {
        // Получаем содержимое textarea
        const mdContent = document.getElementById('editText').value;

        // Получаем параметр из URL (index)
        const urlParams = new URLSearchParams(window.location.search);
        const indexParam = urlParams.get('index');

        // Если indexParam существует, преобразуем его в число
        if (indexParam) {
            const id = parseInt(indexParam);

            // Асинхронный запрос на получение данных из файла data.json
            fetch('posts/data.json')
                .then(response => response.json())
                .then(jsonData => {
                    const entries = jsonData.entries;

                    // Поиск элемента по id в массиве entries
                    const entry = entries.find(e => e.id === id);

                    // Если элемент найден, создаем Blob и ссылку для скачивания
                    if (entry) {
                        const blob = new Blob([mdContent], { type: 'text/markdown' });

                        // Создаем ссылку для скачивания
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = `${entry.title}.md`;

                        // Симулируем клик по ссылке
                        a.click();

                        // Очищаем объект URL
                        URL.revokeObjectURL(a.href);

                        alert('Изменения сохранены!');
                    } else {
                        console.error('Элемент не найден в массиве entries.');
                    }
                })
                .catch(error => {
                    console.error('Ошибка загрузки данных:', error);
                    alert('Ошибка загрузки данных. Проверьте консоль для дополнительной информации.');
                });
        } else {
            console.error('Отсутствует параметр index в URL.');
        }
    } catch (error) {
        console.error('Ошибка сохранения MD файла:', error);
        alert('Ошибка сохранения. Проверьте консоль для дополнительной информации.');
    }
}

        
        
    // Вызываем функцию для загрузки данных из файла при загрузке страницы
    loadDataAndEdit(id);
}
