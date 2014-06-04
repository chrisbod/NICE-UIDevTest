function TodoManager(data) {
    if (!data) {
        data = {};
    }
    var self = this;
    this.todos = ko.observableArray(data.todos || this.todos());
    this.removedTodos = ko.computed(function() {
        return ko.utils.arrayFilter(self.todos(), self.todoIsRemoved);
    });
    this.completedTodos = ko.computed(function() {
        return ko.utils.arrayFilter(self.todos(), self.todoIsComplete);
    });
}


//defaults
TodoManager.prototype.todos = function() {
    return [];
}
TodoManager.prototype.removedTodos = function() {
    return [];
}
TodoManager.prototype.newTodo = function() {
    var todo = new TodoModel();
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