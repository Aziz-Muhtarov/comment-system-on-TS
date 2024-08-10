class Favorites {
    buttonsArchiveFavoritesArchives;
    buttonsArchiveFavoritesAnswers;
    constructor() {
        this.buttonsArchiveFavoritesArchives = document.querySelectorAll(".comments__archive-favourites-btn");
        this.buttonsArchiveFavoritesAnswers = document.querySelectorAll(".comments__answer-favourites-btn");
    }
    addToFavoritesArchives() {
        this.buttonsArchiveFavoritesArchives.forEach((el) => {
            el.addEventListener("click", (event) => {
                const target = event.currentTarget;
                target.classList.toggle("comments__archive-favourites-btn--active");
                if (target.classList.contains("comments__archive-favourites-btn--active")) {
                    this.addToFavoritesContentBefore(target);
                }
                else {
                    this.addToFavoritesContentAfter(target);
                }
            });
        });
    }
    addToFavoritesAnswers() {
        this.buttonsArchiveFavoritesAnswers.forEach((el) => {
            el.addEventListener("click", (event) => {
                const target = event.currentTarget;
                target.classList.toggle("comments__answer-favourites-btn--active");
                if (target.classList.contains("comments__answer-favourites-btn--active")) {
                    this.addToFavoritesContentBefore(target);
                }
                else {
                    this.addToFavoritesContentAfter(target);
                }
            });
        });
    }
    addToFavoritesContentBefore(target) {
        const img = target.children[0];
        const text = target.children[1];
        img.src = "./src/assets/heart_full.svg";
        img.alt = "heart_full";
        img.width = 24;
        img.height = 24;
        text.textContent = "\u00A0В избранном";
        text.style.color = "#000";
        target.parentElement?.setAttribute("isFavorite", "true");
    }
    addToFavoritesContentAfter(target) {
        const img = target.children[0];
        const text = target.children[1];
        img.src = "./src/assets/heart_empty.svg";
        img.alt = "heart_empty";
        img.width = 24;
        img.height = 24;
        text.textContent = "\u00A0В избранное";
        text.style.color = "#a1a1a1";
        target.parentElement?.setAttribute("isFavorite", "false");
    }
}
export { Favorites };
