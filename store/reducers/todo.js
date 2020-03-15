import { TODOITEMS } from '../../data/dummy-data';

const initialState = {
    todoItems: TODOITEMS,
};

const todoItemsReducer = (state = initialState, actions) => {
    return state;
};

export default todoItemsReducer;