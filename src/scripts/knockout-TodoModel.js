function TodoModel(data) {
    if (!data) {
        data = {};
    }
    this._id = "todo" + TodoModel.count++;
    this.text = ko.observable(data.text || this.text()).extend({
        trimWhitespace: true
    });
    this.state = ko.observable(data.state || this.state()).extend({
        allowedValues: this.state_allowedValues
    });
    this.active = ko.observable(data.active || this.active());
    this.editing = ko.observable(data.editing || this.editing());
}
TodoModel.count = 0;
TodoModel.prototype.id = function() {
    return this._id;
}
TodoModel.prototype.state_allowedValues = ["incomplete", "removed", "completed"];

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


//knockout extender to prevent illegal values being set on an observable
//old value will be preserved
ko.extenders.allowedValues = function(target, option) {
    var lastValue
    target.subscribe(function(oldValue) {
        lastValue = oldValue;
    }, null, 'beforeChange');
    target.subscribe(function(newValue) {
        if (option.indexOf(newValue) == -1) {
            target(lastValue, newValue);
        }
    })
};
ko.extenders.trimWhitespace = function(target) {
    target.subscribe(function(newValue) {
        target(newValue.trim())
    });
}