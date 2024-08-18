interface CommentObj {
    text: string;
    date: string;
  }
  
  interface Main {
    formatDate: () => string;
    comments: CommentObj[];
  }
  
  interface InputOptions {
    main: Main;
  }
  
  class Input {
    private main: Main;
    private forms: HTMLCollectionOf<HTMLFormElement>;
    private commentsForms: HTMLFormElement;
    private commentsFormsElements: HTMLFormControlsCollection;
    private textarea: HTMLTextAreaElement;
    private output: HTMLOutputElement;
    private buttonSubmit: HTMLButtonElement;
    private lengthCommentError: HTMLElement;
  
    constructor({ main }: InputOptions) {
      this.main = main;
  
      this.forms = document.forms as HTMLCollectionOf<HTMLFormElement>;
      this.commentsForms = this.forms[0];
      this.commentsFormsElements = this.commentsForms.elements;
      this.textarea = this.commentsFormsElements[0] as HTMLTextAreaElement;
      this.output = this.commentsFormsElements[1] as HTMLOutputElement;
      this.buttonSubmit = this.commentsFormsElements[2] as HTMLButtonElement;
      this.lengthCommentError = document.querySelector(".comments__output-error") as HTMLElement;
  
      this.textarea.addEventListener("input", () => {
        this.output.textContent = `${0 + this.textarea.value.length}/1000`;
        this.updateButtonState();
        this.updateTextareaStyle();
      });
  
      this.commentsForms.addEventListener("submit", (event) => {
        if (this.textarea.value.length === 0 || this.textarea.value.length > 1000) {
          event.preventDefault();
        } else {
          const commentObj: CommentObj = {
            text: this.textarea.value,
            date: this.main.formatDate(),
          };
          this.main.comments.push(commentObj);
          localStorage.setItem("comments", JSON.stringify(this.main.comments));
        }
      });
  
      this.onFocusTextarea();
    }
  
    private updateButtonState(): void {
      if (this.textarea.value.length > 0 && this.textarea.value.length <= 1000) {
        this.buttonSubmit.classList.add("comment__input-btn--ready");
      } else {
        this.buttonSubmit.classList.remove("comment__input-btn--ready");
      }
    }
  
    private updateTextareaStyle(): void {
      if (this.textarea.value.length > 1000) {
        this.output.style.color = "red";
        this.lengthCommentError.style.display = "block";
      } else {
        this.output.style.color = "black";
        this.lengthCommentError.style.display = "none";
      }
      this.textarea.style.height = "0";
      this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }
  
    onFocusTextarea(): void {
      for (let i = 0; i < this.commentsFormsElements.length; i++) {
        const element = this.commentsFormsElements[i] as HTMLElement;
        if (element.tagName !== "INPUT" || (element as HTMLInputElement).type !== "checkbox") {
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