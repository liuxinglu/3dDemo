var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var CustomEvent = (function () {
        function CustomEvent() {
        }
        return CustomEvent;
    }());
    CustomEvent.V3D = "CEVENT::V3DEO"; //连线
    app.CustomEvent = CustomEvent;
    __reflect(CustomEvent.prototype, "app.CustomEvent");
})(app || (app = {}));
//# sourceMappingURL=CustomEvent.js.map