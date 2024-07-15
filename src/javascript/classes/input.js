class Input {
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
      this.output.textContent = 0 + this.textarea.value.length + "/1000";
      if (this.textarea.value.length > 0) {
        this.buttonSubmitReady();
      } else {
        this.buttonSubmitReady();
      }
      if (this.textarea.value.length > 1000) {
        this.output.style.color = "red";
        this.lengthCommentError.style.display = "block";
        this.buttonSubmitReady();
      } else {
        this.output.style.color = "black";
        this.lengthCommentError.style.display = "none";
      }
      this.textarea.style.height = 0;
      this.textarea.style.height = this.textarea.scrollHeight + "px";
    });

    this.commentsForms.addEventListener("submit", (event) => {
      if (
        this.textarea.value.length === 0 ||
        this.textarea.value.length > 1000
      ) {
        event.preventDefault();
      } else {
        this.commentObj = {
          text: this.textarea.value,
          date: this.main.formatDate(),
        };
        this.main.comments.push(this.commentObj);
        localStorage.setItem("comments", JSON.stringify(this.main.comments));
      }
    });
  }

  buttonSubmitReady() {
    if (this.textarea.value.length > 0 && this.textarea.value.length < 1000) {
      this.buttonSubmit.classList.add("comment__input-btn--ready");
    } else {
      this.buttonSubmit.classList.remove("comment__input-btn--ready");
    }
  }

  onFocusTextarea() {
    for (let element of this.commentsFormsElements) {
      if (element.type != "checkbox" && element.type != "submit") {
        element.addEventListener("focus", function () {
          element.style.backgroundColor = "lightyellow";
        });
        element.addEventListener("blur", function () {
          element.style.backgroundColor = "white";
        });
      }
    }
  }
}
export { Input };
