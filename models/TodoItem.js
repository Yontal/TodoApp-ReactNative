class TodoItem {
    constructor(id, title, important = false, done = false, categories = ['default']){
        this.id = id;
        this.title = title;
        this.important = important;
        this.done = done;
        this.categories = categories;
    }
}
export default TodoItem;