/*for the moment keeping our objects in the global namespace*/
function TodoModel(data) {
    this._id = "todo" + TodoModel.count++;
    if (data) {
        if (data.text) {
            this.text(data.text)
        }
    }
}
TodoModel.count = 0;
TodoModel.prototype.id = function() {
    return this._id;
}
TodoModel.prototype._id = "";
TodoModel.prototype.text = function() {
    if (arguments.length) {
        this._text = arguments[0].toString().trim();
    }
    return this._text;
}
TodoModel.prototype._text = "";
TodoModel.prototype.state = function() {
    var state;
    if (arguments.length) {
        state = arguments[0];
        if (this._supportedStates.indexOf(state) != -1) {
            this._state = arguments[0];
        }
        //could throw an exception here but not for now jsut log it
        console.log("TodoModel Error: Invalid state attempted to be set");
    }
    return this._state;
}
TodoModel.prototype._state = "incomplete";
TodoModel.prototype._supportedStates = ["incomplete", "removed", "completed"];
TodoModel.prototype.active = function() {
    if (arguments.length) {
        this._active = arguments[0];
    }
    return this._active;
}
TodoModel.prototype._active = false;
TodoModel.prototype.editing = function() {
    if (arguments.length) {
        this._active = arguments[0];
    }
    return this._active;
}
TodoModel.prototype._editing = false;