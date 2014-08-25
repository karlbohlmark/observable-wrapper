var Emitter = typeof process == 'undefined' ? require("emitter") : require("component-emitter");

module.exports = observable;

function observable (o) {
    var wrapper = new Emitter();
    Object.keys(o).forEach(function (key) {
        Object.defineProperty(wrapper, key, {
            get: function () {
                return o[key];
            },
            set: function (value) {
                var oldVal = o[key];
                o[key] = value
                wrapper.emit("change " + key, value, oldVal);
            }
        })
    })
    return wrapper;
}