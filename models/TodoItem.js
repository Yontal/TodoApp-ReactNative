class TodoItem {
    constructor(id, title, important = false, done = false, categories = ['default'], archive = false, deadline = '', note ='', notificationId = ''){
        this.id = id;
        this.title = title;
        this.important = important;
        this.done = done;
        this.categories = categories;
        this.archive = archive;
        this.deadline = deadline;
        this.note = note;
        this.notificationId = notificationId;
    }
}
export default TodoItem;