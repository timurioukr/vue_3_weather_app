Vue 3 + Firebase deploy
Pinia, 
Sweetalert,
Axios,
Chart.js (Not VueChartJs)
VueRouter

Додаток для моніторингу погодних умов

---Згідно вимогам---

Додаток створено з використанням Vue 3 (Vite) та використовує Pinia як менеджер сховища

Для виведення графіку зміни температури використовуєтсья Chart.js - головна бібліотека, не адаптована під Vue. Згідно вимогам. Саме тому і для динамічного рендеренгу у компоненті використовуются не реактивні змінні.

Для локалізації використовується i18n - з перекладами у формати json

При завантаженні автоматично визначає місцеположення юзера - та потім погоду у цій місцевості
(Використовуютсья mapbox та openweathermap)

Ключі від апі прописані у сторі

Не використовуються UX бібліотеки та CSS препроцесори

Для створення закладки міста - використовується його latitude та longitude, запит відправляється кожен раз при переході на закладки для 
отримання актуальних даних

Серед сторонніх бібліотек використовується VueSweetAlert для відображення модальних вікон та підключення іконок

При вході в додаток користувача запитується дозвіл на використання геопозиції через браузер. При підтвердженні, запит на отримання параметрів latitude та longitude використовується для встановлення місця користувача, після чого відправляється запит на отримання погодних умов цієї місцевості

Перша карточка, яка представляє місцезнаходження користувача, є дефолтною та не підлягає видаленню

Інші карточки можна додавати як дублікат попередньої з можливістю вибору (введення з автокомплітом) нового місця

На головній сторінці ті міста, які є в закладках, мають підсвічену іконку закладок та виділені обведенням

Додаток адаптивний. Використовується flexbox та медіа запити для досягнення адаптивності

Незважаючи на те, що API дозволяє отримувати погодні умови на сьогодні, було вирішено оптимізувати запити за рахунок взяття першого дня як за сьогоднішній та відображення по ньому інформації

У графіку згідно вимогам бачимо середню температуру по усім дням, але при перемиканні на сьогоднішній день бачимо температуру по годинам

![Screenshot 2023-11-01 at 19 56 30](https://github.com/timurioukr/vue_3_weather_app/assets/82959081/fcc7bfea-025f-48d8-8ddd-f05fe2112c7f)
