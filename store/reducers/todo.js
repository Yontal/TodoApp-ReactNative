import { INSERT_TODO, REMOVE_TODO, PULL_TODOS, PULL_TODO, UPDATE_TODO, FILTER_TODOS } from '../actions/todo';
import TodoItem from '../../models/TodoItem';


const initialState = {
    todoItems: [],
    filteredTodos: [],
    filterSettings: '',
};

const sortTodo = (a, b) => {
  if (a.done - b.done != 0) {
    return a.done - b.done;
  } else {
    return parseInt(b.id) - parseInt(a.id);
  }
};

const todoItemsReducer = (state = initialState, action) => {
    switch (action.type){
        case INSERT_TODO:
            const currentTodo = [...state.todoItems];
            currentTodo.unshift({...action.todo, id: action.insertId.toString()});
            const addedTodos = currentTodo;
            if(state.filterSettings === ''){
                return {...state, todoItems: addedTodos, filteredTodos: addedTodos}
            }
            const addedFilteredTodos = addedTodos.filter(todo => todo.categories.findIndex(catId => catId === state.filterSettings) >= 0); 
            return { ...state, todoItems: addedTodos, filteredTodos: addedFilteredTodos};
        case REMOVE_TODO:
            const updatedTodos = state.todoItems.filter(todo => {return todo.id !== action.id});
            return {...state, todoItems: updatedTodos, filteredTodos: updatedTodos};
        case PULL_TODOS:
            const loadedTodos = []
            var todosObj = action.todoItems.toJSON();
            for(key in todosObj){
                loadedTodos.push(new TodoItem(
                    todosObj[key].id.toString(),
                    todosObj[key].title,
                    todosObj[key].important,
                    todosObj[key].done,
                    todosObj[key].categories.split(','),
                    todosObj[key].archive,
                    todosObj[key].deadline,
                    todosObj[key].note,
                    todosObj[key].notificationId
                ))
            }
            loadedTodos.sort((a,b) => sortTodo(a,b));
            if(state.filterSettings === ''){
                return {...state, todoItems: loadedTodos, filteredTodos: loadedTodos}
            }
            const loadedFilteredTodos = loadedTodos.filter(todo => todo.categories.findIndex(catId => catId === state.filterSettings) >= 0); 
            return {...state, todoItems: loadedTodos, filteredTodos: loadedFilteredTodos}
        case PULL_TODO:
            const loadedTodo = new TodoItem(action.todo.id.toString(), action.todo.title, action.todo.important, action.todo.done, action.todo.categories.split(','), action.todo.archive, action.todo.deadline, action.todo.note, action.todo.notificationId);
            const modifiedTodo = state.filteredTodos.map(item => {
                if(item.id.toString() === action.todo.id){
                    return loadedTodo
                } else {
                    return item
                }
            });
            modifiedTodo.sort((a,b) => sortTodo(a,b));
            const modifiedFilteredTodo = modifiedTodo.filter(todo => todo.categories.findIndex(catId => catId === state.filterSettings) >= 0); 
            return {...state, todoItems: modifiedTodo, filteredTodos: modifiedFilteredTodo}
        case UPDATE_TODO:
            const modifiedTodos = state.todoItems.map(item => {
                if(item.id.toString() === action.todo.id){
                    return new TodoItem(action.todo.id.toString(), action.todo.title, action.todo.important, action.todo.done, action.todo.categories, action.todo.archive, action.todo.deadline, action.todo.note, action.todo.notificationId);
                } else {
                    return item
                }
            });
            modifiedTodos.sort((a,b) => sortTodo(a,b));
            if(state.filterSettings === ''){
                return {...state, todoItems: modifiedTodos, filteredTodos: modifiedTodos}
            }
            const modifiedFilteredTodos = modifiedTodos.filter(todo => todo.categories.findIndex(catId => catId === state.filterSettings) >= 0);
            return {...state, todoItems: modifiedTodos, filteredTodos: modifiedFilteredTodos}
        case FILTER_TODOS:
            if (typeof action.categoryId == "undefined"){
                const filteredTodos = state.todoItems;
                return {...state, filterSettings: '', filteredTodos: filteredTodos}}
            const filtered = state.todoItems.filter(todo => todo.categories.findIndex(catId => catId === action.categoryId) >= 0);
            return {...state, filterSettings: action.categoryId, filteredTodos: filtered}
        default:
            return state;
    }
};

export default todoItemsReducer;