class Rating {
    main;
    constructor({ main }) {
        this.main = main;
    }
    commentsRatingArchive() {
        const ratingBlocks = document.querySelectorAll(".comments__rating-archive");
        ratingBlocks.forEach((block) => {
            block.children[0].addEventListener("click", (event) => {
                let count = 0;
                const target = event.currentTarget;
                const targetIndexArchive = target.closest(".comments__archive")?.dataset.index;
                if (target)
                    count--;
                if (target.parentElement && target.parentElement.parentElement) {
                    target.parentElement.parentElement.dataset.rating = String(count);
                    this.rememberRatingArchive(event);
                    if (targetIndexArchive) {
                        target.parentElement.children[1].textContent = String(this.displayArchive(targetIndexArchive));
                    }
                    if (Number(target.parentElement.children[1].textContent) < 0) {
                        target.parentElement.children[1].style.color = "red";
                    }
                    else {
                        target.parentElement.children[1].style.color = "#8ac540";
                    }
                }
            }, { once: true });
            block.children[2].addEventListener("click", (event) => {
                let count = 0;
                const target = event.currentTarget;
                const targetIndexArchive = target.closest(".comments__archive")?.dataset.index;
                if (target)
                    count++;
                if (target.parentElement && target.parentElement.parentElement) {
                    target.parentElement.parentElement.dataset.rating = String(count);
                    this.rememberRatingArchive(event);
                    if (targetIndexArchive) {
                        target.parentElement.children[1].textContent = String(this.displayArchive(targetIndexArchive));
                    }
                    if (Number(target.parentElement.children[1].textContent) < 0) {
                        target.parentElement.children[1].style.color = "red";
                    }
                    else {
                        target.parentElement.children[1].style.color = "#8ac540";
                    }
                }
            }, { once: true });
        });
    }
    commentsRatingAnswer() {
        const ratingBlocksAnswer = document.querySelectorAll(".comments__rating-answer");
        ratingBlocksAnswer.forEach((block) => {
            block.children[0].addEventListener("click", (event) => {
                let count = 0;
                const target = event.currentTarget;
                const targetIndexAnswer = target.closest(".comments__answer")?.dataset.index;
                if (target)
                    count--;
                if (target.parentElement && target.parentElement.parentElement) {
                    target.parentElement.parentElement.dataset.rating = String(count);
                    this.rememberRatingAnswer(event);
                    if (targetIndexAnswer) {
                        target.parentElement.children[1].textContent = String(this.displayAnswer(targetIndexAnswer));
                    }
                    if (Number(target.parentElement.children[1].textContent) < 0) {
                        target.parentElement.children[1].style.color = "red";
                    }
                    else {
                        target.parentElement.children[1].style.color = "#8ac540";
                    }
                }
            }, { once: true });
            block.children[2].addEventListener("click", (event) => {
                let count = 0;
                const target = event.currentTarget;
                const targetIndexAnswer = target.closest(".comments__answer")?.dataset.index;
                if (target)
                    count++;
                if (target.parentElement && target.parentElement.parentElement) {
                    target.parentElement.parentElement.dataset.rating = String(count);
                    this.rememberRatingAnswer(event);
                    if (targetIndexAnswer) {
                        target.parentElement.children[1].textContent = String(this.displayAnswer(targetIndexAnswer));
                    }
                    if (Number(target.parentElement.children[1].textContent) < 0) {
                        target.parentElement.children[1].style.color = "red";
                    }
                    else {
                        target.parentElement.children[1].style.color = "#8ac540";
                    }
                }
            }, { once: true });
        });
    }
    rememberRatingArchive(event) {
        const target = event.currentTarget;
        if (target.parentElement && target.parentElement.parentElement) {
            const ratingObj = {
                value: Number(target.parentElement.parentElement.dataset.rating),
                whose: Number(target.parentElement.parentElement.dataset.index),
            };
            this.main.ratings.push(ratingObj);
            localStorage.setItem("ratings", JSON.stringify(this.main.ratings));
        }
    }
    rememberRatingAnswer(event) {
        const target = event.currentTarget;
        if (target.parentElement && target.parentElement.parentElement) {
            const ratingAnswerObj = {
                value: Number(target.parentElement.parentElement.dataset.rating),
                whose: Number(target.parentElement.parentElement.dataset.index),
            };
            this.main.answerRatings.push(ratingAnswerObj);
            localStorage.setItem("answerRatings", JSON.stringify(this.main.answerRatings));
        }
    }
    displayRatingArchive(elem) {
        return this.calculateRating(this.main.ratings, elem);
    }
    displayRatingAnswer(elem) {
        return this.calculateRating(this.main.answerRatings, elem);
    }
    displayArchive(path) {
        return this.calculateRating(this.main.ratings, path);
    }
    displayAnswer(path) {
        return this.calculateRating(this.main.answerRatings, path);
    }
    calculateRating(arr, key) {
        const result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
        arr.forEach((item) => {
            result[item.whose] += item.value;
        });
        return result[key] ?? 0;
    }
}
export { Rating };
