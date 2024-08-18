interface RatingObj {
    value: number;
    whose: number;
  }
  
  interface Main {
    ratings: RatingObj[];
    answerRatings: RatingObj[];
  }
  
  interface RatingOptions {
    main: Main;
  }
  
  class Rating {
    main: Main;
  
    constructor({ main }: RatingOptions) {
      this.main = main;
    }
  
    commentsRatingArchive(): void {
      const ratingBlocks = document.querySelectorAll<HTMLElement>(".comments__rating-archive");
    
      ratingBlocks.forEach((block) => {
        block.children[0].addEventListener(
          "click",
          (event: Event) => {
            let count = 0;
            const target = event.currentTarget as HTMLElement;
            const targetIndexArchive = target.closest<HTMLElement>(".comments__archive")?.dataset.index;
    
            if (target) count--;
            if (target.parentElement && target.parentElement.parentElement) {
              target.parentElement.parentElement.dataset.rating = String(count);
              this.rememberRatingArchive(event);
              if (targetIndexArchive) {
                target.parentElement.children[1].textContent = String(this.displayArchive(targetIndexArchive));
              }
              const countElement = target.parentElement.children[1] as HTMLElement;
              if (Number(countElement.textContent) < 0) {
                countElement.style.color = "red";
              } else {
                countElement.style.color = "#8ac540";
              }
            }
          },
          { once: true }
        );
    
        block.children[2].addEventListener(
          "click",
          (event: Event) => {
            let count = 0;
            const target = event.currentTarget as HTMLElement;
            const targetIndexArchive = target.closest<HTMLElement>(".comments__archive")?.dataset.index;
    
            if (target) count++;
            if (target.parentElement && target.parentElement.parentElement) {
              target.parentElement.parentElement.dataset.rating = String(count);
              this.rememberRatingArchive(event);
              if (targetIndexArchive) {
                target.parentElement.children[1].textContent = String(this.displayArchive(targetIndexArchive));
              }
              const countElement = target.parentElement.children[1] as HTMLElement;
              if (Number(countElement.textContent) < 0) {
                countElement.style.color = "red";
              } else {
                countElement.style.color = "#8ac540";
              }
            }
          },
          { once: true }
        );
      });
    }
  
    commentsRatingAnswer(): void {
      const ratingBlocksAnswer = document.querySelectorAll<HTMLElement>(".comments__rating-answer");
    
      ratingBlocksAnswer.forEach((block) => {
        block.children[0].addEventListener(
          "click",
          (event: Event) => {
            let count = 0;
            const target = event.currentTarget as HTMLElement;
            const targetIndexAnswer = target.closest<HTMLElement>(".comments__answer")?.dataset.index;
    
            if (target) count--;
            if (target.parentElement && target.parentElement.parentElement) {
              target.parentElement.parentElement.dataset.rating = String(count);
              this.rememberRatingAnswer(event);
              if (targetIndexAnswer) {
                const countElement = target.parentElement.children[1] as HTMLElement;
                countElement.textContent = String(this.displayAnswer(targetIndexAnswer));
    
                if (Number(countElement.textContent) < 0) {
                  countElement.style.color = "red";
                } else {
                  countElement.style.color = "#8ac540";
                }
              }
            }
          },
          { once: true }
        );
    
        block.children[2].addEventListener(
          "click",
          (event: Event) => {
            let count = 0;
            const target = event.currentTarget as HTMLElement;
            const targetIndexAnswer = target.closest<HTMLElement>(".comments__answer")?.dataset.index;
    
            if (target) count++;
            if (target.parentElement && target.parentElement.parentElement) {
              target.parentElement.parentElement.dataset.rating = String(count);
              this.rememberRatingAnswer(event);
              if (targetIndexAnswer) {
                const countElement = target.parentElement.children[1] as HTMLElement;
                countElement.textContent = String(this.displayAnswer(targetIndexAnswer));
    
                if (Number(countElement.textContent) < 0) {
                  countElement.style.color = "red";
                } else {
                  countElement.style.color = "#8ac540";
                }
              }
            }
          },
          { once: true }
        );
      });
    }
  
    rememberRatingArchive(event: Event): void {
      const target = event.currentTarget as HTMLElement;
      if (target.parentElement && target.parentElement.parentElement) {
        const ratingObj: RatingObj = {
          value: Number(target.parentElement.parentElement.dataset.rating),
          whose: Number(target.parentElement.parentElement.dataset.index),
        };
        this.main.ratings.push(ratingObj);
        localStorage.setItem("ratings", JSON.stringify(this.main.ratings));
      }
    }
  
    rememberRatingAnswer(event: Event): void {
      const target = event.currentTarget as HTMLElement;
      if (target.parentElement && target.parentElement.parentElement) {
        const ratingAnswerObj: RatingObj = {
          value: Number(target.parentElement.parentElement.dataset.rating),
          whose: Number(target.parentElement.parentElement.dataset.index),
        };
        this.main.answerRatings.push(ratingAnswerObj);
        localStorage.setItem("answerRatings", JSON.stringify(this.main.answerRatings));
      }
    }
  
    displayRatingArchive(elem: string): number {
      return this.calculateRating(this.main.ratings, elem);
    }
  
    displayRatingAnswer(elem: string): number {
      return this.calculateRating(this.main.answerRatings, elem);
    }
  
    displayArchive(path: string): number {
      return this.calculateRating(this.main.ratings, path);
    }
  
    displayAnswer(path: string): number {
      return this.calculateRating(this.main.answerRatings, path);
    }
  
    private calculateRating(arr: RatingObj[], key: string): number {
      const result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
      arr.forEach((item) => {
        result[item.whose] += item.value;
      });
      return result[key] ?? 0;
    }
  }
  
  export { Rating };