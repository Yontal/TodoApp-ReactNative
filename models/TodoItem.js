class TodoItem {
    constructor(id, title, important = false, done = false, categories = ['default'], archive = false, deadline = '', note ='', notificationID=''){
        this.id = id;
        this.title = title;
        this.important = important;
        this.done = done;
        this.categories = categories;
        this.archive = archive;
        this.deadline = deadline;
        this.note = note;
        this.notificationID = notificationID;
    }
}
export default TodoItem;