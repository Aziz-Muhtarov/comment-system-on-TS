import { User } from "./classes/user";
import { Post } from "./classes/post";
import { Comment } from "./classes/comment";

// Пример использования:

// Создаем пользователей
const user1 = new User(1, "john_doe", "https://example.com/avatar1.jpg");
const user2 = new User(2, "jane_smith", "https://example.com/avatar2.jpg");

// Создаем пост
const post1 = new Post(1, "Новый пост", "Текст нового поста...", user1.id);

// Создаем комментарии
const comment1 = new Comment(1, user2.id, "Отличный пост!", new Date());
const comment2 = new Comment(2, user1.id, "Спасибо за отзыв!", new Date());

// Добавляем комментарии к посту
post1.addComment(comment1);
post1.addComment(comment2);

// Добавляем ответ на комментарий
const reply1 = new Comment(3, user1.id, "Согласен!", new Date());
comment1.addReply(reply1);

// Удаляем комментарий
post1.deleteComment(comment2.id);

console.log(post1);

export { Main };