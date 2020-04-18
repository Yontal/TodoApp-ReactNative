import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

export const initTodoTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, important INTEGER, done INTEGER, categories TEXT NOT NULL, archive INTEGER, deadline TEXT)',
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
export const initDeadlineColumn = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('ALTER TABLE todos ADD deadline TEXT DEFAULT "" NOT NULL',
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

export const initCategoriesTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL)',
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

export const addTodo = (title, important, done, categories, archive, deadline) => {
    const promise = new Promise((resolve, reject) => {
        const importantInt = important ? 1 : 0;
        const doneInt = done ? 1 : 0;
        let categoriesStr = categories.toString();
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO todos (title, important, done, categories, archive, deadline) VALUES (?, ?, ?, ?, 0, ?);',
                [title, importantInt, doneInt, categoriesStr, deadline],
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

export const addCategory = (title) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO categories (title) VALUES (?);',
                [title],
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

export const loadCategories = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM categories;',
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

export const loadTodoById = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM todos WHERE id=?;',
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

export const deleteCategory = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM categories WHERE id=?;',
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
            tx.executeSql('UPDATE todos SET title=?, important=?, done=?, categories=?, archive=?, deadline=? WHERE id=?;',
                [todo.title, parseInt(todo.important), parseInt(todo.done), categoriesStr, parseInt(todo.archive), todo.deadline, parseInt(todo.id)],
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

export const correctCategory = (category) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE categories SET title=? WHERE id=?;',
                [category.title, parseInt(category.id)],
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
