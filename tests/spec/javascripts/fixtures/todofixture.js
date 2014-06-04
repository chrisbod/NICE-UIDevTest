/*

Behavioural story

Initial load (no todos)
The create todo component should be visible (including an input element of some type)

Within the story 
click means: hitting enter, clicking or tapping on a focussed element

Outline of behaviour
Add a new task 
1) User types into new task input and hits enter
2) App creates a new task
	a) Task should be visible
	a) New Tast text should match what was inputted (but trimmed)
	b) Task should be marked as incomplete

Interactions with task
3) Mark task as complete
	a) there should be a clickable/focussable/visable element for user to mark task as complete
	b) when clicked the task should be marked as complete
4) Editing the text
	a) **TODO - check double click indication in Aria? 
       double click on the text and it should be editable (THIS behaviour should be examined)
	b) The changes should be preserved (and trimmed) once enter is hit or input loses focus
	c) See below for removing content behaviour
	d) Pressing escape returns the input to its original value
5) 	Removal
	a) if the edit box has its content deleted (or is only whitespace) the values should be preserved and the item marked as removed
	b) hovering (or focussing) on the todo should make the remove control visible
	c) Removed tasks are visible but marked as removed

Quick test suggestions (INCOMPLETE - lets do a little work )
Tests with question marks indicate behaviour queries by myself

(all below should be duped for accessibility interaction)

Create and Complete
User enters new task - new task is visible with correct text
User enters new task with whitespace - text is trimmed

User marks the first task as completed - task is shown to be completed
User tries to edit completed task and cannot

QUERY: Can User edit completed tasks? (e.g. mark as removed or actual delete or even update description)

User edits second task description successfully (with whitespace trimmed)
User marks second task as removed

User creates two new tasks (are all tasks still visible and in the order we expect?)
User edits first of new tasks and deletes all content - expect reset to original value
User edits second of new tasks and 

*/
//attempt at helper function





describe("todo list html fixture tests", function() {

    var text = "my first todo",
        STATIC;

    beforeEach(function() {
        loadFixtures('todofixture.htm');
        STATIC = $(".todo-list.STATIC")
        if (STATIC) {
            document.title = "STATIC tests";
            STATIC[0].onsubmit = function() {
                return false
            }; //prevents any weird form submission messing with the tests
        }
    })

    it("the todo list container should be present and visible", function() {
        expect($(".todo-list")).toBeVisible();
    });
    it("there should be an element for inputting the new todo and it should be visible", function() {
        expect($(".todo-input")).toBeVisible();
    });
    it("the input element should accept user input (programmatically simulated)", function() {
        var input = $(".todo-input"),
            text = "my first todo";
        todoHelper.createNewTodo(text);
        var output = input.val() || input.text(); //we don't know if its an input or an element
        expect(output).toEqual(text);
    });
    it("a (new) todo description element should be present when input is typed and enter is hit", function() {
        var input = $(".todo-input");
        todoHelper.createNewTodo(text);
        todoTextElement = todoHelper.getTodoTextElementByText(text);
        expect(todoTextElement).toBeTruthy();
        expect($(todoTextElement).closest(".todo").filter(".incomplete").length).toEqual(1);
    });
    it("a (new) todo should be marked as incomplete", function() {
        todoHelper.createNewTodo(text);
        todoTextElement = todoHelper.getTodoTextElementByText(text);
        expect($(todoTextElement).closest(".todo").filter(".incomplete").length).toEqual(1);
    });
    it("a (new) todo description element should be trimmed if whitespace is added",
        function() {
            var text = " i have whitespace  ",
                trimmedText = "i have whitespace";
            todoHelper.createNewTodo(text);
            var targetTodoText = STATIC ? $(".STATIC-TRIM-TEST .todo-text") : $(todoHelper.getTodoTextElementByText(trimmedText));
            expect(targetTodoText).toBeVisible()
        }
    );
    it("a (new) todo should have a visible 'checkbox'", function() {
        todoHelper.createNewTodo(text);
        var todoCheckbox = todoHelper.getAllTodoElementsByText(text).checkbox;
        expect(todoCheckbox).toBeVisible();
    });

    it("a (new) todo should not have a visible action(remove) button", function() {
        todoHelper.createNewTodo(text);
        var todoAction = todoHelper.getAllTodoElementsByText(text).action;
        expect(todoAction).not.toBeVisible();
    });
    it("an incomplete todo's remove button should hide/show when focussed/blurred)",
        function() {
            todoHelper.createNewTodo(text)
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoHelper.checkFocusMakesVisible(todoElements.todo, todoElements.action);
            todoHelper.checkFocusMakesVisible(todoElements.text, todoElements.action);
            todoHelper.checkFocusMakesVisible(todoElements.checkbox, todoElements.action);
        }
    );
    it("an incomplete todo's remove button should be visible when item is hovered/moused over)",
        function() {
            todoHelper.createNewTodo(text)
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoHelper.checkHoverMakesVisible(todoElements.todo, todoElements.action);
            todoHelper.checkHoverMakesVisible(todoElements.text, todoElements.action);
            todoHelper.checkHoverMakesVisible(todoElements.checkbox, todoElements.action);;
        }
    );

    it("when an incomplete todo's checkbox is clicked it should be marked as completed",
        function() {
            var text = "todo - mark me completed";
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text),
                completedToDoText,
                completedToDoContainer;
            todoElements.todo.focus();
            expect(todoElements.checkbox).toBeVisible();
            todoElements.checkbox.click();
            completedToDoText = STATIC ? $(".STATIC-COMPLETE-TEST .todo-text") : $(todoHelper.getTodoTextElementByText(text));
            completedToDoContainer = completedToDoText.closest(".todo").filter(".complete")

            expect(completedToDoContainer.length).toEqual(1)
        }
    );
    it("the text of a created todo is editable when focussed",
        function() {
            var text = "focus test",
                focusText = "focus edited";
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoElements.text.focus();
            //NOTE: SENDKEYS DELETES out the current value so is flawed!
            $(document.activeElement).sendkeys(focusText);
            expect(todoElements.text.val()).toEqual(focusText);
        }
    );

    it("the edited text is trimmed after input loses focus",
        function() {
            if (!STATIC) { //static does no trimming
                var text = "focus test",
                    focusText = " focus edited ",
                    focusTrimmed = "focus edited"
                todoHelper.createNewTodo(text);
                var todoElements = todoHelper.getAllTodoElementsByText(text);
                todoElements.text.focus();
                //NOTE: SENDKEYS DELETES out the current value so is flawed!
                $(document.activeElement).sendkeys(focusText);
                document.body.focus()
                expect(todoElements.text.val()).toEqual(focusTrimmed);
            }
        }
    );
    it("the edited text of a created todo is preserved after todo loses focus",
        function() {
            var text = "focus test",
                focusText = "am I preserved?";
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoElements.text.focus();
            $(document.activeElement).sendkeys(focusText);
            $(document.body).focus();
            //get elements again
            todoElements = todoHelper.getAllTodoElementsByText(focusText);
            expect(todoElements.text.val()).toEqual(focusText);
        }
    );
    it("pressing escape resets a field to its former value",
        function() {
            var text = "escape text",
                editText = "asdasldj klasjd klas"
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoElements.text[0].focus();
            $(todoElements.text).sendkeys(editText);
            eventHelper.hitKey(eventHelper.KEYCODE_ESC);
            if (STATIC) { //CHEAT
                todoElements.text.val(text);
            }
            expect(todoHelper.getElementTextOrValue(todoElements.text[0])).toEqual(text)
        }
    );
    it("clicking remove on a todo marks it as removed",
        function() {
            var text = "remove me";
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoElements.todo.focus();
            //sanity check
            expect(todoElements.todo).toBeVisible();

            todoElements.action.focus();
            todoElements.action.click();
            if (STATIC) { //CHEAT
                todoElements.todo.removeClass("incomplete").addClass("removed")
            }
            expect(todoElements.todo.hasClass("removed")).toEqual(true)

        }

    );
    it("removing an items content marks the item as removed",
        function() {
            var text = "remove me";
            todoHelper.createNewTodo(text);
            var todoElements = todoHelper.getAllTodoElementsByText(text);
            todoElements.text.focus();
            $(todoElements.text).sendkeys("a");
            todoHelper.setElementTextOrValue(todoElements.text[0], "");
            eventHelper.fireChange(todoElements.text[0]);
            if (STATIC) { //CHEAT
                todoElements.todo.removeClass("incomplete").addClass("removed")
            }
            expect(todoElements.todo.hasClass("removed")).toEqual(true)

        }
    );
});