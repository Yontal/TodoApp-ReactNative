import { INSERT_TODO, REMOVE_TODO, PULL_TODOS, PULL_TODO, UPDATE_TODO, FILTER_TODOS } from '../actions/todo';
import TodoItem from '../../models/TodoItem';


const initialState = {
    todoItems: [],
    filteredTodos: [],
};

const todoItemsReducer = (state = initialState, action) => {
    switch (action.type){
        case INSERT_TODO:
            const addedTodos = state.todoItems.concat(action.todo); 
            return { ...state, todoItems: addedTodos, filteredTodos: addedTodos};
        case REMOVE_TODO:
            const updatedTodos = state.todoItems.filter(todo => {return todo.id !== action.id});
            return {...state, todoItems: updatedTodos, filteredTodos: updatedTodos};
        case PULL_TODOS:
            const loadedTodos = action.todoItems.map(todo => new TodoItem(todo.id.toString(), todo.title, todo.important, todo.done, todo.categories.split(','), todo.archive, todo.deadline, todo.note));
            return {...state, todoItems: loadedTodos, filteredTodos: loadedTodos}
        case PULL_TODO:
            const loadedTodo = new TodoItem(action.todo.id.toString(), action.todo.title, action.todo.important, action.todo.done, action.todo.categories.split(','), action.todo.archive, action.todo.deadline, action.todo.note);
            return {...state, filteredTodos: loadedTodo}
        case UPDATE_TODO:
            const modifiedTodos = state.todoItems.map(item => {
                if(item.id.toString() === action.todo.id){
                    return new TodoItem(action.todo.id.toString(), action.todo.title, action.todo.important, action.todo.done, action.todo.categories, action.todo.archive, action.todo.deadline, action.todo.note);
                } else {
                    return item
                }
            });
            return {...state, todoItems: modifiedTodos, filteredTodos: modifiedTodos}
        case FILTER_TODOS:
            if (typeof action.categoryId == "undefined"){
                const filteredTodos = state.todoItems;
                return {...state, filteredTodos: filteredTodos}}
            const filtered = state.todoItems.filter(todo => todo.categories.findIndex(catId => catId === action.categoryId) >= 0);
            return {...state, filteredTodos: filtered}
        default:
            return state;
    }
};

export default todoItemsReducer;