import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, important INTEGER)',
                    [],
                    () => {
                        resolve();
                    },
                    (_, err) => {
                        reject(err);
                    });
                });
            }
    );
    return promise;
}

export const addTodo = (title, important) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO todos (title, important) VALUES (?, ?);',
                [title, important],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        })
    });
    return promise;
}

export const loadTodo = (title, important) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM todos;',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        })
    });
    return promise;
}

export const deleteTodo = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM todos WHERE id=?;',
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        })
    });
    return promise;
}

