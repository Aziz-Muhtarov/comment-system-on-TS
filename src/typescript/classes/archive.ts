class Archive {
    private main: any;
    private rating: any;
    private userComment: HTMLElement | null;
    private userNextComment: any;
  
    constructor({ main, rating }: { main: any; rating: any }) {
      this.main = main;
      this.rating = rating;
  
      this.userComment = document.querySelector(".comments__user");
    }
  
    setNextUser(idx: number): void {
      this.userNextComment = document.createElement("div");
      this.userNextComment.classList.add("comments__archive");
      this.userNextComment.setAttribute("data-index", idx.toString());
      this.userNextComment.setAttribute("isFavorite", "false");
      this.userNextComment.setAttribute(
        "data-rating",
        `${this.rating.displayRatingArchive(this.userNextComment.dataset.index)}`
      );
  
      this.userNextComment.innerHTML = `
        <img src="${this.main.users[idx].src}" alt="user" width="61" height="61"/>
        <p class="comments__answer-title">${this.main.users[idx].first} ${
        this.main.users[idx].last
      }</p>
        <p class="comments__archive-date">${this.main.comments[idx].date}</p>
        <p class="comments__archive-text">${this.main.comments[idx].text}</p>
        <button class="comments__archive-answer-btn button">
          <img src="./src/assets/reply.svg" alt="reply" />&#160;Ответить
        </button>
        <button class="comments__archive-favourites-btn button">
          <img
            src="./src/assets/heart_empty.svg"
            alt="heart_empty"
          />
          <p>&#160;В избранное</p>
        </button>
        <div class="comments__rating comments__rating-archive">
          <button class="comments__btn-minus button">
            <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
          </button>
          <span class="comments__count">${this.rating.displayRatingArchive(
            this.userNextComment.dataset.index
          )}</span>
          <button class="comments__btn-plus button">
            <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
          </button>
        </div>
      `;
  
      if (this.userComment) {
        this.userComment.after(this.userNextComment);
      }
  
      const ratingSpan = this.userNextComment.querySelector(
        ".comments__count"
      ) as HTMLElement;
  
      if (ratingSpan && Number(ratingSpan.textContent) < 0) {
        ratingSpan.style.color = "red";
      }
    }
  }
  
  export { Archive };