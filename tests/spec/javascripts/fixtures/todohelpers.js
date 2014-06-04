$.fn.forEach = function() { //prefer the ECMA forEach to the jquery each
    [].forEach.apply(this, arguments);
}


var todoHelper = {
    getTodoTextElementByText: function(todoText) {
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
    },
    createNewTodo: function(text) {
        eventHelper.typeTextAndHitEnter(text, $(".todo-input")[0]);
    },
    getAllTodoElementsByText: function(todoText) { //returns jQuery collections
        var todoText = this.getTodoTextElementByText(todoText),
            todo = $(todoText).closest(".todo");
        return {
            text: $(todoText),
            todo: todo,
            checkbox: todo.find(".todo-checkbox"),
            action: todo.find(".todo-action")
        }
    },
    checkFocusMakesVisible: function(elementToFocus, elementToCheckVisibility) {
        elementToFocus.focus();
        expect(elementToCheckVisibility).toBeVisible();
        elementToFocus.blur(); //sneaky checking that it disappears;
        expect(elementToCheckVisibility).not.toBeVisible();
    }
}