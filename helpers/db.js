import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, important INTEGER, done INTEGER, categories TEXT NOT NULL)',
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

export const addTodo = (title, important, done, categories) => {
    const promise = new Promise((resolve, reject) => {
        const importantInt = important ? 1 : 0;
        const doneInt = done ? 1 : 0;
        let categoriesStr = categories.toString();
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO todos (title, important, done, categories) VALUES (?, ?, ?, ?);',
                [title, importantInt, doneInt, categoriesStr],
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

export const loadTodo = () => {
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

export const correctTodo = (todo) => {
    const promise = new Promise((resolve, reject) => {
        let categoriesStr = todo.categories.toString();
        db.transaction((tx) => {
            tx.executeSql('UPDATE todos SET title=?, important=?, done=?, categories=? WHERE id=?;',
                [todo.title, parseInt(todo.important), parseInt(todo.done), categoriesStr, parseInt(todo.id)],
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
