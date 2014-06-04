function TodoModel(data) {
    this._id = "todo" + TodoModel.count++;
    this.text = ko.observable(data.text || '');

}
TodoModel.count = 0;
TodoModel.prototype.id = function() {
    return this._id;
}