/*NOTE
	due to not having to use jQuery trigger with other libraries/controls
	I'm using bespoke code to trigger events that hopefully will work with other libraries
	I suspect I will need to edit them or research jQuery trigger properly when we deploy
*/

var eventHelper = {
    KEYCODE_ESC: 27,
    KEYCODE_BACKSPACE: 8,
    fireChange: function(element) {
        if (document.createEvent) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        } else {
            element.fireEvent("onchange", document.createEventObject());
        }
    },
    fireSubmit: function(element) {
        var cancelled = false;
        if (document.createEvent) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("submit", false, true);
            element.dispatchEvent(evt);
            if (evt.defaultPrevented) cancelled = true;
        } else {
            cancelled = element.fireEvent("onsubmit", document.createEventObject());
        }
        return cancelled;
    },
    _quickKeyEvent: function(type, keycode, target) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("KeyboardEvent");
            event.initKeyboardEvent(type, true, true, window, false, false, false, false, keycode);
            target.dispatchEvent(event)
        } else { //TODO - not finished
            event = document.createEventObject();
            event.keyCode = keycode;
            target.fireEvent("on" + type, event)
        }
        return event;
    },
    hitKey: function(keycode, element) { //may be security issues around this
        if (!element) {
            element = document.activeElement;
        }
        this._quickKeyEvent("keydown", keycode, element);
        this._quickKeyEvent("keypress", keycode, element);
        this._quickKeyEvent("keyup", keycode, element);
    },
    typeTextAndHitEnter: function(text, element) {
        //this does NOT trigger oninput events
        $(element).sendkeys(text);
        if (typeof element.onchange !== "undefined") { //of course the value may not have actually changed
            this.fireChange(element);
        }
        if (this.hittingEnterOnElementWouldSubmitForm(element)) { //ASSUMPTION if it is indeed an input in a form then submit event would be fired and submit actioned if not cancelled
            var cancelled = this.fireSubmit(element);
            if (!cancelled) {
                input[0].form.submit(); //this would send jasmine crazy 
            }
        }
    },
    hittingEnterOnElementWouldSubmitForm: function(element) {
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
}