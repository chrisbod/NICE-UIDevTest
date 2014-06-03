/*for the moment keeping our objects in the global namespace*/
function TodoModel(text) {
    this._id = "todo" + TodoModel.count++;
    if (text) {
        this.text(text)
    }
}
TodoModel.count = 0;
TodoModel.prototype.id = function() {
    return this._id;
}
TodoModel.prototype._id = "";
TodoModel.prototype.text = function() {
    if (arguments.length) {
        this._text = arguments[0];
    }
    return this._text;
}
TodoModel.prototype._text = "";
TodoModel.prototype.state = function() {
    if (arguments.length) {
        this._state = arguments[0];
    }
    return this._state;
}
TodoModel.prototype._state = "incomplete";
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