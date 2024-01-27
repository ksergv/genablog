

    // Получаем параметр из URL
    var urlParams = new URLSearchParams(window.location.search);
    var indexParam = urlParams.get('index');

    // Если параметр присутствует, загружаем данные с соответствующим индексом
    if (indexParam) {
        var index = parseInt(indexParam);
        loadData(index);
    }

    function loadData(index) {
        
            // Загружаем JSON-файл
            fetch('../posts/data.json')
                .then(response => response.json())
                .then(data => {
                    // Выбираем нужную запись по индексу (id)
                    var entry = data.entries.find(item => item.id === index);
    
                    if (entry) {
                        // Загружаем Markdown-файл по указанному пути
                         fetch(encodeURI('../posts/' + entry.title + '.md'))
                            .then(response => response.text())
                            .then(markdownContent => {
                                // Одно объявление reader внутри блока then
                                var reader = new commonmark.Parser({smart: true});;
    
                                const parsed = reader.parse(markdownContent);
    
                                // Преобразуем Markdown в HTML
                                const writer = new commonmark.HtmlRenderer({sourcepos: true});
    
                                const htmlContent = writer.render(parsed);
    
                                // Очищаем содержимое контейнера
                                document.getElementById('htmlContainer').innerHTML = '';
    
                                // Вставляем HTML-код
                                var htmlElement = document.createElement('div');
                                htmlElement.innerHTML = htmlContent;
                                document.getElementById('htmlContainer').appendChild(htmlElement);
                            })
                            .catch(error => console.error('Error loading Markdown file:', error));
    
                        // Вставляем изображение
                        document.getElementById('imageContainer').innerHTML = '';
                        const imageContainer = document.getElementById('imageContainer');
                        imageContainer.innerHTML = `<img src="${entry.picture_path}" alt="" class="header-img">`;
    
                        // Вставляем титул
                        document.getElementById('titulContainer').innerHTML = '';
                        var titulElement = document.createElement('h1');
                        titulElement.innerHTML = entry.title;
                        document.getElementById('titulContainer').appendChild(titulElement);
    
                        document.getElementById('titul').innerHTML = '';
                        var titul = document.createElement('h2');
                        titul.innerHTML = entry.title;
                        document.getElementById('titul').appendChild(titul);
    
                        // Отображаем комментарии
                        showComments(index);
                    } else {
                        console.error('Entry not found.');
                    }
                })
                .catch(error => console.error('Error loading JSON:', error));
       
    }
    



function showComments(index) {
       // Отображаем комментарии
       var commentsContainer = document.getElementById('commentsContainer');
       commentsContainer.innerHTML = '';

    // Получаем данные из localStorage
    var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};

    // Проверяем, есть ли запись для текущего индекса
    if (storedData[index]) {
        var comments = storedData[index].comments;

     
        if (comments.length > 0) {
            var commentsList = document.createElement('ul');
            comments.forEach(comment => {
                var commentItem = document.createElement('li');
                commentItem.innerText = `${comment.author}: ${comment.text}`;

                // Добавляем обработчик события для выбора комментария
                commentItem.addEventListener('click', function() {
                    selectComment(comment.id);
                });

                commentsList.appendChild(commentItem);
                // Добавим следующую строку в showComments(index) для добавления обработчика наведения на комментарий
                commentItem.addEventListener('mouseover', function() {
                    commentItem.style.backgroundColor = '#f0f0f0'; // Задайте цвет, который вам нравится
                });

                // Добавим следующую строку в showComments(index) для добавления обработчика ухода мыши с комментария
                commentItem.addEventListener('mouseout', function() {
                    commentItem.style.backgroundColor = ''; // Возвращаем обычный фон
                });
            });

            commentsContainer.appendChild(commentsList);
        } else {
            commentsContainer.innerText = 'No comments yet.';
        }
    } else {
        commentsContainer.innerText = 'No comments yet.';
    }
}