document.addEventListener('DOMContentLoaded', function() {
    // Загружаем JSON-файл
    fetch('./contain.json')
        .then(response => response.json())
        .then(data => {
            // Получаем секцию для постов
            const postSection = document.getElementById('postSection');

            // Проходим по каждому элементу в данных
            data.posts.forEach(post => {
                // Создаем пост
                const postBox = document.createElement('div');
                postBox.classList.add('post-box', post.categoryClass);

                // Создаем изображение
                const image = document.createElement('img');
                image.src = post.imagePath;
                image.alt = '';
                image.classList.add('post-img');

                // Создаем категорию
                const categoryName = document.createElement('h2');
                categoryName.classList.add('category');
                categoryName.innerText = post.category;

                // Создаем заголовок
                const postTitle = document.createElement('a');
                postTitle.href = `./posts/post.html?index=${post.index}`;
                postTitle.classList.add('post-title');
                postTitle.innerText = post.title;
                postTitle.id = 'index'; // Добавляем идентификатор

                // Создаем дату
                const postDate = document.createElement('span');
                postDate.classList.add('post-date');
                postDate.innerText = post.date;

                // Создаем краткое описание
                const smallText = document.createElement('p');
                smallText.classList.add('smallText');
                smallText.innerHTML = post.smallText;

                // Создаем профиль
                const profile = document.createElement('div');
                profile.classList.add('profile');

                // Создаем изображение профиля
                const imgProfile = document.createElement('img');
                imgProfile.src = post.profileImagePath;
                imgProfile.alt = '';
                imgProfile.classList.add('profile-img');

                // Создаем имя профиля
                const profileName = document.createElement('span');
                profileName.classList.add('profile-name');
                profileName.innerText = post.profileName;

                // Добавляем элементы в пост
                postBox.appendChild(image);
                postBox.appendChild(categoryName);
                postBox.appendChild(postTitle);
                postBox.appendChild(postDate);
                postBox.appendChild(smallText);

                profile.appendChild(imgProfile);
                profile.appendChild(profileName);

                postBox.appendChild(profile);

                // Добавляем пост в секцию
                postSection.appendChild(postBox);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
