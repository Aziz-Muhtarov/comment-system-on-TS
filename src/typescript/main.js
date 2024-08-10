import { Rating } from "./classes/rating";
import { User } from "./classes/user";
import { Archive } from "./classes/archive";
import { Answer } from "./classes/answer";
import { Utils } from "./classes/utils";
import { Favorites } from "./classes/favorites";
import { Input } from "./classes/input";
class Main {
    API = "https://randomuser.me/api/";
    users = JSON.parse(localStorage.getItem("users") || "[]");
    comments = JSON.parse(localStorage.getItem("comments") || "[]");
    answers = JSON.parse(localStorage.getItem("answers") || "[]");
    ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
    answerRatings = JSON.parse(localStorage.getItem("answerRatings") || "[]");
    itemsSort = JSON.parse(localStorage.getItem("itemsSort") || "[]");
    usersIdx = 0;
    maxUsers = 10;
    userTitles = [
        "comments__user-title",
        "comments__archive-title",
        "comments__answer-title",
    ];
    rating;
    user;
    archive;
    answer;
    utils;
    favorites;
    input;
    async setUserParams(API) {
        const response = await fetch(API);
        const data = await response.json();
        const userObj = {
            first: data.results[0].name.first,
            last: data.results[0].name.last,
            src: data.results[0].picture.thumbnail,
        };
        this.users.push(userObj);
        if (this.users.length > this.maxUsers)
            this.users.pop();
        localStorage.setItem("users", JSON.stringify(this.users));
        return this.users;
    }
    formatDate() {
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
        this.utils = new Utils({ main: this });
        this.favorites = new Favorites({ main: this });
    }
    renderInput() {
        this.input = new Input({ main: this });
    }
    setNextUser() {
        this.user.setUser();
        this.users.forEach((el, idx) => {
            if (el != null)
                this.user.setUserName(idx);
        });
    }
    setNextComments() {
        this.comments.forEach((el, idx) => {
            if (el != null)
                this.archive.setNextUser(idx);
        });
    }
    getCommentsInFavorites() {
        const onComments = document.querySelectorAll(".comments-header__item-text");
        onComments[2].addEventListener("click", (event) => {
            const target = event.currentTarget;
            target.classList.toggle("comments-header__item-text--active");
            const commentsArchiveIsFavorite = document.querySelectorAll(".comments__archive");
            const commentsAnswerIsFavorite = document.querySelectorAll(".comments__answer");
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
            }
            else {
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
