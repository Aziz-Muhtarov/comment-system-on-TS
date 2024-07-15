class Utils {
  constructor({ main }) {
    this.main = main;

    this.links = document.querySelectorAll(".dropdown__link");
  }

  dropdownMenu() {
    this.onComments = document.querySelectorAll(".comments-header__item-text"); 
    this.dropdownImg = document.querySelector(".dropdown-arrow");
    this.dropdownNav = document.querySelector(".comments-header__dropdown-nav");

    this.onComments[1].addEventListener("click", () => {
      this.onComments[1].classList.toggle("comments-header__item-text--active");
      this.dropdownContent = this.dropdownNav.nextElementSibling;
      if (this.dropdownContent.style.display === "block") {
        this.dropdownContent.style.display = "none";
      } else {
        this.dropdownContent.style.display = "block";
      }
      if (this.dropdownImg.classList.contains("comments-header--active")) {
        this.dropdownImg.classList.remove("comments-header--active");
      } else {
        this.dropdownImg.classList.add("comments-header--active");
      }
    });
  }

  increaseCommentCount() {
    this.commentCount = document.querySelector(".comments-count");
    this.commentCount.innerHTML = `
    &#40;${this.main.comments.length + this.main.answers.length}&#41;
    `;
  }

  sortCommentsByDate() {
    this.noSortedByNumserOfDate = document.querySelectorAll('[class*="-date"]');

    this.byDateButtonsList = document.querySelector(".byDate");
    this.buttonOnAllComents = document.querySelector(
      ".comments-header__item-text"
    );
    let buttonDown = this.byDateButtonsList.children[0];
    let buttonUp = this.byDateButtonsList.children[1];
    buttonDown.addEventListener("click", () => {
      this.displaySortByDate();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    buttonUp.addEventListener("click", () => {
      this.displaySortByDateReverse();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    this.buttonOnAllComents.addEventListener("click", () => {
      this.displayOnNoSortedItems();
    }),
      { once: true };
  }

  sortCommentsByNumserOfRating() {
    this.noSortedByNumserOfRating =
      document.querySelectorAll(".comments__count");

    for (let rating of this.noSortedByNumserOfRating) {
      const itemSort = {
        src: rating.parentElement.parentElement.children[0].src,
        name: rating.parentElement.parentElement.children[1].textContent,
        date: rating.parentElement.parentElement.children[2].textContent,
        text: rating.parentElement.parentElement.children[3].textContent,
        nameReply: rating.parentElement.parentElement.children[4].textContent,
        rating: Number(rating.textContent),
        whoseAr: rating.parentElement.parentElement.dataset.index,
      };
      this.main.itemsSort.push(itemSort);
      if (
        this.main.itemsSort.length >
        this.main.comments.length + this.main.answers.length
      )
        this.main.itemsSort.shift();
      localStorage.setItem("itemsSort", JSON.stringify(this.main.itemsSort));
    }

    this.byRatingButtonsList = document.querySelector(".byNumserOfRating");
    this.buttonOnAllComents = document.querySelector(
      ".comments-header__item-text"
    );
    let buttonDown = this.byRatingButtonsList.children[0];
    let buttonUp = this.byRatingButtonsList.children[1];
    buttonDown.addEventListener("click", () => {
      this.displaySortByRating();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    buttonUp.addEventListener("click", () => {
      this.displaySortByRatingReverse();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    this.buttonOnAllComents.addEventListener("click", () => {
      this.displayOnNoSortedItems();
    }),
      { once: true };
  }

  displaySortByRating() {
    this.main.itemsSort.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByDate() {
    this.main.itemsSort.sort((a, b) => (a.date > b.date ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByRatingReverse() {
    this.main.itemsSort.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    this.setUsersSort();
  }
  displaySortByDateReverse() {
    this.main.itemsSort.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.setUsersSort();
  }

  displayNoneNoSortedItems() {
    this.noSortedItems = document.querySelector(".comments__container");
    this.noSortedItems.style.display = "none";
    this.buttonOnAllComents.style.backgroundColor = "red";
  }

  displayOnNoSortedItems() {
    this.noSortedItems.style.display = "block";
    this.buttonOnAllComents.style.backgroundColor = "transparent";
    window.location.reload();
    this.setUsersSortClearDisplay();
  }

  setUsersSort() {
    this.main.itemsSort.forEach((el, idx) => {
      if (el != null) this.setNextUserSort(idx);
    });
  }

  setNextUserSort(idx) {
    this.userSortNextContainer = document.querySelector(".comments__content");
    this.userSortNext = document.createElement("div");
    this.userSortNext.classList.add("comments__sorted");
    this.userSortNext.innerHTML = `
    <img src="${this.main.itemsSort[idx].src}" alt="user" width="61" height="61"/>
    <p class="comments__answer-title">${this.main.itemsSort[idx].name}</p>
      <p class="comments__archive-date">${this.main.itemsSort[idx].date}</p>
      <p class="comments__archive-text">${this.main.itemsSort[idx].text}   
      </p>
      <div class="comments__rating comments__rating-archive">
          <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
        <span class="comments__count">${this.main.itemsSort[idx].rating}</span>
        <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
      </div>
    `;
    this.userSortNextContainer.after(this.userSortNext);
  }

  setUsersSortClearDisplay() {
    this.userSortNextItems = document.querySelectorAll(".comments__sorted");
    this.userSortNextItems.innerHTML = "";
  }

  sortCommentsByRelevance() {
    this.links[2].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, данная фича ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }

  sortCommentsByNumberOfResponses() {
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
