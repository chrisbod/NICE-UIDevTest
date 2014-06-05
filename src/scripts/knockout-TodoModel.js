function TodoModel(data) {
    if (!data) {
        data = {};
    }
    this._id = "todo" + TodoModel.count++;
    this.text = ko.observable(data.text.trim() || this.text()).extend({
        trimWhitespace: {},
        storeLastValue: {
            propertyName: 'lastValue',
            targetObject: this
        }
    });
    this.lastValue = this.text();
    this.text.subscribe(this.validateText.bind(this));
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
TodoModel.prototype.validateText = function() {
    if (this.text() == '') {
        this.revertText();
        this.state("removed");
    }
}
//just using a property but could be an observable if we liked
TodoModel.prototype.lastValue = '';
TodoModel.prototype.revertText = function() {
    var value = this.lastValue;
    if (value != this.text()) {
        this.text(value);
        this.lastValue = value;
    }
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
        target(newValue.trim(), newValue.trim());
    });
}
//extender to preserve last value in specified property
ko.extenders.storeLastValue = function(target, option) {
    target.subscribe(function(oldValue) {
        var targetObject = option.targetObject;
        switch (typeof targetObject[option.propertyName]) {
            case 'function':
                {
                    targetObject[option.propertyName](oldValue);
                    break;
                }
            default:
                {
                    targetObject[option.propertyName] = oldValue;
                }
        }
    }, null, 'beforeChange');
}


if (!ko.bindingHandlers.readonly) { //future proofing I hope
    ko.bindingHandlers.readonly = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            element.readOnly = valueAccessor();
        }
    }

}
if (!ko.bindingHandlers.title) { //future proofing I hope
    ko.bindingHandlers.title = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            element.title = valueAccessor()(viewModel);
        }
    }

}