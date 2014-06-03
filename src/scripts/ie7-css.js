/*tiny little script for IE7 to enable focus 'detection' for CSS (for ALL elements on page)
	USAGE: in your css just add a .iefocus where you would have :focus
*/
(function() {
    var lastFocus = null;
    document.attachEvent("onactivate", function() {
        if (event.srcElement) {
            event.srcElement.className += " iefocus";
            if (lastFocus) {
                lastFocus.className = lastFocus.className.replace(/\siefocus\b/, "");
            }
            lastFocus = event.srcElement;
        }
    });
})();