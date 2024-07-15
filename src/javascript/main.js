import { Rating } from "./classes/rating.js";
import { User } from "./classes/user.js";
import { Archive } from "./classes/archive.js";
import { Answer } from "./classes/answer.js";
import { Utils } from "./classes/utils.js";
import { Favorites } from "./classes/favourites.js";
import { Input } from "./classes/input.js";

class Main {
  API = "https://randomuser.me/api/";
  users = JSON.parse(localStorage.getItem("users")) || [];
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  answers = JSON.parse(localStorage.getItem("answers")) || [];
  ratings = JSON.parse(localStorage.getItem("ratings")) || [];
  answerRatings = JSON.parse(localStorage.getItem("answerRatings")) || [];
  itemsSort = JSON.parse(localStorage.getItem("itemsSort")) || [];
  usersIdx = 0;
  maxUsers = 10;
  userTitles = [
    "comments__user-title",
    "comments__archive-title",
    "comments__answer-title",
  ];

  async setUserParams(API) {
    await fetch(API).then((res) =>
      res.json().then((data) => {
        const userObj = {
          first: data.results[0].name.first,
          last: data.results[0].name.last,
          src: data.results[0].picture.thumbnail,
        };
        this.users.push(userObj);
        if (this.users.length > this.maxUsers) this.users.pop();
        localStorage.setItem("users", JSON.stringify(this.users));
      })
    );
    return this.users;
  }

  formatDate() { 
    let dayOfMonth = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();

    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${dayOfMonth}.${month} ${hour}:${minutes}`;
  }


  render() {
    this.rating = new Rating({
      main: this,
    });
    this.user = new User({
      main: this,
    });
    this.archive = new Archive({
      rating: this.rating,
      main: this,
    });
    this.answer = new Answer({
      rating: this.rating,
      main: this,
    });
    this.utils = new Utils({
      main: this,
    });
    this.favorites = new Favorites({
      main: this,
    });
  }

  renderInput() {
    this.input = new Input({
      main: this,
    });
  }

  setNextUser() {
    this.user.setUser();
    this.users.forEach((el, idx) => {
      if (el != null) this.user.setUserName(idx);
    });
  }

  setNextComments() {
    this.comments.forEach((el, idx) => {
      if (el != null) this.archive.setNextUser(idx);
    });
  }

  getCommentsInFavorites() {
    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.onComments[2].addEventListener("click", (event) => {
      event.currentTarget.classList.toggle(
        "comments-header__item-text--active"
      );
      if (
        event.currentTarget.classList.contains(
          "comments-header__item-text--active"
        )
      ) {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
      } else {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          element.style.display = "grid";
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          element.style.display = "grid";
        }
      }
    });
  }

  async start() {
    await this.setUserParams(this.API);

    this.render();
    this.setNextUser();
    this.renderInput();

    this.setNextComments();
    this.answer.commentAnswer();
    this.answer.setNextAnswers();
    this.utils.increaseCommentCount();
    this.favorites.addToFavoritesArchives();
    this.favorites.addToFavoritesAnswers();
    this.getCommentsInFavorites();
    this.rating.commentsRatingArchive();
    this.rating.commentsRatingAnswer();
    this.utils.sortCommentsByDate();
    this.utils.sortCommentsByNumserOfRating();
    this.input.onFocusTextarea();
    this.utils.sortCommentsByRelevance();
    this.utils.dropdownMenu();
    this.utils.sortCommentsByNumberOfResponses();
  }
}

export { Main };