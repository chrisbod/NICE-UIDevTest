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
    it("removing a todo (not deleting) should give us a removed todo",
        function() {
            var newTodo = todoManager.newTodo();
            todoManager.removeTodo(newTodo);
            expect(newTodo.state()).toEqual("removed");
            expect(todoManager.removedTodos()[0]).toEqual(newTodo);
            expect(todoManager.todos()[0]).toEqual(newTodo);
        }
    );
    it("completing a todo should give us a complete todo",
        function() {
            var newTodo = todoManager.newTodo();
            todoManager.completeTodo(newTodo)
            expect(newTodo.state()).toEqual("completed");
            expect(todoManager.completedTodos()[0]).toEqual(newTodo);
        }
    );

    //slightly more complex test to check that the list of all todos is unaffected by marking items remove and completed
    it("Adding three todos, marking the first as completed, the second as removed, should result in a total of 3 todos, 1 completed, and 1 removed",
        function() {
            var todoForCompletion = todoManager.newTodo(),
                todoForRemoval = todoManager.newTodo(),
                todo = todoManager.newTodo();
            todoForCompletion.state("completed");
            todoForRemoval.state("removed");
            expect(todoManager.todos().length).toEqual(3);
            expect(todoManager.completedTodos().length).toEqual(1);
            expect(todoManager.removedTodos().length).toEqual(1);
        }
    );

});