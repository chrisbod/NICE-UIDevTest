/*this is the view controller (or view model if we're using MVVM/knockout)*/
function TodoManager() {
    this._todos = [];
    this._completedTodos = [];
    this._removedTodos = [];
}
TodoManager.prototype = {
    _todos: null, //array
    todos: function() {
        return this._todos;
    },
    _completedTodos: null, //array
    completedTodos: function() {
        return this._completedTodos;
    },
    removedTodos: function() {
        return this._removedTodos;
    },
    newTodo: function() {
        var todo = new TodoModel();
        this._todos.push(todo);
        return todo;
    },
    /*There does not seem to be a delete functionality here only remove
     My personally opinion would be that failing providing a DELETE rather than COMPLETE action
     I would expect deleting the entire content of a todo to actually delete it
     and/or the provision of a delete action for removed todos (or all todos)*/
    removeTodo: function(todo) {
        todo.state("removed");
        var identityFilter = this._filterFunction(todo);
        this._todos.filter(identityFilter);
        this._completedTodos.filter(identityFilter);
        this._removedTodos.push(todo);
    },
    completeTodo: function(todo) {
        todo.state("completed");
        if (this._completedTodos.indexOf(todo) == -1) {
            this._completedTodos.push(todo);
        }
    },
    _filterFunction: function(itemToRemove) {
        return (
            function(item) {
                return item !== itemToRemove;
            }
        )
    }
}