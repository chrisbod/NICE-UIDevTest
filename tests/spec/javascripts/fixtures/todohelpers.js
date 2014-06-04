$.fn.forEach = function() { //prefer the ECMA forEach to the jquery each
    [].forEach.apply(this, arguments);
}


var todoHelper = {
    getElementTextOrValue: function(element) {
        return element.value || element.textContent || element.innerText || '';
    },
    setElementTextOrValue: function(element, text) {
        if ("value" in element) {
            element.value = text;
        } else {
            element.innerText = text;
        }
    },
    getTodoTextElementByText: function(todoText) {
        var todos = $(".todo-text"),
            targetTodo = null;
        todos.forEach(function(element) {
            if (!targetTodo) {
                if (todoHelper.getElementTextOrValue(element) == todoText) {
                    targetTodo = element;
                }
            }

        });
        return targetTodo;
    },
    createNewTodo: function(text) {
        eventHelper.typeTextAndHitEnter(text, $(".todo-input")[0]);
    },
    getAllTodoElementsByText: function(text) { //returns jQuery collections
        var todoText = this.getTodoTextElementByText(text),
            todo = $(todoText).closest(".todo");
        if (todo.length == 0) {
            //check if we've not found it
            throw new Error("todo element [" + text + "] not found");
        }
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
    },
    checkHoverMakesVisible: function(elementToHoverOver, elementToCheckVisibility) {
        //this test is for programmatical mouseover testing
        //and assumes the 'root' todo gains a 'hover' class when moused over
        //since the static version uses a CSS hover there will be a cheat again
        //simulating hover state is not possible
        if (STATIC) {
            elementToHoverOver.mouseenter(function() {
                $(this).addClass('hover');
            });
            elementToHoverOver.mouseleave(function() {
                $(this).removeClass('hover');
            });
        }
        elementToHoverOver.mouseenter(); //is this sufficient?
        expect(elementToCheckVisibility).toBeVisible();
        elementToHoverOver.mouseleave();
        expect(elementToCheckVisibility).not.toBeVisible();

    }
}