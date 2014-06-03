/*this is the view controller (or view model if we're using MVVM/knockout)*/
function TodoManager() {
    this._todos = [];
    this.completedTodos = []
}
TodoManager.prototype = {
    _todos: null, //array
    todos: function() {
        return this._todos;
    },
    _completedTodos: null, //array
    completedTodos: function() {
        return this._completedTodos
    },
    newTodo: function() {

    },
    removeTodo: function(todo) {

    },
    completeTodo: function(todo) {

    }
}