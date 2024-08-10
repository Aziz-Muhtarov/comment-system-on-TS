type MainType = {
    users: Array<{ src: string; first: string; last: string }>;
    answers: Array<{
      src: string;
      name: string;
      date: string;
      text: string;
      toWhom: string;
      authorIdx: string;
    }>;
    formatDate: () => string;
  };
  
  type RatingType = {
    displayRatingAnswer: (index: string | undefined) => number;
  };
  
  class Answer {
    private main: MainType;
    private rating: RatingType;
    private userNextAnswer!: HTMLElement;
    private targets!: NodeListOf<Element>;
    private buttonAnswers!: NodeListOf<Element>;
    private authorAnswerName!: HTMLElement | null;
    private authorAnswerImg!: HTMLImageElement | null;
    private buttonAnswer!: HTMLElement;
    private toWhomAnswerName!: string | null;
    private authorIdx!: string | null;
    private userNavAnswer!: HTMLFormElement;
    private commentsFormsElements!: HTMLFormControlsCollection;
    private textarea!: HTMLTextAreaElement;
    private output!: HTMLOutputElement;
    private buttonSubmit!: HTMLButtonElement;
    private lengthCommentError!: HTMLElement | null;
    private btnAnswerClose!: HTMLElement | null;
    private answerObj!: {
      text: string;
      date: string;
      name: string | null;
      src: string;
      toWhom: string | null;
      authorIdx: string | null;
    };
  
    constructor({ main, rating }: { main: MainType; rating: RatingType }) {
      this.main = main;
      this.rating = rating;
    }
  
    setUser(idx: number): void {
      this.userNextAnswer = document.createElement("div");
      this.userNextAnswer.classList.add("comments__answer");
      this.userNextAnswer.setAttribute("data-index", idx.toString());
      this.userNextAnswer.setAttribute("isFavorite", "false");
      this.userNextAnswer.setAttribute(
        "data-rating",
        `${this.rating.displayRatingAnswer(this.userNextAnswer.dataset.index)}`
      );
      this.userNextAnswer.innerHTML = `
          <img src="${
            this.main.answers[idx].src
          }" alt="user" width="61" height="61"/>
          <p class="comments__answer-title">${this.main.answers[idx].name}</p>
          <p class="comments__answer-date">${this.main.answers[idx].date}</p>
          <p class="comments__answer-text">${this.main.answers[idx].text}</p>
          <p class="comments__answer-text-reply">
            <img src="./src/assets/reply.svg" alt="reply"/>
              <span class="comments__answer-reply">${
                this.main.answers[idx].toWhom
              }</span>
          </p>
          <button class="comments__answer-favourites-btn button">
            <img src="./src/assets/heart_empty.svg" alt="heart_empty"/>
            <p>&#160;В избранное</p>
          </button>
          <div class="comments__rating comments__rating-answer">
            <button class="comments__btn-minus button">
              <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
            </button>
              <span class="comments__count">${this.rating.displayRatingAnswer(
                this.userNextAnswer.dataset.index
              )}</span>
            <button class="comments__btn-plus button">
              <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
            </button>
          </div>
        `;
      this.targets = document.querySelectorAll(".comments__archive");
      this.targets.forEach((el) => {
        if (el.getAttribute("data-index") === this.main.answers[idx].authorIdx) {
          el.after(this.userNextAnswer);
        }
        const countElement = this.userNextAnswer.querySelector(
          ".comments__count"
        ) as HTMLElement;
  
        if (countElement && Number(countElement.textContent) < 0) {
          countElement.style.color = "red";
        }
      });
    }
  
    commentAnswer(): void {
      this.buttonAnswers = document.querySelectorAll(
        ".comments__archive-answer-btn"
      );
  
      this.buttonAnswers.forEach((el) => {
        el.addEventListener(
          "click",
          () => {
            this.authorAnswerName = document.querySelector(
              ".comments__answer-title-nav"
            );
            this.authorAnswerImg = document.querySelector(".authorImg");
            this.buttonAnswer = el.parentElement as HTMLElement;
            this.toWhomAnswerName = this.buttonAnswer.querySelector(
              ".comments__answer-title"
            )?.textContent || null;
            this.authorIdx = this.buttonAnswer.getAttribute("data-index");
            this.userNavAnswer = document.createElement("form");
            this.userNavAnswer.classList.add("comments__user");
            this.userNavAnswer.setAttribute("id", "answerForm");
            this.userNavAnswer.innerHTML = `
              <img src="${
                this.main.users.at(-1)?.src ?? ""
              }" alt="user" width="61" height="61"/>
              <p class="comments__archive-title">${
                this.main.users.at(-1)?.first ?? ""
              } ${this.main.users.at(-1)?.last ?? ""}</p>
              <textarea
                class="comment__input-form"
                name="comment"
                id="comment"
                rows="1"
                placeholder="Введите текст сообщения..."
              ></textarea>
              <output class="comment__output-form">Макс. 1000 символов</output>
              <p class="comments__output-error">Слишком длинное сообщение</p>
              <button class="comment__input-btn button" type="submit">
                Отправить
              </button>
              <button class="comment__input-btn comment__input-btn-answer button">
                Отменить
              </button>
            `;
            this.buttonAnswer.after(this.userNavAnswer);
  
            this.commentsFormsElements = this.userNavAnswer.elements;
            this.textarea = this.commentsFormsElements.namedItem(
              "comment"
            ) as HTMLTextAreaElement;
            this.output = this.userNavAnswer.querySelector(
              ".comment__output-form"
            ) as HTMLOutputElement;
            this.buttonSubmit = this.userNavAnswer.querySelector(
              ".comment__input-btn"
            ) as HTMLButtonElement;
            this.lengthCommentError = document.querySelector(
              ".comments__output-error"
            );
            this.onFocusTextarea();
            this.commentAnswerInput();
            this.buttonAnswerClose();
  
            this.userNavAnswer.addEventListener("submit", (event) => {
              if (
                this.textarea.value.length === 0 ||
                this.textarea.value.length > 1000
              ) {
                event.preventDefault();
                this.buttonAnswerClose();
                alert("ошибка");
              } else {
                this.answerObj = {
                  text: this.textarea.value,
                  date: this.main.formatDate(),
                  name: this.authorAnswerName?.textContent || null,
                  src: this.authorAnswerImg?.src || "",
                  toWhom: this.toWhomAnswerName,
                  authorIdx: this.authorIdx,
                };
                this.main.answers.push(this.answerObj);
                localStorage.setItem(
                  "answers",
                  JSON.stringify(this.main.answers)
                );
                this.setNextAnswers();
                this.buttonAnswerClose();
              }
            });
          },
          { once: true }
        );
      });
    }
  
    commentAnswerInput(): void {
      this.textarea.addEventListener("input", () => {
        this.output.textContent =
          this.textarea.value.length + "/1000";
        this.buttonSubmitReady();
        if (this.textarea.value.length > 1000) {
          this.output.style.color = "red";
          this.lengthCommentError!.style.display = "block";
        } else {
          this.output.style.color = "black";
          this.lengthCommentError!.style.display = "none";
        }
        this.textarea.style.height = "auto";
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
      });
    }
  
    buttonAnswerClose(): void {
      this.btnAnswerClose = document.querySelector(".comment__input-btn-answer");
      this.btnAnswerClose?.addEventListener("click", (event) => {
        event.preventDefault();
        this.userNavAnswer.remove();
      });
    }
  
    onFocusTextarea(): void {
      Array.from(this.commentsFormsElements).forEach((element) => {
        const el = element as HTMLInputElement | HTMLTextAreaElement;
        if (el.type !== "checkbox" && el.type !== "submit") {
          el.addEventListener("focus", () => {
            el.style.backgroundColor = "lightyellow";
          });
          el.addEventListener("blur", () => {
            el.style.backgroundColor = "white";
          });
        }
      });
    }
  
    buttonSubmitReady(): void {
      if (this.textarea.value.length > 0 && this.textarea.value.length < 1000) {
        this.buttonSubmit.classList.add("comment__input-btn--ready");
      } else {
        this.buttonSubmit.classList.remove("comment__input-btn--ready");
      }
    }
  
    setNextAnswers(): void {
      this.main.answers.forEach((el, idx) => {
        if (el != null) {
          this.setUser(idx);
        }
      });
    }
  }
  
  export { Answer };