function addComment() {
    var author = document.getElementById('author').value;
    var commentText = document.getElementById('commentText').value;

    if (!author || !commentText) {
        alert('Please fill in all comment fields.');
        return;
    }

        // Получаем параметр из URL
        var urlParams = new URLSearchParams(window.location.search);
        var indexParam = urlParams.get('index');
    
    if (indexParam) {
        var index = parseInt(indexParam);

        // Загружаем данные из localStorage (если они уже там есть)
        var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};

        // Проверяем, есть ли запись для текущего индекса
        storedData[index] = storedData[index] || { comments: [] };
       
        // Добавляем новый комментарий
        var newComment = {
            id: storedData[index].comments.length + 1,
            author: author,
            text: commentText
        };

        storedData[index].comments.push(newComment);

        // Обновляем localStorage
        localStorage.setItem('commentsData', JSON.stringify(storedData));
        // Очищаем поля ввода
        document.getElementById('commentText').value = '';
        document.getElementById('author').value = '';
        // Обновляем отображение комментариев
        showComments(index);  
    } else {
        console.error('Index not found.');
    }
}
function loadComment(index) {
    var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};
    var comments = storedData[index] ? storedData[index].comments : [];

    // Отображаем комментарии
    var commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';

    if (comments.length > 0) {
        var commentsList = document.createElement('ul');
        comments.forEach(comment => {
            var commentItem = document.createElement('li');
            commentItem.innerText = `${comment.author}: ${comment.text}`;
            commentsList.appendChild(commentItem);
        });

        commentsContainer.appendChild(commentsList);
    } else {
        commentsContainer.innerText = 'No comments yet.';
    }
}


function deleteEditedComment() {
    // Получаем commentId из атрибута data-comment-id
    var commentIdString = document.getElementById('editedComment').dataset.commentId;

    // Преобразуем commentId в число
    var commentId = parseInt(commentIdString, 10);
     console.log(commentId)

    // Проверяем, что commentId определен
    if (isNaN(commentId)) {
        alert('Не удалось получить идентификатор комментария.');
        return;
    }

    // Получаем данные из localStorage
    var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};
    
    // Получаем параметр из URL
    var urlParams = new URLSearchParams(window.location.search);
    var indexParam = urlParams.get('index');

    if (indexParam) {
        var index = parseInt(indexParam);

        // Проверяем, есть ли запись для текущего индекса
        if (storedData[index]) {
            // Удаляем комментарий с указанным id
            storedData[index].comments = storedData[index].comments.filter(comment => comment.id !== commentId);

            // Обновляем localStorage
            localStorage.setItem('commentsData', JSON.stringify(storedData));
              // После удаления сбросьте data-comment-id  и поле ввода
              document.getElementById('editedComment').dataset.commentId = '';
              document.getElementById('editedComment').value = '';
            // Обновляем отображение комментариев
            showComments(index);  
        } else {
            alert('Запись не найдена.');
        }
    } else {
        console.error('Index not found.');
    }
}


function saveEditedComment() {
    var editedComment = document.getElementById('editedComment').value;
    // Получаем commentId из атрибута data-comment-id
    var commentIdString = document.getElementById('editedComment').dataset.commentId;

    // Преобразуем commentId в число
    var commentId = parseInt(commentIdString, 10);

    // Проверяем, что commentId определен
    if (isNaN(commentId)) {
        alert('Не удалось получить идентификатор комментария.');
        return;
    }

    // Получаем данные из localStorage
    var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};
    
    // Получаем параметр из URL
    var urlParams = new URLSearchParams(window.location.search);
    var indexParam = urlParams.get('index');

    if (indexParam) {
        var index = parseInt(indexParam);

        // Проверяем, есть ли запись для текущего индекса
        if (storedData[index]) {
            // Находим выбранный комментарий в массиве и обновляем его текст
            storedData[index].comments = storedData[index].comments.map(comment => {
                if (comment.id === commentId) {
                    comment.text = editedComment;
                }
                return comment;
            });

            // Обновляем localStorage
            localStorage.setItem('commentsData', JSON.stringify(storedData));
            // очищаем textrea
            document.getElementById('editedComment').value = '';
            // Обновляем отображение комментариев
            showComments(index);
        } else {
            alert('Запись не найдена.');
        }
    } else {
        console.error('Index not found.');
    }
}


function selectComment(commentId) {
    // Получаем данные из localStorage
    var storedData = JSON.parse(localStorage.getItem('commentsData')) || {};
    
    // Получаем параметр из URL
    var urlParams = new URLSearchParams(window.location.search);
    var indexParam = urlParams.get('index');

    if (indexParam) {
        var index = parseInt(indexParam);

        // Проверяем, есть ли запись для текущего индекса
        if (storedData[index]) {
            var selectedComment = storedData[index].comments.find(comment => comment.id === commentId);

            if (selectedComment) {
                // Подставляем выбранный комментарий в поле редактирования
                document.getElementById('editedComment').value = selectedComment.text;
                document.getElementById('editedComment').setAttribute('data-comment-id', selectedComment.id);
            } else {
                alert('Комментарий не найден.');
            }
        } else {
            alert('Запись не найдена.');
        }
    } else {
        console.error('Index not found.');
    }
}
function editeMdfile() {
     // Получаем параметр из URL
     var urlParams = new URLSearchParams(window.location.search);
     var indexParam = urlParams.get('index');
 
 if (indexParam) {
     var index = parseInt(indexParam);
 }
    window.location.href = `../edit.html?index=${index}`;
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