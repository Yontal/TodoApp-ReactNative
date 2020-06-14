import * as firebase from 'firebase';

export const LOGIN_ANONYMOUSLY = 'LOGIN_ANONYMOUSLY';

export const loginAnonymously = () => {
    return async dispatch => {
        try {
            let userId;
            let promise = new Promise((resolve, reject) => {
                firebase.auth().signInAnonymously().catch(err => reject(err));
                firebase.auth().onAuthStateChanged(user => {
                    if(user){
                        resolve(user.uid);
                    }
                    else {
                        reject('user null');
                    }
                })
            })
            promise.then(uid => {
                userId = uid;
                dispatch({
                    type: LOGIN_ANONYMOUSLY,
                    userId: userId
                })
            }, err => {console.log(err)})

        } catch (err){
            throw err;
        }
    }
}