class Favorites {
  constructor() {}
  addToFavoritesArchives() {
    this.buttonsArchiveFavoritesArchives = document.querySelectorAll(
      ".comments__archive-favourites-btn"
    );
    this.buttonsArchiveFavoritesArchives.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle(
          "comments__archive-favourites-btn--active"
        );
        if (
          event.currentTarget.classList.contains(
            "comments__archive-favourites-btn--active"
          )
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }

  addToFavoritesAnswers() {
    this.buttonsArchiveFavoritesAnswers = document.querySelectorAll(
      ".comments__answer-favourites-btn"
    );
    this.buttonsArchiveFavoritesAnswers.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle(
          "comments__answer-favourites-btn--active"
        );
        if (
          event.currentTarget.classList.contains(
            "comments__answer-favourites-btn--active"
          )
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }
  addToFavoritesContentBefore(event) {
    event.currentTarget.children[0].src = "./src/assets/heart_full.svg";
    event.currentTarget.children[0].alt = "heart_full";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранном";
    event.currentTarget.children[1].style.color = "#000";
    event.currentTarget.parentElement.setAttribute("isFavorite", true);
  }
  addToFavoritesContentAfter(event) {
    event.currentTarget.children[0].src = "./src/assets/heart_empty.svg";
    event.currentTarget.children[0].alt = "heart_empty";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранное";
    event.currentTarget.children[1].style.color = "#a1a1a1";
    event.currentTarget.parentElement.setAttribute("isFavorite", false);
  }
}
export { Favorites };
