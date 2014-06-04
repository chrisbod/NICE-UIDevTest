function TodoManager(data) {
    if (!data) {
        data = {};
    }
    this.todos = ko.observableArray(data.todos || this.todos());
}


//defaults

TodoManager.prototype.todos = function() {
    return [];
}