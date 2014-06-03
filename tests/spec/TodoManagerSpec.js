describe("TodoManager unit tests", function() {
    //Note this should be using a helper that it doesn't really know the interface
    var todoManager;
    beforeEach(
        function() {
            todoManager = new TodoManager();
        }
    );
    it("new Todo should have zero todos",
        function() {
            expect(todoManager.todos().length).toEqual(0);
        }
    );
    it("adding a todo should create a todo, insert it into our todos",
        function() {
            var newTodo = todoManager.newTodo();
            //again working against a knockout style interface (and assuming our collections are arrays)
            expect(todoManager.todos().length).toEqual(1);
            expect(todoManager.todos()[0]).toEqual(newTodo);
        }
    );
    it("removing a todo (not deleting) should give us a removed todo but not delete the todo",
        function() {
            var newTodo = todoManager.newTodo();
            todoManager.removeTodo(newTodo);
            expect(newTodo.state()).toEqual("removed");
            expect(todoManager.removedTodos()[0]).toEqual(newTodo);
            expect(todoManager.todos()[0]).toEqual(newTodo);
        }
    );


})