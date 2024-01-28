## simple blog with js management

>
./contain.json предназначен для считывания  информации для работы index.html
структура:

    "posts": [
      {
        "index": 1,
        "imagePath": "img/post-1.jpg", // картинка
        "category": "Mobile",  // категория
        "categoryClass": "Mobile", //проверка категории при выборе 
        "title": "Введение в HTML", // титул отображаемый в постах 
        "date": "27 Jan 2024", //дата
        "smallText": "HTML (HyperText Markup Language) является основой веб-разработки. С его помощью создаются структура и контент веб-страницы.", // краткий текст
        "profileImagePath": "img/profile-1.jpg", //картинка профайла
        "profileName": "Marques Brown" //имя автора
      }]
      

   
    ./posts/data.json предназначен для работы с post.html

      структура:
	"entries": [
		{
			"id": 1,
			"picture_path": "../img/post-1.jpg", //  картинка
			"title": "Введение в HTML" // титул отображается в ./posts/post.html и совпадает с именем md фала то есть - Введение в HTML.md
		} ]


  продолжение следует
