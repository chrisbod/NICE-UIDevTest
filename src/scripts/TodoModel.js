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
TodoModel.prototype.text = function(text) {
    return this._text = text;
}
TodoModel.prototype._text = "";