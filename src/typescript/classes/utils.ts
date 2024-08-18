interface Comment {
  src: string;
  name: string;
  date: string;
  text: string;
  nameReply: string;
  rating: number;
  whoseAr: string;
}

interface Main {
  comments: Comment[];
  answers: Comment[];
  itemsSort: Comment[];
}

interface UtilsOptions {
  main: Main;
}

class Utils {
  main: Main;
  links: NodeListOf<Element>;
  onComments: NodeListOf<Element> | undefined;
  dropdownImg: Element | null = null;
  dropdownNav: Element | null = null;
  dropdownContent: Element | null = null;
  commentCount: Element | null = null;
  noSortedByNumserOfDate: NodeListOf<Element> | undefined;
  byDateButtonsList: Element | null = null;
  buttonOnAllComents: HTMLElement | null = null;
  noSortedByNumserOfRating: NodeListOf<Element> | undefined;
  byRatingButtonsList: Element | null = null;
  noSortedItems: HTMLElement | null = null;
  userSortNextContainer: Element | null = null;
  userSortNext: HTMLElement | null = null;
  userSortNextItems: NodeListOf<Element> | undefined;

  constructor({ main }: UtilsOptions) {
    this.main = main;
    this.links = document.querySelectorAll(".dropdown__link");
  }

  dropdownMenu(): void {
    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.dropdownImg = document.querySelector(".dropdown-arrow");
    this.dropdownNav = document.querySelector(".comments-header__dropdown-nav");

    if (this.onComments && this.onComments[1]) {
      this.onComments[1].addEventListener("click", () => {
        this.onComments![1].classList.toggle("comments-header__item-text--active");
        this.dropdownContent = this.dropdownNav!.nextElementSibling;
        if (this.dropdownContent && this.dropdownContent instanceof HTMLElement) {
          this.dropdownContent.style.display = this.dropdownContent.style.display === "block" ? "none" : "block";
        }
        if (this.dropdownImg) {
          this.dropdownImg.classList.toggle("comments-header--active");
        }
      });
    }
  }

  increaseCommentCount(): void {
    this.commentCount = document.querySelector(".comments-count");
    if (this.commentCount) {
      this.commentCount.innerHTML = `
      &#40;${this.main.comments.length + this.main.answers.length}&#41;
      `;
    }
  }

  sortCommentsByDate(): void {
    this.noSortedByNumserOfDate = document.querySelectorAll('[class*="-date"]');
    this.byDateButtonsList = document.querySelector(".byDate");
    this.buttonOnAllComents = document.querySelector(".comments-header__item-text");

    if (this.byDateButtonsList && this.byDateButtonsList.children[0] && this.byDateButtonsList.children[1]) {
      const buttonDown = this.byDateButtonsList.children[0];
      const buttonUp = this.byDateButtonsList.children[1];

      buttonDown.addEventListener("click", () => {
        this.displaySortByDate();
        this.displayNoneNoSortedItems();
      }, { once: true });

      buttonUp.addEventListener("click", () => {
        this.displaySortByDateReverse();
        this.displayNoneNoSortedItems();
      }, { once: true });
    }

    if (this.buttonOnAllComents) {
      this.buttonOnAllComents.addEventListener("click", () => {
        this.displayOnNoSortedItems();
      }, { once: true });
    }
  }

  sortCommentsByNumserOfRating(): void {
    this.noSortedByNumserOfRating = document.querySelectorAll(".comments__count");

    this.noSortedByNumserOfRating.forEach((rating) => {
      const parent = rating.parentElement?.parentElement;
      if (parent && parent instanceof HTMLElement) {
        const imageElement = parent.children[0] as HTMLImageElement;

        const itemSort: Comment = {
          src: imageElement.src,
          name: parent.children[1].textContent || '',
          date: parent.children[2].textContent || '',
          text: parent.children[3].textContent || '',
          nameReply: parent.children[4].textContent || '',
          rating: Number(rating.textContent),
          whoseAr: parent.dataset.index || '',
        };
        this.main.itemsSort.push(itemSort);
        if (this.main.itemsSort.length > this.main.comments.length + this.main.answers.length)
          this.main.itemsSort.shift();
        localStorage.setItem("itemsSort", JSON.stringify(this.main.itemsSort));
      }
    });

    this.byRatingButtonsList = document.querySelector(".byNumserOfRating");
    this.buttonOnAllComents = document.querySelector(".comments-header__item-text");

    if (this.byRatingButtonsList && this.byRatingButtonsList.children[0] && this.byRatingButtonsList.children[1]) {
      const buttonDown = this.byRatingButtonsList.children[0];
      const buttonUp = this.byRatingButtonsList.children[1];

      buttonDown.addEventListener("click", () => {
        this.displaySortByRating();
        this.displayNoneNoSortedItems();
      }, { once: true });

      buttonUp.addEventListener("click", () => {
        this.displaySortByRatingReverse();
        this.displayNoneNoSortedItems();
      }, { once: true });
    }

    if (this.buttonOnAllComents) {
      this.buttonOnAllComents.addEventListener("click", () => {
        this.displayOnNoSortedItems();
      }, { once: true });
    }
  }

  displaySortByRating(): void {
    this.main.itemsSort.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByDate(): void {
    this.main.itemsSort.sort((a, b) => (a.date > b.date ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByRatingReverse(): void {
    this.main.itemsSort.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByDateReverse(): void {
    this.main.itemsSort.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.setUsersSort();
  }

  displayNoneNoSortedItems(): void {
    this.noSortedItems = document.querySelector(".comments__container");
    if (this.noSortedItems && this.buttonOnAllComents) {
      this.noSortedItems.style.display = "none";
      this.buttonOnAllComents.style.backgroundColor = "red";
    }
  }

  displayOnNoSortedItems(): void {
    if (this.noSortedItems && this.buttonOnAllComents) {
      this.noSortedItems.style.display = "block";
      this.buttonOnAllComents.style.backgroundColor = "transparent";
      window.location.reload();
      this.setUsersSortClearDisplay();
    }
  }

  setUsersSort(): void {
    this.main.itemsSort.forEach((el, idx) => {
      if (el) this.setNextUserSort(idx);
    });
  }

  setNextUserSort(idx: number): void {
    this.userSortNextContainer = document.querySelector(".comments__content");
    if (this.userSortNextContainer) {
      this.userSortNext = document.createElement("div");
      this.userSortNext.classList.add("comments__sorted");
      this.userSortNext.innerHTML = `
      <img src="${this.main.itemsSort[idx].src}" alt="user" width="61" height="61"/>
      <p class="comments__answer-title">${this.main.itemsSort[idx].name}</p>
        <p class="comments__archive-date">${this.main.itemsSort[idx].date}</p>
        <p class="comments__archive-text">${this.main.itemsSort[idx].text}</p>
        <div class="comments__rating comments__rating-archive">
          <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
          <span class="comments__count">${this.main.itemsSort[idx].rating}</span>
          <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
        </div>
      `;
      this.userSortNextContainer.after(this.userSortNext);
    }
  }

  setUsersSortClearDisplay(): void {
    this.userSortNextItems = document.querySelectorAll(".comments__sorted");
    this.userSortNextItems.forEach(item => {
      item.innerHTML = "";
    });
  }

  sortCommentsByRelevance(): void {
    this.links[2].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, данная фича ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }

  sortCommentsByNumberOfResponses(): void {
    this.links[3].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, эта фича тоже ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }
}

export { Utils };