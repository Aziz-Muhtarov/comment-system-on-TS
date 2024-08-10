interface User {
    src: string;
    first: string;
    last: string;
  }
  
  interface Main {
    users: User[];
  }
  
  interface UserOptions {
    main: Main;
  }
  
  class User {
    main: Main;
    commentsHeader: Element | null;
    userComment: HTMLFormElement | null;
  
    constructor({ main }: UserOptions) {
      this.main = main;
      this.commentsHeader = document.querySelector(".comments-header");
      this.userComment = document.querySelector(".comments__user") as HTMLFormElement | null;
    }
  
    setUser(): void {
      this.userComment = document.createElement("form");
      this.userComment.classList.add("comments__user");
      const lastUser = this.main.users.at(-1);
  
      if (lastUser) {
        this.userComment.innerHTML = `  
        <img class="authorImg" src="${lastUser.src}" alt="user" width="61" height="61"/>
        <p class="comments__answer-title-nav">${lastUser.first} ${lastUser.last}</p>
        <textarea
          class="comment__input-form"
          name="comment"          
          rows="1"
          placeholder="Введите текст сообщения..."
        ></textarea>
        <output class="comment__output-form">Макс. 1000 символов</output>
        <p class="comments__output-error">Слишком длинное сообщение</p>
        <button class="comment__input-btn button" type="submit">
          Отправить
        </button>`;
        this.commentsHeader?.after(this.userComment);
      }
    }
  
    setUserName(idx: number): void {
      const user = this.main.users[idx];
      const userImg = document.createElement("img");
      userImg.src = user.src;
      userImg.alt = "user";
      userImg.width = 61;
      userImg.height = 61;
  
      const userName = document.createElement("p");
      userName.classList.add("comments__archive-title");
      userName.textContent = `${user.first} ${user.last}`;
  
      this.userComment?.prepend(userImg);
      userImg.remove();
  
      this.userComment?.prepend(userName);
      userName.remove();
    }
  }
  
  export { User };