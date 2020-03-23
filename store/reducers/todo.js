import { INSERT_TODO, REMOVE_TODO, PULL_TODOS, UPDATE_TODO } from '../actions/todo';
import TodoItem from '../../models/TodoItem';


const initialState = {
    todoItems: [],
};

const todoItemsReducer = (state = initialState, action) => {
    switch (action.type){
        case INSERT_TODO:
            const addedTodos = state.todoItems.concat(action.todo); 
            return { ...state, todoItems: addedTodos};
        case REMOVE_TODO:
            const updatedTodos = state.todoItems.filter(todo => {return todo.id !== action.id});
            return {...state, todoItems: updatedTodos};
        case PULL_TODOS:
            const loadedTodos = action.todoItems.map(todo => new TodoItem(todo.id.toString(), todo.title, todo.important, todo.done, todo.categories.split(',')));
            return {...state, todoItems: loadedTodos}
        case UPDATE_TODO:
            const modifiedTodos = state.todoItems.map(item => {
                if(item.id.toString() === action.todo.id){
                    return new TodoItem(action.todo.id.toString(), action.todo.title, action.todo.important, action.todo.done, action.todo.categories);
                } else {
                    return item
                }
            });
            return {...state, todoItems: modifiedTodos}
        default:
            return state;
    }
};

export default todoItemsReducer;