/*for the moment keeping our objects in the global namespace*/
function TodoModel() {
    this._id = "todo" + TodoModel.count++;
}
TodoModel.count = 0;
TodoModel.prototype.id = function(value) {
    return this._id;
}
TodoModel.prototype._id = "";