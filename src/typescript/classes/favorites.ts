class Favorites {
    private buttonsArchiveFavoritesArchives: NodeListOf<Element>;
    private buttonsArchiveFavoritesAnswers: NodeListOf<Element>;
  
    constructor() {
      this.buttonsArchiveFavoritesArchives = document.querySelectorAll(
        ".comments__archive-favourites-btn"
      );
      this.buttonsArchiveFavoritesAnswers = document.querySelectorAll(
        ".comments__answer-favourites-btn"
      );
    }
  
    addToFavoritesArchives(): void {
      this.buttonsArchiveFavoritesArchives.forEach((el) => {
        el.addEventListener("click", (event) => {
          const target = event.currentTarget as HTMLElement;
          target.classList.toggle("comments__archive-favourites-btn--active");
          if (target.classList.contains("comments__archive-favourites-btn--active")) {
            this.addToFavoritesContentBefore(target);
          } else {
            this.addToFavoritesContentAfter(target);
          }
        });
      });
    }
  
    addToFavoritesAnswers(): void {
      this.buttonsArchiveFavoritesAnswers.forEach((el) => {
        el.addEventListener("click", (event) => {
          const target = event.currentTarget as HTMLElement;
          target.classList.toggle("comments__answer-favourites-btn--active");
          if (target.classList.contains("comments__answer-favourites-btn--active")) {
            this.addToFavoritesContentBefore(target);
          } else {
            this.addToFavoritesContentAfter(target);
          }
        });
      });
    }
  
    private addToFavoritesContentBefore(target: HTMLElement): void {
      const img = target.children[0] as HTMLImageElement;
      const text = target.children[1] as HTMLElement;
  
      img.src = "./src/assets/heart_full.svg";
      img.alt = "heart_full";
      img.width = 24;
      img.height = 24;
  
      text.textContent = "\u00A0В избранном";
      text.style.color = "#000";
  
      target.parentElement?.setAttribute("isFavorite", "true");
    }
  
    private addToFavoritesContentAfter(target: HTMLElement): void {
      const img = target.children[0] as HTMLImageElement;
      const text = target.children[1] as HTMLElement;
  
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