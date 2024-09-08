import { Rating } from "./classes/rating.js";
import { User } from "./classes/user.js";
import { Archive } from "./classes/archive.js";
import { Answer } from "./classes/answer.js";
import { Utils } from "./classes/utils.js";
import { Favorites } from "./classes/favorites.js";
import { Input } from "./classes/input.js";


interface UserObj {
  first: string;
  last: string;
  src: string;
}

interface Comment {
  src: string;
  text: string;
  date: string;
}

interface AnswerObj {
  text: string;
  date: string;
  name: string;
  src: string;
  toWhom: string;
  authorIdx: string;
}

interface RatingObj {
  value: number;
  whose: number;
}


class Main {
  private API: string = "https://randomuser.me/api/";
  public users: UserObj[] = JSON.parse(localStorage.getItem("users") || "[]");
  public comments: Comment[] = JSON.parse(localStorage.getItem("comments") || "[]");
  public answers: AnswerObj[] = JSON.parse(localStorage.getItem("answers") || "[]");
  public ratings: RatingObj[] = JSON.parse(localStorage.getItem("ratings") || "[]").map((value: number, index: number) => ({ value, whose: index }));

  public answerRatings: RatingObj[] = JSON.parse(localStorage.getItem("answerRatings") || "[]");
  public itemsSort: string[] = JSON.parse(localStorage.getItem("itemsSort") || "[]");
  private usersIdx: number = 0;
  private maxUsers: number = 10;
  private userTitles: string[] = [
    "comments__user-title",
    "comments__archive-title",
    "comments__answer-title",
  ];

  private rating!: Rating;
  private user!: User;
  private archive!: Archive;
  private answer!: Answer;
  private utils!: Utils;
  private favorites!: Favorites;
  private input!: Input;

  async setUserParams(API: string): Promise<UserObj[]> {
    const response = await fetch(API);
    const data = await response.json();
    const userObj: UserObj = {
      first: data.results[0].name.first,
      last: data.results[0].name.last,
      src: data.results[0].picture.thumbnail,
    };
    this.users.push(userObj);
    if (this.users.length > this.maxUsers) this.users.pop();
    localStorage.setItem("users", JSON.stringify(this.users));
    return this.users;
  }

  formatDate(): string { 
    const now = new Date();
    const dayOfMonth = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${dayOfMonth}.${month} ${hour}:${minutes}`;
  }

  render() {
    this.rating = new Rating({ main: this });
    this.user = new User({ main: this });
    this.archive = new Archive({ rating: this.rating, main: this });
    this.answer = new Answer({ rating: this.rating, main: this });
    this.utils = new Utils({ main. this });
    this.favorites = new Favorites();
  }

  renderInput() {
    this.input = new Input({ main: this });
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
    const onComments = document.querySelectorAll<HTMLElement>(".comments-header__item-text");
    onComments[2].addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLElement;
      target.classList.toggle("comments-header__item-text--active");
      const commentsArchiveIsFavorite = document.querySelectorAll<HTMLElement>(".comments__archive");
      const commentsAnswerIsFavorite = document.querySelectorAll<HTMLElement>(".comments__answer");

      if (target.classList.contains("comments-header__item-text--active")) {
        commentsArchiveIsFavorite.forEach((element) => {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        });
        commentsAnswerIsFavorite.forEach((element) => {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        });
      } else {
        commentsArchiveIsFavorite.forEach((element) => {
          element.style.display = "grid";
        });
        commentsAnswerIsFavorite.forEach((element) => {
          element.style.display = "grid";
        });
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