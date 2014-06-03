describe("TodoManager unit tests", function() {
    var todoManager;
    beforeEach(
        function() {
            todoManager = new TodoManager();
        }
    );
    expect("new Todo should have zero todos",
        function() {
            expect(todoManager.todos().length).toEqual(0);
        }
    );
    expect("adding a todo should create a todo, insert it into our todos",
        function() {
            var newTodo = todoManager.newTodo();
            //again working against a knockout style interface (and assuming our collections are arrays)
            expect(todoManager.todos().length).toEqual(1);
            expect(todoManager.todos()[0]).toEqual(newTodo);
        }
    );
    expect("removing a todo (not deleting) should give us a removed todo but not delete the todo",
        function() {
            var newTodo = todoManager.newTodo();
            todoManager.removeTodo(newTodo);
            expect(newTodo.state()).toEqual("removed");
            expect(todoManager.removedTodos()[0]).toEqual(newTodo);
            expect(todoManager.todos()[0]).toEqual(newTodo);
        }
    );


})