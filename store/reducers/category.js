import { INSERT_CATEGORY, REMOVE_CATEGORY, PULL_CATEGORY, UPDATE_CATEGORY, DELETE_LAST_INSERTED_CATEGORY_ID } from '../actions/category';
import Category from '../../models/Category';


const initialState = {
    categories: [],
    lastAddedCategory: '',
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type){
        case INSERT_CATEGORY:
            const addedCategories = state.categories.concat({...action.category, id: action.insertId.toString()});
            return { ...state, categories: addedCategories, lastAddedCategory: action.insertId};
        case REMOVE_CATEGORY:
            const updatedCategories = state.categories.filter(category => {return category.id !== action.id});
            return {...state, categories: updatedCategories};
        case PULL_CATEGORY:
            const loadedCategories = []
            var categoriesObj = action.categories.toJSON();
            for(key in categoriesObj){
                loadedCategories.push(new Category(
                    categoriesObj[key].id.toString(),
                    categoriesObj[key].title,
                    categoriesObj[key].color,
                ))
            }
            //loadedCategories = action.categories.map(category => new Category(category.id.toString(), category.title, category.color));
            return {...state, categories: loadedCategories}
        case UPDATE_CATEGORY:
            const modifiedCategories = state.categories.map(item => {
                if(item.id.toString() === action.category.id){
                    return new Category(action.category.id.toString(), action.category.title, action.category.color);
                } else {
                    return item
                }
            });
            return {...state, categories: modifiedCategories}
        case DELETE_LAST_INSERTED_CATEGORY_ID:
            return{...state, lastAddedCategory: action.str}
        default:
            return state;
    }
}

export default categoriesReducer;