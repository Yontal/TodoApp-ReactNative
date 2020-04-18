import {addTodo, deleteTodo, loadTodo, correctTodo, loadTodoById } from '../../helpers/db';

export const INSERT_TODO = 'INSERT_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const PULL_TODOS = 'PULL_TODOS';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FILTER_TODOS  = 'FILTER_TODOS';
export const PULL_TODO = 'PULL_TODO'

export const insertTodo = (todo) => {
    return async dispatch => {
        try{
            const response = await addTodo(todo.title, todo.important, todo.done, todo.categories, todo.archive, todo.deadline);
            dispatch({
                type: INSERT_TODO,
                todo: todo
            })
        } catch(err){
            throw err;
        }
    }
}

export const removeTodo = (id) => {
    return dispatch => {
        try{
            dispatch({
                type: REMOVE_TODO,
                id: id
            })
            const response = deleteTodo(id);
        } catch(err){
            console.log(err);
        }
    }
}

export const pullTodo = () => {
    return async dispatch =>{
        try{
            const response = await loadTodo();
            dispatch({
                type: PULL_TODOS,
                todoItems: response.rows._array
            })
        } catch (err){
            console.log(err);
        }
    }
}
export const pullTodoById = (id) =>{
    return async dispatch => {
        try{
            const response = await loadTodoById(id);
            dispatch({
                type: PULL_TODO,
                todo: response.rows._array[0]
            })
        }
        catch(err){
            console.log(err);
        }
    }
}

export const updateTodo = (todo) => {
    return async dispatch => {
        try{
            const response = await correctTodo(todo);
            dispatch({
                type: UPDATE_TODO,
                todo: todo
            })
        } catch(err){
           throw err;
        }
    }
}

export const filterTodos = (title) => {
    return  {
        type: FILTER_TODOS,
        categoryTitle: title,
    }
}