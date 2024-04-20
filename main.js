// document.addEventListener('DOMContentLoaded', function() {
//     const triggerBlock = document.getElementsByClassName('comments-header__item-text');
//     const popupMenu = document.getElementById('comments-header__dropdown-container');

//     // При клике на блок "triggerBlock"
//     triggerBlock.addEventListener('click', function() {
//         // Переключаем видимость всплывающего меню
//         if (popupMenu.style.display === 'block') {
//             // Если меню отображается, скрываем его
//             popupMenu.style.display = 'none';
//         } else {
//             // Если меню скрыто, отображаем его с плавным эффектом
//             popupMenu.style.display = 'block';
//         }
//     });

//     // Закрытие меню при клике за его пределами
//     document.addEventListener('click', function(event) {
//         if (!popupMenu.contains(event.target) && event.target !== triggerBlock) {
//             popupMenu.style.display = 'none';
//         }
//     });
// });