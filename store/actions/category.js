import {addCategory, deleteCategory, loadCategories, correctCategory } from '../../helpers/db';

export const INSERT_CATEGORY = 'INSERT_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const PULL_CATEGORY = 'PULL_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_LAST_INSERTED_CATEGORY_ID = "DELETE_LAST_INSERTED_CATEGORY_ID";

export const insertCategory = (category) => {
    return async dispatch => {
        try{
            const response = await addCategory(category.title, category.color);
            const categoryId = response
            dispatch({
                type: INSERT_CATEGORY,
                category: category,
                insertId: categoryId,
            })
        } catch(err){
            throw err;
        }
    }
}

export const removeCategory = (id) => {
    return dispatch => {
        try{
            dispatch({
                type: REMOVE_CATEGORY,
                id: id
            })
            const response = deleteCategory(id);
        } catch(err){
            console.log(err);
        }
    }
}

export const pullCategory = () => {
    return async dispatch =>{
        try{
            const response = await loadCategories();
            dispatch({
                type: PULL_CATEGORY,
                categories: response
            })
        } catch (err){
            console.log(err);
        }
    }
}

export const updateCategory = (category) => {
    return async dispatch => {
        console.log('------------');
        console.log(category)

        try{
            const response = await correctCategory(category);
            dispatch({
                type: UPDATE_CATEGORY,
                category: category
            })
        } catch(err){
           throw err;
        }
    }
}

export const deleteLastInsertedCategoryId = () => {
    return {
        type: DELETE_LAST_INSERTED_CATEGORY_ID,
        str: '',
    }
}