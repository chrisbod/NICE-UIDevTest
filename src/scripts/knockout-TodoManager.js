function TodoManager(data) {
    var self = this;
    if (!data) {
        data = {};
    }
    this.todos = ko.observableArray(data.todos || this.todos());
    this._createComputedCollections();
}


//defaults
TodoManager.prototype.todos = function() {
    return [];
}


//methods

TodoManager.prototype._createComputedCollections = function() {
    var self = this;
    this.removedTodos = ko.computed(function() {
        return ko.utils.arrayFilter(self.todos(), self.todoIsRemoved);
    });
    this.completedTodos = ko.computed(function() {
        return ko.utils.arrayFilter(self.todos(), self.todoIsComplete);
    });
}


TodoManager.prototype.newTodo = function(manager, jQueryEvent) {
    var todoData = {};
    if (jQueryEvent) {
        todoData = {
            text: jQueryEvent.target.value
        }
    }
    var todo = new TodoModel(todoData);
    this.todos.push(todo);
    return todo;
}
TodoManager.prototype.removeTodo = function(todo) {
    todo.state("removed");
}
TodoManager.prototype.todoIsRemoved = function(todo) {
    return todo.state() == "removed";
}
TodoManager.prototype.completeTodo = function(todo) {
    todo.state("completed");
}
TodoManager.prototype.todoIsComplete = function(todo) {
    return todo.state() == "completed";
}