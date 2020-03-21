import { TODOITEMS } from '../../data/dummy-data';
import { INSERT_TODO, GET_TODOS, REMOVE_TODO, PULL_TODOS } from '../actions/todo';
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
            const loadedTodos = action.todoItems.map(todo => new TodoItem(todo.id.toString(), todo.title, todo.important))
            return {...state, todoItems: loadedTodos}
        default:
            return state;
    }
};

export default todoItemsReducer;