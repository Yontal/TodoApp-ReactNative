import { INSERT_CATEGORY, REMOVE_CATEGORY, PULL_CATEGORY, UPDATE_CATEGORY } from '../actions/category';
import Category from '../../models/Category';


const initialState = {
    categories: [],
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type){
        case INSERT_CATEGORY:
            const addedCategories = state.categories.concat(action.category); 
            return { ...state, categories: addedCategories};
        case REMOVE_CATEGORY:
            const updatedCategories = state.categories.filter(category => {return category.id !== action.id});
            return {...state, categories: updatedCategories};
        case PULL_CATEGORY:
            const loadedCategories = action.categories.map(category => new Category(category.id.toString(), category.title));
            return {...state, categories: loadedCategories}
        case UPDATE_CATEGORY:
            const modifiedCategories = state.categories.map(item => {
                if(item.category.toString() === action.category.id){
                    return new Category(action.category.id.toString(), action.category.title);
                } else {
                    return item
                }
            });
            return {...state, categories: modifiedCategories}
        default:
            return state;
    }
}

export default categoriesReducer;