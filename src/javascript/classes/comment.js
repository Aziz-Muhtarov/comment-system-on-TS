class Comment {
    constructor ( id, userId, content, createTime ) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.createTime = createTime;
        this.replies = [];
    }

    addReply (replies) {
        this.replies.push(replies);
    }

    delete () {
        console.log(`Comment with ID ${this.id} is deleted`);
    }
}