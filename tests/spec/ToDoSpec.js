describe("Todo Data Model tests", function() {
    /*
		going to build the model using a knockout style interface
		but haven't decided whether to use knockout yet as
		the work has already been done there so might code from scratch
	*/
    var todo;


    beforeEach(
        function() {
            todo = new TodoModel();
        }
    );

    it("A blank todo should have a unique id",
        //can't help being a programmer so we'll expect every todo to have an id (but not check it's actually value as we don't know it's format)
        function() {
            expect(todo.id()).toBeTruthy();
            var newTodo = new TodoModel();
            expect(newTodo.id()).toNotEqual(todo.id())
        }
    );

})