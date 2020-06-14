import * as SQLite from 'expo-sqlite';
import * as firebase from 'firebase';

const db = SQLite.openDatabase('todos.db');

export const initTodoTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, important INTEGER, done INTEGER, categories TEXT NOT NULL, archive INTEGER, deadline TEXT, note TEXT, notificationId TEXT)',
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

export const initNoteColumn = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('ALTER TABLE todos ADD note TEXT DEFAULT "" NOT NULL',
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

export const initNotificationIdColumn = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('ALTER TABLE todos ADD notificationId TEXT DEFAULT ""',
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
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, color TEXT DEFAULT "white")',
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

export const addTodo = (title, important, done, categories, archive, deadline, note, notificationId) => {
    // const promise = new Promise((resolve, reject) => {
    //     const importantInt = important ? 1 : 0;
    //     const doneInt = done ? 1 : 0;
    //     let categoriesStr = categories.toString();
    //     db.transaction((tx) => {
    //         tx.executeSql('INSERT INTO todos (title, important, done, categories, archive, deadline, note, notificationId) VALUES (?, ?, ?, ?, 0, ?, ?, ?);',
    //             [title, importantInt, doneInt, categoriesStr, deadline, note, notificationId],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    const promise = new Promise((resolve, reject) => {
        const taskId = +new Date();
        let categoriesStr = categories.toString();
        firebase.database().ref(firebase.auth().currentUser.uid + '/tasks/' + taskId).set({
            id: taskId,
            title: title,
            important: important,
            done: done,
            categories: categoriesStr,
            archive: archive,
            deadline: deadline,
            note: note,
            notificationId: notificationId
        }).catch(err => reject(err));
        resolve(taskId);
    })
    return promise;
}

export const addCategory = (title, color) => {
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('INSERT INTO categories (title, color) VALUES (?,?);',
    //             [title, color],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    // return promise;
    const promise = new Promise((resolve, reject) => {
        const catId = +new Date();
        firebase.database().ref(firebase.auth().currentUser.uid + '/categories/' + catId).set({
            id: catId,
            title: title,
            color: color,
        }).catch(err => reject(err));
        resolve(catId);
    })
    return promise;
}

export const loadTodo = () => {
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('SELECT * FROM todos WHERE archive=0;',
    //             [],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });

    const promise = new Promise((resolve, reject) => {
        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/tasks/').once('value').then(snapshot => {resolve(snapshot)}).catch(err => reject(err))
    })

    return promise;
}

export const loadCategories = () => {
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('SELECT * FROM categories;',
    //             [],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    // return promise;
    const promise = new Promise((resolve, reject) => {
        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/categories/').once('value').then(snapshot => {resolve(snapshot)}).catch(err => reject(err))
    })

    return promise;
}

export const deleteTodo = (id) => {
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('DELETE FROM todos WHERE id=?;',
    //             [id],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    const promise = new Promise((resolve, reject) => {
        firebase.database().ref(firebase.auth().currentUser.uid + '/tasks/' + id).set(null).catch(err => reject(err));
        resolve(id);
    })

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
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('DELETE FROM categories WHERE id=?;',
    //             [id],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    // return promise;
    const promise = new Promise((resolve, reject) => {
        firebase.database().ref(firebase.auth().currentUser.uid + '/categories/' + id).set(null).catch(err => reject(err));
        resolve(id);
    })

    return promise;
}

export const correctTodo = (todo) => {
    // const promise = new Promise((resolve, reject) => {
    //     let categoriesStr = todo.categories.toString();
    //     db.transaction((tx) => {
    //         tx.executeSql('UPDATE todos SET title=?, important=?, done=?, categories=?, archive=?, deadline=?, note=?, notificationId=? WHERE id=?;',
    //             [todo.title, parseInt(todo.important), parseInt(todo.done), categoriesStr, parseInt(todo.archive), todo.deadline, todo.note, todo.notificationId, parseInt(todo.id)],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    // return promise;
    const promise = new Promise((resolve, reject) => {
        let categoriesStr = todo.categories.toString();
        firebase.database().ref(firebase.auth().currentUser.uid + '/tasks/' + todo.id).set({
            id: todo.id,
            title: todo.title,
            important: todo.important,
            done: todo.done,
            categories: categoriesStr,
            archive: todo.archive,
            deadline: todo.deadline,
            note: todo.note,
            notificationId: todo.notificationId
        }).catch(err => reject(err));
        resolve(todo.id);
    })
    return promise;
}

export const correctCategory = (category) => {
    // const promise = new Promise((resolve, reject) => {
    //     db.transaction((tx) => {
    //         tx.executeSql('UPDATE categories SET title=?, color=? WHERE id=?;',
    //             [category.title, category.color, parseInt(category.id)],
    //             (_, result) => {
    //                 resolve(result);
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             })
    //     })
    // });
    // return promise;
    const promise = new Promise((resolve, reject) => {
        firebase.database().ref(firebase.auth().currentUser.uid + '/categories/' + category.id).set({
            id: category.id,
            title: category.title,
            color: category.color,
        }).catch(err => reject(err));
        resolve(category.id);
    })
    return promise;
}
