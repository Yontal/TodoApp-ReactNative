class TodoItem {
    constructor(id, title, important = false, done = false, categories = ['default'], archive = false){
        this.id = id;
        this.title = title;
        this.important = important;
        this.done = done;
        this.categories = categories;
        this.archive = archive;
    }
}
export default TodoItem;