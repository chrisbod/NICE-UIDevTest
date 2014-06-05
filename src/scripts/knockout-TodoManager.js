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

TodoManager.prototype.lastCreatedTodoText = null;

TodoManager.prototype.newTodo = function(manager, jQueryEvent) {
    var todoData = {
        text: "Unnamed todo"
    };
    if (jQueryEvent && jQueryEvent.target.value) { //slightly unsatisfactory but other solutions to these seem equally ugly
        todoData.text = jQueryEvent.target.value;
    }
    this.lastCreatedTodoText = todoData.text;
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
TodoManager.prototype.duplicateCheck = function(todo, jQueryEvent) {
    if (jQueryEvent.keyCode == 13) { //enter
        if (this.lastCreatedTodoText == jQueryEvent.target.value) {
            //repeat
            this.newTodo(this, jQueryEvent)
        }
    }
    return true;
}
TodoManager.prototype.escapeCheck = function(todo, jQueryEvent) {
    if (jQueryEvent.keyCode == 27) { //escape
        todo.revertText();
    }
}