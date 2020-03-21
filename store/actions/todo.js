import { TODOITEMS } from '../../data/dummy-data';
import {addTodo, deleteTodo, loadTodo } from '../../helpers/db';

export const INSERT_TODO = 'INSERT_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const PULL_TODOS = 'PULL_TODOS';

export const insertTodo = (todo) => {
    return async dispatch => {
        try{
            const response = await addTodo(todo.title, todo.important);
            dispatch({
                type: INSERT_TODO,
                todo: todo
            })
        } catch(err){
            console.log(err);
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