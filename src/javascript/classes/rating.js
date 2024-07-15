class Rating {
  constructor({ main }) {
    this.main = main;
  }
  commentsRatingArchive() {
    this.ratingBlocks = document.querySelectorAll(".comments__rating-archive");

    for (let block of this.ratingBlocks) {
      block.children[0].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexArchive =
            target.closest(".comments__archive").dataset.index;
          if (target) count--;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingArchive(event);
          target.parentElement.children[1].textContent =
            this.displayArchive(targetIndexArchive);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
      block.children[2].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexArchive =
            target.closest(".comments__archive").dataset.index;
          if (target) count++;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingArchive(event);
          target.parentElement.children[1].textContent =
            this.displayArchive(targetIndexArchive);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
    }
  }

  commentsRatingAnswer() {
    this.ratingBlocksAnswer = document.querySelectorAll(
      ".comments__rating-answer"
    );

    for (let block of this.ratingBlocksAnswer) {
      block.children[0].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexAnswer =
            target.closest(".comments__answer").dataset.index;
          if (target) count--;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingAnswer(event);
          target.parentElement.children[1].textContent =
            this.displayAnswer(targetIndexAnswer);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
      block.children[2].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexAnswer =
            target.closest(".comments__answer").dataset.index;
          if (target) count++;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingAnswer(event);
          target.parentElement.children[1].textContent =
            this.displayAnswer(targetIndexAnswer);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
    }
  }

  rememberRatingArchive(event) {
    let target = event.currentTarget;
    const ratingObj = {
      value: Number(target.parentElement.parentElement.dataset.rating),
      whose: Number(target.parentElement.parentElement.dataset.index),
    };
    this.main.ratings.push(ratingObj);
    localStorage.setItem("ratings", JSON.stringify(this.main.ratings));
  }

  rememberRatingAnswer(event) {
    let target = event.currentTarget;
    const ratingAnswerObj = {
      value: Number(target.parentElement.parentElement.dataset.rating),
      whose: Number(target.parentElement.parentElement.dataset.index),
    };
    this.main.answerRatings.push(ratingAnswerObj);
    localStorage.setItem(
      "answerRatings",
      JSON.stringify(this.main.answerRatings)
    );
  }

  displayRatingArchive(elem) {
    let arr = this.main.ratings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    if (result[elem] === undefined) {
      return 0;
    } else {
      return result[elem];
    }
  }
  displayRatingAnswer(elem) {
    let arr = this.main.answerRatings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    if (result[elem] === undefined) {
      return 0;
    } else {
      return result[elem];
    }
  }
  displayArchive(path) {
    let arr = this.main.ratings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    return result[path];
  }
  displayAnswer(path) {
    let arr = this.main.answerRatings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    return result[path];
  }
}

export { Rating };
