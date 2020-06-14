import { LOGIN_ANONYMOUSLY } from '../actions/auth';

const initialState = {
    userId: ''
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_ANONYMOUSLY:
            return {...state, userId: action.userId};
        default:
            return state;    
    }
}

export default authReducer;