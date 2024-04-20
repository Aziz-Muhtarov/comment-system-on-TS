class Post {
    constructor ( id, title, content, authorId, comments ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.comments = [];
    }

    addComment (comment) {
        this.comments.push(comment);
    }

    deleteComment (commentId) {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
    }
}