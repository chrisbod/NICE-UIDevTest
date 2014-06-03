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

    //programmatical tests//

    it("A blank todo should have a readonly unique id",
        //can't help being a programmer so we'll expect every todo to have an id (but not check it's actually value as we don't know it's format)
        function() {
            expect(todo.id()).toBeTruthy();
            var newTodo = new TodoModel();
            expect(newTodo.id()).not.toEqual(todo.id())
            var id = newTodo.id();
            newTodo.id("testId");
            expect(id).toEqual(newTodo.id())
        }
    );
    //More Behavioural states
    it("A blank todo should be instantiated with an empty text field",
        function() {
            expect(todo.text()).toEqual("");
        }
    );
    it("A blank todo should be instantiated with an incomplete state",
        function() {
            expect(todo.state()).toEqual("incomplete")
        }
    );
    it("A blank todo should not be in an active state (in this case focussed or hovered over)",
        function() {
            expect(todo.active()).toEqual(false);
        }
    );
    it("A blank todo should not be being edited",
        function() {
            expect(todo.editing()).toEqual(false);
        }
    );
})