var eventHelper = {
    fireChange: function(element) {
        if (document.createEvent) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        } else {
            element.fireEvent("onchange");
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
            cancelled = element.fireEvent("onsubmit");
        }
        return cancelled;
    },
    fireClick: function(element) {
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