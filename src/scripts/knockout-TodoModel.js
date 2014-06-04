function TodoModel(data) {
    this._id = "todo" + TodoModel.count++;
    this.text = ko.observable(data.text || this.text());
    this.state = ko.observable(data.state || this.state());
    this.active = ko.observable(data.active || this.active());
    this.editing = ko.observable(data.editing || this.editing());
}
TodoModel.count = 0;


TodoModel.prototype.id = function() {
    return this._id;
}
//Defaults
TodoModel.prototype.text = function() {
    return '';
}
TodoModel.prototype.state = function() {
    return 'incomplete';
}
TodoModel.prototype.active = function() {
    return false;
}
TodoModel.prototype.editing = function() {
    return false;
}