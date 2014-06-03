/*this is the view controller (or view model if we're using MVVM/knockout)*/
function TodoManager() {
    this._todos = [];
}
TodoManager.prototype = {
    _todos: null, //array
    todos: function() {
        return this._todos;
    },
    completedTodos: function() {
        var filterCompleted = this._filterByStateFunction("completed");
        return this._todos.filter(filterCompleted);
    },
    removedTodos: function() {
        var filterRemoved = this._filterByStateFunction("removed");
        return this._todos.filter(filterRemoved);
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
    },
    completeTodo: function(todo) {
        todo.state("completed");
    },
    _filterByStateFunction: function(state) {
        return (
            function(item) {
                return (item.state() == state);
            }
        );
    }
}