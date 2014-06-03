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
	a) **TODO - check double click indication in Aria? double click on the text and it should be editable
	b) The changes should be preserved (and trimmed presumably) once enter is hit or input loses focus
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

function fireChangeEvent(element) {
    if (document.createEvent) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
    } else {
        element.fireEvent("onchange");
    }
}

function fireSubmitEvent(element) {
    var cancelled = false;
    if (document.createEvent) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("submit", false, true);
        element.dispatchEvent(evt);
        if (evt.defaultPrevented) cancelled = true;
    } else {
        cancelled = element.fireEvent("onsubmit");
    }
    return cancelled;
}

function fireClickEvent(element) {
    var cancelled = false;
    if (document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", false, true);
        element.dispatchEvent(evt);
        if (evt.defaultPrevented) cancelled = true;
    } else {
        cancelled = element.fireEvent("onclick");
    }
    return cancelled;
}



function hittingEnterOnElementWouldSubmitForm(element) {
    if (element.form) {
        if (element.type == "submit") {
            return true;
        }
        if (element.type == "text") { //primitive as it could be an html5 element
            if (element.form.elements[0] == element) { //even more primitive doesn't account for hidden fields etc
                return true
            }
        }
    }
    return false;

}

function sendTextToElementAndHitEnter(text, element) {
    $(element).sendkeys(text);
    if (typeof element.onchange !== "undefined") { //of course the value may not have actually changed
        fireChangeEvent(element);
    }
    if (hittingEnterOnElementWouldSubmitForm(element)) { //ASSUMPTION if it is indeed an input in a form then submit event would be fired and submit actioned if not cancelled
        var cancelled = fireSubmitEvent(element);
        if (!cancelled) {
            input[0].form.submit(); //this would send jasmine crazy 
        }
    }
}
$.fn.forEach = function() {
    [].forEach.apply(this, arguments)
}

function getTodoTextElementByText(todoText) {
    var todos = $(".todo-text"),
        targetTodo = null;
    todos.forEach(function(element) {
        if (!targetTodo) {
            if (element.value == todoText || element.innerText == todoText || element.textContent == todoText) {
                targetTodo = element;
            }
        }

    });
    return targetTodo;
}

function createNewTodo(text) {
    sendTextToElementAndHitEnter(text, $(".todo-input")[0]);
}
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
        //TODO create proper helper method
        var input = $(".todo-input"),
            text = "my first todo";
        createNewTodo(text);
        var output = input.val() || input.text(); //we don't know if its an input or an element
        expect(output).toEqual(text);
    });
    it("a (new) todo description element should be present when input is typed and enter is hit", function() {
        var input = $(".todo-input");
        createNewTodo(text);
        todoTextElement = getTodoTextElementByText(text);
        expect(todoTextElement).toBeTruthy();
        expect($(todoTextElement).closest(".todo").filter(".incomplete").length).toEqual(1);
    });
    it("a (new) todo should be marked as incomplete", function() {
        createNewTodo(text);
        todoTextElement = getTodoTextElementByText(text);
        expect($(todoTextElement).closest(".todo").filter(".incomplete").length).toEqual(1);
    });
    it("a (new) todo description element should be trimmed if whitespace is added",
        function() {
            var text = " i have whitespace  ",
                trimmedText = "i have whitespace";
            createNewTodo(text);
            var targetTodoText = STATIC ? $(".STATIC-TRIM-TEST .todo-text") : $(getTodoTextElementByText(trimmedText));
            expect(targetTodoText).toBeVisible()
        }
    );
    it("a (new) todo should have a visible 'checkbox'", function() {
        createNewTodo(text);
        var todoText = getTodoTextElementByText(text),
            todoElement = $(todoText).closest(".todo"),
            todoCheckbox = todoElement.find(".todo-checkbox");
        expect(todoCheckbox).toBeVisible();
    });

    it("a (new) todo should not have a visible action(remove) button", function() {
        createNewTodo(text);
        var todoText = getTodoTextElementByText(text),
            todoElement = $(todoText).closest(".todo"),
            todoCheckbox = todoElement.find(".todo-action");
        expect(todoCheckbox).not.toBeVisible();
    })
    it("an incomplete todo's remove button should hide/show when focussed/blurred or (ideally) hovered - see comments)",
        /*without an automated browser we cannot simulate a hovering mouse (and touch devices don't do hover!)
    		so we are going to check that our remove button is visible when things have focus */
        function() {
            createNewTodo(text)
            var todoText = getTodoTextElementByText(text),
                todoElement = $(todoText).closest(".todo"),
                todoCheckbox = todoElement.find(".todo-checkbox"),
                todoAction = todoElement.find(".todo-action");

            todoElement.focus();
            expect(todoAction).toBeVisible();
            todoElement.blur(); //sneaky checking that it disappears;
            expect(todoAction).not.toBeVisible();

            todoText.focus();
            expect(todoAction).toBeVisible();
            todoText.blur();
            expect(todoAction).not.toBeVisible();

            todoCheckbox.focus();
            expect(todoAction).toBeVisible();
            todoCheckbox.blur();
            expect(todoAction).not.toBeVisible();
        }
    );

    it("when an incomplete todo's checkbox is clicked it should be marked as completed",
        function() {
            var text = "todo - mark me completed"
            createNewTodo(text);
            var todoText = getTodoTextElementByText(text),
                todoElement = $(todoText).closest(".todo"),
                todoCheckbox = todoElement.find(".todo-checkbox");
            todoElement.focus();
            expect(todoCheckbox).toBeVisible();
            fireClickEvent(todoCheckbox[0]);
            var completedToDoText = STATIC ? $(".STATIC-COMPLETE-TEST .todo-text") : $(getTodoTextElementByText(text));
            var completedToDoContainer = completedToDoText.closest(".todo").filter(".complete")
            expect(completedToDoContainer.length).toEqual(1)
        }

    );





})