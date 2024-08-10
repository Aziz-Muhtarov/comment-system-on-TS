class Input {
    main;
    forms;
    commentsForms;
    commentsFormsElements;
    textarea;
    output;
    buttonSubmit;
    lengthCommentError;
    constructor({ main }) {
        this.main = main;
        this.forms = document.forms;
        this.commentsForms = this.forms[0];
        this.commentsFormsElements = this.commentsForms.elements;
        this.textarea = this.commentsFormsElements[0];
        this.output = this.commentsFormsElements[1];
        this.buttonSubmit = this.commentsFormsElements[2];
        this.lengthCommentError = document.querySelector(".comments__output-error");
        this.textarea.addEventListener("input", () => {
            this.output.textContent = `${0 + this.textarea.value.length}/1000`;
            this.updateButtonState();
            this.updateTextareaStyle();
        });
        this.commentsForms.addEventListener("submit", (event) => {
            if (this.textarea.value.length === 0 || this.textarea.value.length > 1000) {
                event.preventDefault();
            }
            else {
                const commentObj = {
                    text: this.textarea.value,
                    date: this.main.formatDate(),
                };
                this.main.comments.push(commentObj);
                localStorage.setItem("comments", JSON.stringify(this.main.comments));
            }
        });
        this.onFocusTextarea();
    }
    updateButtonState() {
        if (this.textarea.value.length > 0 && this.textarea.value.length <= 1000) {
            this.buttonSubmit.classList.add("comment__input-btn--ready");
        }
        else {
            this.buttonSubmit.classList.remove("comment__input-btn--ready");
        }
    }
    updateTextareaStyle() {
        if (this.textarea.value.length > 1000) {
            this.output.style.color = "red";
            this.lengthCommentError.style.display = "block";
        }
        else {
            this.output.style.color = "black";
            this.lengthCommentError.style.display = "none";
        }
        this.textarea.style.height = "0";
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }
    onFocusTextarea() {
        for (let i = 0; i < this.commentsFormsElements.length; i++) {
            const element = this.commentsFormsElements[i];
            if (element.tagName !== "INPUT" || element.type !== "checkbox") {
                element.addEventListener("focus", () => {
                    element.style.backgroundColor = "lightyellow";
                });
                element.addEventListener("blur", () => {
                    element.style.backgroundColor = "white";
                });
            }
        }
    }
}
export { Input };
